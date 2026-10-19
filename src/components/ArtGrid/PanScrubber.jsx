/* eslint-disable react/prop-types */
import { useRef } from "react";
import "./PanScrubber.css";

export function PanScrubber({
  orientation = "x",
  pos = 0,
  max = 0,
  visible = 0,
  total = 0,
  onSeek,
}) {
  const trackRef = useRef(null);
  const dragRef = useRef(null);

  if (max <= 1 || total <= 0 || visible >= total) return null;

  const thumbPct = Math.max(8, (visible / total) * 100);
  const travelPct = 100 - thumbPct;
  const offsetPct = Math.min(1, Math.max(0, pos / max)) * travelPct;
  const horizontal = orientation === "x";

  const seekFromEvent = (event) => {
    const track = trackRef.current;
    if (!track || !onSeek) return;
    const rect = track.getBoundingClientRect();
    const trackLen = horizontal ? rect.width : rect.height;
    const thumbLen = (thumbPct / 100) * trackLen;
    const pointer = horizontal ? event.clientX - rect.left : event.clientY - rect.top;
    const span = trackLen - thumbLen;
    if (span <= 0) return;
    onSeek(Math.min(1, Math.max(0, (pointer - thumbLen / 2) / span)));
  };

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.stopPropagation();
    dragRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    seekFromEvent(event);
  };

  const onPointerMove = (event) => {
    if (dragRef.current !== event.pointerId) return;
    seekFromEvent(event);
  };

  const onPointerUp = (event) => {
    if (dragRef.current === event.pointerId) dragRef.current = null;
  };

  return (
    <div
      ref={trackRef}
      className={`pan-scrubber pan-scrubber--${orientation}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="scrollbar"
      aria-orientation={horizontal ? "horizontal" : "vertical"}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(Math.min(1, pos / Math.max(1, max)) * 100)}
      aria-label={
        orientation === "x"
          ? "Posición horizontal de la imagen"
          : "Posición vertical de la imagen"
      }
    >
      <span
        className="pan-scrubber__thumb"
        style={
          orientation === "x"
            ? { width: `${thumbPct}%`, left: `${offsetPct}%` }
            : { height: `${thumbPct}%`, top: `${offsetPct}%` }
        }
      />
    </div>
  );
}
