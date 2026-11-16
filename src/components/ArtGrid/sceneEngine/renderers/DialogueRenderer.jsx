/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { runActions } from "../runActions";

// Renderer de diálogo: imagen + overlay + opciones que ramifican (choices).
export function DialogueRenderer({ scene, api }) {
  const [cargada, setCargada] = useState(false);

  const view = scene?.view || {};
  const overlay = scene?.overlay;
  const choices = scene?.choices || [];
  const accent = api?.accent || "#d946ef";

  useEffect(() => {
    setCargada(false);
  }, [scene?.src]);

  useEffect(() => {
    if (!api) return;
    const onEnter = scene?.interact?.params?.onEnter;
    if (onEnter?.length) runActions(onEnter, { api, scene });
  }, [api, scene]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
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
        }`}
        style={{ objectPosition: view.focus || "50% 50%" }}
      />

      {!cargada && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-white/5"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-3 bg-gradient-to-t from-black/85 to-transparent p-4 sm:p-6">
        {(overlay?.titulo || overlay?.texto) && (
          <div>
            {overlay?.titulo && (
              <h3 className="text-lg font-bold text-white drop-shadow sm:text-2xl">
                {overlay.titulo}
              </h3>
            )}
            {overlay?.texto && (
              <p className="mt-1 text-sm leading-relaxed text-white/85 sm:text-base">
                {overlay.texto}
              </p>
            )}
          </div>
        )}

        {choices.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {choices.map((c) => (
              <button
                key={`${c.to}-${c.label}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  api?.irA?.(c.to);
                }}
                className="rounded-full border px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:scale-105 hover:opacity-85 focus-visible:outline focus-visible:outline-2"
                style={{
                  borderColor: `${accent}66`,
                  backgroundColor: `${accent}2e`,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DialogueRenderer;
