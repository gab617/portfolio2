import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const PREFIX = "nwportf:recorrido:";

// Clave de localStorage por paisaje.
const clave = (paisajeId) => `${PREFIX}${paisajeId}`;

// Estado inicial de un recorrido vacío.
const estadoVacio = () => ({
  resueltos: {}, // { [tapId]: true }  taps completados
  respuestas: {}, // { [tapId]: resultado }  datos guardados (texto/cuestionario)
  tiempos: {}, // { [tapId]: timestamp }  cuándo se resolvió cada uno
  visitas: {}, // { [escenaId]: timestamp }  qué escenas se abrieron y cuándo
  inicio: Date.now(),
});

function leer(paisajeId) {
  if (!paisajeId || typeof localStorage === "undefined") return estadoVacio();
  try {
    const raw = localStorage.getItem(clave(paisajeId));
    if (!raw) return estadoVacio();
    const obj = JSON.parse(raw);
    return {
      resueltos: obj.resueltos || {},
      respuestas: obj.respuestas || {},
      tiempos: obj.tiempos || {},
      visitas: obj.visitas || {},
      inicio: obj.inicio || Date.now(),
    };
  } catch {
    return estadoVacio();
  }
}

function escribir(paisajeId, estado) {
  if (!paisajeId || typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(clave(paisajeId), JSON.stringify(estado));
  } catch {
    /* almacenamiento lleno o bloqueado: no rompemos el recorrido */
  }
}

// Hook de recorrido de UN paisaje: guarda taps resueltos + respuestas en
// localStorage. Permite reiniciar (borra lo guardado).
export function useRecorrido(paisajeId) {
  const [estado, setEstado] = useState(() => leer(paisajeId));
  const paisajeRef = useRef(paisajeId);
  paisajeRef.current = paisajeId;

  // Id del paisaje al que pertenece el estado en memoria. Evita que, al
  // cambiar de paisaje, el estado del anterior se escriba en la clave nueva
  // (los efectos corren antes de que llegue el setEstado del reload).
  const escritoPara = useRef(paisajeId);

  // Al cambiar de paisaje, recarga.
  useEffect(() => {
    escritoPara.current = paisajeId;
    setEstado(leer(paisajeId));
  }, [paisajeId]);

  // Persiste ante cada cambio, sólo si el estado es del paisaje actual.
  useEffect(() => {
    if (escritoPara.current !== paisajeRef.current) return;
    escribir(paisajeRef.current, estado);
  }, [estado]);

  const estaResuelto = useCallback(
    (tapId) => !!estado.resueltos[tapId],
    [estado],
  );

  // Registra la primera visita a una escena (una sola vez por escena).
  const visitar = useCallback((escenaId) => {
    if (!escenaId) return;
    setEstado((prev) => {
      if (prev.visitas[escenaId]) return prev;
      return {
        ...prev,
        visitas: { ...prev.visitas, [escenaId]: Date.now() },
      };
    });
  }, []);

  // Marca un tap como resuelto y guarda su resultado.
  const resolver = useCallback((tapId, resultado) => {
    setEstado((prev) => {
      if (prev.resueltos[tapId]) return prev;
      const ahora = Date.now();
      return {
        ...prev,
        resueltos: { ...prev.resueltos, [tapId]: true },
        respuestas: { ...prev.respuestas, [tapId]: resultado ?? null },
        tiempos: { ...prev.tiempos, [tapId]: ahora },
      };
    });
  }, []);

  const reiniciar = useCallback(() => {
    setEstado(estadoVacio());
  }, []);

  // Cantidad de taps de un tramo resueltos (para saber qué está desbloqueado).
  const resueltos = useMemo(() => estado.resueltos, [estado.resueltos]);

  return useMemo(
    () => ({
      resueltos,
      respuestas: estado.respuestas,
      tiempos: estado.tiempos,
      visitas: estado.visitas,
      inicio: estado.inicio,
      estaResuelto,
      resolver,
      visitar,
      reiniciar,
    }),
    [
      resueltos,
      estado.respuestas,
      estado.tiempos,
      estado.visitas,
      estado.inicio,
      estaResuelto,
      resolver,
      visitar,
      reiniciar,
    ],
  );
}

export default useRecorrido;
