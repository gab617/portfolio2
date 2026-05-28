import { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../../../Context/Context";

const STORAGE_KEY = "nwPortf_calcDiaria";

const getPeriodos = (dias) => {
  const semanas = Math.ceil(dias / 7);
  return [
    {
      id: "diario",
      label: "Diario",
      cuotas: dias,
      subLabel: `${dias} cuotas diarias`,
    },
    {
      id: "semanal",
      label: "Semanal",
      cuotas: semanas,
      subLabel: `${semanas} cuotas semanales`,
    },
    {
      id: "mensual",
      label: "Mensual",
      cuotas: 1,
      subLabel: "Pago único",
    },
  ];
};

export const CalculadoraDiaria = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  const [monto, setMonto] = useState("");
  // Inputs como string para permitir borrado completo
  const [porcentajeInput, setPorcentajeInput] = useState("1.1667");
  const [mensualInput, setMensualInput] = useState(
    (parseFloat("1.1667") * 30).toFixed(2)
  );
  const [diasInput, setDiasInput] = useState("30");
  const [resultados, setResultados] = useState(null);
  const [redondeo, setRedondeo] = useState("500");

  // Flag para evitar loop entre mensualInput y porcentajeInput
  const mensualSyncing = useRef(false);

  // Valores numéricos derivados para cálculos
  const porcentaje = parseFloat(porcentajeInput) || 0;
  const dias = parseInt(diasInput, 10) || 30;

  // Cargar estado desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.monto) setMonto(data.monto);
        if (data.porcentajeInput) setPorcentajeInput(data.porcentajeInput);
        if (data.mensualInput) setMensualInput(data.mensualInput);
        if (data.diasInput) setDiasInput(data.diasInput);
        if (data.redondeo) setRedondeo(data.redondeo);
        if (data.resultados) setResultados(data.resultados);
      } catch {}
    }
  }, []);

  // Sincronizar mensualInput cuando porcentajeInput cambia desde otra fuente
  useEffect(() => {
    if (!mensualSyncing.current && porcentajeInput) {
      setMensualInput((parseFloat(porcentajeInput) * 30).toFixed(2));
    }
    mensualSyncing.current = false;
  }, [porcentajeInput]);

  // Persistir en localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ monto, porcentajeInput, mensualInput, diasInput, redondeo, resultados })
    );
  }, [monto, porcentajeInput, mensualInput, diasInput, redondeo, resultados]);

  const redondearCuota = (valor, redondeoActual) => {
    if (redondeoActual === "exacto") return valor;
    const multiplos = { "100": 100, "500": 500, "1000": 1000 };
    const multiplo = multiplos[redondeoActual] || 500;
    return Math.ceil(valor / multiplo) * multiplo;
  };

  const ejecutarCalculo = (montoNum, tasa, redondeoOverride) => {
    const redondeoActual = redondeoOverride || redondeo;
    const total = montoNum * (1 + tasa * dias);
    const periodos = getPeriodos(dias);

    // La cuota diaria es la BASE — con o sin redondeo
    const cuotaDiariaExacta = total / dias;
    const cuotaDiaria = redondearCuota(cuotaDiariaExacta, redondeoActual);

    const fullWeeks = Math.floor(dias / 7);
    const remainingDays = dias % 7;

    const calculados = periodos.map((p) => {
      let cuota, cuotaRaw, totalRedondeado;
      const extras = {};

      if (p.id === "diario") {
        cuotaRaw = cuotaDiariaExacta;
        cuota = cuotaDiaria;
        totalRedondeado = cuota * p.cuotas;
      } else if (p.id === "semanal") {
        const cuotaFullRaw = cuotaDiariaExacta * 7;
        const cuotaFull = redondearCuota(cuotaDiaria * 7, redondeoActual);
        cuotaRaw = cuotaFullRaw;
        cuota = cuotaFull;

        if (remainingDays === 0) {
          totalRedondeado = cuotaFull * fullWeeks;
        } else {
          const cuotaLast = redondearCuota(cuotaDiaria * remainingDays, redondeoActual);
          totalRedondeado = cuotaFull * fullWeeks + cuotaLast;
          extras.lastWeekCuota = cuotaLast;
          extras.remainingDays = remainingDays;
          extras.fullWeeks = fullWeeks;
          extras.subLabel = `${fullWeeks} completas + 1 parcial (${remainingDays}d)`;
        }
      } else {
        // mensual
        cuotaRaw = cuotaDiariaExacta * dias;
        cuota = redondearCuota(cuotaDiaria * dias, redondeoActual);
        totalRedondeado = cuota * p.cuotas;
      }

      return {
        ...p,
        ...extras,
        totalRaw: total,
        cuotaRaw,
        cuota,
        totalRedondeado,
        interes: total - montoNum,
        interesRedondeado: totalRedondeado - montoNum,
      };
    });

    setResultados(calculados);
  };

  const setInteresMensual = (porcMensual) => {
    const diario = (porcMensual / 30).toFixed(4);
    setPorcentajeInput(diario);
    setMensualInput(porcMensual.toFixed(2));
    const montoNum = parseFloat(monto);
    if (!isNaN(montoNum) && montoNum > 0) {
      ejecutarCalculo(montoNum, parseFloat(diario) / 100);
    }
  };

  const calcular = (e) => {
    if (e) e.preventDefault();
    const montoNum = parseFloat(monto);
    const tasa = porcentaje / 100;
    if (isNaN(montoNum) || montoNum <= 0 || tasa <= 0) return;
    ejecutarCalculo(montoNum, tasa);
  };

  const formatear = (valor) =>
    Math.round(valor).toLocaleString("es-AR");

  const pDiario = Number(porcentaje).toFixed(2);
  const pMensual = Number(porcentaje * 30).toFixed(2);

  const copiarMensaje = (periodo) => {
    let cuotaLine = `💰 Cuota: $${formatear(periodo.cuota)}`;
    if (periodo.id === "semanal" && periodo.remainingDays > 0) {
      cuotaLine += ` (${periodo.fullWeeks} sem.) + última $${formatear(periodo.lastWeekCuota)} (${periodo.remainingDays}d)`;
    }
    const msg =
      `💵 Préstamo: $${formatear(monto)} (${pDiario}% diario — ${pMensual}% mensual)\n` +
      `📆 ${periodo.label} — ${periodo.subLabel}\n` +
      cuotaLine + "\n" +
      `📋 Total: $${formatear(periodo.totalRedondeado)}`;
    navigator.clipboard.writeText(msg);
  };

  const copiarSimple = (periodo) => {
    const label = periodo.label.toLowerCase();
    let cuotasLabel;
    if (periodo.id === "mensual") {
      cuotasLabel = `1 pago de $${formatear(periodo.cuota)}`;
    } else if (periodo.id === "semanal" && periodo.remainingDays > 0) {
      cuotasLabel =
        `${periodo.fullWeeks} cuotas semanales de $${formatear(periodo.cuota)}` +
        ` + última de $${formatear(periodo.lastWeekCuota)} (${periodo.remainingDays}d)`;
    } else {
      cuotasLabel = `${periodo.cuotas} cuotas ${label}s de $${formatear(periodo.cuota)} c/u`;
    }
    const msg =
      `💰 Cotización simple\n` +
      `Préstamo: $${formatear(monto)}\n` +
      cuotasLabel;
    navigator.clipboard.writeText(msg);
  };

  return (
    <div>
      {/* Formulario */}
      <form onSubmit={calcular} className="mb-4">
        <div className="flex flex-wrap items-end gap-2">
          <div className="flex-1 min-w-[160px]">
            <label
              className="block text-xs font-medium mb-1"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
            >
              Monto del préstamo
            </label>
            <input
              type="number"
              value={monto}
              onChange={(e) => {
                setMonto(e.target.value);
                if (resultados) {
                  const montoNum = parseFloat(e.target.value);
                  if (!isNaN(montoNum) && montoNum > 0 && porcentaje > 0) {
                    ejecutarCalculo(montoNum, porcentaje / 100);
                  }
                }
              }}
              placeholder="$ 0"
              className={`w-full px-3 py-2 rounded-lg border text-sm ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            />
          </div>
          <div className="flex-1 min-w-[80px] max-w-[120px]">
            <label
              className="block text-xs font-medium mb-1"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
            >
              % diario
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={porcentajeInput}
              onChange={(e) => {
                const nuevoVal = e.target.value;
                setPorcentajeInput(nuevoVal);
                if (resultados) {
                  const montoNum = parseFloat(monto);
                  const tasa = parseFloat(nuevoVal || "0") / 100;
                  if (!isNaN(montoNum) && montoNum > 0 && tasa > 0) {
                    ejecutarCalculo(montoNum, tasa);
                  }
                }
              }}
              placeholder="0"
              className={`w-full px-2 py-2 rounded-lg border text-sm ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            />
          </div>
          <div className="flex-1 min-w-[80px] max-w-[120px]">
            <label
              className="block text-xs font-medium mb-1"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
            >
              % mensual
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={mensualInput}
              onChange={(e) => {
                const raw = e.target.value;
                mensualSyncing.current = true;
                setMensualInput(raw);
                if (raw === "") { setPorcentajeInput(""); return; }
                const val = parseFloat(raw);
                if (!isNaN(val) && val >= 0) {
                  const diarioStr = (val / 30).toFixed(4);
                  setPorcentajeInput(diarioStr);
                  if (resultados) {
                    const montoNum = parseFloat(monto);
                    if (!isNaN(montoNum) && montoNum > 0) {
                      ejecutarCalculo(montoNum, parseFloat(diarioStr) / 100);
                    }
                  }
                }
              }}
              placeholder="0"
              className={`w-full px-2 py-2 rounded-lg border text-sm ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            />
          </div>
          <div className="flex-1 min-w-[60px] max-w-[90px]">
            <label
              className="block text-xs font-medium mb-1"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
            >
              Días
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={diasInput}
              onChange={(e) => {
                setDiasInput(e.target.value);
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val > 0 && resultados) {
                  const montoNum = parseFloat(monto);
                  if (!isNaN(montoNum) && montoNum > 0) {
                    ejecutarCalculo(montoNum, porcentaje / 100);
                  }
                }
              }}
              placeholder="0"
              className={`w-full px-2 py-2 rounded-lg border text-sm ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            />
          </div>
          <div>
            <label
              className="block text-xs font-medium mb-1 text-transparent select-none"
            >
              .
            </label>
            <div className="flex gap-1">
              {[30, 35, 40].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setInteresMensual(m)}
                  className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                    Math.abs(porcentaje - m / 30) < 0.001
                      ? "bg-teal-500 text-white"
                      : isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  title={`${m}% mensual → ${(m / 30).toFixed(4)}% diario`}
                >
                  {m}% mes
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm transition-all"
          >
            Calcular
          </button>
        </div>
      </form>

      {/* Resumen de períodos */}
      {dias > 0 && (() => {
        const p = getPeriodos(dias);
        return (
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
            <span className="font-medium">Plazo: <strong style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>{dias} días</strong></span>
            {p.map((per) => (
              <span key={per.id}>
                {per.label}: <strong style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>{per.cuotas} cuota{per.cuotas !== 1 ? 's' : ''}</strong>
              </span>
            ))}
          </div>
        );
      })()}

      {/* Selector de redondeo */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className="text-xs font-medium"
          style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
        >
          Redondeo:
        </span>
        {[
          { value: "1000", label: "$1000" },
          { value: "500", label: "$500" },
          { value: "100", label: "$100" },
          { value: "exacto", label: "🎯 Exacto", destacado: true },
        ].map((r) => (
          <button
            key={r.value}
            onClick={() => {
              const nuevoValor = r.value;
              setRedondeo(nuevoValor);
              if (resultados) {
                const montoNum = parseFloat(monto);
                if (!isNaN(montoNum) && montoNum > 0) {
                  ejecutarCalculo(montoNum, porcentaje / 100, nuevoValor);
                }
              }
            }}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              redondeo === r.value
                ? "bg-teal-500 text-white shadow-sm"
                : r.destacado
                  ? isDark
                    ? "bg-gray-700 text-amber-300 border-2 border-amber-400/60 font-bold hover:bg-gray-600"
                    : "bg-amber-50 text-amber-700 border-2 border-amber-400 font-bold hover:bg-amber-100"
                  : isDark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Resultados */}
      {resultados && (
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: `1px solid ${
              isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
            }`,
          }}
        >
          {/* Header del préstamo */}
          <div
            className="p-3 text-center border-b"
            style={{
              borderColor: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.06)",
              backgroundColor: isDark
                ? "rgba(20, 184, 166, 0.1)"
                : "rgba(20, 184, 166, 0.06)",
            }}
          >
            <p className="text-sm" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              Préstamo de{" "}
              <span className="font-bold" style={{ color: isDark ? "#fff" : "#111" }}>
                ${formatear(monto)}
              </span>{" "}
              al{" "}
              <span className="font-bold text-teal-500">
                {pDiario}% diario
              </span>
              {" / "}
              <span className="font-bold text-teal-500">
                {pMensual}% mensual
              </span>
            </p>
          </div>

          {/* Grilla 3 períodos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ 
            divideColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
          }}>
            {resultados.map((p) => (
              <div
                key={p.id}
                className="p-3 sm:p-4 text-center flex flex-col items-center gap-1"
                style={{
                  backgroundColor: isDark
                    ? "rgba(30, 30, 30, 0.8)"
                    : "rgba(255, 255, 255, 0.85)",
                }}
              >
                {/* Label */}
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: isDark ? "#6b7280" : "#9ca3af" }}
                >
                  {p.label}
                </span>
                <span
                  className="text-[10px] mb-2"
                  style={{ color: isDark ? "#4b5563" : "#adb5bd" }}
                >
                  {p.subLabel}
                </span>

                {/* Última semana parcial (solo semanal) */}
                {p.id === "semanal" && p.remainingDays > 0 && (
                  <span
                    className="text-[10px] mb-2 -mt-1"
                    style={{ color: isDark ? "#f59e0b" : "#d97706" }}
                  >
                    última semana: ${formatear(p.lastWeekCuota)} ({p.remainingDays}d)
                  </span>
                )}

                {/* Cuota */}
                <div className="mb-1">
                  <div className="text-[10px]" style={{ color: isDark ? "#6b7280" : "#adb5bd" }}>
                    Cuota
                  </div>
                  <div className="text-xl font-bold text-teal-500">
                    ${formatear(p.cuota)}
                  </div>
                </div>

                {/* Total */}
                <div className="mb-1">
                  <div className="text-[10px]" style={{ color: isDark ? "#6b7280" : "#adb5bd" }}>
                    Total
                  </div>
                  <div className="text-sm font-semibold">
                    ${formatear(p.totalRedondeado)}
                  </div>
                </div>

                {/* Interés */}
                <div>
                  <div className="text-[10px]" style={{ color: isDark ? "#6b7280" : "#adb5bd" }}>
                    Interés
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: isDark ? "#f59e0b" : "#d97706" }}
                  >
                    ${formatear(p.interesRedondeado)}
                  </div>
                </div>

                {/* Copiar */}
                <div className="mt-3 flex gap-1.5">
                  <button
                    onClick={() => copiarSimple(p)}
                    className="flex-1 text-xs px-2 py-1.5 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-all font-semibold shadow-sm"
                  >
                    📋 Simple
                  </button>
                  <button
                    onClick={() => copiarMensaje(p)}
                    className="flex-1 text-xs px-2 py-1.5 rounded-lg bg-teal-500/15 text-teal-500 hover:bg-teal-500/25 transition-all font-medium"
                    title="Copia con tasas e intereses"
                  >
                    +Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
