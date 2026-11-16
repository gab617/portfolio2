/* eslint-disable react/prop-types */
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Context } from "../../../Context/Context";
import { calcularCuotaDiaria } from "./calculosFinanciacion";
import "./RedondeoFeedback.css";

const PLAZOS_RAPIDOS = [20, 25, 30, 35, 40, 45, 50, 60];
const OPCIONES_REDONDEO = [
  { value: "1000", label: "$1000" },
  { value: "500", label: "$500" },
  { value: "100", label: "$100" },
  { value: "exacto", label: "Exacto" },
];
const STORAGE_KEY_REDONDEO = "nwPortf_calcDiaria_plazosRedondeo";

const formatearMonto = (valor) =>
  Math.round(valor).toLocaleString("es-AR");

const formatoRedondeo = (redondeo) =>
  redondeo === "exacto" ? "Exacto" : `$${redondeo}`;

export const PlazosRapidos = ({ monto, tasaDiaria, redondeo }) => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  const [estadoCopiado, setEstadoCopiado] = useState("");
  const [plazosSeleccionados, setPlazosSeleccionados] = useState([]);
  const [redondeoRapido, setRedondeoRapido] = useState(() => {
    const guardado = localStorage.getItem(STORAGE_KEY_REDONDEO);
    const opcionesValidas = OPCIONES_REDONDEO.map(({ value }) => value);
    return opcionesValidas.includes(guardado) ? guardado : redondeo;
  });
  const [revisionRedondeo, setRevisionRedondeo] = useState(0);
  const [plazosModificados, setPlazosModificados] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REDONDEO, redondeoRapido);
  }, [redondeoRapido]);

  const montoNumerico = parseFloat(monto);
  const opciones = useMemo(() => {
    if (!Number.isFinite(montoNumerico) || montoNumerico <= 0 || tasaDiaria <= 0) {
      return [];
    }

    return PLAZOS_RAPIDOS.map((dias) => {
      const { cuotaDiaria } = calcularCuotaDiaria(
        montoNumerico,
        tasaDiaria,
        dias,
        redondeoRapido
      );

      return {
        dias,
        cuotaDiaria,
        texto: `${dias} cuotas diarias de $${formatearMonto(cuotaDiaria)} c/u`,
      };
    });
  }, [montoNumerico, tasaDiaria, redondeoRapido]);

  const encabezado = `Préstamo: $${formatearMonto(montoNumerico)}`;
  const opcionesSeleccionadas = opciones.filter(({ dias }) =>
    plazosSeleccionados.includes(dias)
  );

  const alternarSeleccion = (dias) => {
    setPlazosSeleccionados((seleccionados) =>
      seleccionados.includes(dias)
        ? seleccionados.filter((plazo) => plazo !== dias)
        : [...seleccionados, dias]
    );
  };

  const cambiarRedondeo = (nuevoRedondeo) => {
    if (nuevoRedondeo === redondeoRapido) return;

    const diasModificados = opciones.flatMap((opcion) => {
      const { cuotaDiaria } = calcularCuotaDiaria(
        montoNumerico,
        tasaDiaria,
        opcion.dias,
        nuevoRedondeo
      );

      return formatearMonto(cuotaDiaria) !== formatearMonto(opcion.cuotaDiaria)
        ? [opcion.dias]
        : [];
    });

    setRedondeoRapido(nuevoRedondeo);
    setPlazosModificados(diasModificados);
    setRevisionRedondeo((revision) => revision + 1);
  };

  const copiar = async (texto, id) => {
    try {
      await navigator.clipboard.writeText(texto);
      setEstadoCopiado(id);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setEstadoCopiado(""), 1800);
    } catch {
      setEstadoCopiado("error");
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setEstadoCopiado(""), 2500);
    }
  };

  return (
    <section
      className="mt-4 rounded-xl border p-2 sm:mt-5 sm:p-5"
      style={{
        backgroundColor: isDark ? "rgba(30,30,30,0.8)" : "rgba(255,255,255,0.85)",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      }}
      aria-labelledby="plazos-rapidos-titulo"
    >
      <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 id="plazos-rapidos-titulo" className="text-lg font-bold">
            Plazos rápidos
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
          >
            Cuotas diarias según la tasa y el redondeo seleccionados.
          </p>
          {opciones.length > 0 && (
            <p className="mt-1 text-xs" style={{ color: isDark ? "#6b7280" : "#9ca3af" }}>
              Tasa diaria: {Number(tasaDiaria * 100).toFixed(4)}% · Redondeo: {formatoRedondeo(redondeoRapido)}
            </p>
          )}
        </div>

        {opciones.length > 0 && (
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={() => copiar(`${encabezado}\n${opciones.map(({ texto }) => texto).join("\n")}`, "todos")}
              className="min-h-11 w-full rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600 sm:w-auto"
            >
              {estadoCopiado === "todos" ? "✓ Listado copiado" : "Copiar listado"}
            </button>
            <button
              type="button"
              disabled={opcionesSeleccionadas.length === 0}
              onClick={() => copiar(
                `${encabezado}\n${opcionesSeleccionadas.map(({ texto }) => texto).join("\n")}`,
                "seleccionados"
              )}
              className="min-h-11 w-full rounded-lg border border-teal-500 px-4 py-2.5 text-sm font-semibold transition hover:bg-teal-500/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[220px]"
              style={{ color: isDark ? "#5eead4" : "#0f766e" }}
            >
              {estadoCopiado === "seleccionados"
                ? "✓ Selección copiada"
                : opcionesSeleccionadas.length > 0
                  ? `Copiar seleccionados (${opcionesSeleccionadas.length})`
                  : "Seleccioná plazos"}
            </button>
          </div>
        )}
      </div>

      <div className="mb-3">
        <p className="mb-2 text-xs font-medium" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
          Redondeo exclusivo para plazos rápidos
        </p>
        <div className="grid grid-cols-2 gap-1 sm:flex sm:flex-wrap">
          {OPCIONES_REDONDEO.map(({ value, label }) => {
            const seleccionado = redondeoRapido === value;

            return (
              <button
                key={value}
                type="button"
                aria-pressed={seleccionado}
                onClick={() => cambiarRedondeo(value)}
                className="min-h-10 rounded-lg border px-2 py-1.5 text-sm font-medium transition sm:px-3"
                style={{
                  backgroundColor: seleccionado
                    ? "rgba(20,184,166,0.9)"
                    : isDark ? "rgba(55,65,81,0.8)" : "rgba(229,231,235,0.8)",
                  borderColor: seleccionado
                    ? "rgba(20,184,166,1)"
                    : isDark ? "#4b5563" : "#d1d5db",
                  color: seleccionado ? "#fff" : isDark ? "#e5e7eb" : "#374151",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {opciones.length === 0 ? (
        <p className="rounded-lg bg-gray-500/10 p-3 text-sm" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
          Ingresá un monto y una tasa mensual mayor a cero para generar los plazos.
        </p>
      ) : (
        <>
          <p className="mb-3 text-base font-semibold">{encabezado}</p>
          <p className="mb-3 text-sm" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
            Marcá los plazos que quieras incluir en la copia.
          </p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {opciones.map(({ dias, texto, cuotaDiaria }) => (
              <li
                key={dias}
                className="flex min-h-14 items-center justify-between gap-2 rounded-lg border p-2 sm:gap-3 sm:p-3"
                style={{
                  backgroundColor: isDark ? "rgba(20,20,20,0.45)" : "rgba(249,250,251,0.9)",
                  borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                }}
              >
                <label className="flex min-h-10 min-w-0 flex-1 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={plazosSeleccionados.includes(dias)}
                    onChange={() => alternarSeleccion(dias)}
                    aria-label={`Seleccionar opción de ${dias} cuotas diarias`}
                    className="h-5 w-5 shrink-0 accent-teal-500"
                  />
                  <span className="text-sm font-medium">
                    {dias} cuotas diarias de{" "}
                    <span
                      key={plazosModificados.includes(dias)
                        ? `${revisionRedondeo}-${dias}`
                        : `sin-cambio-${dias}`}
                      className={plazosModificados.includes(dias)
                        ? "cuota-redondeo-recalculada"
                        : ""}
                    >
                      ${formatearMonto(cuotaDiaria)}
                    </span>{" "}
                    c/u
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => copiar(`${encabezado}\n${texto}`, String(dias))}
                  aria-label={`Copiar opción de ${dias} cuotas diarias`}
                  className="min-h-10 shrink-0 rounded-lg bg-teal-500/15 px-3 py-2 text-sm font-semibold transition hover:bg-teal-500/25"
                  style={{ color: isDark ? "#5eead4" : "#0f766e" }}
                >
                  {estadoCopiado === String(dias) ? "✓ Copiado" : "Copiar"}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {estadoCopiado === "error" && (
        <p className="mt-3 text-sm text-red-500" role="status">
          No se pudo copiar. Revisá los permisos del portapapeles e intentá de nuevo.
        </p>
      )}
    </section>
  );
};
