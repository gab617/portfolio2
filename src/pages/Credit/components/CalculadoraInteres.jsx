import React, { useState } from "react";

export const CalculadoraInteres = ({ titulo, porcentaje }) => {
  const [monto, setMonto] = useState("");
  const [dias, setDias] = useState("");
  const [totalPagar, setTotalPagar] = useState(null);
  const [cuotaDiaria, setCuotaDiaria] = useState(null);

  const calcularPrestamo = (e) => {
    e.preventDefault();

    const montoNumerico = parseFloat(monto);
    let diasNumerico = parseInt(dias, 10);

    if (
      isNaN(montoNumerico) ||
      isNaN(diasNumerico) ||
      montoNumerico <= 0 ||
      diasNumerico <= 0
    ) {
      alert("Por favor, ingresa valores válidos para el monto y los días.");
      return;
    }

    const interesDecimal = porcentaje / 100;

    const total = montoNumerico * (1 + interesDecimal * diasNumerico);
    const cuota = total / diasNumerico;

    setTotalPagar(total.toFixed(2));
    setCuotaDiaria(cuota.toFixed(2));
  };

  const handleClear = (e) => {
    e.preventDefault();
    setMonto("");
    setDias("");
    setTotalPagar(null);
    setCuotaDiaria(null);
  };

  const formatearDinero = (valor) => {
    return valor
      .toString()
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-xl p-6 m-4 max-w-md mx-auto">
      <form onSubmit={calcularPrestamo} className="w-full">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{titulo}</h2>
        <p className="text-sm mb-4 text-gray-500">
          Interés: <span className="font-semibold">{porcentaje}% diario</span>
        </p>

        <div className="mb-4">
          <input
            className="w-full rounded-lg py-2 px-3 border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Ingresa el monto total"
          />
        </div>

        <div className="mb-4">
          <input
            className="w-full rounded-lg py-2 px-3 border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            placeholder="Cantidad de días"
          />
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            type="submit"
          >
            Calcular
          </button>
          <button
            onClick={handleClear}
            className="flex-1 py-2 rounded-lg border-2 border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-colors"
          >
            Borrar
          </button>
        </div>
      </form>

      {totalPagar && cuotaDiaria && (
        <div className="mt-6 sm:ml-6 sm:mt-0 w-full bg-gray-50 rounded-lg p-4 shadow-inner">
          <p className="mb-2 text-gray-700">
            Para{" "}
            <span className="text-blue-600 font-semibold">
              ${formatearDinero(monto)}
            </span>{" "}
            a{" "}
            <span className="text-blue-600 font-semibold">{dias}</span> días
          </p>
          <p className="mb-1 text-gray-700">
            Total a Pagar:{" "}
            <span className="text-green-600 font-semibold">
              ${formatearDinero(totalPagar)}
            </span>
          </p>
          <p className="text-gray-700">
            Cuota Diaria:{" "}
            <span className="text-green-600 font-semibold">
              ${formatearDinero(cuotaDiaria)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
