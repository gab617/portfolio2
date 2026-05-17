/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useContext, useState } from "react";
import { projectsF } from "../../assets/jsonData.json";
import { Context } from "../../Context/Context";
import "./Works.css"

const ListProjects = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  
  const Proyect = ({ proyect }) => {
    const [currentImg, setCurrentImg] = useState(1);
    const [direction, setDirection] = useState("right");
    const { cant } = proyect.media_folder;

    const handleImageNext = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDirection("right");
      setCurrentImg((prev) => (cant === prev ? 1 : prev + 1));
    };
    const handleImagePrevious = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDirection("left");
      setCurrentImg((prev) => (prev === 1 ? cant : prev - 1));
    };

    return (
      <div 
        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 mb-10 backdrop-blur-sm group"
        style={{ 
          backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.85)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
        }}
      >
        {/* Header con gradiente */}
        <div 
          className="p-4 md:p-5 relative overflow-hidden"
          style={{ 
            backgroundColor: isDark ? 'rgba(40, 40, 40, 0.9)' : 'rgba(248, 248, 248, 0.9)' 
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <a
                href={proyect.url_repo}
                target="_blank"
                className="block"
                title="Ver repositorio"
              >
                <img
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full opacity-60 hover:opacity-100 transition-all hover:scale-110"
                  src="icons_tecs/github-logo.png"
                  alt="GitHub"
                />
              </a>
              <h1 className="text-lg md:text-2xl font-bold">{proyect.title}</h1>
            </div>
            
            {/* Tecnologías */}
            <div className="flex items-center gap-1">
              {proyect.tecs.map((tec, idx) => (
                <img
                  key={idx}
                  className="w-5 h-5 md:w-8 md:h-8 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                  src={tec}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>

        {/* Imagen principal con slider */}
        <div className="relative group/img">
          <div 
            className="relative h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden"
            style={{ 
              backgroundColor: isDark ? 'rgba(15, 15, 15, 0.95)' : 'rgba(240, 240, 240, 0.95)' 
            }}
          >
            <a
              href={proyect.url_link}
              target="_blank"
              className="absolute inset-0 z-0"
              title="Ver proyecto"
            />
            
            <img
              key={currentImg}
              src={`proys_imgs/${proyect.media_folder.path}/${currentImg}.png`}
              alt={`${proyect.title} - imagen ${currentImg}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                direction === "right" 
                  ? "animate-slide-in-right" 
                  : "animate-slide-in-left"
              }`}
            />
          </div>
          
          {/* Navegación de imágenes */}
          {cant > 1 && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 py-3 bg-gradient-to-t from-black/60 to-transparent">
              <button 
                onClick={handleImagePrevious} 
                className="p-1.5 md:p-2 bg-white/90 hover:bg-white rounded-full transition-all hover:scale-110 shadow-md z-10"
              >
                <img src="/arrow-left.png" alt="Anterior" className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                {Array.from({ length: cant }, (_, i) => (
                  <span 
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      currentImg === i + 1 ? "bg-white scale-125" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={handleImageNext} 
                className="p-1.5 md:p-2 bg-white/90 hover:bg-white rounded-full transition-all hover:scale-110 shadow-md z-10"
              >
                <img src="/arrow-right.png" alt="Siguiente" className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Descripción del proyecto */}
        <div className="p-4 md:p-6">
          <div className="mb-4">
            <h2 
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
            >
              La App
            </h2>
            <p 
              className="leading-relaxed text-sm md:text-base"
              style={{ color: isDark ? '#e5e7eb' : '#374151' }}
            >
              {proyect.description_app}
            </p>
          </div>

          <div className="mb-5">
            <h2 
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
            >
              Desarrollo
            </h2>
            <p 
              className="leading-relaxed text-sm md:text-base"
              style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
            >
              {proyect.description_dev}
            </p>
          </div>

          {/* Características */}
          <div 
            className="rounded-xl p-4 relative overflow-hidden"
            style={{ 
              backgroundColor: isDark ? 'rgba(40, 40, 40, 0.6)' : 'rgba(248, 248, 248, 0.6)' 
            }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-blue-500 rounded-full" />
            <h2 
              className="text-xs font-bold uppercase tracking-widest mb-3 ml-2"
              style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
            >
              Características
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2 ml-2">
              {proyect.description_list?.map((item, idx) => (
                <li 
                  key={idx} 
                  className="flex items-start gap-2 text-sm"
                  style={{ color: isDark ? '#e5e7eb' : '#374151' }}
                >
                  <span className="text-teal-500 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div 
            className="flex flex-wrap gap-3 mt-5 pt-4"
            style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}
          >
            <a
              href={proyect.url_link}
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Ver Proyecto
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href={proyect.url_repo}
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{ 
                backgroundColor: isDark ? 'rgba(60, 60, 60, 0.8)' : 'rgba(235, 235, 235, 0.8)',
                color: isDark ? '#e5e7eb' : '#374151'
              }}
            >
              <img className="w-4 h-4" src="icons_tecs/github-logo.png" alt="" />
              Código
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      {projectsF.map((proyect, idx) => (
        <Proyect key={idx} proyect={proyect} />
      ))}
    </div>
  );
};

const Title = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  
  return (
    <div className="mb-12 max-w-3xl mx-auto px-4">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
          Portfolio
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Proyectos
        </h1>
      </div>
      <div 
        className="rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
        style={{ 
          backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(248, 248, 248, 0.8)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <p 
          className="text-base md:text-lg text-center mb-4"
          style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
        >
          Proyectos desarrollados y desplegados por mí. Cada uno resuelve 
          necesidades específicas mediante soluciones personalizadas, con un 
          enfoque completo desde la concepción hasta la producción.
        </p>
        <div className="flex items-center justify-center gap-3">
          <span 
            className="text-sm"
            style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
          >
            Incluyendo este portfolio
          </span>
          <a
            target="_blank"
            href="https://github.com/gab617/portfolio2"
            title="Repositorio Portfolio"
            className="inline-block"
          >
            <svg
              className="w-5 h-5 opacity-60 hover:opacity-100 transition-all hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export function Works() {
  return (
    <section id="proyectos" className="py-12">
      <Title />
      <ListProjects />
    </section>
  );
}
