import { useCallback, useEffect, useRef, useState } from "react";

export function useCarouselDrag({
  axis = "horizontal",
  threshold = 60,
  slop = 10,
  onPanelChange,
  disabled = false,
}) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const movedRef = useRef(false);
  const pointerRef = useRef(null);
  const rafRef = useRef(0);
  const pageRef = useRef(0);
  const pageCountRef = useRef(1);
  const perRef = useRef(1);
  const stepRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
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

  // Una sección = todos los casilleros que entran en pantalla (responsive).
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 1;
    const size = horizontal ? viewport.clientWidth : viewport.clientHeight;
    const cells = trackRef.current ? trackRef.current.children : [];
    const n = cells.length;

    let step = 0;
    if (n > 1) {
      step = horizontal
        ? cells[1].offsetLeft - cells[0].offsetLeft
        : cells[1].offsetTop - cells[0].offsetTop;
    } else if (n === 1) {
      step = horizontal ? cells[0].offsetWidth : cells[0].offsetHeight;
    }

    let count = 1;
    if (step > 0) {
      const per = Math.max(1, Math.floor(size / step));
      perRef.current = per;
      stepRef.current = step;
      count = Math.max(1, Math.ceil(n / per));
    } else {
      perRef.current = 1;
      stepRef.current = 0;
    }

    pageCountRef.current = count;
    setPageCount((prev) => (prev === count ? prev : count));
    if (pageRef.current > count - 1) {
      pageRef.current = count - 1;
      setPage(count - 1);
    }
    return count;
  }, [horizontal]);

  const scrollToPage = useCallback(
    (target, animate) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const max = Math.max(
        0,
        (horizontal
          ? viewport.scrollWidth - viewport.clientWidth
          : viewport.scrollHeight - viewport.clientHeight)
      );
      const unit = perRef.current * stepRef.current;
      const left = Math.max(0, Math.min(target * unit, max));
      viewport.scrollTo({
        left: horizontal ? left : 0,
        top: horizontal ? 0 : left,
        behavior: animate && !reducedMotionRef.current ? "smooth" : "auto",
      });
    },
    [horizontal]
  );

  const pageFromPos = useCallback((pos) => {
    const unit = perRef.current * stepRef.current;
    if (unit <= 0) return 0;
    return Math.max(
      0,
      Math.min(Math.round(pos / unit), pageCountRef.current - 1)
    );
  }, []);

  const goTo = useCallback(
    (target) => {
      const clamped = Math.max(0, Math.min(target, pageCountRef.current - 1));
      if (clamped !== pageRef.current) {
        pageRef.current = clamped;
        setPage(clamped);
        onPanelChange?.(clamped);
      }
      scrollToPage(clamped, true);
    },
    [scrollToPage, onPanelChange]
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

  const applyDrag = useCallback(() => {
    const viewport = viewportRef.current;
    const pointer = pointerRef.current;
    if (!viewport || !pointer) return;
    const max = Math.max(
      0,
      (horizontal
        ? viewport.scrollWidth - viewport.clientWidth
        : viewport.scrollHeight - viewport.clientHeight)
    );
    const unit = perRef.current * stepRef.current;
    let target = pageRef.current * unit - pointer.delta;
    if (target < 0) target *= 0.35;
    else if (target > max) target = max + (target - max) * 0.35;
    if (horizontal) viewport.scrollLeft = target;
    else viewport.scrollTop = target;

    const next = pageFromPos(target);
    if (next !== pageRef.current) {
      pageRef.current = next;
      setPage(next);
      onPanelChange?.(next);
    }
  }, [horizontal, onPanelChange, pageFromPos]);

  const schedule = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      if (!pointerRef.current) return;
      applyDrag();
    });
  }, [applyDrag]);

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

    pointer.delta = primary;

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
    if (passed && pointer.delta < 0 && target < pageCountRef.current - 1)
      target += 1;
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
    scrollToPage(pageRef.current, true);
  };

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(() => {
      measure();
      scrollToPage(pageRef.current, false);
    });
    ro.observe(viewport);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure, scrollToPage]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    const onScroll = () => {
      if (pointerRef.current) return;
      const pos = horizontal ? viewport.scrollLeft : viewport.scrollTop;
      const next = pageFromPos(pos);
      if (next !== pageRef.current) {
        pageRef.current = next;
        setPage(next);
        onPanelChange?.(next);
      }
    };
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  }, [horizontal, onPanelChange, pageFromPos]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return {
    viewportRef,
    trackRef,
    movedRef,
    page,
    pageCount,
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
