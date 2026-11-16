// Acción: fade (opacidad) sobre un objetivo de la escena.
export function fade({ params = {}, api }) {
  if (!api?.fade) return;
  api.fade({
    objetivo: params.objetivo || null,
    desde: params.desde ?? 1,
    hasta: params.hasta ?? 0,
    duracion: params.duracion ?? 500,
    autoVolver: params.autoVolver ?? null,
  });
}

export default fade;
