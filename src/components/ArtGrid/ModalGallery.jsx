/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSwipe } from "./hooks/useSwipe";
import "./ModalGallery.css";

export function ModalGallery({ images, alt }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next");

  const swipe = useSwipe({
    onSwipeLeft: () => step(1),
    onSwipeRight: () => step(-1),
    threshold: 50,
  });

  function step(delta) {
    const total = images?.length || 0;
    if (total < 2) return;
    setDirection(delta > 0 ? "next" : "prev");
    setCurrent((prev) => (prev + delta + total) % total);
  }

  if (!images?.length) return null;

  const hasNav = images.length > 1;

  return (
    <div
      className="modal-gallery relative rounded-xl overflow-hidden bg-black/60"
      onPointerDown={(event) => {
        event.stopPropagation();
        swipe.onPointerDown(event);
      }}
      onPointerUp={swipe.onPointerUp}
      onPointerCancel={swipe.onPointerCancel}
    >
      <div className="relative h-48 sm:h-64 md:h-72">
        <img
          key={current}
          src={images[current]}
          alt={`${alt} - imagen ${current + 1}`}
          draggable={false}
          loading="lazy"
          decoding="async"
          className={`modal-gallery__img absolute inset-0 w-full h-full object-contain ${
            direction === "next" ? "is-next" : "is-prev"
          }`}
        />
      </div>

      {hasNav && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/85 text-white p-2 transition-colors"
          >
            <img src="arrow-left.png" alt="" className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/85 text-white p-2 transition-colors"
          >
            <img src="arrow-right.png" alt="" className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 py-2 bg-gradient-to-t from-black/70 to-transparent">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > current ? "next" : "prev");
                  setCurrent(i);
                }}
                aria-label={`Imagen ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-5 bg-teal-400" : "w-1.5 bg-white/45 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
