import { useState } from "react";
import { Link } from "react-router-dom";
import { projectsF } from "../../assets/jsonData.json";
import { useContext } from "react";
import { Context } from "../../Context/Context";

// 📌 CVs comentados para acceso rápido
// import { CurricVitae as CurricVitaeGabriel } from "../CV2/components/CurricVitae";
// import { CurricVitae as CurricVitaeAugusto } from "../CV/components/CurricVitae";
// import { CurricVitae as CurricVitaeAgustina } from "../CVANTO/components/CurricVitae";
// import { FooterCv as FooterCvGabriel } from "../CV2/components/FooterCv";
// import { FooterCv as FooterCvAugusto } from "../CV/components/FooterCv";
// import { FooterCv as FooterCvAgustina } from "../CVANTO/components/FooterCv";
// import { FolletoA4, FooterFolletoA4 } from "../CV/components/FolletoA4";
// import { ListaClientesA4, FooterListaClientes } from "../CV/components/ListaClientesA4";

// const cvOptions = [
//   { id: "gabriel", label: "Gabriel (Desarrollador)", Component: CurricVitaeGabriel, Footer: FooterCvGabriel },
//   { id: "augusto", label: "Augusto (Enfermero)", Component: CurricVitaeAugusto, Footer: FooterCvAugusto },
//   { id: "agustina", label: "Agustina (Atención)", Component: CurricVitaeAgustina, Footer: FooterCvAgustina },
//   { id: "folleto", label: "Folleto A4 (Imprimir)", Component: FolletoA4, Footer: FooterFolletoA4 },
//   { id: "lista", label: "Lista Clientes (Imprimir)", Component: ListaClientesA4, Footer: FooterListaClientes },
// ];

const betasList = [
  {
    id: "crunch",
    title: "Crunch Counter",
    desc: "App para contar macros y calorías. Beta de seguimiento nutricional simple.",
    stack: "React + Vite + Tailwind",
    status: "En desarrollo",
  },
  {
    id: "pomodoro",
    title: "Pomodoro Pro",
    desc: "Temporizador Pomodoro con estadísticas de productividad y sesiones personalizables.",
    stack: "React + LocalStorage",
    status: "Diseñando",
  },
  {
    id: "chatmini",
    title: "Mini Chat",
    desc: "Chat en tiempo real con websockets. Versión simplificada para pruebas de concepto.",
    stack: "React + Socket.IO",
    status: "En desarrollo",
  },
];

export function Cv() {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-2">
            🚀 Portfolio
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Mis Proyectos</h1>
        </div>
        <Link to="/" className="text-sm hover:text-teal-400 transition-colors">
          ← Volver
        </Link>
      </div>

      {/* Proyectos desplegados */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-teal-500/50 to-transparent" />
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
            En Producción
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-teal-500/50 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {projectsF.map((proyect) => (
            <a
              key={proyect.id}
              href={proyect.url_link}
              target="_blank"
              className="group block rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ 
                backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.85)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold group-hover:text-teal-500 transition-colors">
                  {proyect.title}
                </h3>
                <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -rotate-45 group-hover:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <p className="text-sm mb-3 line-clamp-2" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                {proyect.description_app}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {proyect.tecs.map((tec, i) => (
                  <span key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 p-0.5 flex items-center justify-center">
                    <img src={tec} className="w-4 h-4" alt="" />
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Betas */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
            🧪 Betas
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-orange-500/50 to-transparent" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {betasList.map((beta) => (
            <div
              key={beta.id}
              className="rounded-xl p-4 transition-all hover:-translate-y-1"
              style={{ 
                backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.85)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-xs font-medium text-orange-500">{beta.status}</span>
              </div>
              <h3 className="text-base font-bold mb-1">{beta.title}</h3>
              <p className="text-xs mb-2" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                {beta.desc}
              </p>
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400">
                {beta.stack}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-12 pt-6 flex flex-wrap gap-4 justify-center" style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
        <Link to="/tools" className="text-sm hover:text-teal-400 transition-colors">
          🛠️ Herramientas de crédito
        </Link>
        <Link to="/api-tester" className="text-sm hover:text-teal-400 transition-colors">
          📡 API Tester
        </Link>
      </div>
    </div>
  );
}
