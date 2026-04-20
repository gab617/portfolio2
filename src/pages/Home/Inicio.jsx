/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import { tecnologies_list } from "../../assets/jsonData.json";
import { ButtonbyAdam } from "../../components/ButtonbyAdam";
import "./Home.css";
import { useContext } from "react";
import { Context } from "../../Context/Context";

const Hero = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-8 p-6">
      {/* Imagen a la izquierda */}
      <div className="order-1 md:order-1 flex-shrink-0">
        <img
          className="rounded-2xl w-40 sm:w-48 md:w-56 lg:w-64 shadow-lg"
          src="relajo.png"
          alt="Gabriel Cabrera"
        />
      </div>

      {/* Texto a la derecha */}
      <div className="order-2 md:order-2 text-center md:text-left flex flex-col gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Gabriel Cabrera Sirlopu
          </h1>
          <h2 
            className="text-lg md:text-xl lg:text-2xl"
            style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
          >
            <span className="font-semibold" style={{ color: isDark ? '#fff' : '#000' }}>
              Web Developer
            </span> & App Developer
          </h2>
        </div>

        <div className="flex flex-row gap-3 justify-center md:justify-start">
          <Link to={"/cv"}>
            <button className="btn-adam">
              CV
              <span></span>
            </button>
          </Link>

          <ButtonbyAdam
            content={"Linkedin"}
            link={
              "https://www.linkedin.com/in/gabriel-cabrera-sirlopu-0a5700267/"
            }
          />
          <ButtonbyAdam
            content={"Github"}
            link={"https://github.com/gab617?tab=repositories"}
          />
        </div>
      </div>
    </div>
  );
};

const AboutMe = () => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-center mb-4 text-2xl md:text-3xl font-bold">
        Sobre mí
      </h1>
      <div 
        className="rounded-2xl p-6 backdrop-blur-sm"
        style={{ 
          backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
        }}
      >
        <p 
          className="text-base md:text-lg leading-relaxed text-center"
          style={{ color: isDark ? '#e5e7eb' : '#374151' }}
        >
          Desarrollador web enfocado en el diseño lógico y algorítmico de
          aplicaciones. Mejoro estructuras de datos para asegurar escalabilidad
          y eficiencia. Implemento integraciones dinámicas para un uso fluido
          de la información, garantizando arquitectura robusta y flexible.
        </p>
        <p 
          className="text-center mt-4 text-sm italic"
          style={{ color: isDark ? '#9ca3af' : '#9ca3af' }}
        >
          Mejora continua
        </p>
      </div>
    </div>
  );
};

const CardTecnologie = ({ tecData }) => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  return (
    <div
      className="card-tec m-auto w-20 h-20 sm:w-24 sm:h-24"
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
        style={{ backgroundColor: isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.9)' }}
      >
        <h2 
          className="text-xs sm:text-sm font-bold"
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
                    className="px-2 text-xs sm:text-sm"
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
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-center mb-6 text-2xl md:text-3xl font-bold">
        Tecnologías
      </h1>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {tecnologies_list.map((tecData, index) => {
          return (
            <div key={index}>
              <CardTecnologie tecData={tecData} />
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
      <div className="mt-6">
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