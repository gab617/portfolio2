import React from "react";

export function CurricVitae({ cvRef }) {
  return (
    <div className="xl:w-80 m-auto mt-2 mb-1 print-container" ref={cvRef}>
      <div className="bg-white text-black rounded-3xl ">
        <div className=" bg-slate-400 w-full h-5"></div>
        <div className="flex lg:flex-row flex-col font-semibold">
          <div className="lg:w-70 lg:border-r-4 border-black">
            <div className="flex bg-cyan-200 h-12 w-full items-center">
              <h1 className="w-full text-center font-bold text-2xl">
                Gabriel Cabrera Sirlopu
              </h1>
            </div>
            <div className="bg-slate-400 pb-6 pt-6 ">
              <div>
                <div className="ml-10 mr-5">
                  <div className="mb-2 flex xl:items-end">
                    <h1 className="font-bold">EXPERIENCIA</h1>
                    <p className="text-sm pr-2 pl-2 ml-2 font-semibold bg-slate-300 mb-1">
                      Universidad Informática UNLP (2015-2018) / Autodidacta Hasta La Actualidad
                    </p>
                  </div>
                  <div className="ml-3">
                    <p className="mb-3">
                      Desarrollador frontend especializado en React y React
                      Native, con experiencia en la creación de interfaces
                      interactivas y optimizadas. Además, he trabajado en la
                      integración de APIs RESTful y solicitudes a bases de
                      datos, asegurando una comunicación fluida entre el
                      frontend y backend. Con un enfoque en el desarrollo de
                      aplicaciones eficientes y funcionales, también tengo
                      experiencia manejando servidores y trabajando con bases de
                      datos, lo que me permite ofrecer soluciones completas de
                      desarrollo. Aplico las mejores prácticas en desarrollo web
                      y móvil, asegurando calidad y rendimiento.
                    </p>
                    <ul className="ml-3 list-disc grid grid-cols-2">
                      <div>
                        <li>Proyectos propios desplegados</li>
                        <li>Desarrollo de Interfaces </li>
                        <li>Context API y Hooks</li>
                        <li>Optimización de Renderizado</li>
                        <li>Desarrollo Mobile con React Native</li>
                        <li>Estilos y Diseño Manejo de Formularios</li>
                        <li>Diseño Responsive</li>
                        <li>Componetización</li>
                      </div>
                      <div>
                        <li>Creación e integración de APIs </li>
                        <li>Node.js /Express /MySQL</li>
                        <li>Enrutamiento</li>
                        <li>Web Sockets</li>
                        <li>Gestión de Estado Local y Global </li>
                        <li>Integraciones Servidor/Base de Datos</li>
                        <li>Gestión de base de datos.</li>
                        <li>Gestión de usuarios</li>
                        
                      </div>
                    </ul>
                  </div>
                </div>

                <div className="ml-10 mr-5  mt-5">
                  <div className="mb-2 flex xl:items-end">
                    <h2 className="font-bold">AUTOCONTROL DE PRODUCCIÓN</h2>
                    <p className="text-sm pr-2 pl-2 ml-2 font-semibold bg-slate-300 mb-1">
                      Albano Cozzuol S.A. (2018-2023)
                    </p>
                  </div>

                  <ul className="ml-3 list-disc">
                    <li>
                      Control de calidad y clasificación de datos para procesos
                      de seguimiento.
                    </li>
                    <li>Reporte diario de defectos y resultados.</li>
                    <li>Lectura y gestión de planillas/plantillas.</li>
                    <li>
                      Organización y priorización de tareas para optimizar
                      tiempo y recursos.
                    </li>
                    <li>
                      Capacitación de nuevos empleados en el uso de programas y
                      herramientas.
                    </li>
                    <li>Optimización de procesos.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="w-30">
            <div className="w-80 m-auto flex flex-col gap-5 mt-5">
              <div>
                <h2 className="font-semibold">Formación</h2>
                <ul class="list-disc pl-5 text-gray-700">
                  <li>
                    Secundario completo en EET N6 Albert Thomas (Especialización
                    en Electrónica).
                  </li>
                  <li>
                    Estudios universitarios en la UNLP en Informática (3 años).
                  </li>
                  <li>
                    Autodidacta con prácticas continuas del conocimiento
                    adquirido.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold">Aptitudes</h2>
                <ul class="list-disc pl-5 text-gray-700">
                  <li>
                    Capacidad para crear soluciones completas, desde la
                    planificación hasta el despliegue.
                  </li>
                  <li>Comunicación acertiva.</li>
                  <li>Algoritmos e implementaciones.</li>
                  <li>
                    Resolución de desafíos mediante enfoques prácticos y
                    creativos.
                  </li>
                  <li>
                    Experiencia en combinar diferentes tecnologías para
                    construir aplicaciones útiles.
                  </li>
                  <li>
                    Compromiso con el aprendizaje continuo para mejorar y
                    actualizar habilidades.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold">Contacto</h2>
                <ul className="">
                  <li className="flex gap-2">
                    <div className="">
                      <svg
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
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                              ></rect>{" "}
                            </clipPath>{" "}
                          </defs>{" "}
                        </g>
                      </svg>
                    </div>
                    <p>https://portfolio-gab-zeta.vercel.app/</p>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      color={"#000000"}
                      fill={"none"}
                    >
                      <path
                        d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>rengav6174@gmail.com</p>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      color={"#000000"}
                      fill={"none"}
                    >
                      <path
                        d="M13 16.7033C13 15.7854 13 15.3265 13.2034 14.9292C13.4067 14.5319 13.7859 14.2501 14.5442 13.6866L15.0442 13.315C16.2239 12.4383 16.8138 12 17.5 12C18.1862 12 18.7761 12.4383 19.9558 13.315L20.4558 13.6866C21.2141 14.2501 21.5933 14.5319 21.7966 14.9292C22 15.3265 22 15.7854 22 16.7033V18.1782C22 19.9798 22 20.8806 21.4142 21.4403C20.8284 22 19.8856 22 18 22H13V16.7033Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 12.0002V5C18 2.518 17.482 2 15 2H11C8.518 2 8 2.518 8 5V22"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <ellipse
                        cx="3.5"
                        cy="14"
                        rx="1.5"
                        ry="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M3.5 16V22"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M2 22H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 6H14M12 9H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M17.5 22L17.5 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>Ciudad de La Plata, Buenos Aires, Argentina</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
