import { useCallback, useEffect, useMemo, useState } from "react";

// Navegación de un grafo de escenas: start / next / choices + precarga.
export function useSceneGraph(graph) {
  const scenes = useMemo(() => graph?.scenes || {}, [graph]);
  const startId = graph?.start || Object.keys(scenes)[0] || null;

  const [actualId, setActualId] = useState(startId);
  const [historial, setHistorial] = useState([]);

  // Al cambiar de grafo (otro paisaje), reinicia.
  useEffect(() => {
    setActualId(graph?.start || Object.keys(graph?.scenes || {})[0] || null);
    setHistorial([]);
  }, [graph]);

  const actual = actualId ? scenes[actualId] : null;

  // Precarga de la siguiente imagen (y las de las ramas) para evitar espera.
  useEffect(() => {
    const ids = [actual?.next, ...(actual?.choices || []).map((c) => c.to)];
    ids.filter(Boolean).forEach((id) => {
      const src = scenes[id]?.src;
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, [actual, scenes]);

  const irA = useCallback(
    (id) => {
      if (!id || !scenes[id]) return;
      setHistorial((h) => (actualId ? [...h, actualId] : h));
      setActualId(id);
    },
    [scenes, actualId],
  );

  const avanzar = useCallback(() => {
    if (actual?.next) irA(actual.next);
  }, [actual, irA]);

  const volver = useCallback(() => {
    setHistorial((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setActualId(prev);
      return h.slice(0, -1);
    });
  }, []);

  // Vuelve al inicio del grafo (para el reinicio del recorrido).
  const reiniciar = useCallback(() => {
    setActualId(startId);
    setHistorial([]);
  }, [startId]);

  const puedeAvanzar = !!actual?.next;
  const puedeVolver = historial.length > 0;

  const total = useMemo(() => Object.keys(scenes).length, [scenes]);

  return {
    actual,
    actualId,
    irA,
    avanzar,
    volver,
    reiniciar,
    puedeAvanzar,
    puedeVolver,
    total,
  };
}
