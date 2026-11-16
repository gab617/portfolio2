// Registro de componentes dinámicos usables desde modales tipo "dinamico".
//
// Igual que los otros registros: el JSON referencia un NOMBRE, no un import.
// Agregar un componente = crear el archivo + una línea acá.
//
// Contrato del componente: ({ ...props, accent, onResolver }) => JSX
//   - onResolver(resultado) lo resuelve y encadena el siguiente tap.

const cargadores = {
  // ejemplo: galeria: () => import("./componentes/Galeria"),
};

const cache = {};

export async function getComponente(nombre) {
  if (cache[nombre]) return cache[nombre];
  const loader = cargadores[nombre];
  if (!loader) return null;
  const mod = await loader();
  const Comp = mod.default || mod[nombre] || Object.values(mod)[0];
  cache[nombre] = Comp;
  return Comp;
}

export function componentesDisponibles() {
  return Object.keys(cargadores);
}
