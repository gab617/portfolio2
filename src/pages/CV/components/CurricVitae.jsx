import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export function CurricVitae({ cvRef }) {
  return (
    <div className="xl:w-80 m-auto mt-2 mb-1 print-container" ref={cvRef}>
      <div className="bg-white text-black rounded-3xl">
        <div className="bg-slate-400/20 rounded-3xl w-full h-5"></div>
        <div className="flex lg:flex-row flex-col font-semibold">
          <div className="lg:w-70 lg:border-r-4 border-black">
            <div className="flex flex-row items-center justify-center gap-3 bg-cyan-200/10 py-2">
              <img
                src="./diegocv.JPG"
                alt="Foto de Diego Marcelo Mazzella"
                className="rounded-full w-24 h-24 object-cover"
              />
              <h1 className="text-center font-bold text-2xl">
                Diego Marcelo Mazzella
              </h1>
            </div>
            <div className="bg-slate-400/20 pb-6 pt-6">
              <div className="ml-10 mr-5">
                <div className="mb-2 flex xl:items-end">
                  <h1 className="font-bold">EXPERIENCIA</h1>
                  <p className="text-sm pr-2 pl-2 ml-2 font-semibold bg-slate-300 mb-1">
                    Técnico Electricista - Instalaciones Domiciliarias y
                    Empresariales
                  </p>
                </div>
                <div className="ml-3">
                  <p className="mb-3">
                    Experiencia en instalaciones eléctricas residenciales y comerciales, tanto en redes aéreas como subterráneas. Manejo de conexiones, medición, mantenimiento y resolución de fallas, con conocimientos en normativa y seguridad eléctrica.
                  </p>
                  <ul className="ml-3 list-disc">
                    <li>
                      Instalaciones eléctricas completas (monofásicas y
                      trifásicas)
                    </li>
                    <li>Lectura e interpretación de planos eléctricos.</li>
                    <li>Redes aéreas y subterráneas</li>
                    <li>Manejo de herramientas manuales y eléctricas</li>
                    <li>Lectura de instrumentos de medición</li>
                    <li>Gestión técnica en campo</li>
                    <li>Manejo de aplicaciones móviles técnicas</li>
                  </ul>

                  <div className="mt-4">
                    <h2 className="font-bold mb-1">
                      Tareas y habilidades adquiridas
                    </h2>
                    <p className="mb-2 text-sm italic">
                      Acciones desarrolladas durante la experiencia en Elecsur,
                      Central de La Plata:
                    </p>
                    <ul className="ml-5 list-disc">
                      <li>Rehabilitación de servicio eléctrico en domicilio</li>
                      <li>Manejo de grúa para instalaciones en altura</li>
                      <li>Manejo de camiones con equipos técnicos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-30">
            <div className="w-80 m-auto flex flex-col gap-5 mt-1">
              <div>
                <h2 className="font-semibold">Formación</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Secundario completo.</li>
                  <li>
                    Capacitación en instalaciones eléctricas y normativa
                    vigente.
                  </li>
                  <li>Formación continua y experiencia práctica en campo.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold">Aptitudes</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>
                    Conocimiento en instalaciones eléctricas domiciliarias y
                    empresariales.
                  </li>
                  <li>
                    Trabajo en altura y manipulación segura de herramientas
                    eléctricas.
                  </li>
                  <li>
                    Capacidad para el uso de aplicaciones móviles para gestión
                    técnica.
                  </li>
                  <li>Buena comunicación y trato con el cliente.</li>
                  <li>
                    Responsabilidad y compromiso en la ejecución de tareas.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold">Información adicional</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Registro de conducir profesional <br /><strong>A.1 A.2 B.1 C.2 D.1 D.3 D.4</strong> </li>
                  <li>Movilidad propia</li>
                  <li>Disponibilidad inmediata</li>
                </ul>
              </div>

              <div className="pb-[1em]">
                <h2 className="font-semibold">Contacto</h2>
                <ul>
                  <li className="flex items-center gap-2">
                    <Mail size={16} /> dmazzella245@gmail.com
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={16} /> 221 622 6401
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={16} /> La Plata, Buenos Aires, Argentina
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
