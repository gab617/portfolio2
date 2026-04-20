import React, { useState, useContext } from "react";
import { Context } from "../../../Context/Context";

export const CalculadoraInteres = ({ titulo, porcentaje }) => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  
  const [monto, setMonto] = useState("");
  const [dias, setDias] = useState("");
  const [resultado, setResultado] = useState(null);
  const [redondeoSeleccionado, setRedondeoSeleccionado] = useState("500");
  const [copiado, setCopiado] = useState(false);

  const calcularPrestamo = (e) => {
    e.preventDefault();
    const montoNumerico = parseFloat(monto);
    const diasNumerico = parseInt(dias, 10);

    if (isNaN(montoNumerico) || isNaN(diasNumerico) || montoNumerico <= 0 || diasNumerico <= 0) {
      alert("Por favor, ingresa valores válidos.");
      return;
    }

    const interesDecimal = porcentaje / 100;
    const total = montoNumerico * (1 + interesDecimal * diasNumerico);
    const cuota = total / diasNumerico;
    
    const cuotaRedondeada100 = Math.ceil(cuota / 100) * 100;
    const cuotaRedondeada500 = Math.ceil(cuota / 500) * 500;
    const totalRedondeado100 = cuotaRedondeada100 * diasNumerico;
    const totalRedondeado500 = cuotaRedondeada500 * diasNumerico;

    setResultado({
      monto: montoNumerico,
      dias: diasNumerico,
      cuotaRaw: cuota,
      totalRaw: total,
      cuota100: cuotaRedondeada100,
      total100: totalRedondeado100,
      cuota500: cuotaRedondeada500,
      total500: totalRedondeado500,
    });
  };

  const handleClear = (e) => {
    e.preventDefault();
    setMonto("");
    setDias("");
    setResultado(null);
  };

  const formatear = (valor) => valor.toLocaleString("es-AR");

  const generarMensaje = (tipo) => {
    if (!resultado) return "";
    
    if (tipo === "exacto") {
      return `💵 Cotización para $${formatear(resultado.monto)}

📅 ${resultado.dias} días de plazo

💰 Cuota diaria: $${formatear(resultado.cuotaRaw)}
📆 Total: $${formatear(resultado.totalRaw)}`;
    }
    
    const cuota = tipo === "500" ? resultado.cuota500 : resultado.cuota100;
    const total = tipo === "500" ? resultado.total500 : resultado.total100;
    return `💵 Cotización para $${formatear(resultado.monto)}

📅 ${resultado.dias} días de plazo

💰 Cuota diaria: $${formatear(cuota)}
📆 Total: $${formatear(total)}`;
  };

  const copiarMensaje = (tipo) => {
    const msg = generarMensaje(tipo || redondeoSeleccionado);
    navigator.clipboard.writeText(msg);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div 
      className={`flex flex-col rounded-xl p-1 sm:p-5 md:p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      style={{ maxWidth: "480px" }}
    >
      <form onSubmit={calcularPrestamo} className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg sm:text-xl font-bold">🧮 {titulo}</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400">
            {porcentaje}% diario
          </span>
        </div>
        <p className="text-xs sm:text-sm mb-4" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
          Ingresá el monto y los días para calculate
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs sm:text-sm font-semibold mb-1.5 block" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
              💰 Monto
            </label>
            <input
              className={`w-full rounded-lg py-2.5 px-3 border text-sm sm:text-base ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="50000"
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm font-semibold mb-1.5 block" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
              📅 Días
            </label>
            <input
              className={`w-full rounded-lg py-2.5 px-3 border text-sm sm:text-base ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
              type="number"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              placeholder="30"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 py-2.5 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-all hover:shadow-lg text-sm sm:text-base"
            type="submit"
          >
            ✅ Calcular Cuota
          </button>
        </div>
        {resultado && (
          <button
            onClick={handleClear}
            className="w-full mt-2 py-1.5 text-xs text-red-500 hover:text-red-600 transition-colors"
            type="button"
          >
            🔄 Nueva cotización
          </button>
        )}
      </form>

      {resultado && (
        <div 
          className="mt-5 rounded-lg p-4"
          style={{ backgroundColor: isDark ? 'rgba(30,30,30,0.9)' : '#f9fafb' }}
        >
          {/* Header del resultado */}
          <div className="mb-4 pb-3 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold" style={{ color: isDark ? '#fff' : '#1f2937' }}>
                📊 Resultado
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400">
                {resultado.dias} días
              </span>
            </div>
            
            {/* Total exacto */}
            <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.1)' }}>
              <p className="text-xs mb-1" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>💵 Total a Pagar (exacto)</p>
              <p className="text-xl sm:text-2xl font-bold text-teal-500">${formatear(resultado.totalRaw)}</p>
            </div>
            
            {/* Detalle */}
            <div className="flex justify-between items-center text-sm">
              <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Monto:</span>
              <span className="font-semibold">${formatear(resultado.monto)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Interés:</span>
              <span className="font-semibold">${formatear(resultado.totalRaw - resultado.monto)}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Cuota diaria:</span>
              <span className="font-semibold">${formatear(resultado.cuotaRaw)}</span>
            </div>
          </div>

          {/* Opciones de copiar */}
          <p className="text-xs font-semibold mb-2" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
            📋 Seleccioná una opción para copiar:
          </p>

          {/* Opción Exacto */}
          <div 
            className={`mb-2 rounded-lg p-3 transition-all cursor-pointer ${
              redondeoSeleccionado === "exacto" ? "ring-2 ring-teal-500" : ""
            }`}
            style={{ backgroundColor: isDark ? 'rgba(40,40,40,0.8)' : '#f3f4f6' }}
            onClick={() => setRedondeoSeleccionado("exacto")}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm">🎯 Valor Exacto (sin redondeo)</span>
              {redondeoSeleccionado === "exacto" && (
                <span className="text-xs px-2 py-0.5 rounded bg-teal-500 text-white">✓</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded p-2" style={{ backgroundColor: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.1)' }}>
                <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Cuota</p>
                <p className="font-bold text-teal-400">${formatear(resultado.cuotaRaw)}</p>
              </div>
              <div className="rounded p-2" style={{ backgroundColor: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.1)' }}>
                <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Total</p>
                <p className="font-bold">${formatear(resultado.totalRaw)}</p>
              </div>
            </div>
          </div>

          {/* Opción 1 */}
          <div 
            className={`mb-3 rounded-lg p-3 transition-all cursor-pointer ${
              redondeoSeleccionado === "100" ? "ring-2 ring-teal-500" : ""
            }`}
            style={{ backgroundColor: isDark ? 'rgba(40,40,40,0.8)' : '#f3f4f6' }}
            onClick={() => setRedondeoSeleccionado("100")}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm">📋 Opción 1 (redondeo $100)</span>
              {redondeoSeleccionado === "100" && (
                <span className="text-xs px-2 py-0.5 rounded bg-teal-500 text-white">✓ Seleccionado</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded p-2" style={{ backgroundColor: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.1)' }}>
                <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Cuota</p>
                <p className="font-bold text-teal-400">${formatear(resultado.cuota100)}</p>
              </div>
              <div className="rounded p-2" style={{ backgroundColor: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.1)' }}>
                <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Total</p>
                <p className="font-bold">${formatear(resultado.total100)}</p>
              </div>
            </div>
          </div>

          {/* Opción 2 */}
          <div 
            className={`rounded-lg p-3 transition-all cursor-pointer ${
              redondeoSeleccionado === "500" ? "ring-2 ring-teal-500" : ""
            }`}
            style={{ backgroundColor: isDark ? 'rgba(40,40,40,0.8)' : '#f3f4f6' }}
            onClick={() => setRedondeoSeleccionado("500")}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm">📋 Opción 2 (redondeo $500)</span>
              {redondeoSeleccionado === "500" && (
                <span className="text-xs px-2 py-0.5 rounded bg-teal-500 text-white">✓ Seleccionado</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded p-2" style={{ backgroundColor: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.1)' }}>
                <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Cuota</p>
                <p className="font-bold text-teal-400">${formatear(resultado.cuota500)}</p>
              </div>
              <div className="rounded p-2" style={{ backgroundColor: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.1)' }}>
                <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Total</p>
                <p className="font-bold">${formatear(resultado.total500)}</p>
              </div>
            </div>
          </div>

          {/* Botón copiar */}
          <button
            onClick={() => copiarMensaje(redondeoSeleccionado)}
            className={`w-full mt-3 py-2.5 rounded-lg font-medium transition-all text-sm sm:text-base ${
              copiado 
                ? "bg-green-500 text-white" 
                : "bg-teal-500 hover:bg-teal-600 text-white"
            }`}
          >
            {copiado ? "✅ Copiado al portapapeles!" : `📋 Copiar mensaje (${redondeoSeleccionado === "exacto" ? "Exacto" : redondeoSeleccionado === "100" ? "Opción 1" : "Opción 2"})`}
          </button>
        </div>
      )}
    </div>
  );
};