/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useRef } from "react";
import { getRenderer } from "./registry";
import { useSceneGraph } from "./useSceneGraph";
import { useRecorrido } from "./useRecorrido";
import { precargarAcciones } from "./sceneActions";
import { nombresDeAcciones } from "./runActions";

// Motor de escenas: interpreta el grafo, arma el `api` de efectos/navegación
// y delega el render al renderer del tipo de la escena actual.
//
// Props:
//   graph     grafo { id, start, scenes{} }
//   accent    color de acento del paisaje (llega al api de los renderers)
//   className clase extra para el contenedor
//   onEstado  (estado) => void  publica progreso, respuestas y tiempos
//   apiRef    ref donde se expone { irA, avanzar, volver, reiniciar }
export function SceneEngine({
  graph,
  accent = "#d946ef",
  className = "",
  onEstado,
  apiRef,
}) {
  const {
    actual,
    actualId,
    irA,
    avanzar,
    volver,
    puedeAvanzar,
    puedeVolver,
    total,
    reiniciar: reiniciarGrafo,
  } = useSceneGraph(graph);

  const recorrido = useRecorrido(graph?.id);

  const stageRef = useRef(null);

  // Precarga de acciones usadas por el grafo (perf).
  useEffect(() => {
    precargarAcciones(nombresDeAcciones(graph?.scenes));
  }, [graph]);

  // Reinicia el recorrido completo: borra los datos guardados Y vuelve la
  // escena al inicio del grafo (antes sólo borraba localStorage y el visor
  // quedaba en la escena donde estabas).
  const reiniciar = useCallback(() => {
    recorrido.reiniciar();
    const inicioId =
      graph?.start || Object.keys(graph?.scenes || {})[0] || null;
    if (inicioId) recorrido.visitar(inicioId);
    reiniciarGrafo();
  }, [recorrido, graph, reiniciarGrafo]);

  // Registra la visita a la escena actual (timeline de los paisajes sin taps).
  // Ojo: las escenas NO tienen campo `id`; el id es la clave del mapa scenes{}.
  const visitar = recorrido.visitar;
  useEffect(() => {
    if (actualId) visitar(actualId);
  }, [actualId, visitar]);

  // Todos los taps declarados en el grafo (para medir el avance global).
  const tapsDelGrafo = useMemo(() => {
    const lista = [];
    Object.values(graph?.scenes || {}).forEach((scene) => {
      if (scene?.interact?.type !== "taps") return;
      (scene.interact.params?.taps || []).forEach((tap) => lista.push(tap));
    });
    return lista;
  }, [graph]);

  const escenaIds = useMemo(() => Object.keys(graph?.scenes || {}), [graph]);
  const escenaIndex = actualId ? escenaIds.indexOf(actualId) + 1 : 0;
  const esFinal = !actual?.next;

  const tapCompletados = tapsDelGrafo.filter(
    (tap) => recorrido.resueltos[tap.id],
  ).length;

  // Terminado: si el paisaje tiene taps, cuando se resolvieron todos (es lo
  // que el visitante completa). Si no tiene taps, cuando llega a la escena
  // final del grafo. Así el panel final funciona en los dos casos.
  const terminado =
    tapsDelGrafo.length > 0
      ? tapCompletados === tapsDelGrafo.length
      : esFinal;

  // Publica el estado hacia afuera (página del recorrido, panel final).
  useEffect(() => {
    if (!onEstado) return;
    onEstado({
      recorrido: {
        resueltos: recorrido.resueltos,
        respuestas: recorrido.respuestas,
        tiempos: recorrido.tiempos,
        visitas: recorrido.visitas,
        inicio: recorrido.inicio,
      },
      escena: actual,
      escenaId: actualId,
      escenaIndex,
      totalEscenas: total,
      esFinal,
      tapTotal: tapsDelGrafo.length,
      tapCompletados,
      terminado,
    });
  }, [
    onEstado,
    recorrido,
    actual,
    actualId,
    escenaIndex,
    total,
    esFinal,
    tapsDelGrafo.length,
    tapCompletados,
    terminado,
  ]);

  // Expone controles imperativos mínimos (reiniciar desde la página).
  useEffect(() => {
    if (!apiRef) return;
    apiRef.current = { irA, avanzar, volver, reiniciar };
  }, [apiRef, irA, avanzar, volver, reiniciar]);

  // api que se pasa a renderers y acciones.
  const api = useMemo(() => {
    const q = (sel) => stageRef.current?.querySelector(sel) || null;
    const elDe = (objetivo) => {
      if (!objetivo) return q("[data-scene-img]");
      return q(`[data-zona="${objetivo}"]`) || q(`[data-capa="${objetivo}"]`);
    };
    return {
      irA,
      avanzar,
      volver,
      recorrido,
      accent: graph?.accent || accent,
      mostrarCapa: (id, opts = {}) => {
        const el = q(`[data-capa="${id}"]`);
        if (!el) return;
        el.style.transition = `opacity ${opts.duracion || 500}ms ease`;
        el.style.opacity = "1";
        if (opts.autoOcultar) {
          setTimeout(() => {
            el.style.opacity = "0";
          }, opts.autoOcultar);
        }
      },
      pulso: ({ objetivo, intensidad = 1.5, duracion = 420 }) => {
        const el = elDe(objetivo);
        el?.animate(
          [
            { transform: "scale(1)" },
            { transform: `scale(${intensidad})` },
            { transform: "scale(1)" },
          ],
          { duration: duracion, easing: "ease-in-out" },
        );
      },
      fade: ({ objetivo, hasta = 0, duracion = 500, autoVolver = null }) => {
        const el = elDe(objetivo);
        if (!el) return;
        el.style.transition = `opacity ${duracion}ms ease`;
        el.style.opacity = String(hasta);
        if (autoVolver) {
          setTimeout(() => {
            el.style.opacity = String(hasta === 0 ? 1 : 0);
          }, autoVolver);
        }
      },
      zoom: ({ objetivo, escala = 1.08, duracion = 700 }) => {
        const el = elDe(objetivo);
        if (!el) return;
        el.style.transition = `transform ${duracion}ms ease`;
        el.style.transform = `scale(${escala})`;
      },
    };
  }, [irA, avanzar, volver, recorrido, accent, graph]);

  const Renderer = getRenderer(actual?.interact?.type);
  const transIn = actual?.transition?.in || "fade";

  if (!actual) return null;

  return (
    <div
      className={`relative h-full w-full select-none overflow-hidden bg-black ${className}`}
    >
      <div
        ref={stageRef}
        key={actual?.src}
        className="absolute inset-0 animate-[sceneIn_500ms_ease-out]"
        style={{ "--scene-in": transIn }}
      >
        <Renderer scene={actual} api={api} />
      </div>

      {/* Controles de navegación (estructura del grafo) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between p-3">
        <button
          type="button"
          onClick={volver}
          disabled={!puedeVolver}
          aria-label="Escena anterior"
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:opacity-30"
        >
          ‹
        </button>
        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wide text-white/70 backdrop-blur-sm">
          Escena · {escenaIndex}/{total}
        </span>
        <button
          type="button"
          onClick={avanzar}
          disabled={!puedeAvanzar}
          aria-label="Escena siguiente"
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:opacity-30"
        >
          ›
        </button>
      </div>

      <button
        type="button"
        onClick={reiniciar}
        aria-label="Reiniciar recorrido"
        className="absolute bottom-3 right-3 z-40 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white/70 backdrop-blur-sm transition hover:bg-black/70 hover:text-white"
      >
        Reiniciar recorrido
      </button>

      <style>{`
        @keyframes sceneIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sceneZoom { from { transform: scale(1.08); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}

export default SceneEngine;
