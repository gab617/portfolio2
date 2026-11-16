import { RevealRenderer } from "./renderers/RevealRenderer";
import { HotspotsRenderer } from "./renderers/HotspotsRenderer";
import { DialogueRenderer } from "./renderers/DialogueRenderer";
import { TapsRenderer } from "./renderers/TapsRenderer";

// Catálogo de tipos de escena -> renderer.
// Agregar un tipo nuevo = importar su renderer + una línea acá.
export const RENDERERS = {
  reveal: RevealRenderer,
  hotspots: HotspotsRenderer,
  dialogue: DialogueRenderer,
  taps: TapsRenderer,
};

export function getRenderer(tipo) {
  return RENDERERS[tipo] || RevealRenderer;
}
