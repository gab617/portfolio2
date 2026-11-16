// Resuelve rutas de assets servidos desde `public/`.
//
// Los JSON guardan rutas relativas ("paisajes/05/escenas/esc01.png"). Usadas
// tal cual dentro de una ruta anidada como /recorrido/05, el navegador las
// resuelve contra /recorrido/ y termina pidiendo
// /recorrido/paisajes/05/... -> 404. Por eso las normalizamos a la raíz
// (respetando `base` de Vite) antes de pasarlas a <img src>.
const ES_ABSOLUTA = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

export function assetUrl(ruta) {
  if (typeof ruta !== "string" || !ruta) return ruta;
  if (ES_ABSOLUTA.test(ruta) || ruta.startsWith("/")) return ruta;
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${ruta.replace(/^\.?\//, "")}`;
}

export default assetUrl;
