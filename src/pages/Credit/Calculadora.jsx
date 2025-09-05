import React, { useState } from "react";
import { CalculadoraInteres } from "./components/CalculadoraInteres";

export const Calculadora = () => {
  const PORCENTAJE_INICIAL = 1.1667; // valor inicial
  const [porcentajeDinamico, setPorcentajeDinamico] = useState(PORCENTAJE_INICIAL);

  const handleChangePorcentaje = (e) => {
    setPorcentajeDinamico(parseFloat(e.target.value));
  };

  const handleResetPorcentaje = () => {
    setPorcentajeDinamico(PORCENTAJE_INICIAL);
  };

  // Calcular porcentaje total a 30 días
  const porcentaje30Dias = Math.round(porcentajeDinamico * 30 * 100) / 100; // opcional: redondeo a 2 decimales

  return (
    <div className="p-1 flex flex-col sm:flex-row justify-evenly gap-4">
      {/* Calculadoras Fijas */}
      <div className="grid">
        <CalculadoraInteres titulo="Préstamo 1% diario" porcentaje={1} />
      </div>

      {/* Calculadora Dinámica */}
      <div className="border p-4">
        <h2 className="font-bold text-xl mb-2">Calculadora Dinámica</h2>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            step="0.01"
            value={porcentajeDinamico}
            onChange={handleChangePorcentaje}
            className="w-[120px] px-2 py-1 border rounded text-black"
          />
          <button
            onClick={handleResetPorcentaje}
            className="px-2 py-1 border rounded cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Mostrar porcentaje total a 30 días */}
        <p className="mb-2 text-white">
          Porcentaje estimado a 30 días: <span className="font-semibold">{porcentaje30Dias}%</span>
        </p>

        <CalculadoraInteres
          titulo={`Préstamo ${porcentajeDinamico}% diario`}
          porcentaje={porcentajeDinamico}
        />
      </div>
    </div>
  );
};
