// Acción: pulso (escala ida y vuelta) sobre un objetivo de la escena.
// opts.objetivo = id de zona/capa; si no, usa el target del evento.
export function pulso({ params = {}, api }) {
  if (!api?.pulso) return;
  api.pulso({
    objetivo: params.objetivo || null,
    intensidad: params.intensidad ?? 1.5,
    duracion: params.duracion ?? 420,
  });
}

export default pulso;
