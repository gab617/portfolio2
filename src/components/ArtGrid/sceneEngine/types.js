/**
 * Contratos de datos del motor de escenas (solo documentación/JSDoc).
 *
 * @typedef {Object} SceneView
 * @property {"cover"|"contain"} [mode]  Encuadre de la imagen.
 * @property {string} [focus]            object-position, ej. "50% 40%".
 *
 * @typedef {Object} SceneOverlay
 * @property {string} [titulo]
 * @property {string} [texto]
 * @property {"top"|"bottom"|"left"|"right"} [pos]
 *
 * @typedef {Object} AccionRef
 * @property {string} action            Nombre en el registro de acciones.
 * @property {Object} [params]
 *
 * @typedef {Object} Zona
 * @property {string} id
 * @property {Array<[number, number]>} poligono  Puntos [x%, y%].
 * @property {string} [label]
 * @property {AccionRef[]} [onTap]
 *
 * @typedef {Object} SceneInteract
 * @property {"reveal"|"hotspots"|"dialogue"|"beforeAfter"|"parallax"} type
 * @property {Object} [params]           Ej. { zonas: Zona[] }
 *
 * @typedef {Object} Scene
 * @property {string} src
 * @property {string} [alt]
 * @property {SceneView} [view]
 * @property {SceneOverlay} [overlay]
 * @property {SceneInteract} [interact]
 * @property {{ in?: string, out?: string }} [transition]
 * @property {string|null} [next]         Id de la escena siguiente (lineal).
 * @property {Array<{ label: string, to: string }>} [choices]  Ramas.
 *
 * @typedef {Object} SceneGraph
 * @property {string} id
 * @property {string} [title]
 * @property {string} [accent]
 * @property {string} [cover]             Portada para el carrusel existente.
 * @property {string} start               Id de la escena inicial.
 * @property {Record<string, Scene>} scenes
 */

export {};
