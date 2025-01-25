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

  const handleClear = (e) => {
    e.preventDefault()
    setMonto("")
    setDias("")
    setTotalPagar("")
    setCuotaDiaria("")
  };

  const handleChangeMonto=(valor)=>{
    
    setMonto(valor)

  }

  return (
    <div className="flex flex-col sm:flex-row font-bold text-xl">
      <form onSubmit={calcularPrestamo}>
        <h2>Calculadora de Préstamo 1% diario</h2>
        <div className="text-black">
          <p className="text-yellow-500">Monto $$</p>

          <input
            className="w-full block rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
            type="number"
            value={monto}
            onChange={(e) => handleChangeMonto(e.target.value)}
            placeholder="Ingresa el monto total"
          />
        </div>
        <div className="text-black">
          <p className="text-yellow-500">Días</p>
          <input
            className="w-full block  rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-800 focus:text-gray-800"
            type="number"
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            placeholder="Cantidad de días"
          />
        </div>
        <div className="flex gap-2">
          <button
            className="py-2 border mt-2 w-[65%] cursor-pointer hover:bg-white hover:text-black  font-semibold"
            type="submit"
          >
            Calcular
          </button>
          <button onClick={handleClear} className="w-[35%] border-red-600 border-2 mt-2 hover:bg-red-400">
            Borrar
          </button>
        </div>
        <p>{monto.toString().toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
      </form>
      {monto && totalPagar && cuotaDiaria && (
        <div className="sm:ml-6 mt-2">
          <p>
            Para{" "}
            <span className="text-yellow-500">
              ${monto.toString().toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>{" "}
            a <span className="text-yellow-500">{dias}</span> días
          </p>
          <p>
            Total a Pagar:{" "}
            <span className="text-green-500">
              ${totalPagar.toString().toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>
          </p>
          <p>
            Cuota Diaria: <span className="text-green-500">${cuotaDiaria.toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
          </p>
        </div>
      )}
    </div>
  );
};
