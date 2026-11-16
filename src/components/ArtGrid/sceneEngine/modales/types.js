/**
 * Contratos de datos de los modales de tap (solo documentación/JSDoc).
 *
 * Todos los tipos comparten una base común: pueden tener `imagen`,
 * `titulo` y `texto` (cualquiera es opcional). Lo que cambia es la parte
 * interactiva. `onResolver(resultado)` cierra el modal y resuelve el tap.
 *
 * @typedef {Object} ModalBase
 * @property {string} [imagen]   src opcional (compartido por todos los tipos)
 * @property {string} [titulo]
 * @property {string} [texto]
 * @property {string} [pos]      "top" | "bottom" | "left" | "right"
 *
 * @typedef {Object} Pregunta
 * @property {string} id
 * @property {string} label
 * @property {{ valor: string, label: string }[]} opciones
 * @property {boolean} [multiple]
 *
 * @typedef {ModalBase & { preguntas: Pregunta[], requerirCorrectas?: boolean }} ModalCuestionario
 *
 * @typedef {ModalBase & { campo: { label: string, placeholder?: string, multilinea?: boolean, requerido?: boolean } }} ModalTexto
 *
 * @typedef {ModalBase & { imagen: string, accion?: { label: string } }} ModalImagen
 *
 * @typedef {ModalBase & { texto: string }} ModalTextoPlano
 *
 * @typedef {ModalBase & { componente: string, props?: Object }} ModalDinamico
 *   `componente` = nombre registrado en el registro de componentes dinámicos.
 *
 * @typedef {(
 *   ModalCuestionario | ModalTexto | ModalImagen | ModalTextoPlano | ModalDinamico
 * )} DatosModal
 *
 * @typedef {"cuestionario"|"texto"|"imagen"|"textoPlano"|"dinamico"} TipoModal
 *
 * Resultado que cada modal entrega a onResolver(resultado):
 *   - cuestionario: { tipo, respuestas: Record<id, valor|valor[]> }
 *   - texto:        { tipo, valor: string }
 *   - imagen:       { tipo, accion: string }
 *   - textoPlano:   { tipo }
 *   - dinamico:     { tipo, ...resultado del componente }
 */

export {};
