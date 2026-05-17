import { Phone, MapPin, Mail } from "lucide-react";

export function CurricVitae({ cvRef }) {
  return (
    <div className="print-container mx-auto" ref={cvRef}>
      <div className="bg-white text-black px-8 py-5">
        {/* HEADER */}
        <div className="mb-3">
          <div className="mb-3 flex items-center gap-4">
            <img
              src="./carlos.jpeg"
              alt="Foto de Carlos Quiroga"
              className="w-[8rem] h-[8rem] object-cover rounded-full border"
            />

            <div>
              <h1 className="text-2xl font-bold uppercase">
                Carlos Alberto Quiroga
              </h1>
              <p className="text-sm tracking-wide">
                Electricista · Refrigeración · Mantenimiento
              </p>
            </div>
          </div>

          <div className="flex gap-4 text-sm mt-1 flex-wrap">
            <span className="flex items-center gap-1">
              <Mail size={14} /> katu.1998.11@gmail.com
            </span>
            <span className="flex items-center gap-1">
              <Phone size={14} /> 221 2214754 / 221 6564084
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> La Plata, Buenos Aires
            </span>
          </div>

          <hr className="mt-2 border-black/30" />
        </div>

        {/* PERFIL */}
        <div className="mb-3">
          <h2 className="font-bold uppercase text-sm mb-1">Perfil</h2>
          <p className="text-sm leading-snug">
            Electricista con experiencia desde 2018 en trabajos autónomos y en
            empresas, con sólidos conocimientos en instalaciones eléctricas
            domiciliarias, comerciales e industriales, así como mantenimiento de
            alumbrado público. Experiencia en diagnóstico y resolución de
            fallas, cableado, montaje y cumplimiento de normas de seguridad. Con
            formación y práctica en sistemas de refrigeración y aire
            acondicionado. Perfil versátil con experiencia en atención al
            cliente, logística y manejo de depósitos, destacando por la
            capacidad de adaptación y aprendizaje.
          </p>
        </div>

        {/* EXPERIENCIA */}
        <div className="mb-3">
          <h2 className="font-bold uppercase text-sm mb-1">
            Experiencia laboral
          </h2>

          <div className="space-y-2 text-sm">
            <div>
              <p className="font-semibold">
                Ayudante de Refrigeración (2025 – Actualidad)
              </p>
              <p>
                Diagnóstico y reparación de sistemas de refrigeración comercial
                y familiar. Mantenimiento preventivo y correctivo de equipos de
                aire acondicionado. Instalación de nuevas unidades de
                climatización y asistencia en servicio técnico.
              </p>
            </div>

            <div>
              <p className="font-semibold">
                Electricista – Lesko (2023 – 2025)
              </p>
              <p>
                Mantenimiento y reparación de sistemas de alumbrado público,
                asegurando la operatividad de la red y el cumplimiento de
                condiciones de seguridad. Intervenciones en vía pública y
                control de funcionamiento general.
              </p>
            </div>

            <div>
              <p className="font-semibold">
                Electricista – Elecsur (2021 – 2023)
              </p>
              <p>
                Ejecución de instalaciones eléctricas completas en entornos
                domiciliarios, comerciales e industriales. Detección precisa y
                resolución eficiente de fallas. Trabajo en equipo en tareas de
                cableado, montaje y puesta en marcha de sistemas.
              </p>
            </div>

            <div>
              <p className="font-semibold">
                Electricista Autónomo (2018 – 2021)
              </p>
              <p>
                Desarrollo de trabajos eléctricos para clientes particulares y
                pequeños comercios, incluyendo instalación, mantenimiento y
                reparación. Gestión integral de tareas, desde presupuestos hasta
                finalización del servicio.
              </p>
            </div>

            <div>
              <p className="font-semibold">Atención al cliente (2017 – 2021)</p>
              <p>
                Experiencia en comercios (kiosco, rotisería, supermercado),
                realizando manejo de caja, reposición y organización de
                mercadería, además de atención directa al cliente.
              </p>
            </div>
          </div>
        </div>

        {/* FORMACIÓN */}
        <div className="mb-3">
          <h2 className="font-bold uppercase text-sm mb-1">Formación</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>
              Electricista Montador e Instalador — Centro de Formación
              Profesional 401
            </li>
            <li>Secundario completo</li>
          </ul>
        </div>

        {/* HABILIDADES */}
        <div className="mb-3">
          <h2 className="font-bold uppercase text-sm mb-1">Habilidades</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>
              Instalaciones eléctricas (domiciliarias, comerciales e
              industriales)
            </li>
            <li>Mantenimiento de alumbrado público</li>
            <li>Diagnóstico y reparación de averías eléctricas</li>
            <li>Sistemas de refrigeración y aire acondicionado</li>
            <li>Cableado y montaje eléctrico</li>
            <li>Manejo de herramientas eléctricas y de medición</li>
            <li>Carga, descarga y organización de depósitos</li>
            <li>Atención al cliente y trabajo en equipo</li>
          </ul>
        </div>

        {/* INFO */}
        <div>
          <h2 className="font-bold uppercase text-sm mb-1">
            Información adicional
          </h2>
          <ul className="list-disc pl-5 text-sm">
            <li>Licencias de conducir: B1 y A3</li>
            <li>Disponibilidad inmediata</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
