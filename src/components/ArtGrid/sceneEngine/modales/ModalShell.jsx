/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

// Chrome común de todos los modales de tap: backdrop, cabecera, cuerpo,
// pie con acción. Cada tipo sólo aporta su cuerpo interactivo.
export function ModalShell({
  titulo,
  texto,
  imagen,
  accent = "#d946ef",
  accionLabel = "Continuar",
  accionDisabled = false,
  onAccion,
  onCerrar,
  children,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onCerrar?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCerrar]);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onCerrar}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className="relative flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-2xl border-2 border-white/30 bg-[#050510] text-white outline-none"
        style={{ boxShadow: `0 0 120px ${accent}66, 0 0 0 1px rgba(255,255,255,0.15)` }}
        onClick={(e) => e.stopPropagation()}
      >
        {imagen && (
          <div className="relative max-h-[36vh] w-full flex-shrink-0 overflow-hidden bg-black">
            <img
              src={imagen}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        )}

        {(titulo || texto) && (
          <div className="px-5 pt-4">
            {titulo && (
              <h3 className="text-lg font-bold" style={{ color: accent }}>
                {titulo}
              </h3>
            )}
            {texto && (
              <p className="mt-1 text-sm leading-relaxed text-white/80">
                {texto}
              </p>
            )}
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-white/15 px-5 py-3">
          <button
            type="button"
            onClick={onCerrar}
            className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onAccion}
            disabled={accionDisabled}
            className="rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: accent }}
          >
            {accionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalShell;

