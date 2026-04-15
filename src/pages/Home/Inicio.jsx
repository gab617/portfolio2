/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import { tecnologies_list } from "../../assets/jsonData.json";
import { ButtonbyAdam } from "../../components/ButtonbyAdam";
import "./Home.css";
import { useContext } from "react";
import { Context } from "../../Context/Context";

const Hero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-evenly items-center w-full m-auto gap-4 p-4">
      <div className="flex flex-col items-end gap-3 w-full md:w-1/2">
        <div className="text-center md:text-left">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">Gabriel Cabrera Sirlopu</h1>
          <h2 className="text-lg md:text-xl lg:text-2xl"><span className="font-bold">Web / App developer</span></h2>
        </div>
        <div className="flex flex-col w-1/2 gap-2 justify-center md:justify-start mt-2">
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
      <div className="w-full md:w-1/2 flex justify-start">
        <img
          className="rounded-xl w-48 sm:w-56 md:w-60 lg:w-72"
          src="relajo.png"
          alt=""
        />
      </div>
    </div>
  );
};
const AboutMe = () => {
  return (
    <div className="mb-8 mt-4 p-4 max-w-4xl mx-auto">
      <h1 className="text-center mb-4 text-xl md:text-2xl font-bold">Sobre mí:</h1>
      <p className="text-sm md:text-base leading-relaxed">
        Soy un desarrollador web enfocado en el diseño lógico y algorítmico de
        aplicaciones, mejorando estructuras de datos para asegurar la
        escalabilidad y eficiencia de los proyectos. Implemento integraciones
        dinámicas que permiten un uso fluido y sostenible de los datos en el
        backend, garantizando una arquitectura robusta y flexible. Además,
        diseño interfaces atractivas y adaptables a cualquier dispositivo
        (responsive), ajustándome a las necesidades específicas de cada
        proyecto.
      </p>
      <p className="text-center mt-4">Mejora continua.</p>
    </div>
  );
};

const CardTecnologie = ({ tecData }) => {
  const { currentTheme } = useContext(Context);

  return (
    <div
      className="card-tec m-auto w-20 h-20 sm:w-[130px] sm:h-[130px]"
      style={{
        backgroundImage: `url(${tecData.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`flex flex-col second-content ${
          currentTheme.color === "#000"
            ? "sm:bg-white bg-opacity-50"
            : "sm:bg-black"
        } sm:bg-opacity-50`}
      >
        <h2 className="text-sm">{tecData.name} </h2>
        <div>
          <ul>
            {tecData.list_skill.map((skill) => {
              return (
                <li>
                  <p
                    className={`${
                      currentTheme.color === "#000" ? "bg-white" : "bg-black"
                    } bg-opacity-40 sm:bg-opacity-0 px-3 text-xs sm:text-sm`}
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
  return (
    <div className="p-4">
      <h1 className="text-center mb-6 text-2xl md:text-3xl font-bold">
        Tecnologías
      </h1>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
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
    <section id="inicio" className="sm:text-2xl">
      <div className="mt-3">
        <Hero />
        <AboutMe />
        <Tecnologies />
      </div>
    </section>
  );
}
