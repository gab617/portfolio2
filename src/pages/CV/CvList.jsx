import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";

import { CurricVitae as CurricVitaeGabriel } from "../CV2/components/CurricVitae";
import { CurricVitae as CurricVitaeAugusto } from "../CV/components/CurricVitae";
import { CurricVitae as CurricVitaeAgustina } from "../CVANTO/components/CurricVitae";
import { FooterCv as FooterCvGabriel } from "../CV2/components/FooterCv";
import { FooterCv as FooterCvAugusto } from "../CV/components/FooterCv";
import { FooterCv as FooterCvAgustina } from "../CVANTO/components/FooterCv";
import { FolletoA4, FooterFolletoA4 } from "../CV/components/FolletoA4";
import { ListaClientesA4, FooterListaClientes } from "../CV/components/ListaClientesA4";

const cvs = [
  {
    id: "gabriel",
    label: "Gabriel Cabrera",
    role: "Desarrollador Frontend",
    desc: "CV profesional con experiencia en React, React Native, Node.js y bases de datos. Proyectos propios desplegados.",
    Component: CurricVitaeGabriel,
    Footer: FooterCvGabriel,
  },
  {
    id: "augusto",
    label: "Augusto Cabrera",
    role: "Enfermero Profesional",
    desc: "CV para el ámbito de la salud. Atención directa al paciente, cuidados básicos y administrativos.",
    Component: CurricVitaeAugusto,
    Footer: FooterCvAugusto,
  },
  {
    id: "agustina",
    label: "Carlos Quiroga",
    role: "Electricista · Refrigeración · Mantenimiento",
    desc: "CV orientado a servicios técnicos. Electricidad, refrigeración y mantenimiento general.",
    Component: CurricVitaeAgustina,
    Footer: FooterCvAgustina,
  },
  {
    id: "folleto",
    label: "Folleto A4",
    role: "Plantilla imprimible",
    desc: "Folleto formato A4 listo para imprimir. Ideal para promocionar servicios o productos.",
    Component: FolletoA4,
    Footer: FooterFolletoA4,
  },
  {
    id: "lista",
    label: "Lista Clientes A4",
    role: "Planilla para imprimir",
    desc: "Lista de clientes optimizada para A4 con espacio para 45 registros (nombre, teléfono, forma de pago).",
    Component: ListaClientesA4,
    Footer: FooterListaClientes,
  },
];

export function CvList() {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  const [selected, setSelected] = useState(null);
  const cvRef = useRef(null);

  const activeCv = cvs.find((c) => c.id === selected);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-2">
            📋 CVs
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Todos los CVs
          </h1>
          <p className="text-sm mt-1" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
            Seleccioná uno para verlo y guardarlo como PDF
          </p>
        </div>
        <Link to="/cv" className="text-sm hover:text-teal-400 transition-colors">
          ← Volver a CV
        </Link>
      </div>

      {/* Grilla de CVs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cvs.map((cv) => {
          const isActive = selected === cv.id;
          return (
            <button
              key={cv.id}
              onClick={() => setSelected(isActive ? null : cv.id)}
              className="text-left rounded-xl p-4 transition-all hover:-translate-y-1"
              style={{
                backgroundColor: isActive
                  ? isDark
                    ? "rgba(45, 212, 191, 0.1)"
                    : "rgba(45, 212, 191, 0.08)"
                  : isDark
                    ? "rgba(30, 30, 30, 0.8)"
                    : "rgba(255, 255, 255, 0.85)",
                border: `1px solid ${
                  isActive
                    ? "rgba(45, 212, 191, 0.3)"
                    : isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.06)"
                }`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isActive ? "bg-teal-500" : "bg-teal-500/40"
                  }`}
                />
                <h3 className="font-bold text-sm">{cv.label}</h3>
              </div>
              <p className="text-xs font-medium mb-1" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                {cv.role}
              </p>
              <p className="text-xs" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                {cv.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* CV seleccionado */}
      {activeCv && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-teal-500/50 to-transparent" />
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
              {activeCv.label}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-teal-500/50 to-transparent" />
          </div>

          <activeCv.Component cvRef={cvRef} />
          <activeCv.Footer cvRef={cvRef} />
        </div>
      )}

      {!activeCv && (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
            Hacé clic en cualquier CV de arriba para previsualizarlo
          </p>
        </div>
      )}
    </div>
  );
}
