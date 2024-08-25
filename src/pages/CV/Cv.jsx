import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
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
      <CurricVitae
        cvRef={cvRef}
      />
      <FooterCv
        cvRef={cvRef}
      />
    </div>
  );
}
