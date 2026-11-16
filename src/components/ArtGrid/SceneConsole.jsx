/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Context } from "../../Context/Context";
import { SceneEngine } from "./sceneEngine/index";
import "./SceneModal.css";

// Consola de escena: visor inmersivo fullscreen (mobile-first) para paisajes
// con grafo de escenas. Reemplaza la SceneTour lineal por el SceneEngine.
export function SceneConsole({ isOpen, graph, accent, title, onClose }) {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !graph) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-1.5 sm:p-3 xl:p-6">
      <div
        className="scene-modal__backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="scene-console-title"
        className="scene-modal__panel relative h-full w-full overflow-hidden rounded-2xl outline-none"
        style={{
          backgroundColor: isDark ? "rgba(10,10,14,0.99)" : "rgba(10,10,14,0.99)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.1)"}`,
        }}
      >
        {/* Header flotante */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex items-start justify-between gap-3 bg-gradient-to-b from-black/75 via-black/35 to-transparent p-3 pb-10">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="h-8 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <div className="min-w-0">
              <h3
                id="scene-console-title"
                className="truncate text-lg font-bold text-white drop-shadow-sm"
              >
                {title || graph.title}
              </h3>
              <p className="truncate text-xs text-white/70">Recorrido inmersivo</p>
            </div>
          </div>
          <button
            type="button"
            data-no-avanzar="true"
            onClick={onClose}
            aria-label="Cerrar"
            className="pointer-events-auto shrink-0 rounded-full bg-black/55 p-2.5 text-white transition-colors hover:bg-black/85"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Escenario */}
        <div className="absolute inset-0">
          <SceneEngine graph={graph} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default SceneConsole;
