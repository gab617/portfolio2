import React, { useState, useContext, useEffect } from "react";
import { CalculadoraInteres } from "./components/CalculadoraInteres";
import { Context } from "../../Context/Context";

const STORAGE_KEY = 'nwPortf_calc_dinamica';

export const Calculadora = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  
  const PORCENTAJE_INICIAL = 1.1667;
  
  // Cargar porcentaje desde localStorage al iniciar
  const [porcentajeDinamico, setPorcentajeDinamico] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseFloat(saved) : PORCENTAJE_INICIAL;
  });

  // Guardar porcentaje en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, porcentajeDinamico.toString());
  }, [porcentajeDinamico]);

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
    <div className="flex flex-col lg:flex-row justify-evenly gap-3 lg:gap-4">
      {/* Calculadora 1% Fijo */}
      <div 
        className="rounded-xl overflow-hidden flex-1"
        style={{ 
          backgroundColor: isDark ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.8)',
          border: `2px solid ${isDark ? 'rgba(20,184,166,0.3)' : 'rgba(20,184,166,0.2)'}`
        }}
      >
        <div 
          className="p-1.5"
          style={{ backgroundColor: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.1)' }}
        >
          <h2 className="font-bold text-teal-500">📊 Fija 1%</h2>
          <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Tasa estándar</p>
        </div>
        <CalculadoraInteres titulo="Calculadora" porcentaje={1} />
      </div>

      {/* Separador visual en móvil */}
      <div className="lg:hidden h-px my-1" style={{ backgroundColor: isDark ? '#374151' : '#e5e7eb' }} />

      {/* Calculadora Dinámica */}
      <div 
        className="rounded-xl overflow-hidden flex-1"
        style={{ 
          backgroundColor: isDark ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.8)',
          border: `2px solid ${isDark ? 'rgba(249,115,22,0.3)' : 'rgba(249,115,22,0.2)'}`
        }}
      >
        <div 
          className="p-1.5"
          style={{ backgroundColor: isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.1)' }}
        >
          <h2 className="font-bold text-orange-500">⚙️ Dinámica</h2>
          <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Personaliza tasa</p>
        </div>
        
        <div className="p-1">
          <div className="flex flex-wrap items-center gap-1 mb-2">
            <input
              type="number"
              step="0.0001"
              value={porcentajeDinamico}
              onChange={handleChangePorcentaje}
              className="w-16 px-1.5 py-1 rounded border text-xs text-gray-800 dark:text-gray-200 dark:bg-gray-700 bg-white"
              style={{ borderColor: isDark ? '#374151' : '#d1d5db' }}
            />
            <button
              onClick={handleResetPorcentaje}
              className="px-1.5 py-1 rounded border text-xs hover:bg-gray-300 dark:hover:bg-gray-500 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
              style={{ borderColor: isDark ? '#374151' : '#d1d5db' }}
            >
              35%
            </button>
          </div>
          
          <button
            onClick={handleSet40Porciento}
            className="w-full mb-2 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 text-white font-bold text-xs transition-all"
          >
            ⚡ 40% a 30 días
          </button>
             
          <div 
            className="p-1 rounded-lg text-xs"
            style={{ backgroundColor: isDark ? 'rgba(20,100,80,0.2)' : 'rgba(20,184,166,0.1)' }}
          >
            <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>30 días: </span>
            <span className="font-bold text-teal-500">{porcentaje30Dias}%</span>
          </div>

          <CalculadoraInteres
            titulo={`${Number(porcentajeDinamico).toFixed(4)}%`}
            porcentaje={porcentajeDinamico}
          />
        </div>
      </div>
    </div>
  );
};