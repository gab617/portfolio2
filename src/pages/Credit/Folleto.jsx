import React from 'react'

export  function Folleto({modePay,changeModePay,TABLA,TABLASEMANAL}) {
  return (
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
  )
}
