import React, { useRef, useState } from "react";
import { ButtonVolver } from "../../components/ButtonVolver";
import { Link } from "react-router-dom";

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

export function Credit() {
  const creditsPDFRef = useRef();
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
          <div className="w-[100%] h-[100%] text-black md:w-[680px] nd:h-[1000px] m-auto">
            <div className="flex w-[99%] sm:w-[95%] mx-auto">
              <div className="flex justify-between gap-10 w-[100%] mx-auto">
                <div className="w-[17%]">
                  <img src="/creditsmedia/money.png" alt="" />
                  <img src="/creditsmedia/handmoney.png" alt="" />
                </div>
                <div className="w-[45%] sm:w-[60%]">
                  <img
                    className="w-[60%] mx-auto"
                    src="/creditsmedia/logo.png"
                    alt=""
                  />
                  <h1 className="text-xl sm:text-4xl font-bold font-sans text-center">
                    !PEDÍ
                  </h1>
                  <h1 className="p-1 text-xl sm:text-4xl font-bold font-sans text-center bg-green-500">
                    TU PRESTAMO!
                  </h1>
                </div>
                <div className="w-[17%]">
                  <img src="/creditsmedia/handmoney.png" alt="" />
                  <img src="/creditsmedia/money.png" alt="" />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <div className="flex gap-3 text-xl">
                <button
                  className="p-2 border-2 border-black"
                  style={{
                    background: `${modePay ? "white" : ""}`,
                    border: `${
                      modePay ? "3px solid black" : "1px solid black"
                    }`,
                  }}
                  onClick={changeModePay}
                >
                  Diario
                </button>
                <button
                  className="p-2 border-2 border-black "
                  style={{
                    background: `${modePay ? "" : "white"}`,
                    border: `${
                      !modePay ? "3px solid black" : "1px solid black"
                    }`,
                  }}
                  onClick={changeModePay}
                >
                  Semanal
                </button>
              </div>
            </div>

            {/* DIARIO */}
            <div
              style={{
                display: `${modePay ? "block" : "none"}`,
              }}
              className="flex flex-col sm:text-xl mt-5 font-semibold"
            >
              <div className="flex w-full justify-between items-center mb-2">
                <h1 className="text-green-900 ml-1  sm:text-2xl font-bold">
                  CRÉDITO
                </h1>

                <div className="flex justify-between w-[81%]">
                  {TABLA[0].dias.map((dia) => {
                    return (
                      <div className="flex w-full justify-center">
                        <h1 className="text-start border-4 border-black border-dotted p-2">
                          A {dia.dias} DÍAS
                        </h1>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr className="border-green-600 w-[95%] mx-auto mb-5" />

              {TABLA.map((creditData) => {
                return (
                  <div>
                    <div className="h-auto flex w-full justify-between text-black">
                      <h1 className="sm:text-2xl text-blue-950 mr-3  ">
                        ${creditData.creditoStr}
                      </h1>
                      <div className="flex w-[81%] justify-between ">
                        {creditData.dias.map((dia) => {
                          return (
                            <div className=" flex flex-col sm:flex-row w-full justify-center">
                              <h1 className="text-start mr-1 sm:text-2xl text-green-950">
                                ${dia.valorPorDia}
                              </h1>
                              <p className="scale-75 sm:scale-100 sm:text-xs font-semibold text-green-950">
                                PAGO <br /> DIARIO
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <hr className="border-green-600 w-[95%] mx-auto mb-[2em]" />
                  </div>
                );
              })}
            </div>

            {/* SEMANAL */}
            <div
              style={{
                display: `${!modePay ? "block" : "none"}`,
              }}
              className="flex flex-col sm:text-xl mt-5 font-semibold"
            >
              <div className="flex w-full justify-between items-center mb-2">
                <h1 className="text-green-900 ml-1  text-xs sm:text-2xl font-bold">
                  CRÉDITO
                </h1>

                <div className="flex justify-between w-[81%]">
                  {TABLASEMANAL[0].semanas.map((semana) => {
                    return (
                      <div className="flex w-full justify-center">
                        <h1 className="text-xs sm:text-xl  sm:border-4 border-black border-2 border-dotted p-[0.2em] sm:p-2">
                          {semana.semanasTot} SEMANAS
                        </h1>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr className="border-green-600 w-[95%] mx-auto mb-5" />

              {TABLASEMANAL.map((creditData) => {
                return (
                  <div>
                    <div className="h-auto flex w-full justify-between text-black">
                      <h1 className="sm:text-2xl text-blue-950 mr-3  ">
                        ${creditData.creditoStr}
                      </h1>
                      <div className="flex w-[81%] justify-between">
                        {creditData.semanas.map((semana) => {
                          return (
                            <div className=" flex flex-col sm:flex-row w-full items-center justify-center">
                              <h1 className="text-start mr-1 sm:text-2xl text-green-950">
                                ${semana.montosSemanales}
                              </h1>
                              <p className="scale-75 sm:scale-100 sm:text-xs font-semibold text-green-950">
                                PAGO SEM
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <hr className="border-green-600 w-[95%] mx-auto mb-[2em]" />
                  </div>
                );
              })}
            </div>

            <div className="w-[70%] mx-auto mt-7">
              <img
                className="w-[15%]"
                src="/creditsmedia/wtsappimg.png"
                alt=""
              />
              <hr className="border-2 border-green-600 w-[100%] mx-auto mb-5" />
            </div>
          </div>
        </div>

        <div className="lg:w-[50%]">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600">Créditos</h1>
            <p className="text-lg text-gray-300 font-semibold  mt-2">
              Soluciones financieras rápidas, seguras y sin complicaciones.
            </p>
          </header>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <ul className="list-disc pl-6 text-lg">
              <li>
                Préstamos flexibles desde <strong>$100,000</strong> hasta{" "}
                <strong>$1,500,000</strong>.
              </li>
              <li>
                Plazos convenientes: <strong>20, 25, 33 o 50 días</strong>.
              </li>
              <li>
                Pagos diarios accesibles para que mantengas el control de tus
                finanzas.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
              Nuestra Filosofía
            </h2>
            <p className="text-gray-300 font-semibold  leading-relaxed">
              Queremos brindarte un servicio{" "}
              <strong>transparente y confiable</strong>, eliminando trámites
              innecesarios. Con nosotros, puedes obtener el dinero que necesitas
              de forma ágil, para que sigas adelante con tus planes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
              Sobre Nosotros
            </h2>
            <p className="text-gray-300 font-semibold  leading-relaxed">
              En <strong>Créditos</strong>, trabajamos para ayudarte a resolver
              tus necesidades financieras con rapidez y confianza. Ofrecemos
              préstamos personales diseñados para adaptarse a tus
              requerimientos, con opciones flexibles y pagos diarios que se
              ajustan a tu presupuesto.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
              ¿Cómo Funciona?
            </h2>
            <ol className="list-decimal pl-6 text-lg">
              <li>
                <strong>Inicia el proceso:</strong> Contáctanos por WhatsApp y
                dinos cuánto necesitas. Coordinaremos una visita personalizada a
                tu negocio para conocer tus necesidades y situación financiera.
              </li>
              <li>
                <strong>Análisis en sitio:</strong> Nuestro equipo realizará una
                evaluación profesional en tu lugar de trabajo para garantizar
                que el crédito se ajuste perfectamente a tus objetivos
                comerciales y flujo de ingresos.
              </li>
              <li>
                <strong>Aprobación y entrega:</strong> Una vez completado el
                análisis, recibirás tu dinero de manera ágil y segura, con un
                enfoque transparente y personalizado.
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
              Contáctanos
            </h2>
            <p className="text-gray-300 font-semibold  leading-relaxed">
              Escríbenos al <strong>221</strong> para más información y empieza
              a disfrutar de nuestros beneficios.
            </p>
            <p className="text-gray-300 font-semibold  leading-relaxed mt-2">
              ¡En <strong>Créditos</strong>, estamos listos para ayudarte a
              cumplir tus metas financieras!
            </p>
          </section>

          <footer className="text-center mt-8">
            <p className="text-sm text-gray-500">
              © 2024 Créditos. Todos los derechos reservados.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
