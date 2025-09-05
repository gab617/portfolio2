import React, { useState } from "react";
import { TABLA_REDONDEADA_116_REDONDEADA } from "../tablas";

export const CalculadoraInteligente = () => {
  const [monto, setMonto] = useState("");
  const [dias, setDias] = useState("");
  const [totalPagar, setTotalPagar] = useState(null);
  const [cuotaDiaria, setCuotaDiaria] = useState(null);
  const [diasSugeridos, setDiasSugeridos] = useState([]);
  const [fuente, setFuente] = useState(""); // "tabla" o "calculadora"

  const DIAS_REDONDOS = [20, 25, 30, 35, 40, 45, 50];

  const calcularPrestamo = (e = null, diasSeleccionado = null, montoInput = null) => {
    e?.preventDefault();

    const montoNum = parseFloat(montoInput || monto);
    const diasNum = diasSeleccionado || parseInt(dias, 10);

    if (isNaN(montoNum) || isNaN(diasNum) || montoNum <= 0 || diasNum <= 0) {
      alert("Por favor ingresa valores válidos para monto y días.");
      return;
    }

    // Intentamos buscar en la tabla
    const creditoObj = TABLA_REDONDEADA_116_REDONDEADA.find(c => c.credito === montoNum);
    let resultado;

    if (creditoObj) {
      const diaObj = creditoObj.dias.find(d => d.dias === diasNum);
      if (diaObj) {
        resultado = { cuota: diaObj.valorPorDia, total: diaObj.total };
        setFuente("tabla");
      }
    }

    // Si no está en la tabla → calculadora aproximada
    if (!resultado) {
      const interesDiario = 0.0116; // ≈ 35% mensual
      const total = montoNum * (1 + interesDiario * diasNum);
      const cuota = Math.ceil(total / diasNum / 100) * 100; // redondea a centenas
      resultado = { cuota, total: cuota * diasNum };
      setFuente("calculadora");
    }

    setTotalPagar(resultado.total);
    setCuotaDiaria(resultado.cuota);

    // Sugerencias de días redondos
    const sugeridos = DIAS_REDONDOS.map(d => {
      let diaResultado;
      if (creditoObj) {
        const diaObj = creditoObj.dias.find(item => item.dias === d);
        if (diaObj) {
          diaResultado = { dias: d, cuota: diaObj.valorPorDia, total: diaObj.total, fuente: "tabla" };
        }
      }
      if (!diaResultado) {
        const interesDiario = 0.0116;
        const total = montoNum * (1 + interesDiario * d);
        const cuota = Math.ceil(total / d / 100) * 100;
        diaResultado = { dias: d, cuota, total: cuota * d, fuente: "calculadora" };
      }
      return diaResultado;
    });
    setDiasSugeridos(sugeridos);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setMonto("");
    setDias("");
    setTotalPagar(null);
    setCuotaDiaria(null);
    setDiasSugeridos([]);
    setFuente("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 font-bold text-xl text-black">
      <form onSubmit={calcularPrestamo} className="w-full sm:w-1/2 border rounded p-4 shadow-md text-white">
        <h2 className="text-2xl mb-3 text-white">Calculadora Inteligente</h2>
        <p className="mb-2 text-white">
          Ingresa cualquier monto y días. La calculadora sugerirá plazos “redondos” y redondeará automáticamente la cuota diaria y total hacia arriba.
        </p>

        <div className="mb-3 text-black">
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Ingresa el monto"
            className="w-full block rounded-md py-1.5 px-2 ring-1 ring-gray-400 text-black"
          />
        </div>

        <div className="mb-3 text-black">
          <input
            type="number"
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            placeholder="Cantidad de días"
            className="w-full block rounded-md py-1.5 px-2 ring-1 ring-gray-400 text-black"
          />
        </div>

        <div className="flex gap-2 mb-2">
          <button type="submit" className="py-2 border w-2/3 font-semibold hover:bg-gray-500 transition text-white">Calcular</button>
          <button onClick={handleClear} className="w-1/3 border border-red-600 hover:bg-red-400 transition text-white">Borrar</button>
        </div>
      </form>

      <div className="w-full sm:w-1/2 border rounded p-4 shadow-md text-white">
        {totalPagar && cuotaDiaria ? (
          <>
            <h3 className="text-xl mb-2 text-white">Resultados</h3>
            {dias && (
              <p>
                Para <span className="text-yellow-500">${monto}</span> a <span className="text-yellow-500">{dias}</span> días:
              </p>
            )}
            <p>
              Total a Pagar: <span className="text-green-500">${totalPagar.toLocaleString()}</span>
            </p>
            <p>
              Cuota Diaria: <span className="text-green-500">${cuotaDiaria.toLocaleString()}</span>
            </p>
            <p className="text-gray-500 mt-2">
              🔹 {fuente === "tabla" ? "Valores exactos de la tabla." : "Valores aproximados calculados y redondeados a centenas para números simples."}
            </p>

            <h4 className="mt-4 text-lg text-white">Sugerencias de días “redondos”</h4>
            <div className="mt-2 space-y-1">
              {diasSugeridos.map((d) => (
                <div
                  key={d.dias}
                  className={`flex justify-between p-2 rounded cursor-pointer hover:bg-gray-100 text-black ${d.fuente === "tabla" ? "bg-yellow-100" : "bg-white"}`}
                  onClick={() => calcularPrestamo(null, d.dias)}
                >
                  <span>{d.dias} días</span>
                  <span>Cuota: ${d.cuota.toLocaleString()}</span>
                  <span>Total: ${d.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 ">Los resultados se mostrarán aquí.</p>
        )}
      </div>
    </div>
  );
};
