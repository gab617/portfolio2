// Registro de acciones importables.
//
// Cada acción es un módulo que exporta una función pura:
//   ({ params, scene, target, api }) => void
//
// El JSON de escenas referencia acciones POR NOMBRE (string), nunca por
// implementación. Agregar una acción = crear el módulo + una línea acá.
//
// Eficiencia: los módulos se cargan de forma asíncrona (import dinámico) y
// se cachean. Las acciones son code-splittables.

const cargadores = {
  mostrarCapa: () => import("./mostrarCapa"),
  pulso: () => import("./pulso"),
  fade: () => import("./fade"),
  zoom: () => import("./zoom"),
};

const cache = {};

const pendientes = new Map();

// Carga (o recupera) una acción por nombre. Devuelve la función o null.
export async function getAccion(nombre) {
  if (cache[nombre]) return cache[nombre];
  const loader = cargadores[nombre];
  if (!loader) return null;
  if (!pendientes.has(nombre)) {
    pendientes.set(
      nombre,
      loader().then((mod) => {
        const fn = mod.default || mod[nombre];
        cache[nombre] = fn;
        pendientes.delete(nombre);
        return fn;
      }),
    );
  }
  return pendientes.get(nombre);
}

export function accionesDisponibles() {
  return Object.keys(cargadores);
}

// Precarga en paralelo todas las acciones usadas por una lista (perf).
export function precargarAcciones(nombres = []) {
  nombres.forEach((n) => {
    void getAccion(n);
  });
}
