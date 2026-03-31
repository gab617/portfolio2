import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CurricVitae as CurricVitaeGabriel } from "../CV2/components/CurricVitae";
import { CurricVitae as CurricVitaeAugusto } from "../CV/components/CurricVitae";
import { CurricVitae as CurricVitaeAgustina } from "../CVANTO/components/CurricVitae";
import { FooterCv as FooterCvGabriel } from "../CV2/components/FooterCv";
import { FooterCv as FooterCvAugusto } from "../CV/components/FooterCv";
import { FooterCv as FooterCvAgustina } from "../CVANTO/components/FooterCv";

const cvOptions = [
  { id: "gabriel", label: "Gabriel (Desarrollador)", Component: CurricVitaeGabriel, Footer: FooterCvGabriel },
  { id: "augusto", label: "Augusto (Enfermero)", Component: CurricVitaeAugusto, Footer: FooterCvAugusto },
  { id: "agustina", label: "Agustina (Atención)", Component: CurricVitaeAgustina, Footer: FooterCvAgustina },
];

export function Cv() {
  const cvRef = useRef();
  const [activeCv, setActiveCv] = useState("gabriel");

  const currentCv = cvOptions.find(cv => cv.id === activeCv);
  const CurrentCurricVitae = currentCv?.Component;
  const CurrentFooter = currentCv?.Footer;

  return (
    <div className="p-1 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Currículum</h1>
        <Link to="/" className="text-sm hover:underline">
          ← Volver
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {cvOptions.map((cv) => (
          <button
            key={cv.id}
            onClick={() => setActiveCv(cv.id)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeCv === cv.id
                ? "bg-teal-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cv.label}
          </button>
        ))}
      </div>

      <div className="max-full mx-auto">
        <div className=" text-black rounded-xl shadow-lg">

          {CurrentCurricVitae && <CurrentCurricVitae cvRef={cvRef} />}
          {CurrentFooter && <CurrentFooter cvRef={cvRef} />}
        </div>
      </div>

      <hr className="my-6" />
      
      <div className="text-center">
        <Link to="/tools">
          <h1 className="text-lg hover:text-teal-400 transition-colors cursor-pointer">
            DISEÑOS/RECURSOS PARA EMPRESAS
          </h1>
        </Link>
      </div>
    </div>
  );
}
