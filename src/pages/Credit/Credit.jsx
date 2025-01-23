import React, { useRef, useState } from "react";
import "./Credit.css";
import { ButtonVolver } from "../../components/ButtonVolver";
import { Link } from "react-router-dom";
import { DescriptionCredit } from "./DescriptionCredit";
import { Folleto } from "./Folleto";
import ReactToPrint from "react-to-print";

const TABLA = [
  {
    credito: 100000,
    creditoStr: "100.000",
    dias: [
      { dias: 20, valorPorDia: 6000 },
      { dias: 25, valorPorDia: 5000 },
      { dias: 33, valorPorDia: 4000 },
      { dias: 50, valorPorDia: 3000 },
    ],
  },
  {
    credito: 200000,
    creditoStr: "200.000",
    dias: [
      { dias: 20, valorPorDia: 12000 },
      { dias: 25, valorPorDia: 10000 },
      { dias: 33, valorPorDia: 8000 },
      { dias: 50, valorPorDia: 6000 },
    ],
  },
  {
    credito: 250000,
    creditoStr: "250.000",
    dias: [
      { dias: 20, valorPorDia: 15000 },
      { dias: 25, valorPorDia: 12500 },
      { dias: 33, valorPorDia: 10000 },
      { dias: 50, valorPorDia: 7500 },
    ],
  },
  {
    credito: 400000,
    creditoStr: "400.000",

    dias: [
      { dias: 20, valorPorDia: 24000 },
      { dias: 25, valorPorDia: 20000 },
      { dias: 33, valorPorDia: 16000 },
      { dias: 50, valorPorDia: 12000 },
    ],
  },
  {
    credito: 500000,
    creditoStr: "500.000",
    dias: [
      { dias: 20, valorPorDia: 30000 },
      { dias: 25, valorPorDia: 25000 },
      { dias: 33, valorPorDia: 20000 },
      { dias: 50, valorPorDia: 15000 },
    ],
  },
  {
    credito: 1000000,
    creditoStr: "1.000.000",
    dias: [
      { dias: 20, valorPorDia: 60000 },
      { dias: 25, valorPorDia: 50000 },
      { dias: 33, valorPorDia: 40000 },
      { dias: 50, valorPorDia: 30000 },
    ],
  },
  {
    credito: 1500000,
    creditoStr: "1.500.000",
    dias: [
      { dias: 20, valorPorDia: 90000 },
      { dias: 25, valorPorDia: 75000 },
      { dias: 33, valorPorDia: 60000 },
      { dias: 50, valorPorDia: 45000 },
    ],
  },
];

const TABLASEMANAL = [
  {
    credito: 100000,
    creditoStr: "100.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 40000,
      },
      {
        semanasTot: 4,
        montosSemanales: 31250,
      },
      {
        semanasTot: 5,
        montosSemanales: 26400,
      },
      {
        semanasTot: 8,
        montosSemanales: 18750,
      },
    ],
  },
  {
    credito: 200000,
    creditoStr: "200.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 80000,
      },
      {
        semanasTot: 4,
        montosSemanales: 62500,
      },
      {
        semanasTot: 5,
        montosSemanales: 52800,
      },
      {
        semanasTot: 8,
        montosSemanales: 37500,
      },
    ],
  },
  {
    credito: 250000,
    creditoStr: "250.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 100000,
      },
      {
        semanasTot: 4,
        montosSemanales: 78125,
      },
      {
        semanasTot: 5,
        montosSemanales: 66000,
      },
      {
        semanasTot: 8,
        montosSemanales: 46875,
      },
    ],
  },
  {
    credito: 400000,
    creditoStr: "400.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 160000,
      },
      {
        semanasTot: 4,
        montosSemanales: 125000,
      },
      {
        semanasTot: 5,
        montosSemanales: 105600,
      },
      {
        semanasTot: 8,
        montosSemanales: 62500,
      },
    ],
  },
  {
    credito: 500000,
    creditoStr: "500.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 200000,
      },
      {
        semanasTot: 4,
        montosSemanales: 156250,
      },
      {
        semanasTot: 5,
        montosSemanales: 132000,
      },
      {
        semanasTot: 8,
        montosSemanales: 93750,
      },
    ],
  },
  {
    credito: 1000000,
    creditoStr: "1.000.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 400000,
      },
      {
        semanasTot: 4,
        montosSemanales: 312500,
      },
      {
        semanasTot: 5,
        montosSemanales: 264000,
      },
      {
        semanasTot: 8,
        montosSemanales: 187500,
      },
    ],
  },
  {
    credito: 1500000,
    creditoStr: "1.500.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 600000,
      },
      {
        semanasTot: 4,
        montosSemanales: 468750,
      },
      {
        semanasTot: 5,
        montosSemanales: 396000,
      },
      {
        semanasTot: 8,
        montosSemanales: 281250,
      },
    ],
  },
];

const casilleros = [];
for (let i = 1; i <= 33; i++) {
  casilleros.push(
    <div
      key={i}
      className="
      flex font-semibold text-base
      gap-1
      "
    >
      <div className="border-2 border-gray-600 w-[38%] h-[3.5em]"></div>
      <div className="flex items-center justify-center w-[10%] border-2 border-gray-600 h-[3.5em] text-center">
        {i}
      </div>
      <div className="border-2 border-gray-600 w-[57%] h-[3.5em]"></div>
    </div>
  );
}

export function Credit() {
  const creditsPDFRef = useRef();
  const cartonsitoPDFRef = useRef();
  const [modePay, setModePay] = useState(true); //true -diary- false -week-

  function changeModePay() {
    setModePay((prev) => !prev);
  }

  return (
    <div>
      {/*       <div className="w-[89%] mx-auto bg-yellow-400">
        <Link to="/">
          <ButtonVolver></ButtonVolver>
        </Link>
      </div> */}

      <div className="flex flex-col lg:flex-row justify-center gap-7 ">
        <div
          ref={creditsPDFRef}
          className="
            flex 
          bg-green-300"
        >
          <Folleto
            TABLA={TABLA}
            TABLASEMANAL={TABLASEMANAL}
            changeModePay={changeModePay}
            modePay={modePay}
          />
        </div>

        <DescriptionCredit />
      </div>

      <hr className="mt-6 mb-6" />
      <div className="flex flex-col gap-3 lg:flex-row">
        <div
          ref={cartonsitoPDFRef}
          className=" w-full items-center bg-white text-black text-center"
        >
          <div className="">
            <h1
              style={{
                background: `linear-gradient(90deg, rgba(238,237,235,1) 54%, rgba(45,45,45,0.8127626050420168) 98%)`,
              }}
              className=" text-xl p-3 font-semibold"
            >
              Financiación
            </h1>
            <div className="grid grid-cols-2 w-[99%] mx-auto  p-2 font-bold text-start">
              <div className="flex">
                <img
                className="h-[1.3em] w-[1.3em] mr-1"
                  src="/user.png"
                >
                </img>
                <h1>CLIENTE: </h1>

              </div>
              <h1>CUOTAS: </h1>
              <div className="flex">
                <img
                className="h-[1.3em] w-[1.3em] mr-1"
                  src="/calendar.png"
                >
                </img>
                <h1>FECHA INICIO: </h1>
              </div>
              <h1>IMPORTE CUOTA: </h1>
              <div className="flex">
                <img
                className="h-[1.3em] w-[1.3em] mr-1"
                  src="/calendar.png"
                >
                </img>
                <h1>FECHA VENC.: </h1>
              </div>
            </div>
          </div>

          {/*------------ CASILLEROS-------------------- */}
          <div className="w-[99%] mx-auto mt-2  grid grid-cols-3 gap-3 bg-white text-black">
            {casilleros.map((casillero) => {
              return <>{casillero}</>;
            })}
          </div>

          <hr
            style={{
              background: `linear-gradient(90deg, rgba(238,237,235,1) 54%, rgba(45,45,45,0.8127626050420168) 98%)`,
            }}
            className="mt-5 p-3 "
          />
        </div>
        <div className="w-[60%] ml-2 flex flex-col">
          <div className="flex">
            <div className="w-1/2 mb-2 bg-teal-500 bg-opacity-30 lg:rounded-sm rounded-xl p-2 transform transition-transform duration-300 ease-in-out hover:scale-110">
              <ReactToPrint
                trigger={() => <button>Guardar como PDF</button>}
                content={() => creditsPDFRef.current}
              />
            </div>
            <p>Volante PDF</p>
          </div>

          <div className="flex">
            <div className="w-1/2 bg-teal-500 bg-opacity-30 lg:rounded-sm rounded-xl p-2 transform transition-transform duration-300 ease-in-out hover:scale-110">
              <ReactToPrint
                trigger={() => <button>Guardar como PDF</button>}
                content={() => cartonsitoPDFRef.current}
              />
            </div>
            <p>Financiación PDF</p>
          </div>
        </div>
      </div>

      <hr className="mt-6 mb-6" />
    </div>
  );
}
