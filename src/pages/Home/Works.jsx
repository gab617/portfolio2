/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { projectsF } from "../../assets/jsonData.json";

const ListProjects2 = () => {}

const ListProjects = () => {
  const Proyect = ({ proyect }) => {
    return (
      <div
        className="
            mb-10 
            sm:rounded-xl
            xl:bg-black 
            xl:bg-opacity-10 
            xl:p-2"
      >
        <div
          className="

                flex justify-between mb-2 sm:mt-3"
        >
          <div className="flex items-center">
            <h1 className="text-xl md:text-3xl font-bold text-gray-200">
              {proyect.title}
            </h1>
          </div>
          {/* LOADER */}
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
            <div
              className="
                        flex
                        "
            ></div>
          </div>
        </div>

        <article
          className="
                xl:flex xl:p-3 mt-3 mb-2"
        >
          <div
            className="
                    drop-shad-tecno
                flex items-center justify-center
                w-full 
                xl:w-2/3
                "
          >
            <a className="" href={proyect.url_link} target="_blank">
              <img
                className="
                            lg:border
                            lg:border-black
                            lg:transform hover:scale-105
                            lg:transition-transform 
                            lg:duration-400
                            lg:hover:border-emerald-400
                            rounded-xl"
                src={proyect.img_url}
                alt=""
              />
            </a>
          </div>

          <p
            className="
                        sm:text-xl                           
                        bg-black 
                        bg-opacity-35 
                        p-4 
                        rounded-xl 
                        lg:ml-2
                        xl:w-full"
          >
            {proyect.description_app}
            <br />
            <br />
            {proyect.description_dev}
          </p>
        </article>

        <div className="m-auto lg:m-0 w-70 flex justify-center items-center gap-1 sm:w-1/2 lg:w-1/3 xl:w-1/5">
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
                    className="xl:w-[70%] img-tecs rounded-[50%] m-auto"
                    src={tec}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {projectsF.map((proyect) => {
        return <Proyect proyect={proyect} />;
      })}
    </div>
  );
};
const Tiltle = () => {
  return (
    <div className="mb-4">
      <h1
        className="
            text-center 
            mb-4 text-3xl 
            sm:bg-black sm:bg-opacity-15 
            sm:rounded-xl
            md:text-4xl"
      >
        Proyectos
      </h1>
      <div className="lg:text-2xl">
        <p className="">
          Proyectos hechos a mano con integración backend, desarrollados y
          desplegados por mí. Cada proyecto resuelve necesidades específicas
          mediante soluciones personalizadas, con un enfoque completo desde la
          concepción hasta la producción.
        </p>
        <div className="flex gap-3 items-center">
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
