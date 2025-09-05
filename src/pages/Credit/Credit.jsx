import React, { useRef, useState } from "react";
import "./Credit.css";
import { ButtonVolver } from "../../components/ButtonVolver";
import { Link } from "react-router-dom";
import { DescriptionCredit } from "./DescriptionCredit";
import { Folleto } from "./Folleto";
import ReactToPrint from "react-to-print";
import { Calculadora } from "./Calculadora";
import {
  TABLA,
  TABLASEMANAL,
  TABLA_REDONDEADA_116_NO_REDONDEADA,
  TABLA_REDONDEADA_116_REDONDEADA,
} from "./tablas";
import { ListadoValores116 } from "./components/ListadoValores116";
import { CalculadoraInteligente } from "./components/CalculadoraInteligente";

const casilleros = [];
for (let i = 1; i <= 30; i++) {
  casilleros.push(
    <div
      key={i}
      className="
      flex font-semibold text-base
      gap-1
      "
    >
      <div className="border-2 border-gray-600 w-[38%] h-[3.8em]"></div>
      <div className="flex items-center justify-center w-[10%] border-2 border-gray-600 h-[3.8em] text-center">
        {i}
      </div>
      <div className="border-2 border-gray-600 w-[57%] h-[3.8em]"></div>
    </div>
  );
}

export function Credit() {
  const creditsPDFRef = useRef();
  const cartonsitoPDFRef = useRef();
  const [modePay, setModePay] = useState(true); //true -diary- false -week-
  const [usarRedondeada, setUsarRedondeada] = useState(true); // true = redondeada, false = no redondeada

  function changeModePay() {
    setModePay((prev) => !prev);
  }

  return (
    <div>
      <div className="w-[89%] mx-auto bg-yellow-400"></div>
      <div className="flex justify-between mt-3">
        <h1 className="text-center sm:text-xl font-bold">
          Recursos para empresa de créditos.
        </h1>
        <Link className="" to={"/cv"}>
          <ButtonVolver></ButtonVolver>
        </Link>
      </div>
      <hr className="mt-6 mb-6" />

      <hr className="mt-6 mb-6" />

      <div className="">
        <div className="">
          <Calculadora></Calculadora>
        </div>
      </div>
      <hr className="mt-6 mb-6" />

      <ListadoValores116 usarRedondeada={usarRedondeada} />

      <hr className="mt-6 mb-6" />
      {/*  <CalculadoraInteligente /> */}
      <hr className="mt-6 mb-6" />
      {/* Selector de estructura */}
      <div className="flex gap-2 justify-center mb-4">
        <button
          onClick={() => setUsarRedondeada(true)}
          className={`px-4 py-2 rounded font-semibold border ${
            usarRedondeada ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Redondeada
        </button>
        <button
          onClick={() => setUsarRedondeada(false)}
          className={`px-4 py-2 rounded font-semibold border ${
            !usarRedondeada ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          No Redondeada
        </button>
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-7 ">
        <div ref={creditsPDFRef} className="flex bg-white">
          <Folleto
            TABLA={
              usarRedondeada
                ? TABLA_REDONDEADA_116_REDONDEADA
                : TABLA_REDONDEADA_116_NO_REDONDEADA
            }
            TABLASEMANAL={TABLASEMANAL}
            changeModePay={changeModePay}
            modePay={modePay}
            usarRedondeada={usarRedondeada} // pasamos también la info al Folleto
          />
        </div>

        {/* <DescriptionCredit /> */}

        <div className="flex flex-col gap-3 lg:flex-row">
          <div
            ref={cartonsitoPDFRef}
            className=" w-full items-center bg-white text-black text-center"
            style={{
              fontFamily: "'Lato',serif",
            }}
          >
            <div className="" style={{}}>
              <h1
                style={{
                  background: `linear-gradient(90deg, rgba(238,237,235,1) 54%, rgba(45,45,45,0.8127626050420168) 98%)`,
                }}
                className=" text-xl p-5 font-semibold mb-2"
              >
                FINANCIACIÓN
              </h1>
              <div className="flex w-[99%]  p-1 font-bold text-start">
                <div className="grid grid-cols-2 w-[80%]">
                  <div className="flex">
                    <img
                      className="h-[1.3em] w-[1.3em] mr-1"
                      src="/user.png"
                    ></img>
                    <h1>CLIENTE: </h1>
                  </div>
                  <h1>CUOTAS: </h1>
                  <div className="flex">
                    <img
                      className="h-[1.3em] w-[1.3em] mr-1"
                      src="/calendar.png"
                    ></img>
                    <h1>FECHA INICIO: </h1>
                  </div>
                  <h1>IMPORTE CUOTA: </h1>
                  <div className="flex">
                    <img
                      className="h-[1.3em] w-[1.3em] mr-1"
                      src="/calendar.png"
                    ></img>
                    <h1>FECHA VENC.: </h1>
                  </div>
                </div>

                <div className="mx-auto w-[20%]">
                  <img
                    className="w-[100%] mx-auto rounded-full"
                    src="/creditsmedia/logo4.png"
                  ></img>
                </div>
              </div>
            </div>

            {/*------------ CASILLEROS-------------------- */}
            <div className="w-[99%] mx-auto mt-2  grid grid-cols-3 gap-3 bg-white text-black">
              {casilleros.map((casillero) => {
                return <>{casillero}</>;
              })}
            </div>

            <div className="mt-5 w-[10%] mx-auto">
              <img className="" src="/creditsmedia/plants.png"></img>
            </div>

            <hr
              style={{
                background: `linear-gradient(90deg, rgba(238,237,235,1) 54%, rgba(45,45,45,0.8127626050420168) 98%)`,
              }}
              className="mt-5 p-4 "
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-evenly w-full sm:flex-row py-2 mx-auto gap-2 text-center">
          <div className="flex flex-col sm:flex-row ">
            <div className=" bg-teal-500 bg-opacity-30 lg:rounded-sm rounded-xl p-2 transform transition-transform duration-300 ease-in-out hover:scale-110">
              <ReactToPrint
                trigger={() => <button>Guardar como PDF</button>}
                content={() => creditsPDFRef.current}
              />
            </div>
            <p>Volante PDF</p>
          </div>

          <div className="flex flex-col sm:flex-row ">
            <div className=" bg-teal-500 bg-opacity-30 lg:rounded-sm rounded-xl p-2 transform transition-transform duration-300 ease-in-out hover:scale-110">
              <ReactToPrint
                trigger={() => <button>Guardar como PDF</button>}
                content={() => cartonsitoPDFRef.current}
              />
            </div>
            <p>Financiación PDF</p>
          </div>
        </div>
      </div>
    </div>
  );
}
