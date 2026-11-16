/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { runActions } from "../runActions";

// Renderer base: imagen (respetando view.mode/focus) + overlay de texto.
// Es markup puro: los efectos los aplica el `api` del engine sobre el DOM.
export function RevealRenderer({ scene, api }) {
  const [cargada, setCargada] = useState(false);

  const view = scene?.view || {};
  const overlay = scene?.overlay;
  const transIn = scene?.transition?.in || "fade";
  const accent = api?.accent || "#d946ef";

  useEffect(() => {
    setCargada(false);
  }, [scene?.src]);

  // Acciones onEnter de la escena.
  useEffect(() => {
    if (!api) return;
    const onEnter = scene?.interact?.params?.onEnter;
    if (onEnter?.length) runActions(onEnter, { api, scene });
  }, [api, scene]);

  const avanzar = () => {
    if (!api) return;
    if (scene?.next) api.irA?.(scene.next);
    else api.avanzar?.();
  };

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      onClick={(e) => {
        if (e.target.closest("button,[data-no-avanzar]")) return;
        avanzar();
      }}
    >
      <img
        data-scene-img="true"
        src={scene?.src}
        alt={scene?.alt || ""}
        draggable={false}
        onLoad={() => setCargada(true)}
        onError={() => setCargada(true)}
        className={`h-full w-full ${
          view.mode === "contain" ? "object-contain" : "object-cover"
        } transition-opacity duration-700 ${
          cargada ? "opacity-100" : "opacity-0"
        } ${transIn === "zoom" ? "animate-[sceneZoom_900ms_ease-out]" : ""}`}
        style={{ objectPosition: view.focus || "50% 50%" }}
      />

      {!cargada && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-white/5"
        />
      )}

      {overlay && (overlay.titulo || overlay.texto) && (
        <div
          className={`pointer-events-none absolute z-20 max-w-[92%] p-4 ${
            overlay.pos === "top"
              ? "inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent"
              : overlay.pos === "left"
                ? "left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-black/70 to-transparent"
                : overlay.pos === "right"
                  ? "right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-black/70 to-transparent"
                  : "inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent"
          }`}
        >
          {overlay.titulo && (
            <h3 className="text-lg font-bold text-white drop-shadow sm:text-2xl">
              {overlay.titulo}
            </h3>
          )}
          {overlay.texto && (
            <p className="mt-1 text-sm leading-relaxed text-white/85 sm:text-base">
              {overlay.texto}
            </p>
          )}
        </div>
      )}

      {/* Botón explícito para pasar a la siguiente escena */}
      {scene?.next && (
        <button
          type="button"
          data-no-avanzar="true"
          onClick={avanzar}
          aria-label="Continuar"
          className="absolute bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border-4 border-white px-8 py-3 text-base font-black uppercase tracking-wider text-white transition hover:scale-105"
          style={{
            backgroundColor: accent,
            boxShadow: `0 0 40px ${accent}e6`,
          }}
        >
          Continuar →
        </button>
      )}
    </div>
  );
}

export default RevealRenderer;
