/* eslint-disable react/prop-types */
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Context } from "../../../Context/Context";
import { calcularCuotaDiaria } from "./calculosFinanciacion";
import "./RedondeoFeedback.css";

const PLAZOS = [20, 25, 30, 35, 40, 45, 50, 60];
const REDONDEOS = [
  { value: "1000", label: "$1000" },
  { value: "500", label: "$500" },
  { value: "100", label: "$100" },
  { value: "exacto", label: "Exacto" },
];
const FINANCIACION_STORAGE_KEY = "nwPortf_calcDiaria";
const MONTOS_STORAGE_KEY = "nwPortf_cotizadorMontos";
const REDONDEO_STORAGE_KEY = "nwPortf_cotizadorMontos_redondeo";

const formatearMonto = (valor) =>
  Math.round(valor).toLocaleString("es-AR");

const leerTasaFinanciacion = () => {
  const tasaPredeterminada = { porcentajeDiario: 1.1667, porcentajeMensual: 35 };

  try {
    const guardado = JSON.parse(localStorage.getItem(FINANCIACION_STORAGE_KEY));
    if (!guardado) return tasaPredeterminada;

    const porcentajeDiario = parseFloat(guardado.porcentajeInput);
    const porcentajeMensual = parseFloat(guardado.mensualInput);

    return {
      porcentajeDiario: Number.isFinite(porcentajeDiario) ? porcentajeDiario : 0,
      porcentajeMensual: Number.isFinite(porcentajeMensual)
        ? porcentajeMensual
        : Number.isFinite(porcentajeDiario)
          ? Number((porcentajeDiario * 30).toFixed(2))
          : 0,
    };
  } catch {
    return tasaPredeterminada;
  }
};

const leerMontosGuardados = () => {
  try {
    const montos = JSON.parse(localStorage.getItem(MONTOS_STORAGE_KEY));
    if (!Array.isArray(montos)) return [];

    return [...new Set(montos.map(Number).filter((monto) => Number.isFinite(monto) && monto > 0))];
  } catch {
    return [];
  }
};

export const CotizadorMontos = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  const [montoInput, setMontoInput] = useState("");
  const [montos, setMontos] = useState(leerMontosGuardados);
  const [plazosSeleccionados, setPlazosSeleccionados] = useState({});
  const [redondeo, setRedondeo] = useState(() => {
    const guardado = localStorage.getItem(REDONDEO_STORAGE_KEY);
    return REDONDEOS.some((opcion) => opcion.value === guardado) ? guardado : "500";
  });
  const [revisionRedondeo, setRevisionRedondeo] = useState(0);
  const [cuotasModificadas, setCuotasModificadas] = useState([]);
  const [tasas] = useState(leerTasaFinanciacion);
  const [mensaje, setMensaje] = useState("");
  const [estadoCopiado, setEstadoCopiado] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(MONTOS_STORAGE_KEY, JSON.stringify(montos));
  }, [montos]);

  useEffect(() => {
    localStorage.setItem(REDONDEO_STORAGE_KEY, redondeo);
  }, [redondeo]);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const cotizaciones = useMemo(() => {
    const tasaDiaria = tasas.porcentajeDiario / 100;
    if (tasaDiaria <= 0) return [];

    return montos.map((monto) => ({
      monto,
      encabezado: `Préstamo: $${formatearMonto(monto)}`,
      plazos: PLAZOS.map((dias) => {
        const { cuotaDiaria } = calcularCuotaDiaria(
          monto,
          tasaDiaria,
          dias,
          redondeo
        );

        return {
          dias,
          cuotaFormateada: formatearMonto(cuotaDiaria),
          texto: `${dias} cuotas diarias de $${formatearMonto(cuotaDiaria)} c/u`,
        };
      }),
    }));
  }, [montos, redondeo, tasas.porcentajeDiario]);

  const agregarMonto = (event) => {
    event.preventDefault();
    const monto = Number(montoInput);

    if (!Number.isFinite(monto) || monto <= 0) {
      setMensaje("Ingresá un monto mayor a cero.");
      return;
    }

    if (montos.includes(monto)) {
      setMensaje("Ese monto ya está en la lista.");
      return;
    }

    setMontos((actuales) => [...actuales, monto]);
    setMontoInput("");
    setMensaje("");
  };

  const cambiarRedondeo = (nuevoRedondeo) => {
    if (nuevoRedondeo === redondeo) return;

    const idsModificados = cotizaciones.flatMap((cotizacion) =>
      cotizacion.plazos.flatMap((plazo) => {
        const { cuotaDiaria } = calcularCuotaDiaria(
          cotizacion.monto,
          tasas.porcentajeDiario / 100,
          plazo.dias,
          nuevoRedondeo
        );

        return formatearMonto(cuotaDiaria) !== plazo.cuotaFormateada
          ? [`${cotizacion.monto}-${plazo.dias}`]
          : [];
      })
    );

    setRedondeo(nuevoRedondeo);
    setCuotasModificadas(idsModificados);
    setRevisionRedondeo((revision) => revision + 1);
  };

  const alternarPlazo = (monto, dias) => {
    setPlazosSeleccionados((seleccionActual) => {
      const seleccionMonto = seleccionActual[monto] || [];
      const nuevosPlazos = seleccionMonto.includes(dias)
        ? seleccionMonto.filter((plazo) => plazo !== dias)
        : [...seleccionMonto, dias];

      return { ...seleccionActual, [monto]: nuevosPlazos };
    });
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

  const textoCotizacion = (cotizacion) =>
    `${cotizacion.encabezado}\n${cotizacion.plazos.map(({ texto }) => texto).join("\n")}`;

  const copiarTodos = () =>
    copiar(cotizaciones.map(textoCotizacion).join("\n\n"), "todos");

  return (
    <div className="space-y-4">
      <section
        className="rounded-xl border p-3 sm:p-5"
        style={{
          backgroundColor: isDark ? "rgba(30,30,30,0.8)" : "rgba(255,255,255,0.85)",
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        }}
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Cotizador por montos</h2>
            <p className="mt-1 text-sm" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              Agregá montos puntuales y consultá sus cuotas para distintos plazos.
            </p>
            <p className="mt-1 text-xs" style={{ color: isDark ? "#6b7280" : "#9ca3af" }}>
              Tasa de Financiación: {tasas.porcentajeMensual.toFixed(2)}% mensual
              {tasas.porcentajeDiario > 0 && ` (${tasas.porcentajeDiario.toFixed(4)}% diario)`}
            </p>
          </div>
          {cotizaciones.length > 0 && (
            <button
              type="button"
              onClick={copiarTodos}
              className="min-h-11 w-full rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600 sm:w-auto"
            >
              {estadoCopiado === "todos" ? "✓ Todo copiado" : "Copiar todos los montos"}
            </button>
          )}
        </div>

        <div className="mb-4">
          <p className="mb-2 text-xs font-medium" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
            Redondeo exclusivo de este cotizador
          </p>
          <div className="grid grid-cols-2 gap-1 sm:flex sm:flex-wrap">
            {REDONDEOS.map(({ value, label }) => {
              const seleccionado = redondeo === value;

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

        <form onSubmit={agregarMonto} className="flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="cotizador-monto">
            Monto a agregar
          </label>
          <input
            id="cotizador-monto"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={montoInput}
            onChange={(event) => setMontoInput(event.target.value)}
            placeholder="Monto del préstamo, por ejemplo 7000000"
            className="min-h-11 min-w-0 flex-1 rounded-lg border px-3 py-2 text-base text-gray-900"
          />
          <button
            type="submit"
            className="min-h-11 rounded-lg bg-teal-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            Agregar monto
          </button>
        </form>
        {mensaje && (
          <p className="mt-2 text-sm text-amber-500" role="status">
            {mensaje}
          </p>
        )}
      </section>

      {cotizaciones.length === 0 ? (
        <div
          className="rounded-xl border p-5 text-center text-sm"
          style={{
            backgroundColor: isDark ? "rgba(30,30,30,0.65)" : "rgba(255,255,255,0.75)",
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            color: isDark ? "#9ca3af" : "#6b7280",
          }}
        >
          {montos.length === 0
            ? "Agregá tu primer monto para ver sus opciones de financiación."
            : "La tasa actual es cero. Ajustala en Financiación para generar cotizaciones."}
        </div>
      ) : (
        <div className="space-y-3">
          {cotizaciones.map((cotizacion) => (
            <section
              key={cotizacion.monto}
              className="rounded-xl border p-3 sm:p-4"
              style={{
                backgroundColor: isDark ? "rgba(30,30,30,0.8)" : "rgba(255,255,255,0.85)",
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              }}
            >
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold">{cotizacion.encabezado}</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => copiar(textoCotizacion(cotizacion), `monto-${cotizacion.monto}`)}
                    className="min-h-10 flex-1 rounded-lg bg-teal-500/15 px-3 py-2 text-sm font-semibold transition hover:bg-teal-500/25 sm:flex-none"
                    style={{ color: isDark ? "#5eead4" : "#0f766e" }}
                  >
                    {estadoCopiado === `monto-${cotizacion.monto}` ? "✓ Copiado" : "Copiar plazos"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMontos((actuales) => actuales.filter((monto) => monto !== cotizacion.monto));
                      setPlazosSeleccionados((actuales) => {
                        const siguientes = { ...actuales };
                        delete siguientes[cotizacion.monto];
                        return siguientes;
                      });
                      setMensaje("");
                    }}
                    aria-label={`Quitar monto de $${formatearMonto(cotizacion.monto)}`}
                    className="min-h-10 rounded-lg border px-3 py-2 text-sm transition hover:bg-red-500/10"
                    style={{
                      borderColor: isDark ? "#4b5563" : "#d1d5db",
                      color: isDark ? "#fca5a5" : "#b91c1c",
                    }}
                  >
                    Quitar
                  </button>
                </div>
              </div>

              <p className="mb-2 text-xs" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                Seleccioná qué plazos querés copiar:
              </p>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
                {cotizacion.plazos.map(({ dias, texto, cuotaFormateada }) => (
                  <li
                    key={dias}
                    className="flex min-h-11 items-center justify-between gap-2 rounded-lg border p-2"
                    style={{
                      backgroundColor: isDark ? "rgba(20,20,20,0.45)" : "rgba(249,250,251,0.9)",
                      borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                    }}
                  >
                    <label className="flex min-h-9 min-w-0 flex-1 cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={(plazosSeleccionados[cotizacion.monto] || []).includes(dias)}
                        onChange={() => alternarPlazo(cotizacion.monto, dias)}
                        aria-label={`Seleccionar ${dias} cuotas para ${cotizacion.encabezado}`}
                        className="h-5 w-5 shrink-0 accent-teal-500"
                      />
                      <span className="text-sm font-medium">
                        {dias} cuotas diarias de{" "}
                        <span
                          key={cuotasModificadas.includes(`${cotizacion.monto}-${dias}`)
                            ? `${revisionRedondeo}-${cotizacion.monto}-${dias}`
                            : `${cotizacion.monto}-${dias}`}
                          className={cuotasModificadas.includes(`${cotizacion.monto}-${dias}`)
                            ? "cuota-redondeo-recalculada"
                            : ""}
                        >
                          ${cuotaFormateada}
                        </span>{" "}
                        c/u
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => copiar(`${cotizacion.encabezado}\n${texto}`, `${cotizacion.monto}-${dias}`)}
                      aria-label={`Copiar ${dias} cuotas para ${cotizacion.encabezado}`}
                      className="min-h-9 shrink-0 rounded-lg bg-teal-500/15 px-2.5 py-1.5 text-xs font-semibold transition hover:bg-teal-500/25"
                      style={{ color: isDark ? "#5eead4" : "#0f766e" }}
                    >
                      {estadoCopiado === `${cotizacion.monto}-${dias}` ? "✓" : "Copiar"}
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled={(plazosSeleccionados[cotizacion.monto] || []).length === 0}
                onClick={() => {
                  const seleccion = cotizacion.plazos.filter(({ dias }) =>
                    (plazosSeleccionados[cotizacion.monto] || []).includes(dias)
                  );
                  const texto = `${cotizacion.encabezado}\n${seleccion.map(({ texto }) => texto).join("\n")}`;
                  copiar(texto, `seleccionados-${cotizacion.monto}`);
                }}
                className="mt-2 min-h-11 w-full rounded-lg border border-teal-500 px-4 py-2.5 text-sm font-semibold transition hover:bg-teal-500/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                style={{ color: isDark ? "#5eead4" : "#0f766e" }}
              >
                {estadoCopiado === `seleccionados-${cotizacion.monto}`
                  ? "✓ Selección copiada"
                  : (plazosSeleccionados[cotizacion.monto] || []).length > 0
                    ? `Copiar seleccionados (${plazosSeleccionados[cotizacion.monto].length})`
                    : "Seleccioná plazos"}
              </button>
            </section>
          ))}
        </div>
      )}

      {estadoCopiado === "error" && (
        <p className="text-sm text-red-500" role="status">
          No se pudo copiar. Revisá los permisos del portapapeles e intentá de nuevo.
        </p>
      )}
    </div>
  );
};
