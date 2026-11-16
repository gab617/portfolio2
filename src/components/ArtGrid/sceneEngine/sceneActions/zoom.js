// Acción: zoom (escala sostenida) sobre un objetivo de la escena.
export function zoom({ params = {}, api }) {
  if (!api?.zoom) return;
  api.zoom({
    objetivo: params.objetivo || null,
    escala: params.escala ?? 1.08,
    duracion: params.duracion ?? 700,
  });
}

export default zoom;
