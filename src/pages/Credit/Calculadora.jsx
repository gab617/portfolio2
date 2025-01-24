import React, { useState } from "react";

export const Calculadora = () => {
  const [monto, setMonto] = useState("");
  const [dias, setDias] = useState("");
  const [totalPagar, setTotalPagar] = useState(null);
  const [cuotaDiaria, setCuotaDiaria] = useState(null);

  const calcularPrestamo = (e) => {
    e.preventDefault();

    const montoNumerico = parseFloat(monto);
    const diasNumerico = parseInt(dias, 10);

    if (
      isNaN(montoNumerico) ||
      isNaN(diasNumerico) ||
      montoNumerico <= 0 ||
      diasNumerico <= 0
    ) {
      alert("Por favor, ingresa valores válidos para el monto y los días.");
      return;
    }

    const interesDiario = 0.01;
    const total = montoNumerico * (1 + interesDiario * diasNumerico);
    const cuota = total / diasNumerico;

    setTotalPagar(total.toFixed(2));
    setCuotaDiaria(cuota.toFixed(2));
  };

  return (
    <div className="flex text-xl">
      <form onSubmit={calcularPrestamo}>
        <h2>Calculadora de Préstamo 1% diario</h2>
        <div className="text-black">
          <p className="text-white">Monto $$</p>

          <input
            className="block rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Ingresa el monto total"
          />
        </div>
        <div className="text-black">
          <p className="text-white">Días</p>
          <input
            className="block  rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-800 focus:text-gray-800"
            type="number"
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            placeholder="Cantidad de días"
          />
        </div>
        <button
          className="py-2 border mt-2 w-full cursor-pointer hover:bg-white hover:text-black  font-semibold"
          type="submit"
        >
          Calcular
        </button>
      </form>
      {totalPagar && cuotaDiaria && (
        <div className="ml-6">
          <h3>Resultados:</h3>
          <p>{monto}</p>
          <p>Total a Pagar: ${totalPagar}</p>
          <p>Cuota Diaria: ${cuotaDiaria}</p>
        </div>
      )}
    </div>
  );
};
