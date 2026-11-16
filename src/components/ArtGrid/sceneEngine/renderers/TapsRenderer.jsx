/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { runActions } from "../runActions";
import { getModal, validarDatosModal } from "../modales";

// Renderer de tipo "taps": SECUENCIA DE PASOS.
//
// Se muestra UN solo paso a la vez, centrado y grande:
//   PASO 1/4 → [TOCAR] → abre su modal → al resolverlo → PASO 2/4 → ...
//
// params: {
//   primero: "tap-1",
//   taps: [{ id, label?, modal:{tipo,...}, desbloquea? }]
// }
export function TapsRenderer({ scene, api }) {
  const [cargada, setCargada] = useState(false);
  const [modalActivo, setModalActivo] = useState(null);

  const view = scene?.view || {};
  const overlay = scene?.overlay;
  const params = scene?.interact?.params || {};
  const taps = params.taps || [];
  const primero = params.primero || taps[0]?.id;

  const recorrido = api?.recorrido;
  const resueltos = recorrido?.resueltos || {};
  const accent = api?.accent || "#d946ef";

  useEffect(() => {
    setCargada(false);
  }, [scene?.src]);

  useEffect(() => {
    if (!api) return;
    const onEnter = params.onEnter;
    if (onEnter?.length) runActions(onEnter, { api, scene });
  }, [api, scene, params.onEnter]);

  // Arma la cadena ordenada siguiendo `desbloquea` desde `primero`.
  const pasos = [];
  const mapa = new Map(taps.map((t) => [t.id, t]));
  let cursor = mapa.get(primero) || taps[0];
  while (cursor && !pasos.some((p) => p.id === cursor.id)) {
    pasos.push(cursor);
    cursor = cursor.desbloquea ? mapa.get(cursor.desbloquea) : null;
  }

  const pasoActual = pasos.find((p) => !resueltos[p.id]) || null;
  const totalPasos = pasos.length;
  const pasoIndex = pasoActual
    ? pasos.findIndex((p) => p.id === pasoActual.id) + 1
    : totalPasos;
  const terminado = totalPasos > 0 && !pasoActual;

  const abrirModal = async (tap) => {
    if (!tap?.modal?.tipo) return;
    const val = validarDatosModal(tap.modal.tipo, tap.modal);
    if (!val.ok) return;
    const Comp = await getModal(tap.modal.tipo);
    if (!Comp) return;
    setModalActivo({ tap, Comp, datos: tap.modal });
  };

  const resolverModal = (resultado) => {
    const tap = modalActivo?.tap;
    setModalActivo(null);
    if (!tap) return;
    recorrido?.resolver?.(tap.id, resultado);
    if (tap.onResolve?.length) {
      runActions(tap.onResolve, { api, scene, target: tap.id, resultado });
    }
  };

  const siguienteEscena = () => {
    if (scene?.next) api?.irA?.(scene.next);
    else api?.avanzar?.();
  };

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

      {/* Texto de la escena */}
      {overlay && (overlay.titulo || overlay.texto) && (
        <div
          className={`pointer-events-none absolute z-20 max-w-[92%] p-4 ${
            overlay.pos === "top"
              ? "inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent"
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

      {/* Contador de pasos */}
      {!terminado && pasoActual && (
        <div className="pointer-events-none absolute left-1/2 top-4 z-[60] -translate-x-1/2">
          <div className="rounded-full border-2 border-white bg-black/80 px-5 py-1.5 text-sm font-black tracking-widest text-white shadow-[0_0_30px_rgba(255,255,255,0.35)]">
            PASO {pasoIndex} / {totalPasos}
          </div>
        </div>
      )}

      {/* El paso actual: un único botón grande, centrado por defecto */}
      {!terminado && pasoActual && (
        <div
          className="absolute z-[70] -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${pasoActual.pos?.x ?? 50}%`,
            top: `${pasoActual.pos?.y ?? 50}%`,
          }}
        >
          <button
            type="button"
            data-tap={pasoActual.id}
            data-no-avanzar="true"
            aria-label={`Paso ${pasoIndex} de ${totalPasos}: tocar para abrir`}
            onClick={() => abrirModal(pasoActual)}
            className="relative grid h-36 w-36 place-items-center rounded-full text-white"
            style={{
              background: `radial-gradient(circle at 32% 28%, #fff, ${accent} 45%, rgba(0,0,0,0.65) 100%)`,
              border: "7px solid #fff",
              boxShadow: `0 0 0 12px ${accent}73, 0 0 70px 30px ${accent}d9`,
              animation: "pasoLatido 1.3s ease-in-out infinite",
            }}
          >
            <span className="text-3xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              TOCAR
            </span>
            {pasoActual.label && (
              <span className="absolute top-full mt-3 whitespace-nowrap rounded-full border border-white/40 bg-black/80 px-3 py-1 text-xs font-bold">
                {pasoActual.label}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Fin de la secuencia */}
      {terminado && (
        <div className="absolute left-1/2 top-1/2 z-[70] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
          <div className="rounded-2xl border-4 border-emerald-400 bg-emerald-600/90 px-8 py-3 text-xl font-black text-white shadow-[0_0_60px_rgba(52,211,153,0.8)]">
            ✓ SECUENCIA COMPLETA
          </div>
          {scene?.next && (
            <button
              type="button"
              data-no-avanzar="true"
              onClick={siguienteEscena}
              className="rounded-full border-4 border-white px-8 py-3 text-base font-black uppercase tracking-wider text-white transition hover:scale-105"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 40px ${accent}e6`,
              }}
            >
              Continuar →
            </button>
          )}
        </div>
      )}

      {modalActivo && (
        <modalActivo.Comp
          datos={modalActivo.datos}
          accent={api?.accent || "#f472b6"}
          onResolver={resolverModal}
          onCerrar={() => setModalActivo(null)}
        />
      )}

      <style>{`
        @keyframes pasoLatido {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export default TapsRenderer;
