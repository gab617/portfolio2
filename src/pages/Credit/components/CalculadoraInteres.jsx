import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context/Context";

// Generar key única basada en el porcentaje
const getStorageKey = (porcentaje) => `nwPortf_calc_${Number(porcentaje).toFixed(4)}`;

export const CalculadoraInteres = ({ titulo, porcentaje }) => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  
  const storageKey = getStorageKey(porcentaje);
  
  // Cargar estado desde localStorage
  const [monto, setMonto] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_monto`);
    return saved || "";
  });
  const [dias, setDias] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_dias`);
    return saved || "";
  });
  const [resultado, setResultado] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_resultado`);
    return saved ? JSON.parse(saved) : null;
  });
  const [redondeoSeleccionado, setRedondeoSeleccionado] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_redondeo`);
    return saved || "500";
  });
  const [copiado, setCopiado] = useState(false);

  // Guardar en localStorage cuando cambia algo
  useEffect(() => {
    localStorage.setItem(`${storageKey}_monto`, monto);
  }, [monto, storageKey]);
  
  useEffect(() => {
    localStorage.setItem(`${storageKey}_dias`, dias);
  }, [dias, storageKey]);
  
  useEffect(() => {
    if (resultado) {
      localStorage.setItem(`${storageKey}_resultado`, JSON.stringify(resultado));
    } else {
      localStorage.removeItem(`${storageKey}_resultado`);
    }
  }, [resultado, storageKey]);
  
  useEffect(() => {
    localStorage.setItem(`${storageKey}_redondeo`, redondeoSeleccionado);
  }, [redondeoSeleccionado, storageKey]);

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
      className={`flex flex-col rounded-xl p-1 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
    >
      <form onSubmit={calcularPrestamo} className="w-full">
        <div className="flex items-center gap-1 mb-1">
          <h2 className="text-base font-bold">🧮 {titulo}</h2>
          <span className="text-xs px-1 py-0.5 rounded-full bg-teal-500/20 text-teal-400">
            {Number(porcentaje).toFixed(4)}%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1 mb-2">
          <div>
            <input
              className={`w-full rounded-lg py-2 px-2 border text-base md:text-sm ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Monto"
            />
          </div>
          <div>
            <input
              className={`w-full rounded-lg py-2 px-2 border text-base md:text-sm ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
              type="number"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              placeholder="Días"
            />
          </div>
        </div>

        <div className="flex gap-1">
          <button
            className="flex-1 py-2 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-all text-base md:text-sm"
            type="submit"
          >
            ✅ Calcular
          </button>
        </div>
        {resultado && (
          <button
            onClick={handleClear}
            className="w-full mt-1 py-1 text-sm text-red-500 hover:text-red-600 transition-colors"
            type="button"
          >
            🔄 Nuevo
          </button>
        )}
      </form>

      {resultado && (
        <div 
          className="mt-2 rounded-lg p-2"
          style={{ backgroundColor: isDark ? 'rgba(30,30,30,0.9)' : '#f9fafb' }}
        >
          <div className="mb-2 pb-1 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-sm font-semibold" style={{ color: isDark ? '#fff' : '#1f2937' }}>
                📊 Resultado
              </span>
              <span className="text-xs px-1 py-0.5 rounded-full bg-teal-500/20 text-teal-400">
                {resultado.dias} días
              </span>
            </div>
            
            <div className="rounded-lg p-2 mb-1" style={{ backgroundColor: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.1)' }}>
              <p className="text-sm mb-0.5" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>💵 Total</p>
              <p className="text-xl font-bold text-teal-500">${formatear(resultado.totalRaw)}</p>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Monto:</span>
              <span className="font-semibold">${formatear(resultado.monto)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Interés:</span>
              <span className="font-semibold">${formatear(resultado.totalRaw - resultado.monto)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Cuota:</span>
              <span className="font-semibold">${formatear(resultado.cuotaRaw)}</span>
            </div>
          </div>

          <p className="text-sm font-semibold mb-1" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
            📋 Copiar:
          </p>

          <div className="flex flex-col gap-1 mb-2">
            <div 
              className={`flex-1 rounded-lg p-2 transition-all cursor-pointer ${
                redondeoSeleccionado === "exacto" ? "ring-2 ring-teal-500" : ""
              }`}
              style={{ backgroundColor: isDark ? 'rgba(40,40,40,0.8)' : '#f3f4f6' }}
              onClick={() => setRedondeoSeleccionado("exacto")}
            >
              <p className="text-sm font-semibold">🎯 Exacto</p>
              <p className="text-sm font-bold text-teal-400">${formatear(resultado.cuotaRaw)}</p>
              <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Total: ${formatear(resultado.totalRaw)}</p>
            </div>

            <div 
              className={`flex-1 rounded-lg p-2 transition-all cursor-pointer ${
                redondeoSeleccionado === "100" ? "ring-2 ring-teal-500" : ""
              }`}
              style={{ backgroundColor: isDark ? 'rgba(40,40,40,0.8)' : '#f3f4f6' }}
              onClick={() => setRedondeoSeleccionado("100")}
            >
              <p className="text-sm font-semibold">📋 $100</p>
              <p className="text-sm font-bold text-teal-400">${formatear(resultado.cuota100)}</p>
              <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Total: ${formatear(resultado.total100)}</p>
            </div>

            <div 
              className={`flex-1 rounded-lg p-2 transition-all cursor-pointer ${
                redondeoSeleccionado === "500" ? "ring-2 ring-teal-500" : ""
              }`}
              style={{ backgroundColor: isDark ? 'rgba(40,40,40,0.8)' : '#f3f4f6' }}
              onClick={() => setRedondeoSeleccionado("500")}
            >
              <p className="text-sm font-semibold">📋 $500</p>
              <p className="text-sm font-bold text-teal-400">${formatear(resultado.cuota500)}</p>
              <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Total: ${formatear(resultado.total500)}</p>
            </div>
          </div>

          <button
            onClick={() => copiarMensaje(redondeoSeleccionado)}
            className={`w-full py-2.5 rounded-lg font-semibold transition-all text-sm ${
              copiado 
                ? "bg-green-500 text-white" 
                : "bg-teal-500 hover:bg-teal-600 text-white"
            }`}
          >
            {copiado ? "✅ Copiado!" : `📋 Copiar (${redondeoSeleccionado === "exacto" ? "Exacto" : redondeoSeleccionado === "100" ? "$100" : "$500"})`}
          </button>
        </div>
      )}
    </div>
  );
};