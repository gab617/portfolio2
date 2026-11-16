/* eslint-disable react/prop-types */
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Context } from "../../Context/Context";
import { SceneEngine } from "../../components/ArtGrid/sceneEngine/index";
import { PAISAJES, obtenerPaisaje, numeroDePaisaje } from "../../components/ArtGrid/data/paisajes";

const DEFAULT_ACCENT = "#d946ef";

function cadenaDePasos(scene) {
  const params = scene?.interact?.params || {};
  const taps = params.taps || [];
  const primero = params.primero || taps[0]?.id;
  const mapa = new Map(taps.map((tap) => [tap.id, tap]));
  const cadena = [];
  let cursor = mapa.get(primero);
  while (cursor && !cadena.some((paso) => paso.id === cursor.id)) {
    cadena.push(cursor);
    cursor = cursor.desbloquea ? mapa.get(cursor.desbloquea) : null;
  }
  return cadena;
}

const segundos = (ms) => {
  if (!Number.isFinite(ms) || ms <= 0) return "0.0s";
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const total = Math.round(ms / 1000);
  return `${Math.floor(total / 60)}m ${String(total % 60).padStart(2, "0")}s`;
};

function Respuesta({ paso, resultado }) {
  if (!resultado) return <span className="opacity-50">—</span>;

  if (resultado.tipo === "cuestionario") {
    const pares = (paso.modal?.preguntas || [])
      .map((pregunta) => {
        const valor = resultado.respuestas?.[pregunta.id];
        if (valor == null || (Array.isArray(valor) && valor.length === 0)) {
          return null;
        }
        const valores = Array.isArray(valor) ? valor : [valor];
        const labels = valores.map(
          (v) => pregunta.opciones?.find((opcion) => opcion.valor === v)?.label || v,
        );
        return { pregunta: pregunta.label, respuesta: labels.join(", ") };
      })
      .filter(Boolean);

    if (!pares.length) return <span className="opacity-50">—</span>;

    return (
      <ul className="mt-1 space-y-0.5">
        {pares.map((par) => (
          <li key={par.pregunta} className="text-sm leading-snug">
            <span className="opacity-60">{par.pregunta}: </span>
            <span className="font-semibold">{par.respuesta}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (resultado.tipo === "texto") {
    const valor = (resultado.valor || "").trim();
    return (
      <p className="mt-1 text-sm font-medium italic leading-snug">
        {valor ? `“${valor}”` : "(sin texto)"}
      </p>
    );
  }

  if (resultado.tipo === "imagen") {
    return (
      <p className="mt-1 text-sm leading-snug">
        Imagen vista · <span className="opacity-70">{resultado.accion}</span>
      </p>
    );
  }

  if (resultado.tipo === "textoPlano") {
    return <span className="mt-1 block text-xs opacity-60">Visto</span>;
  }

  return <p className="mt-1 text-sm">{JSON.stringify(resultado)}</p>;
}

function Stat({ label, valor, isDark, accent = DEFAULT_ACCENT }) {
  return (
    <div
      className="rounded-xl border px-3 py-2 text-center"
      style={{
        backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
        borderColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
      }}
    >
      <p className="text-lg font-black tabular-nums" style={{ color: accent }}>
        {valor}
      </p>
      <p className="text-[10px] uppercase tracking-wider opacity-60">{label}</p>
    </div>
  );
}

function Tarjeta({ titulo, tag, children, isDark, accent }) {
  return (
    <article
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: isDark ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.72)",
        borderColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
      }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold leading-tight">{titulo}</h3>
        {tag && (
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
            style={{
              color: accent,
              backgroundColor: isDark ? `${accent}22` : `${accent}18`,
            }}
          >
            {tag}
          </span>
        )}
      </div>
      <div className="text-xs leading-relaxed opacity-75">{children}</div>
    </article>
  );
}

function Timeline({ titulo, filas, isDark, accent, duracionMax, duracionTotal }) {
  if (filas.length === 0) return null;
  return (
    <div className="mt-4">
      <div className="mb-1.5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.15em] opacity-45">
        <span>{titulo}</span>
        <span>{segundos(duracionTotal)}</span>
      </div>
      <div className="space-y-1.5">
        {filas.map((fila, i) => (
          <div key={fila.key} className="flex items-center gap-2">
            <span className="w-4 text-[10px] tabular-nums opacity-45">
              {fila.orden ?? i + 1}
            </span>
            <div
              className="h-1.5 flex-1 overflow-hidden rounded-full"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  // Sin duración conocida (última escena) no se dibuja barra.
                  width: `${fila.duracion == null ? 0 : Math.max(6, Math.round((fila.duracion / duracionMax) * 100))}%`,
                  backgroundColor: accent,
                  opacity: 0.45 + (i / Math.max(1, filas.length)) * 0.55,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecorridoPage() {
  const { currentTheme, setTheme } = useContext(Context);
  const isDark = currentTheme.color !== "#000";
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const paisajeIdParam = params.id || searchParams.get("id");
  const paisaje = obtenerPaisaje(paisajeIdParam);
  const num = numeroDePaisaje(paisaje);

  const accent = paisaje?.accent || DEFAULT_ACCENT;
  const meta = paisaje?.meta || {};
  const mostrarArquitectura = !!meta.mostrarArquitectura;

  const apiRef = useRef(null);
  const panelRef = useRef(null);
  const [estado, setEstado] = useState(null);

  const onEstado = useCallback((next) => setEstado(next), []);

  const pasosGrafos = useMemo(() => {
    if (!paisaje?.scenes) return [];
    return Object.values(paisaje.scenes).flatMap((scene) =>
      scene?.interact?.type === "taps" ? cadenaDePasos(scene) : [],
    );
  }, [paisaje]);

  const tapTotal = estado?.tapTotal ?? pasosGrafos.length;
  const tapCompletados = estado?.tapCompletados ?? 0;
  const terminado = !!estado?.terminado;
  const progreso = tapTotal > 0 ? tapCompletados / tapTotal : 0;

  const filasPasos = useMemo(() => {
    const resueltos = estado?.recorrido?.resueltos || {};
    const tiempos = estado?.recorrido?.tiempos || {};
    const respuestas = estado?.recorrido?.respuestas || {};
    const inicio = estado?.recorrido?.inicio || 0;
    const completados = pasosGrafos.filter((paso) => resueltos[paso.id]);
    return completados.map((paso, i) => {
      const tiempo = tiempos[paso.id] || 0;
      const anterior = i === 0 ? inicio : tiempos[completados[i - 1].id] || inicio;
      return {
        paso,
        tiempo,
        duracion: Math.max(0, tiempo - anterior),
        resultado: respuestas[paso.id],
      };
    });
  }, [estado, pasosGrafos]);

  const escenasOrden = useMemo(() => Object.keys(paisaje?.scenes || {}), [paisaje]);
  const filasEscenas = useMemo(() => {
    const visitas = estado?.recorrido?.visitas || {};
    const lista = escenasOrden
      .filter((id) => visitas[id])
      .map((id, i, arr) => {
        const tiempo = visitas[id] || 0;
        // Tiempo EN la escena = hasta que se entra a la siguiente. La última
        // no tiene salida registrada: queda sin duración (se muestra "—").
        const siguiente = arr[i + 1];
        const duracion = siguiente ? Math.max(0, visitas[siguiente] - tiempo) : null;
        return {
          id,
          etiqueta: paisaje?.scenes?.[id]?.overlay?.titulo || `Escena ${i + 1}`,
          orden: i + 1,
          tiempo,
          duracion,
        };
      });
    return lista;
  }, [estado, escenasOrden, paisaje]);

  const usaPasos = filasPasos.length > 0;
  const filas = usaPasos ? filasPasos : filasEscenas;

  const timeline = useMemo(() => {
    if (usaPasos) {
      return {
        titulo: "Tiempo por paso",
        filas: filasPasos.map((fila, i) => ({
          key: fila.paso.id,
          orden: i + 1,
          duracion: fila.duracion,
        })),
      };
    }
    return {
      titulo: "Tiempo por escena",
      filas: filasEscenas.map((fila, i) => ({
        key: fila.id,
        orden: fila.orden ?? i + 1,
        duracion: fila.duracion,
      })),
    };
  }, [usaPasos, filasPasos, filasEscenas]);

  const duracionMax = Math.max(
    1,
    ...timeline.filas.map((fila) => fila.duracion ?? 0),
  );
  const duracionTotal = timeline.filas.reduce(
    (total, fila) => total + (fila.duracion ?? 0),
    0,
  );
  const countDatos = usaPasos
    ? filasPasos.length
    : Object.keys(estado?.recorrido?.visitas || {}).length;

  const reiniciar = () => {
    apiRef.current?.reiniciar();
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (paisaje) return;
    navigate("/recorrido", { replace: true });
  }, [paisaje, navigate]);

  const cambiarPaisaje = (id) => {
    navigate(`/recorrido/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!paisaje) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
        <p className="text-sm opacity-70">Buscando recorrido...</p>
      </section>
    );
  }

  const borde = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const fondoCard = isDark ? "rgba(10,10,14,0.55)" : "rgba(255,255,255,0.75)";
  const etiqueta = meta.etiqueta || `Paisaje ${num || paisaje.id} · Recorrido`;
  const titulo = meta.titulo || paisaje.title || `Recorrido ${num || ""}`;
  const bajada =
    meta.bajada ||
    paisaje.summary ||
    "Explorá el paisaje. Todo lo que hagas queda guardado en este navegador.";

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          to="/"
          className="text-xs font-semibold opacity-60 transition hover:opacity-100"
        >
          ← Volver al portfolio
        </Link>
        <Link
          to="/recorrido"
          className="text-xs font-semibold opacity-60 transition hover:opacity-100"
        >
          Inicio de recorridos
        </Link>
      </div>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{
              color: accent,
              borderColor: `${accent}55`,
              backgroundColor: `${accent}14`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
            {etiqueta}
          </span>
          <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">
            {titulo}
          </h1>
          <p className="mt-1 max-w-2xl text-sm opacity-70">{bajada}</p>
          {meta.nota && <p className="mt-1 max-w-2xl text-[11px] opacity-50">{meta.nota}</p>}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Stat label={usaPasos ? "Pasos" : "Escenas"} valor={usaPasos ? `${tapCompletados}/${tapTotal}` : `${escenasOrden.length}`} isDark={isDark} accent={accent} />
          <Stat label="Datos" valor={countDatos} isDark={isDark} accent={accent} />
          <Stat label="Tiempo" valor={filas.length ? segundos(duracionTotal) : "—"} isDark={isDark} accent={accent} />
        </div>
      </header>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {PAISAJES.map((p) => {
          const activo = p.id === paisaje.id;
          const c = p.accent || DEFAULT_ACCENT;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => cambiarPaisaje(numeroDePaisaje(p))}
              className="rounded-full border px-2.5 py-1 text-[10px] font-semibold transition hover:opacity-80"
              style={{
                borderColor: activo ? c : borde,
                backgroundColor: activo ? `${c}18` : "transparent",
                color: activo ? c : undefined,
              }}
            >
              {numeroDePaisaje(p)}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <div
            className="relative h-[68vh] min-h-[520px] w-full overflow-hidden rounded-2xl border shadow-2xl"
            style={{ borderColor: borde, backgroundColor: "#05050a" }}
          >
            <SceneEngine
              key={paisaje.id}
              graph={paisaje}
              accent={accent}
              onEstado={onEstado}
              apiRef={apiRef}
            />
          </div>
          <p className="mt-2 text-[11px] leading-relaxed opacity-55">
            El motor es data-driven: el JSON decide escenas, tipos, modales y ramas. El mismo `SceneEngine` sirve todos los paisajes.
          </p>
        </div>

        <aside ref={panelRef} className="scroll-mt-24 space-y-3 lg:sticky lg:top-20">
          <div
            className="rounded-2xl border p-4 backdrop-blur-sm"
            style={{ borderColor: borde, backgroundColor: fondoCard }}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-black uppercase tracking-wider">
                {terminado ? "Tu recorrido" : "Datos en vivo"}
              </h2>
              {terminado && (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  ✓ COMPLETO
                </span>
              )}
            </div>

            {usaPasos && (
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                }}
                role="progressbar"
                aria-valuenow={tapCompletados}
                aria-valuemin={0}
                aria-valuemax={tapTotal}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(progreso * 100)}%`, backgroundColor: accent }}
                />
              </div>
            )}

            {filas.length === 0 ? (
              <p className="mt-3 text-xs leading-relaxed opacity-60">
                Todavía no hay datos. Avanzá por el recorrido para empezar a registrar lo que hacés.
              </p>
            ) : usaPasos ? (
              <ol className="mt-3 space-y-2.5">
                {filasPasos.map((fila, i) => (
                  <li key={fila.paso.id} className="flex gap-2.5">
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-black text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-xs font-bold">
                          {fila.paso.label || fila.paso.modal?.titulo || fila.paso.id}
                        </p>
                        <span className="shrink-0 text-[10px] tabular-nums opacity-50">
                          {segundos(fila.duracion)}
                        </span>
                      </div>
                      <p className="text-[10px] uppercase tracking-wider opacity-40">
                        {fila.resultado?.tipo || fila.paso.modal?.tipo || "paso"}
                      </p>
                      <Respuesta paso={fila.paso} resultado={fila.resultado} />
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className="mt-3 space-y-2">
                {filasEscenas.map((fila) => (
                  <li key={fila.id} className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-semibold opacity-80">{fila.etiqueta}</p>
                    <span className="shrink-0 text-[10px] tabular-nums opacity-50">
                      {fila.duracion == null ? "—" : segundos(fila.duracion)}
                    </span>
                  </li>
                ))}
              </ol>
            )}

            <Timeline
              titulo={timeline.titulo}
              filas={timeline.filas}
              isDark={isDark}
              accent={accent}
              duracionMax={duracionMax}
              duracionTotal={duracionTotal}
            />
          </div>

          <div
            className="rounded-2xl border p-3 text-[11px] leading-relaxed opacity-60"
            style={{ borderColor: borde, backgroundColor: fondoCard }}
          >
            {terminado ? (
              <>
                Los datos quedaron en <code className="opacity-90">localStorage</code>, bajo{" "}
                <code className="break-all opacity-90">nwportf:recorrido:{paisaje.id}</code>. No viajaron a ningún servidor.
              </>
            ) : usaPasos ? (
              <>Al completar los {tapTotal} pasos se desbloquea el detrás de escena.</>
            ) : (
              <>Al llegar al final del recorrido se desbloquea el detrás de escena.</>
            )}
          </div>

          <button
            type="button"
            onClick={reiniciar}
            className="w-full rounded-xl border px-3 py-2 text-xs font-bold transition hover:opacity-80"
            style={{ borderColor: borde, backgroundColor: fondoCard }}
          >
            Reiniciar y borrar mis datos
          </button>
        </aside>
      </div>

      {terminado && mostrarArquitectura && (
        <section className="mt-10 animate-[aparecer_500ms_ease-out]">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-45">Detrás de escena</p>
              <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
                Cómo está hecho este pequeño proyecto
              </h2>
            </div>
            <span className="text-[11px] opacity-50">compacto: datos, motor, estado y Context</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <Tarjeta titulo="Datos, no código" tag="JSON" isDark={isDark} accent={accent}>
              <p>
                Todo el recorrido vive en <code>data/paisajes/*.json</code>: un grafo{" "}
                <code>{`{ start, scenes{} }`}</code>. Cada escena declara <code>interact.type</code>, <code>next</code> o <code>choices</code>.
              </p>
              <p className="mt-2">
                El JSON nunca importa componentes: sólo nombra tipos. Cambiar el recorrido es editar datos, no JSX.
              </p>
            </Tarjeta>

            <Tarjeta titulo="Motor + registro abierto" tag="Open/Closed" isDark={isDark} accent={accent}>
              <p>
                <code>SceneEngine</code> resuelve la escena actual y delega en <code>registry.js</code>:{" "}
                <code>reveal | taps | dialogue | hotspots</code>.
              </p>
              <p className="mt-2">
                Los modales usan <code>modales/index.js</code>: <code>cuestionario</code>, <code>texto</code>, <code>imagen</code>,{" "}
                <code>textoPlano</code> y <code>dinamico</code> se cargan lazy por nombre. Agregar un tipo = una línea, sin tocar el motor.
              </p>
            </Tarjeta>

            <Tarjeta titulo="Estado derivado" tag="React" isDark={isDark} accent={accent}>
              <p>
                <code>useSceneGraph</code> guarda <code>actualId</code> e <code>historial</code> en memoria. <code>useRecorrido</code> persiste{" "}
                <code>resueltos</code>, <code>respuestas</code>, <code>tiempos</code>, <code>visitas</code> e <code>inicio</code> por <code>paisaje.id</code>.
              </p>
              <p className="mt-2">
                El paso actual se deriva; las escenas se registran al visitarlas. Un solo origen de verdad.
              </p>
            </Tarjeta>

            <Tarjeta titulo="Context global" tag="useContext" isDark={isDark} accent={accent}>
              <p>
                <code>Context.jsx</code> expone <code>currentTheme</code> y <code>setTheme</code>. Un <code>useEffect</code> aplica fondo y color al <code>body</code>.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  { id: "light", label: "Claro" },
                  { id: "dark", label: "Oscuro" },
                  { id: "colours", label: "Color" },
                ].map((tema) => (
                  <button
                    key={tema.id}
                    type="button"
                    onClick={() => setTheme(tema.id)}
                    className="rounded-full border px-2.5 py-1 text-[10px] font-semibold transition hover:opacity-75"
                    style={{ borderColor: borde }}
                  >
                    {tema.label}
                  </button>
                ))}
              </div>
            </Tarjeta>

            <Tarjeta titulo="Escalable sin duplicar" tag="Patrón" isDark={isDark} accent={accent}>
              <ul className="space-y-1.5">
                <li>• Nuevo paisaje = nuevo JSON. Sin copiar la página.</li>
                <li>• Nueva mecánica = nuevo renderer + registro (Open/Closed).</li>
                <li>• Nuevos modales/acciones = lazy + registro por nombre.</li>
                <li>• Persistencia aislada por <code>paisaje.id</code>.</li>
              </ul>
            </Tarjeta>

            <Tarjeta titulo="Decisiones de UX" tag="UX" isDark={isDark} accent={accent}>
              <ul className="space-y-1.5">
                <li>• Un solo paso visible, centrado por defecto.</li>
                <li>• Posición es dato: <code>pos: {"{x, y}"}</code> en %.</li>
                <li>• Botones explícitos, sin zonas invisibles.</li>
                <li>• Progreso sobrevive al refresh (<code>localStorage</code>).</li>
                <li>• Reiniciar borra los datos del visitante.</li>
              </ul>
            </Tarjeta>
          </div>
        </section>
      )}

      <style>{`
        @keyframes aparecer {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default RecorridoPage;
