// Registro de paisajes.
//
// Un JSON por paisaje en esta misma carpeta (NN.json). `eager` los empaqueta
// en el mismo chunk: cada archivo pesa ~4 KB, así que la carga es despreciable
// frente a las imágenes. Lo que SÍ se carga aparte son las imágenes y los
// modales/acciones del motor, que son lazy por nombre.
//
// Agregar un paisaje = crear NN.json con { id, start, scenes{} }. No hay que
// tocar este archivo ni el motor.

import { assetUrl } from "../../../../utils/assetUrl";

const modulos = import.meta.glob("./*.json", { eager: true });

// Los JSON guardan las imágenes como rutas relativas ("paisajes/05/...").
// Dentro de una ruta anidada como /recorrido/05 el navegador las resolvería
// contra /recorrido/ y pediría /recorrido/paisajes/... (404). Normalizamos
// todas las rutas de imagen a la raíz al cargar el registro, así cualquier
// renderer puede usar `src`/`imagen` sin preocuparse por dónde está la URL.
const CLAVES_IMAGEN = new Set(["src", "image", "imagen"]);

const normalizarImagenes = (valor, clave) => {
  if (typeof valor === "string") {
    return CLAVES_IMAGEN.has(clave) ? assetUrl(valor) : valor;
  }
  if (Array.isArray(valor)) {
    return valor.map((item) => normalizarImagenes(item, clave));
  }
  if (valor && typeof valor === "object") {
    return Object.fromEntries(
      Object.entries(valor).map(([k, v]) => [k, normalizarImagenes(v, k)]),
    );
  }
  return valor;
};

export const PAISAJES = Object.values(modulos)
  .map((modulo) => normalizarImagenes(modulo.default))
  .filter((paisaje) => paisaje?.id && paisaje?.scenes)
  .sort((a, b) => String(a.id).localeCompare(String(b.id)));

// Paisaje que se abre cuando la ruta no trae id (el recorrido "de muestra").
export const PAISAJE_INICIAL = "paisaje-05";

// Acepta "05", "paisaje-05" o el id completo. Devuelve null si no existe.
export function obtenerPaisaje(parametro) {
  if (!parametro) {
    return PAISAJES.find((paisaje) => paisaje.id === PAISAJE_INICIAL) || PAISAJES[0] || null;
  }
  const buscado = String(parametro).trim().toLowerCase();
  return (
    PAISAJES.find((paisaje) => paisaje.id.toLowerCase() === buscado) ||
    PAISAJES.find((paisaje) => paisaje.id.toLowerCase() === `paisaje-${buscado}`) ||
    null
  );
}

// "paisaje-05" -> "05" (para armar la URL corta /recorrido/05).
export function numeroDePaisaje(paisaje) {
  return String(paisaje?.id || "").replace(/^paisaje-/, "");
}

export default PAISAJES;
