import React, { useState } from "react";
import {
  TABLA_REDONDEADA_116_REDONDEADA,
  TABLA_REDONDEADA_116_NO_REDONDEADA,
} from "../tablas";

export function ListadoValores116() {
  const [selectedCredito, setSelectedCredito] = useState(null);
  const [usarRedondeada, setUsarRedondeada] = useState(true); // true = redondeada, false = no redondeada

  // Elegimos la tabla según el estado
  const tablaActual = usarRedondeada
    ? TABLA_REDONDEADA_116_REDONDEADA
    : TABLA_REDONDEADA_116_NO_REDONDEADA;

  return (
    <div className="flex flex-col sm:flex-col sm:w-[98%] mx-auto sm:p-4 sm:gap-1">
      {/* Selector de tabla */}
      <div className="mb-4 sm:mb-0 sm:w-full flex gap-2 justify-center">
        <button
          onClick={() => setUsarRedondeada(true)}
          className={`px-4 py-2 border rounded ${
            usarRedondeada
              ? "border-white font-bold"
              : "border-black text-gray-300"
          }`}
        >
          Redondeada
        </button>
        <button
          onClick={() => setUsarRedondeada(false)}
          className={`px-4 py-2 border rounded ${
            !usarRedondeada
              ? "border-white font-bold"
              : "border-black text-gray-300"
          }`}
        >
          No Redondeada
        </button>
      </div>

      {/* Columna izquierda: lista de créditos */}
      <div className="flex flex-col sm:flex-row gap-1">
        <div className="sm:w-1/3 border rounded shadow-sm">
          <h2 className="text-xl font-bold mb-1">Créditos</h2>
          <div className="grid grid-cols-3">
            {tablaActual.map((item) => (
              <div
                key={item.credito}
                onClick={() => setSelectedCredito(item)}
                className={`cursor-pointer p-2 rounded transition ${
                  selectedCredito?.credito === item.credito
                    ? "bg-blue-100 font-semibold text-black"
                    : "hover:bg-gray-900"
                }`}
              >
                ${item.creditoStr}
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha: panel de detalles */}
        <div className="sm:w-2/3 border rounded-lg p-4 shadow-md bg-white text-black">
          {selectedCredito ? (
            <>
              <h2 className="text-xl font-bold mb-3">
                Opciones para ${selectedCredito.creditoStr}
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="text-left p-2 border">Días</th>
                      <th className="text-left p-2 border">Cuota</th>
                      <th className="text-left p-2 border">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCredito.dias.map((d) => (
                      <tr
                        key={d.dias}
                        className="bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                      >
                        <td className="p-2 border">{d.dias}</td>
                        <td className="p-2 border">
                          ${d.valorPorDia.toLocaleString()}
                        </td>
                        <td className="p-2 border">
                          ${(d.dias * d.valorPorDia).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-center p-4">
              Selecciona un crédito para ver sus opciones.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
