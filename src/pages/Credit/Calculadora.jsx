import React, { useState, useContext } from "react";
import { CalculadoraInteres } from "./components/CalculadoraInteres";
import { Context } from "../../Context/Context";

export const Calculadora = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  
  const PORCENTAJE_INICIAL = 1.1667;
  const [porcentajeDinamico, setPorcentajeDinamico] = useState(PORCENTAJE_INICIAL);

  const handleChangePorcentaje = (e) => {
    setPorcentajeDinamico(parseFloat(e.target.value) || 0);
  };

  const handleResetPorcentaje = () => {
    setPorcentajeDinamico(PORCENTAJE_INICIAL);
  };

  // Setear 40% a 30 días (40/30 = 1.3333% diario)
  const handleSet40Porciento = () => {
    setPorcentajeDinamico(40 / 30);
  };

  // Calcular porcentaje total a 30 días
  const porcentaje30Dias = Math.round(porcentajeDinamico * 30 * 100) / 100;

  return (
    <div className="flex flex-col lg:flex-row justify-evenly gap-6">
      {/* Calculadora 1% Fijo */}
      <div 
        className="rounded-xl overflow-hidden flex-1"
        style={{ 
          backgroundColor: isDark ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.8)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
        }}
      >
        <div 
          className="p-3"
          style={{ backgroundColor: isDark ? 'rgba(40,40,40,0.9)' : '#f3f4f6' }}
        >
          <h2 className="font-bold">📊 Préstamo 1% diario</h2>
          <p className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Tasa fija estándar</p>
        </div>
        <CalculadoraInteres titulo="Calculadora" porcentaje={1} />
      </div>

      {/* Calculadora Dinámica */}
      <div 
        className="rounded-xl overflow-hidden flex-1"
        style={{ 
          backgroundColor: isDark ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.8)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
        }}
      >
        <div 
          className="p-3"
          style={{ backgroundColor: isDark ? 'rgba(40,40,40,0.9)' : '#f3f4f6' }}
        >
          <h2 className="font-bold">⚙️ Calculadora Dinámica</h2>
          <p className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Personaliza la tasa de interés</p>
        </div>
        
        <div className="p-1 lg:p-4">
          <div className="flex items-center  gap-3 mb-4">
            <label className="text-sm font-medium">Tasa % diario:</label>
            <input
              type="number"
              step="0.01"
              value={porcentajeDinamico}
              onChange={handleChangePorcentaje}
              className="w-24 px-3 py-2 rounded border text-gray-800 dark:text-gray-200 dark:bg-gray-700 bg-white"
              style={{ borderColor: isDark ? '#374151' : '#d1d5db' }}
            />
            <button
              onClick={handleResetPorcentaje}
              className="px-3  rounded border text-sm hover:bg-gray-300 dark:hover:bg-gray-500 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
              style={{ borderColor: isDark ? '#374151' : '#d1d5db' }}
            >
              Reset 35%
            </button>
                      {/* Botón set 40% - más separado e interactivo */}
          <div className="">
            <button
              onClick={handleSet40Porciento}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 relative overflow-hidden"
            >
              <span className="text-lg relative z-10">40% a 30 días</span>
            </button>
       
          </div>
            
          </div>
                    <div 
            className="mb-4 p-3 rounded-lg text-sm"
            style={{ backgroundColor: isDark ? 'rgba(20,100,80,0.2)' : 'rgba(20,184,166,0.1)' }}
          >
            <p>
              <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Porcentaje a calcular estimado a 30 días:</span>{" "}
              <span className="font-bold text-teal-500">{porcentaje30Dias}%</span>
            </p>
          </div>





          <CalculadoraInteres
            titulo={`Tasa ${Number(porcentajeDinamico).toFixed(2)}%`}
            porcentaje={porcentajeDinamico}
          />
        </div>
      </div>
    </div>
  );
};