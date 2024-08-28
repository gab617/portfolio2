/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import { tecnologies_list } from "../../assets/jsonData.json";
import { ButtonbyAdam } from "../../components/ButtonbyAdam";
import "./Home.css";

const Hero = () => {
  return (
    <div
      className="
        text-center 
        flex justify-evenly items-center 
        w-full m-auto
        xl:gap-3"
    >
      <div className="w-1/2 flex flex-col gap-2 ">
        <div className="mr-5 lg:mb-5 xl:w-full xl:flex justify-end">
          <div
            className="
                    text-xl
                    md:text-3xl
                    xl:w-1/2 
                    xl:text-center 
                    xl:text-4xl"
          >
            <h1>Gabriel Cabrera Sirlopu</h1>
            <h2>Web developer</h2>
          </div>
        </div>
        <div className="xl:flex xl:justify-end xl:full">
          <div className="w-90 xl:w-1/2">
            <Link to={"/cv"}>
              <button className="sm:w-70 sm:m-auto sm:mb-1 btn-adam">
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
      <div className="w-1/2 xl:ml-5">
        <img
          className="
                rounded-xl
                lg:w-60 lg:m-auto 
                xl:m-0 xl:w-2/5"
          src="relajo.png"
          alt=""
        />
      </div>
    </div>
  );
};
const AboutMe = () => {
  return (
    <div
      className="
        mb-10 mt-4 
        sm:bg-black 
        sm:bg-opacity-10 
        sm:p-3
        sm:pb-5
        xl:max-w-7xl
        xl:m-auto
        xl:mt-2
        xl:mb-2
        xl:rounded-xl
        "
    >
      <h1 className="sm:text-center mb-1">Sobre mí:</h1>
      <p className="xl:p-5">
        Soy un desarrollador web enfocado en el diseño lógico y algorítmico de
        aplicaciones, mejorando estructuras de datos para asegurar la
        escalabilidad y eficiencia de los proyectos. Acompañado de un diseño
        atractivo, acorde a las necesidades y para cualquier dispositivo
        (resposive). <br /> <br />
      </p>
      <p className="lg:text-center">Mejora continua.</p>
    </div>
  );
};

const CardTecnologie = ({ tecData }) => {
  return (
    <div
      className="card-tec m-auto"
      style={{
        backgroundImage: `url(${tecData.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col second-content">
        <h2>{tecData.name} </h2>
        <div>
          <ul>
            {tecData.list_skill.map((skill) => {
              return (
                <li>
                  <p className="text-sm">{skill}</p>
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
    <div>
      <div>
        <h1
          className="
                m-auto
                text-center 
                mb-4 text-3xl 
                sm:bg-black sm:bg-opacity-10 sm:rounded-xl
                xl:max-w-7xl
                "
        >
          Tecnologías
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 sm:gap-2 md:w-80 md:m-auto xl:w-2/5">
        {tecnologies_list.map((tecData) => {
          return (
            <div className="">
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
