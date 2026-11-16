// Catálogo de tipos de modal del motor de escenas.
//
// Cada tipo declara:
//   - id:      nombre con el que el JSON lo referencia (string).
//   - cargar:  import dinámico del componente que lo renderiza (lazy).
//   - valida:  (opcional) valida los "datos entrantes" antes de renderizar.
//
// Regla de oro (igual que sceneActions): el JSON NUNCA referencia
// implementación, solo el NOMBRE del tipo. Agregar un tipo = crear el
// componente + una línea acá.
//
// Todos los tipos comparten el mismo contrato de props:
//   { datos, onResolver, accent }
//     - datos:      objeto con el contenido específico del tipo (ver types.js)
//     - onResolver: (resultado) => void  -> marca el tap como resuelto y
//                   dispara el desbloqueo del siguiente.
//     - accent:     color de acento de la escena para estilar.
//
// Ejemplos de `datos` por tipo (el contenido puede ser mixto, todos admiten
// `imagen`, y la parte interactiva varía):
//   cuestionario: { imagen?, titulo?, texto?, preguntas: [{ id, label, opciones:[{valor,label}] }] }
//   texto:        { imagen?, titulo?, texto?, campo: { label, placeholder?, multilinea? } }
//   imagen:       { imagen, titulo?, texto?, accion?: { label } }
//   textoPlano:   { titulo?, texto, imagen? }
//   dinamico:     { componente, props? }   -> componente registrado por nombre

const tipos = {
  cuestionario: {
    id: "cuestionario",
    cargar: () => import("./CuestionarioModal"),
  },
  texto: {
    id: "texto",
    cargar: () => import("./TextoModal"),
  },
  imagen: {
    id: "imagen",
    cargar: () => import("./ImagenModal"),
    valida: (d) =>
      d?.imagen ? { ok: true } : { ok: false, error: "imagen requerida" },
  },
  textoPlano: {
    id: "textoPlano",
    cargar: () => import("./TextoPlanoModal"),
    valida: (d) =>
      d?.texto ? { ok: true } : { ok: false, error: "texto requerido" },
  },
  dinamico: {
    id: "dinamico",
    cargar: () => import("./DinamicoModal"),
    valida: (d) =>
      d?.componente
        ? { ok: true }
        : { ok: false, error: "componente requerido" },
  },
};

const cache = {};
const pendientes = new Map();

// Devuelve el componente de un tipo (o null si no existe). Cachea el módulo.
export async function getModal(tipo) {
  if (cache[tipo]) return cache[tipo];
  const def = tipos[tipo];
  if (!def) return null;
  if (!pendientes.has(tipo)) {
    pendientes.set(
      tipo,
      def.cargar().then((mod) => {
        const Comp = mod.default || mod[def.id] || Object.values(mod)[0];
        cache[tipo] = Comp;
        pendientes.delete(tipo);
        return Comp;
      }),
    );
  }
  return pendientes.get(tipo);
}

export function tiposDeModalDisponibles() {
  return Object.keys(tipos);
}

// Valida los datos entrantes de un tipo (si define validador).
export function validarDatosModal(tipo, datos) {
  const def = tipos[tipo];
  if (!def?.valida) return { ok: true };
  return def.valida(datos);
}
