import { useCallback, useEffect, useRef, useState } from "react";

export function useCarouselDrag({
  axis = "horizontal",
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
  const stepRef = useRef(0);
  const maxRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [progress, setProgress] = useState(0);
  const [thumbRatio, setThumbRatio] = useState(1);
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

  // Un paso = un casillero (desplazamiento fino, uno por uno).
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 1;
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

    const total = horizontal ? viewport.scrollWidth : viewport.scrollHeight;
    const size = horizontal ? viewport.clientWidth : viewport.clientHeight;
    const max = Math.max(0, total - size);
    maxRef.current = max;
    const tr = total > 0 ? Math.max(0.12, Math.min(size / total, 1)) : 1;
    setThumbRatio((prev) => (Math.abs(prev - tr) < 0.001 ? prev : tr));

    let count = 1;
    if (step > 0) {
      stepRef.current = step;
      const last = Math.max(0, Math.floor(max / step));
      count = last + 1;
    } else {
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

  const positionOfPage = useCallback(
    (index) => {
      const last = pageCountRef.current - 1;
      const unit = stepRef.current;
      const pos = index >= last ? maxRef.current : index * unit;
      return Math.max(0, Math.min(pos, maxRef.current));
    },
    []
  );

  const scrollToPage = useCallback(
    (target, animate) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const left = positionOfPage(target);
      viewport.scrollTo({
        left: horizontal ? left : 0,
        top: horizontal ? 0 : left,
        behavior: animate && !reducedMotionRef.current ? "smooth" : "auto",
      });
    },
    [horizontal, positionOfPage]
  );

  const pageFromPos = useCallback(
    (pos) => {
      const last = pageCountRef.current - 1;
      if (last <= 0) return 0;
      const unit = stepRef.current;
      if (unit <= 0) return 0;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i <= last; i++) {
        const dist = Math.abs(pos - positionOfPage(i));
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      return best;
    },
    [positionOfPage]
  );

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

  // Salta a una posición concreta (px) alineada a un casillero y sincroniza el índice.
  const snapToPos = useCallback(
    (pos) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const idx = pageFromPos(pos);
      const aligned = positionOfPage(idx);
      if (idx !== pageRef.current) {
        pageRef.current = idx;
        setPage(idx);
        onPanelChange?.(idx);
      }
      viewport.scrollTo({
        left: horizontal ? aligned : 0,
        top: horizontal ? 0 : aligned,
        behavior: !reducedMotionRef.current ? "smooth" : "auto",
      });
    },
    [horizontal, pageFromPos, positionOfPage, onPanelChange]
  );

  const setProgressFromPos = useCallback((pos) => {
    const max = maxRef.current;
    const ratio = max > 0 ? Math.max(0, Math.min(pos / max, 1)) : 1;
    setProgress((prev) => (Math.abs(prev - ratio) < 0.001 ? prev : ratio));
  }, []);

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
    const max = maxRef.current;
    let target = pointer.startScroll - pointer.delta;
    if (target < 0) target *= 0.35;
    else if (target > max) target = max + (target - max) * 0.35;
    if (horizontal) viewport.scrollLeft = target;
    else viewport.scrollTop = target;
    setProgressFromPos(target);
  }, [horizontal, setProgressFromPos]);

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
    const viewport = viewportRef.current;
    movedRef.current = false;
    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      delta: 0,
      decided: false,
      startScroll: viewport
        ? horizontal
          ? viewport.scrollLeft
          : viewport.scrollTop
        : 0,
      samples: [],
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

    // Velocidad como promedio de los últimos ~100ms (menos ruido).
    const now = performance.now();
    const pos = horizontal ? event.clientX : event.clientY;
    pointer.samples.push({ pos, time: now });
    while (pointer.samples.length > 2 && now - pointer.samples[0].time > 100) {
      pointer.samples.shift();
    }
    const first = pointer.samples[0];
    const dt = now - first.time;
    pointer.velocity = dt > 0 ? (pos - first.pos) / dt : 0;

    schedule();
  };

  const finishDrag = (event) => {
    const pointer = pointerRef.current;
    if (!pointer || event.pointerId !== pointer.id) return;
    resetPointer();
    if (!pointer.decided) return;

    const viewport = viewportRef.current;
    const current = viewport
      ? horizontal
        ? viewport.scrollLeft
        : viewport.scrollTop
      : pointer.startScroll;
    const max = maxRef.current;

    // Proyección por velocidad (momentum): un flick rápido sigue varios casilleros,
    // un arrastre suave sólo se alinea a la celda más cercana.
    const FLICK = 0.003;
    const projected = current - pointer.velocity * FLICK;
    const clamped = Math.max(0, Math.min(projected, max));

    setDragging(false);
    snapToPos(clamped);
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
    if (viewport) {
      setProgressFromPos(horizontal ? viewport.scrollLeft : viewport.scrollTop);
    }
    if (!viewport || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(() => {
      measure();
      scrollToPage(pageRef.current, false);
      setProgressFromPos(horizontal ? viewport.scrollLeft : viewport.scrollTop);
    });
    ro.observe(viewport);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure, scrollToPage, setProgressFromPos, horizontal]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    const onScroll = () => {
      const pos = horizontal ? viewport.scrollLeft : viewport.scrollTop;
      setProgressFromPos(pos);
      if (pointerRef.current) return;
      const next = pageFromPos(pos);
      if (next !== pageRef.current) {
        pageRef.current = next;
        setPage(next);
        onPanelChange?.(next);
      }
    };
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  }, [horizontal, onPanelChange, pageFromPos, setProgressFromPos]);

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
    progress,
    thumbRatio,
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
