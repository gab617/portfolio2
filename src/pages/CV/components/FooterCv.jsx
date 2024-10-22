import React from "react";
import ReactToPrint from "react-to-print";

export function FooterCv({cvRef} ) {
  return (
    <div className=" flex justify-between sm:w-80 gap-1 m-auto mb-5 items-center">
      <div className="bg-teal-500 bg-opacity-30 lg:rounded-sm rounded-xl p-2 transform transition-transform duration-300 ease-in-out hover:scale-110">
        <ReactToPrint
          trigger={() => <button>Guardar como PDF</button>}
          content={() => cvRef.current}
        />
      </div>

      <div className="flex  items-center gap-2">
        <img className="w-11" src="/icons_tecs/tailwind-icon.png" alt="" />
      </div>
    </div>
  );
}
