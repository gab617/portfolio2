import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { CurricVitae } from "./components/CurricVitae";
import { FooterCv } from "./components/FooterCv";
import { ButtonVolver } from "../../components/ButtonVolver";

export function Cv() {
  const cvRef = useRef();
  return (
    <div>
      <div className="xl:w-80 m-auto mt-2 flex justify-end">
        <Link to="/">
          <ButtonVolver></ButtonVolver>
        </Link>
      </div>

      <div>
        <CurricVitae cvRef={cvRef} />
        <FooterCv cvRef={cvRef} />
        <hr />
        <div className="">
          <Link to={"/credit"}>
            <h1 className="hover:bg-white hover:text-black text-center cursor-pointer">
              DISEÑOS/RECURSOS PARA EMPRESAS
            </h1>
          </Link>
        </div>
        <hr />
      </div>
    </div>
  );
}
