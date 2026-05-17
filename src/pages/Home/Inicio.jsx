/* eslint-disable react/jsx-key */
import { tecnologies_list } from "../../assets/jsonData.json";
import "./Home.css";
import { useContext } from "react";
import { Context } from "../../Context/Context";

const Hero = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto gap-6 md:gap-12 p-6 md:p-8">
      {/* Imagen con glow sutil */}
      <div className="order-1 md:order-1 flex-shrink-0 relative group animate-fade-in-left">
        <div className="absolute -inset-2 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img
          className="rounded-2xl w-36 sm:w-44 md:w-52 lg:w-56 shadow-xl ring-1 ring-white/10 relative"
          src="relajo.png"
          alt="rengav"
        />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-lg">✦</span>
        </div>
      </div>

      {/* Texto */}
      <div className="order-2 md:order-2  text-center md:text-left flex flex-col gap-3 animate-fade-in-right">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Disponible para proyectos
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            rengav
          </h1>
          <h2 
            className="text-base md:text-lg lg:text-xl mt-3 font-light tracking-wide"
            style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
          >
            <span className="font-semibold" style={{ color: isDark ? '#fff' : '#000' }}>
              Web Developer
            </span> & App Developer
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
          <a
            href="#sobre-mi"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Sobre mí
          </a>
          <a
            href="#tecnologias"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 text-teal-400 hover:text-white bg-teal-500/10 hover:bg-teal-500 border border-teal-500/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Tecnologías
          </a>
          <a
            href="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 text-teal-400 hover:text-white bg-teal-500/10 hover:bg-teal-500 border border-teal-500/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Proyectos
          </a>
        </div>
      </div>
    </div>
  );
};

const AboutMe = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  return (
    <div id="sobre-mi" className="max-w-3xl mx-auto px-6 py-10 animate-fade-in-up">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
          Sobre mí
        </span>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Pasión por el código limpio
        </h1>
      </div>
      
      <div 
        className="rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden"
        style={{ 
          backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.85)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
        }}
      >
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
        
        <p 
          className="text-base md:text-lg leading-relaxed text-center"
          style={{ color: isDark ? '#e5e7eb' : '#374151' }}
        >
          Desarrollador web enfocado en el diseño lógico y algorítmico de
          aplicaciones. Mejoro estructuras de datos para asegurar escalabilidad
          y eficiencia. Implemento integraciones dinámicas para un uso fluido
          de la información, garantizando arquitectura robusta y flexible.
        </p>
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-teal-500" />
          <p 
            className="text-sm italic font-light tracking-wide"
            style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
          >
            Mejora continua
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-500" />
        </div>
      </div>
    </div>
  );
};

const CardTecnologie = ({ tecData, index }) => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  return (
    <div
      className={`card-tec animate-fade-in-up stagger-${(index % 8) + 1}`}
      style={{
        backgroundImage: `url(${tecData.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`flex flex-col second-content ${
          isDark ? "sm:bg-black" : "sm:bg-white"
        }`}
        style={{ backgroundColor: isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.95)' }}
      >
        <h2 
          className="text-xs sm:text-sm font-bold px-2 text-center"
          style={{ color: isDark ? '#fff' : '#000' }}
        >
          {tecData.name}
        </h2>
        <div>
          <ul>
            {tecData.list_skill.map((skill, idx) => {
              return (
                <li key={idx}>
                  <p
                    className="px-2 text-xs sm:text-sm text-center"
                    style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                  >
                    {skill}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Tecnologies = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  return (
    <div id="tecnologias" className="px-4 py-10 max-w-5xl mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
          Stack
        </span>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Tecnologías
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
        {tecnologies_list.map((tecData, index) => {
          return (
            <div key={index}>
              <CardTecnologie tecData={tecData} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function Inicio() {
  return (
    <section id="inicio" className="sm:text-xl">
      <div className="mt-8 mb-16">
        {/* Hero Section */}
        <Hero />

        {/* About Me */}
        <AboutMe />

        {/* Tecnologías */}
        <Tecnologies />
      </div>
    </section>
  );
}
