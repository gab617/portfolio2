import { Phone, MapPin, Mail } from "lucide-react";

export function CurricVitae({ cvRef }) {
  return (
    <div className="xl:w-80 m-auto mt-2 mb-1 print-container" ref={cvRef}>
      <div className="bg-white text-black rounded-3xl">

        {/* ENCABEZADO */}
        <div className="text-center py-1">
          <div className="bg-green-300/20 rounded-3xl w-full h-5"></div>
          <h1 className="font-bold text-2xl uppercase">
            Augusto Cabrera Sirlopú
          </h1>
          <p className="text-lg font-normal tracking-wide">
            Enfermero Profesional
          </p>
        </div>

        <div className="flex lg:flex-row flex-col font-semibold px-6 pb-4">

          {/* LADO IZQUIERDO */}
          <div className="lg:w-70 pr-4">

            {/* PERFIL */}
            <div className="mb-4">
              <h2 className="font-bold mb-1 uppercase">Perfil</h2>
              <p className="text-sm leading-snug font-normal">
                Enfermero recientemente graduado con formación en prácticas
                hospitalarias y experiencia en atención directa al paciente.
                Cuento con conocimientos en procedimientos básicos de enfermería,
                control de signos vitales y asistencia en entornos de guardia.
                Me destaco por mi responsabilidad, compromiso y vocación por el
                cuidado de la salud.
              </p>
            </div>

            {/* PRÁCTICAS */}
            <div className="mb-4">
              <h2 className="font-bold mb-1 uppercase">
                Prácticas hospitalarias
              </h2>
              <p className="text-sm font-normal mb-1">
                <strong>Hospital San Martín</strong>
              </p>
              <ul className="list-disc ml-4 text-sm font-normal">
                <li>Prácticas Integradas Finales (PIF) sector Neonatología — 4 meses</li>
                <li>Retiro de vías periféricas</li>
                <li>Control y registro de signos vitales</li>
                <li>Administración de medicación bajo supervisión</li>
                <li>Admisión y asistencia en área de guardia</li>
                <li>Cuidados generales de enfermería</li>
                <li>Intervención en área de salud mental</li>
              </ul>
            </div>

            {/* EXPERIENCIA */}
            <div>
              <h2 className="font-bold mb-1 uppercase">Experiencia</h2>
              <ul className="list-disc ml-4 text-sm font-normal">
                <li>
                  <strong>Cuidados domiciliarios</strong> — acompañamiento a
                  paciente con limitaciones, control de presión arterial,
                  seguimiento del estado general y asistencia en actividades
                  diarias.
                </li>
              </ul>
            </div>
          </div>

          {/* LADO DERECHO */}
          <div className="w-30 pl-4">

            {/* FORMACIÓN */}
            <div className="mb-4">
              <h2 className="font-bold uppercase">Formación</h2>
              <ul className="list-disc pl-5 text-sm font-normal">
                <li>
                  Enfermería Profesional — Escuela de Gobierno en Salud
                  "Floreal Ferrara"
                </li>
                <li>Egreso: 2025</li>
              </ul>
            </div>

            {/* CAPACITACIÓN */}
            <div className="mb-4">
              <h2 className="font-bold uppercase">Capacitación</h2>
              <ul className="list-disc pl-5 text-sm font-normal">
                <li>
                  <strong>Diplomado en Reanimación Neonatal</strong> — 64 hs
                  (2026)
                  <br />
                  <span className="text-xs">
                    Soporte vital básico y avanzado, actualización en prácticas
                    neonatales.
                  </span>
                </li>
                <li>
                  Curso online — Centro de Capacitación Internacional CRAPTICA
                </li>
              </ul>
            </div>

            {/* HABILIDADES */}
            <div className="mb-4">
              <h2 className="font-bold uppercase">Habilidades</h2>
              <ul className="list-disc pl-5 text-sm font-normal">
                <li>Atención integral del paciente</li>
                <li>Trabajo en equipo interdisciplinario</li>
                <li>Responsabilidad y ética profesional</li>
                <li>Comunicación empática</li>
                <li>Adaptación a entornos de guardia</li>
              </ul>
            </div>

            {/* INFORMACIÓN */}
            <div className="mb-4">
              <h2 className="font-bold uppercase">Información adicional</h2>
              <ul className="list-disc pl-5 text-sm font-normal">
                <li>Matrícula profesional: 290031</li>
                <li>Disponibilidad inmediata</li>
                <li>Disponibilidad para turnos rotativos</li>
              </ul>
            </div>

            {/* CONTACTO */}
            <div>
              <h2 className="font-bold uppercase">Contacto</h2>
              <ul className="text-sm font-normal">
                <li className="flex items-center gap-2">
                  <Phone size={16} /> 2216745168
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} /> La Plata, Buenos Aires
                </li><li className="flex items-center gap-2">
                  <Mail size={16} /> ac3327172@gmail.com
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}