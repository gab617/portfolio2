/* eslint-disable react/prop-types */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSwipe } from "./hooks/useSwipe";
import { PanScrubber } from "./PanScrubber";
import "./SceneTour.css";

const ANIM_MS = 400;

export function SceneTour({ scenes, accent, title }) {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState(-1);
  const [direction, setDirection] = useState("next");
  const [sizes, setSizes] = useState({});
  const [availW, setAvailW] = useState(0);
  const [vp, setVp] = useState(() =>
    typeof window !== "undefined"
      ? { w: window.innerWidth, h: window.innerHeight }
      : { w: 1280, h: 800 }
  );
  const [panScroll, setPanScroll] = useState({ atStart: true, atEnd: true });
  const [hasPanned, setHasPanned] = useState(false);
  const [hintHidden, setHintHidden] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [panPos, setPanPos] = useState({ pos: 0, max: 0 });

  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const panDragRef = useRef(null);
  const clearRef = useRef(null);
  const scrollIdleRef = useRef(null);

  const total = scenes?.length || 0;
  const currentW = sizes[current]?.w;
  const currentH = sizes[current]?.h;

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const update = () => setAvailW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () =>
      setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    scenes.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        setSizes((prev) =>
          prev[i]?.w === img.naturalWidth
            ? prev
            : { ...prev, [i]: { w: img.naturalWidth, h: img.naturalHeight } }
        );
      };
      img.src = src;
    });
  }, [scenes]);

  useEffect(
    () => () => {
      clearTimeout(clearRef.current);
      clearTimeout(scrollIdleRef.current);
    },
    []
  );

  const recordSize = (i, el) => {
    if (!el.naturalWidth || !el.naturalHeight) return;
    setSizes((prev) =>
      prev[i]?.w === el.naturalWidth
        ? prev
        : { ...prev, [i]: { w: el.naturalWidth, h: el.naturalHeight } }
    );
  };

  const transitionTo = (next, dir) => {
    if (next === current) return;
    clearTimeout(clearRef.current);
    setDirection(dir);
    setLeaving(current);
    setCurrent(next);
    clearRef.current = setTimeout(() => setLeaving(-1), ANIM_MS);
  };

  const goTo = (index) => {
    if (index < 0 || index >= total) return;
    transitionTo(index, index > current ? "next" : "prev");
  };

  const step = (delta) => {
    if (total < 2) return;
    transitionTo((current + delta + total) % total, delta > 0 ? "next" : "prev");
  };

  const swipe = useSwipe({
    onSwipeLeft: () => step(1),
    onSwipeRight: () => step(-1),
    threshold: 50,
  });

  useEffect(() => {
    if (total < 2) return undefined;
    const onKey = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const stage = useMemo(() => {
    if (!availW) return null;
    const outerPad = vp.w >= 1280 ? 48 : vp.w >= 640 ? 24 : 12;
    const footerH = 53;
    const stripH = total > 1 ? (vp.w >= 640 ? 44 : 40) : 0;
    const chrome = outerPad + footerH + 24 + stripH + 4;
    const maxH = Math.max(280, vp.h - chrome);
    const s = sizes[current];
    const nw = s?.w || 16;
    const nh = s?.h || 9;
    const scale = Math.min(availW / nw, maxH / nh);
    let width = Math.round(nw * scale);
    let height = Math.round(nh * scale);
    let innerWidth = width;
    let innerHeight = height;
    let pan = null;

    const minH = Math.min(Math.round((vp.h - outerPad) * 0.8), maxH);

    if (height < minH) {
      height = minH;
      width = Math.round((nw * height) / nh);
      innerWidth = width;
      innerHeight = minH;
      if (width > availW + 1) {
        pan = "x";
        width = availW;
      }
    } else if (nh * (availW / nw) > maxH + 1) {
      let w = availW;
      if (vp.w >= 1280) {
        const halfW = Math.round(availW * 0.5);
        if (nh * (halfW / nw) > maxH + 1) w = halfW;
      }
      pan = "y";
      height = maxH;
      innerWidth = w;
      innerHeight = Math.round(nh * (w / nw));
      width = w;
    }

    return {
      width: Math.max(1, width),
      height: Math.max(1, height),
      innerWidth: Math.max(1, innerWidth),
      innerHeight: Math.max(1, innerHeight),
      pan,
    };
  }, [availW, sizes, current, vp.w, vp.h, total]);

  useEffect(() => {
    const el = stageRef.current;
    const pan = stage?.pan;
    setPanScroll({ atStart: true, atEnd: true });
    setHasPanned(false);
    setHintHidden(false);
    setPanPos({ pos: 0, max: 0 });
    if (!el || !pan) return;
    const maxX = el.scrollWidth - el.clientWidth;
    const maxY = el.scrollHeight - el.clientHeight;
    const max = pan === "y" ? maxY : maxX;
    if (max > 2) {
      if (pan === "x") el.scrollLeft = maxX / 2;
      else el.scrollTop = maxY / 2;
      setPanScroll({ atStart: false, atEnd: false });
      setPanPos({ pos: max / 2, max });
    }
  }, [current, stage?.pan, currentW, currentH]);

  useEffect(() => {
    if (!stage?.pan || hasPanned) return undefined;
    const t = setTimeout(() => setHintHidden(true), 3500);
    return () => clearTimeout(t);
  }, [stage?.pan, hasPanned, current]);

  const seek = (ratio) => {
    const el = stageRef.current;
    if (!el || !stage?.pan) return;
    const r = Math.min(1, Math.max(0, ratio));
    if (stage.pan === "y") {
      el.scrollTop = r * (el.scrollHeight - el.clientHeight);
    } else {
      el.scrollLeft = r * (el.scrollWidth - el.clientWidth);
    }
  };

  const onPanScroll = () => {
    const el = stageRef.current;
    if (!el || !stage?.pan) return;
    const vertical = stage.pan === "y";
    const pos = vertical ? el.scrollTop : el.scrollLeft;
    const max = vertical
      ? el.scrollHeight - el.clientHeight
      : el.scrollWidth - el.clientWidth;
    setPanPos({ pos, max });
    setPanScroll({ atStart: pos <= 1, atEnd: pos >= max - 1 });
    if (pos > 8) setHasPanned(true);
    setIsScrolling(true);
    clearTimeout(scrollIdleRef.current);
    scrollIdleRef.current = setTimeout(() => setIsScrolling(false), 650);
  };

  const onPanPointerDown = (event) => {
    event.stopPropagation();
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = stageRef.current;
    if (!el) return;
    panDragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: el.scrollLeft,
      top: el.scrollTop,
    };
    el.setPointerCapture(event.pointerId);
  };

  const onPanPointerMove = (event) => {
    const drag = panDragRef.current;
    const el = stageRef.current;
    if (!drag || !el || drag.id !== event.pointerId) return;
    if (stage?.pan === "y") {
      el.scrollTop = drag.top - (event.clientY - drag.y);
    } else {
      el.scrollLeft = drag.left - (event.clientX - drag.x);
    }
  };

  const onPanPointerUp = (event) => {
    if (panDragRef.current?.id === event.pointerId) panDragRef.current = null;
  };

  if (!total) return null;

  const scrubPropsX =
    stage?.pan === "x"
      ? {
          pos: panPos.pos,
          max: panPos.max,
          visible: stage.width,
          total: stage.innerWidth,
          onSeek: seek,
        }
      : null;
  const scrubPropsY =
    stage?.pan === "y"
      ? {
          pos: panPos.pos,
          max: panPos.max,
          visible: stage.height,
          total: stage.innerHeight,
          onSeek: seek,
        }
      : null;

  return (
    <div
      className="scene-tour relative overflow-hidden bg-black/70"
      style={{ "--scene-accent": accent }}
      onPointerDown={(event) => {
        event.stopPropagation();
        swipe.onPointerDown(event);
      }}
      onPointerUp={swipe.onPointerUp}
      onPointerCancel={swipe.onPointerCancel}
    >
      <div className="relative">
        <div ref={viewportRef} className="scene-tour__viewport">
        <div
          ref={stageRef}
          className={`scene-tour__stage ${
            stage?.pan ? `is-pan is-pan-${stage.pan}` : ""
          }`}
          style={
            stage
              ? {
                  width: stage.width,
                  height: stage.height,
                }
              : undefined
          }
          onScroll={stage?.pan ? onPanScroll : undefined}
          onPointerDown={stage?.pan ? onPanPointerDown : undefined}
          onPointerMove={stage?.pan ? onPanPointerMove : undefined}
          onPointerUp={stage?.pan ? onPanPointerUp : undefined}
          onPointerCancel={stage?.pan ? onPanPointerUp : undefined}
        >
          <div
            className="scene-tour__pan-inner"
            style={
              stage
                ? { width: stage.innerWidth, height: stage.innerHeight }
                : undefined
            }
          >
            {leaving >= 0 && leaving !== current && (
              <img
                key={`leave-${leaving}`}
                src={scenes[leaving]}
                alt=""
                aria-hidden="true"
                draggable={false}
                className={`scene-tour__img scene-tour__img--leave ${
                  direction === "next" ? "is-next" : "is-prev"
                }`}
              />
            )}
            <img
              key={current}
              ref={(el) => {
                if (el) recordSize(current, el);
              }}
              src={scenes[current]}
              alt={`${title} - escena ${current + 1} de ${total}`}
              draggable={false}
              decoding="async"
              onLoad={(el) => recordSize(current, el.currentTarget)}
              className={`scene-tour__img ${
                direction === "next" ? "is-next" : "is-prev"
              }`}
            />
          </div>

          {stage?.pan === "x" && (
            <>
              <span
                className={`scene-tour__edge-arrow scene-tour__edge-arrow--left ${
                  isScrolling && !panScroll.atStart ? "is-visible" : ""
                }`}
                aria-hidden="true"
              />
              <span
                className={`scene-tour__edge-arrow scene-tour__edge-arrow--right ${
                  isScrolling && !panScroll.atEnd ? "is-visible" : ""
                }`}
                aria-hidden="true"
              />
            </>
          )}

          {stage?.pan === "y" && (
            <>
              <span
                className={`scene-tour__edge-arrow scene-tour__edge-arrow--top ${
                  isScrolling && !panScroll.atStart ? "is-visible" : ""
                }`}
                aria-hidden="true"
              />
              <span
                className={`scene-tour__edge-arrow scene-tour__edge-arrow--bottom ${
                  isScrolling && !panScroll.atEnd ? "is-visible" : ""
                }`}
                aria-hidden="true"
              />
            </>
          )}

          {stage?.pan && !hasPanned && !hintHidden && (
            <span className="scene-tour__pan-hint" aria-hidden="true">
              {stage.pan === "x" ? "↔" : "↕"}
            </span>
          )}
        </div>

        <span className="absolute left-3 bottom-3 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          Escena {current + 1} / {total}
        </span>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Escena anterior"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-2.5 text-white transition-colors hover:bg-black/85"
            >
              <img src="arrow-left.png" alt="" className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Escena siguiente"
              className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-2.5 text-white transition-colors hover:bg-black/85 ${
                stage?.pan === "y" ? "right-6" : "right-2"
              }`}
            >
              <img src="arrow-right.png" alt="" className="w-4 h-4" aria-hidden="true" />
            </button>
          </>
        )}
        </div>

        {scrubPropsY && (
          <div className="absolute right-0 top-0 bottom-0 w-4">
            <PanScrubber orientation="y" {...scrubPropsY} />
          </div>
        )}
      </div>

      {scrubPropsX && (
        <div className="px-4 pt-1.5 sm:px-6">
          <PanScrubber orientation="x" {...scrubPropsX} />
        </div>
      )}

      {total > 1 && (
        <div className="scene-tour__strip flex gap-2 overflow-x-auto p-1.5 justify-start sm:justify-center">
          {scenes.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a escena ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className={`scene-tour__thumb shrink-0 ${i === current ? "is-active" : ""}`}
              style={sizes[i] ? { "--thumb-ar": `${sizes[i].w} / ${sizes[i].h}` } : undefined}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                onLoad={(el) => recordSize(i, el.currentTarget)}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
