import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { CurricVitae } from "./components/CurricVitae";
import { FooterCv } from "./components/FooterCv";
import { ButtonVolver } from "../../components/ButtonVolver";
import ReactToPrint from "react-to-print";


export function Cv() {
  const cvRef = useRef();
  return (
    <div>
      <div className="xl:w-80 m-auto mt-2 flex justify-end">
        <Link to="/">
          <ButtonVolver></ButtonVolver>
        </Link>
      </div>


      <div className="mx-auto w-[10%] bg-teal-500 bg-opacity-30 lg:rounded-sm rounded-xl p-2 transform transition-transform duration-300 ease-in-out hover:scale-110">
        <ReactToPrint
          trigger={() => <button>Guardar como PDF</button>}
          content={() => creditsPDFRef.current}
        />
      </div>
      <div>
        <CurricVitae cvRef={cvRef} />
        <FooterCv cvRef={cvRef} />
      </div>
    </div>
  );
}
