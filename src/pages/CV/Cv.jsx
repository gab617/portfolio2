import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "React & React Native", "Context API & Hooks",
      "Componentización y Diseño Responsive", "Tailwind CSS",
      "Manejo de Formularios", "Optimización de Renderizado",
      "Estados Globales (Redux, Signals)", "Estilos y Animaciones CSS",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js & Express", "APIs RESTful",
      "MySQL / Bases de Datos", "Web Sockets",
      "Autenticación y manejo de usuarios",
      "Integraciones servidor / base de datos",
    ],
  },
  {
    title: "Herramientas",
    skills: [
      "Git", "Vite / Webpack", "Render / Vercel (deploy)",
      "Postman / testing de APIs", "npm / package management",
      "ESLint / Prettier",
    ],
  },
  {
    title: "Experiencia",
    skills: [
      "Proyectos propios desplegados",
      "Creación de interfaces interactivas",
      "Gestión de bases de datos",
      "Trabajo con APIs de terceros",
      "Desarrollo mobile con React Native",
      "Optimización de rendimiento",
    ],
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
            📄 CV
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">rengav</h1>
          <p className="text-sm mt-1" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
            Gabriel Cabrera — Desarrollador Frontend
          </p>
        </div>
        <Link to="/" className="text-sm hover:text-teal-400 transition-colors">
          ← Volver
        </Link>
      </div>

      {/* Skills por categoría */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            className="rounded-xl p-5 transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: isDark
                ? "rgba(30, 30, 30, 0.8)"
                : "rgba(255, 255, 255, 0.85)",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
              }`,
            }}
          >
            <h2
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
            >
              {cat.title}
            </h2>
            <ul className="space-y-1.5">
              {cat.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 rounded-full bg-teal-500 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-12 pt-6 flex flex-wrap gap-4 justify-center"
        style={{
          borderTop: `1px solid ${
            isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
          }`,
        }}
      >
        <Link
          to="/cvs"
          className="text-sm hover:text-teal-400 transition-colors"
        >
          📋 Todos los CVs
        </Link>
        <Link
          to="/tools"
          className="text-sm hover:text-teal-400 transition-colors"
        >
          🛠️ Herramientas de crédito
        </Link>
        <Link
          to="/api-tester"
          className="text-sm hover:text-teal-400 transition-colors"
        >
          📡 API Tester
        </Link>
      </div>
    </div>
  );
}
