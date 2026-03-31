import { Phone, MapPin, Mail } from "lucide-react";

export function CurricVitae({ cvRef }) {
  return (
    <div className="xl:w-80 m-auto mt-2 mb-1 print-container" ref={cvRef}>
      <div className="bg-white text-black rounded-3xl">
        {/* ENCABEZADO */}
        <div className="text-center py-1">
          <div className="bg-pink-300/20 rounded-3xl w-full h-5"></div>

          <div className="flex flex-row items-center justify-center gap-3 bg-purple-200/10 py-2">
            <img
              src="./bellomo.jpeg"
              alt="Foto de Diego Marcelo Mazzella"
              className="rounded-full w-24 h-24 object-cover"
            />
            <h1 className="text-center font-bold text-2xl">
              Agustina Magalí Bellomo
            </h1>
          </div>

          <p className="text-sm font-normal tracking-wide">
            Atención al Público · Auxiliar de Farmacia (en formación)
          </p>
        </div>

        <div className="flex lg:flex-row flex-col font-semibold px-6 pb-4">
          {/* LADO IZQUIERDO */}
          <div className="lg:w-70 pr-4">
            {/* PERFIL */}
            <div className="mb-4">
              <h2 className="font-bold mb-1 uppercase">Perfil</h2>
              <p className="text-sm leading-snug font-normal">
                Experiencia en atención al cliente en ámbito municipal,
                estaciones de servicio y gastronomía. Destaco por trato cordial,
                comunicación clara y resolución de consultas. Acostumbrada a
                trabajar bajo normas y protocolos, con compromiso y
                responsabilidad. Actualmente cursando Auxiliar de Farmacia.
              </p>
            </div>

            {/* EXPERIENCIA */}
            <div>
              <h2 className="font-bold mb-1 uppercase">Experiencia laboral</h2>
              <ul className="list-disc ml-4 text-sm font-normal space-y-2">
                <li>
                  <strong>
                    Municipalidad de La Plata – Área de Prevención
                  </strong>
                  <br />
                  Atención directa y orientación al público, asesoramiento
                  general, resolución de consultas y derivación a áreas
                  correspondientes. Colaboración en tareas administrativas,
                  registro de información y cumplimiento de protocolos. Trabajo
                  constante con ciudadanos, manteniendo trato respetuoso y
                  profesional.
                </li>

                <li>
                  <strong>Playera – Estación de servicio GNC</strong>
                  <br />
                  Atención personalizada al cliente, manejo de cobros y medios
                  de pago, cumplimiento de normas de seguridad y organización
                  del sector de trabajo.
                </li>

                <li>
                  <strong>Moza – Pizzería y eventos</strong>
                  <br />
                  Atención al público en salón y eventos, coordinación con
                  equipo de trabajo y manejo de situaciones de alta demanda,
                  priorizando buena experiencia del cliente.
                </li>
              </ul>
            </div>
          </div>

          {/* LADO DERECHO */}
          <div className="w-30 pl-4">
            <hr className="mb-2 border mt-2" />

            {/* FORMACIÓN */}
            <div className="mb-4">
              <h2 className="font-bold uppercase">Formación</h2>
              <ul className="list-disc pl-5 text-sm font-normal">
                <li>Secundario completo</li>
              </ul>
            </div>

            {/* ESTUDIOS COMPLEMENTARIOS */}
            <div className="mb-4">
              <h2 className="font-bold uppercase">Estudios complementarios</h2>
              <ul className="list-disc pl-5 text-sm font-normal">
                <li>Curso de Azafata</li>
                <li>Auxiliar de Farmacia (en curso)</li>
              </ul>
            </div>

            {/* COMPETENCIAS */}
            <div className="mb-4">
              <h2 className="font-bold uppercase">Competencias</h2>
              <ul className="list-disc pl-5 text-sm font-normal">
                <li>Atención y orientación al cliente</li>
                <li>Resolución de consultas</li>
                <li>Manejo de caja</li>
                <li>Cumplimiento de normas y protocolos</li>
                <li>Trabajo en equipo</li>
              </ul>
            </div>
            {/* IDIOMAS */}
            <div className="mb-4">
              <h2 className="font-bold uppercase">Idiomas</h2>
              <ul className="list-disc pl-5 text-sm font-normal">
                <li>Inglés – Nivel básico</li>
              </ul>
            </div>

            {/* INFORMACIÓN ADICIONAL */}
            <div className="mb-4">
              <h2 className="font-bold uppercase">Información adicional</h2>
              <ul className="list-disc pl-5 text-sm font-normal">
                <li>Disponibilidad full time</li>
                <li>Movilidad propia</li>
                <li>Incorporación inmediata</li>
              </ul>
            </div>

            {/* CONTACTO */}
            <div>
              <h2 className="font-bold uppercase">Contacto</h2>
              <ul className="text-sm font-normal">
                <li className="flex items-center gap-2">
                  <Mail size={16} /> agus-lp@outlook.es
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} /> 221 566 3571
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} /> Berisso, Buenos Aires
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
