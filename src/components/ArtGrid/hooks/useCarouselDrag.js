import { useCallback, useEffect, useRef, useState } from "react";

export function useCarouselDrag({
  axis = "horizontal",
  threshold = 60,
  slop = 10,
  inertiaMs = 320,
  pageCount = 1,
  onPanelChange,
  disabled = false,
}) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const movedRef = useRef(false);
  const pointerRef = useRef(null);
  const rafRef = useRef(0);
  const pageRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [page, setPage] = useState(0);
  const [dragging, setDragging] = useState(false);

  const horizontal = axis === "horizontal";

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = (event) => {
      reducedMotionRef.current = event.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const write = useCallback(
    (pageIndex, delta, animate) => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const size = horizontal ? viewport.clientWidth : viewport.clientHeight;
      const offset = -pageIndex * size + delta;
      track.style.transition =
        animate && !reducedMotionRef.current
          ? `transform ${inertiaMs}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
          : "none";
      track.style.transform = horizontal
        ? `translate3d(${offset}px, 0, 0)`
        : `translate3d(0, ${offset}px, 0)`;
    },
    [horizontal, inertiaMs]
  );

  const schedule = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const pointer = pointerRef.current;
      if (!pointer) return;
      write(pageRef.current, pointer.delta, false);
    });
  }, [write]);

  const goTo = useCallback(
    (target) => {
      const clamped = Math.max(0, Math.min(target, pageCount - 1));
      write(clamped, 0, true);
      if (clamped !== pageRef.current) {
        pageRef.current = clamped;
        setPage(clamped);
        onPanelChange?.(clamped);
      }
    },
    [pageCount, write, onPanelChange]
  );

  const goPrev = useCallback(() => goTo(pageRef.current - 1), [goTo]);
  const goNext = useCallback(() => goTo(pageRef.current + 1), [goTo]);

  const resetPointer = useCallback(() => {
    pointerRef.current = null;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const onPointerDown = (event) => {
    if (disabled || !event.isPrimary) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    movedRef.current = false;
    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      delta: 0,
      decided: false,
      lastPos: horizontal ? event.clientX : event.clientY,
      lastTime: performance.now(),
      velocity: 0,
    };
  };

  const onPointerMove = (event) => {
    const pointer = pointerRef.current;
    if (!pointer || event.pointerId !== pointer.id) return;

    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    const primary = horizontal ? dx : dy;
    const secondary = horizontal ? dy : dx;

    if (!pointer.decided) {
      if (Math.abs(primary) < slop && Math.abs(secondary) < slop) return;
      if (Math.abs(secondary) > Math.abs(primary)) {
        pointerRef.current = null;
        return;
      }
      pointer.decided = true;
      movedRef.current = true;
      setDragging(true);
      try {
        viewportRef.current?.setPointerCapture(event.pointerId);
      } catch {
        /* capture opcional */
      }
    }

    const atStart = pageRef.current === 0 && primary > 0;
    const atEnd = pageRef.current >= pageCount - 1 && primary < 0;
    pointer.delta = atStart || atEnd ? primary * 0.35 : primary;

    const now = performance.now();
    const pos = horizontal ? event.clientX : event.clientY;
    const dt = now - pointer.lastTime;
    if (dt > 0) pointer.velocity = (pos - pointer.lastPos) / dt;
    pointer.lastPos = pos;
    pointer.lastTime = now;

    schedule();
  };

  const finishDrag = (event) => {
    const pointer = pointerRef.current;
    if (!pointer || event.pointerId !== pointer.id) return;
    resetPointer();
    if (!pointer.decided) return;

    const passed =
      Math.abs(pointer.delta) >= threshold || Math.abs(pointer.velocity) > 0.5;
    let target = pageRef.current;
    if (passed && pointer.delta < 0 && target < pageCount - 1) target += 1;
    else if (passed && pointer.delta > 0 && target > 0) target -= 1;

    setDragging(false);
    goTo(target);
  };

  const onPointerCancel = (event) => {
    const pointer = pointerRef.current;
    if (!pointer || event.pointerId !== pointer.id) return;
    resetPointer();
    if (!pointer.decided) return;
    setDragging(false);
    write(pageRef.current, 0, true);
  };

  useEffect(() => {
    const onResize = () => write(pageRef.current, 0, false);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [write]);

  return {
    viewportRef,
    trackRef,
    movedRef,
    page,
    dragging,
    goPrev,
    goNext,
    goTo,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onPointerCancel,
    },
  };
}
