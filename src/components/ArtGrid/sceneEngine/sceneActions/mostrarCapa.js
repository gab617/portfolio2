// Acción: mostrar una "capa" (overlay/imagen/forma) sobre la escena.
// El renderer expone api.mostrarCapa(id, opts) para resolver el DOM/estado.
export function mostrarCapa({ params = {}, api }) {
  if (!params.capa || !api?.mostrarCapa) return;
  api.mostrarCapa(params.capa, {
    transicion: params.transicion || "fade",
    duracion: params.duracion ?? 500,
    autoOcultar: params.autoOcultar ?? null,
  });
}

export default mostrarCapa;
