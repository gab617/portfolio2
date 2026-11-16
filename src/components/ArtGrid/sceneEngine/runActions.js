import { getAccion } from "./sceneActions";

// Ejecuta una lista de AccionRef contra el registro, en orden.
// Falla silenciosamente por acción desconocida (el contenido no rompe la app).
export async function runActions(acciones = [], ctx = {}) {
  for (const ref of acciones) {
    if (!ref?.action) continue;
    const fn = await getAccion(ref.action);
    if (typeof fn !== "function") continue;
    try {
      await fn({ params: ref.params || {}, ...ctx });
    } catch {
      /* una acción que falla no aborta el resto */
    }
  }
}

// Recolecta los nombres de acción usados por un grafo (para precarga).
export function nombresDeAcciones(scenes = {}) {
  const set = new Set();
  for (const scene of Object.values(scenes)) {
    const zonas = scene?.interact?.params?.zonas;
    if (Array.isArray(zonas)) {
      for (const zona of zonas) {
        (zona.onTap || []).forEach((a) => a?.action && set.add(a.action));
      }
    }
    (scene?.interact?.params?.onEnter || []).forEach(
      (a) => a?.action && set.add(a.action),
    );
  }
  return [...set];
}
