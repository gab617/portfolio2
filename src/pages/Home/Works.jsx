/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useContext } from "react";
import { projectsF } from "../../assets/jsonData.json";
import { Context } from "../../Context/Context";

const ListProjects2 = () => {};

const ListProjects = () => {
  const Proyect = ({ proyect }) => {
    const { currentTheme } = useContext(Context);
    return (
      <div
        className="
            border border-stone-600
            mb-10 
            sm:rounded-xl
            xl:bg-black 
            xl:bg-opacity-10 
            xl:p-2"
      >
        <div
          className="
                flex mb-2 mt-3 justify-between"
        >
          {/* Titulo */}
          <div className="flex">
            <div
              className=" 
                        W-full
                        flex
                    "
            >
              <a
                className="
                        w-11 mr-5 
                        "
                href={proyect.url_repo}
                target="_blank"
              >
                <img
                  className="
                  img-repo
                  rounded-full
                  opacity-80
                  ml-3
                  cursor-pointer"
                  src="icons_tecs/github-logo.png"
                  alt=""
                  title="Repositoy project"
                />
              </a>
            </div>
            <div className="flex items-center ">
              <h1 className="text-xl md:text-3xl font-bold ">
                {proyect.title}
              </h1>
            </div>
          </div>
          <div className="relative inline-block group w-11 mr-3 cursor-pointer hover:scale-110 transition-all rounded-full duration-200 tool-tecnologie-effect">
            <img src="/toolsimg.png" alt="" />
            <div className="absolute flex justify-center items-center bottom-[-.8em] right-[3.5em] mb-2 bg-gray-800 text-white text-base rounded w-[14em] sm:w-[17em] h-[6em] p-2  invisible group-hover:visible">
              <div className=" mx-auto lg:m-0 w-full flex flex-col  justify-center items-center gap-1 sm:w-full ">
                <p className="font-bold">Tecnologías</p>
                <div className="flex gap-1">
                  {proyect.tecs.map((tec) => {
                    return (
                      <div
                        className="
                            drop-shad-tecno
                            w-full
                            "
                      >
                        <div className="mt-2">
                          <img
                            className="img-tecs rounded-[50%] m-auto"
                            src={tec}
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE */}
        <article
          className="
                sm:hidden
                flex flex-col xl:p-3 mt-3 mb-2"
        >
          <div
            className="
                drop-shad-tecno
                flex flex-col items-center justify-center
                w-full 
                "
          >
            <a className="" href={proyect.url_link} target="_blank">
              <img
                className="
                            rounded-xl"
                src={proyect.img_url}
                alt=""
              />
            </a>
            <p
              className={`
                        text-base
                        bg-black 
                        bg-opacity-35 
                        p-4 
                        rounded-xl
                         ${
                           currentTheme.color === "#000"
                             ? "bg-white bg-opacity-80 "
                             : "bg-black bg-opacity-80"
                         }`}
            >
              {proyect.description_app}
              <br />
              <br />
              {proyect.description_dev}
            </p>
          </div>
        </article>

        {/* SUPERIOR A MOBILE */}
        <article
        title="Click para ir a web"
          className="
                hidden
                sm:block
                xl:flex-col xl:p-3 mt-3 mb-2"
        >
          <div
            className="
                drop-shad-tecno
                flex items-center justify-center
                w-full 
                xl:w-full
                "
          >
            <a
              style={{
                backgroundImage: `url(${proyect.img_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={` work-view h-[20em] lg:min-h-[25em] lg:max-h-[30em] flex`}
              href={proyect.url_link}
              target="_blank"
            >
              <div
                className={`text-base 2xl:text-xl  desc-work flex flex-col font-semibold ${
                  currentTheme.color === "#000"
                    ? "sm:bg-white sm:bg-opacity-80 "
                    : "sm:bg-black sm:bg-opacity-80"
                } `}
              >
                <p
                  className="
                        p-4 
                        rounded-xl 
                        lg:ml-0
                        xl:w-full"
                >
                  {proyect.description_app}
                  <br />
                </p>
                <ul className="grid grid-cols-2 2xl:text-lg list-disc list-inside">
                  {proyect.description_list?.map((item) => {
                    return (
                      <>
                        <li className="ml-1 mb-1 xl:ml-4">{item}</li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </a>
          </div>
        </article>

        {/*          */}
      </div>
    );
  };

  return (
    <div className="lg:grid lg:grid-cols-2 gap-3">
      {projectsF.map((proyect) => {
        return <Proyect proyect={proyect} />;
      })}
    </div>
  );
};
const Tiltle = () => {
  return (
    <div className="mb-4 xl:max-w-7xl mx-auto">
      <h1
        className="
            text-center 
            mb-4 text-3xl 
            sm:bg-black sm:bg-opacity-15 
            sm:rounded-xl
            md:text-4xl "
      >
        Proyectos
      </h1>
      <div className="lg:text-2xl xl:max-w-7xl mx-auto p-2 sm:bg-black sm:bg-opacity-15 sm:rounded-xl">
        <p className="xl:max-w-7xl mx-auto ">
          Proyectos hechos a mano con integración backend, desarrollados y
          desplegados por mí. Cada proyecto resuelve necesidades específicas
          mediante soluciones personalizadas, con un enfoque completo desde la
          concepción hasta la producción.
        </p>
        <div className="flex gap-3 items-center ">
          <p> Incluyendo el propio portfolio.</p>
          <a
            target="_blank"
            href="https://github.com/gab617/portfolio2"
            title="Repository Portfolio"
          >
            <svg
              className="bg-emerald-400 bg-opacity-25 cursor-pointer img-repo"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g clip-path="url(#clip0_429_11072)">
                  {" "}
                  <path
                    d="M11 3.99994H4V17.9999C4 19.1045 4.89543 19.9999 6 19.9999H18C19.1046 19.9999 20 19.1045 20 17.9999V12.9999"
                    stroke="#292929"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M9 14.9999L20 3.99994"
                    stroke="#292929"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M15 3.99994H20V8.99994"
                    stroke="#292929"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id="clip0_429_11072">
                    {" "}
                    <rect width="24" height="24" fill="white"></rect>{" "}
                  </clipPath>{" "}
                </defs>{" "}
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
    <section id="proyectos" className="mt-10">
      <Tiltle />
      <ListProjects />
    </section>
  );
}
