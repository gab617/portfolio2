import { Phone, MapPin, Mail } from "lucide-react";

export function CurricVitae({ cvRef }) {
  return (
    <div
      className="w-[794px] h-[1123px] mx-auto bg-white text-black print-container overflow-hidden"
      ref={cvRef}
    >
      <div className="h-full border border-neutral-300 overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="px-8 pt-5 pb-4 border-b border-neutral-300">
          <div className="flex items-center gap-5">
            <img
              src="./bellomo.jpeg"
              alt="Foto de Agustina Bellomo"
              className="w-28 h-28 rounded-full object-cover border border-pink-400"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold uppercase tracking-wide leading-tight">
                Agustina Magalí Bellomo
              </h1>

              <p className="text-base tracking-wide text-neutral-700 mt-1">
                Atención al Público · Operaria · Auxiliar de Farmacia
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-[13px] text-neutral-700">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  agus.bellomo22@gmail.com
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  221 566 3571
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  Berisso, Buenos Aires
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 px-8 py-5 flex flex-col">
          <div>
            {/* PERFIL */}
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2">
                Perfil Profesional
              </h2>

              <p className="text-[13px] leading-relaxed">
                Experiencia en atención al cliente, tareas operativas y trabajo
                en entornos de ámbito municipal e industriales. Me destaco
                por la responsabilidad, buena comunicación y capacidad de
                adaptación a distintos entornos laborales. Acostumbrada al
                trabajo en equipo, cumplimiento de horarios y resolución de
                tareas bajo presión. Actualmente me encuentro en formación como
                Auxiliar de Farmacia.
              </p>
            </section>

            {/* EXPERIENCIA */}
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3">
                Experiencia Laboral
              </h2>

              <div className="space-y-3 text-[13px] leading-relaxed">
                <div>
                  <h3 className="font-semibold">
                    Municipalidad de La Plata — Área de Prevención
                  </h3>

                  <p>
                    Atención directa y orientación al público, asesoramiento
                    general, resolución de consultas y derivación a áreas
                    correspondientes. Colaboración en tareas administrativas,
                    registro de información y cumplimiento de protocolos.
                    Trabajo constante con ciudadanos, manteniendo trato
                    respetuoso y profesional.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Operaria en paradas de planta — Empresas Alsina y Tisico
                  </h3>

                  <p>
                    Tareas de apoyo operativo y mantenimiento industrial,
                    organización de materiales, asistencia al personal técnico y
                    cumplimiento de normas de seguridad e higiene dentro del
                    área de trabajo.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Playera — Estación de servicio GNC
                  </h3>

                  <p>
                    Atención al cliente, manejo de cobros y medios de pago,
                    mantenimiento del orden del sector y cumplimiento de normas
                    de seguridad.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Moza — Pizzería y eventos</h3>

                  <p>
                    Atención al público en salón y eventos, coordinación con el
                    equipo de trabajo y manejo de situaciones de alta demanda, priorizando buena experiencia del cliente.
                  </p>
                </div>
              </div>
            </section>

            {/* FORMACIÓN */}
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2">
                Formación
              </h2>

              <ul className="list-disc pl-5 text-[13px] space-y-1">
                <li>Secundario completo</li>
                <li>Curso de Azafata</li>
                <li>Curso de Manipulación de Alimentos</li>
                <li>Auxiliar de Farmacia (en curso)</li>
              </ul>
            </section>

            {/* COMPETENCIAS */}
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2">
                Competencias
              </h2>

              <ul className="list-disc pl-5 text-[13px] grid grid-cols-2 gap-y-1">
                <li>Atención al cliente</li>
                <li>Trabajo en equipo</li>
                <li>Manejo de caja</li>
                <li>Resolución de consultas</li>
                <li>Responsabilidad y compromiso</li>
                <li>Buena comunicación</li>
                <li>Cumplimiento de protocolos</li>
                <li>Adaptabilidad laboral</li>
              </ul>
            </section>
          </div>

          {/* INFORMACIÓN */}
          <section className="pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2">
              Información adicional
            </h2>

            <ul className="list-disc pl-5 text-[13px] space-y-1">
              <li>Disponibilidad full time</li>
              <li>Movilidad propia</li>
              <li>Incorporación inmediata</li>
              <li>Inglés básico</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
