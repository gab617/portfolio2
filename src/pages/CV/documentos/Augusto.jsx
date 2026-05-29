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

         {/*    <div className="w-28 h-28 rounded-full overflow-hidden border border-green-400">
              <img
                src="./augusto.jpeg"
                alt="Foto de Augusto Cabrera Sirlopú"
                className="w-full h-full object-cover"
              />
            </div> */}

            <div className="flex-1">
              <h1 className="text-3xl font-bold uppercase tracking-wide leading-tight">
                Augusto Cabrera Sirlopú
              </h1>

              <p className="text-base tracking-wide text-neutral-700 mt-1">
                Enfermero Profesional
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-[13px] text-neutral-700">

                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  221 674 5168
                </div>

                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  ac3327172@gmail.com
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  La Plata, Buenos Aires
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 px-8 py-5 flex flex-col">

          {/* PERFIL */}
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2">
              Perfil Profesional
            </h2>

            <p className="text-[13px] leading-relaxed">
              Enfermero recientemente graduado con formación en prácticas
              hospitalarias y experiencia en atención directa al paciente.
              Con conocimientos en procedimientos generales de enfermería,
              control de signos vitales, administración de medicación bajo
              supervisión y asistencia en áreas de guardia. Me destaco por
              la responsabilidad, empatía, compromiso profesional y vocación
              por el cuidado de la salud.
            </p>
          </section>

          {/* EXPERIENCIA */}
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3">
              Experiencia y prácticas hospitalarias
            </h2>

            <div className="space-y-3 text-[13px] leading-relaxed">

              <div>
                <h3 className="font-semibold">
                  Hospital San Martín — Prácticas Integradas Finales (PIF)
                </h3>

                <p>
                  Experiencia práctica en sector Neonatología durante 4 meses,
                  realizando control y registro de signos vitales, retiro de
                  vías periféricas, asistencia en admisión y acompañamiento en
                  tareas generales de enfermería.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Área de guardia y salud mental
                </h3>

                <p>
                  Participación en tareas de asistencia al paciente,
                  acompañamiento, observación clínica y colaboración en
                  procedimientos bajo supervisión profesional.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Cuidados domiciliarios
                </h3>

                <p>
                  Acompañamiento y asistencia a paciente con limitaciones,
                  control de presión arterial, seguimiento del estado general y
                  ayuda en actividades diarias, manteniendo trato humano y
                  responsable.
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
              <li>
                Enfermería Profesional — Escuela de Gobierno en Salud
                “Floreal Ferrara”
              </li>
              <li>Egreso: 2025</li>
              <li>Matrícula profesional: 290031</li>
            </ul>
          </section>

          {/* CAPACITACIÓN */}
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2">
              Capacitación
            </h2>

            <ul className="list-disc pl-5 text-[13px] space-y-2">

              <li>
                <strong>Diplomado Internacional en Reanimación Neonatal</strong>
                {" "}— 64 horas académicas (2026)
                <br />
                Fundamentos de reanimación neonatal, soporte vital básico y
                avanzado neonatal, actualización internacional y aspectos éticos.
              </li>

              <li>
                Curso online — Centro de Capacitación Internacional CRAPTICA
              </li>

            </ul>
          </section>

          {/* HABILIDADES */}
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2">
              Habilidades
            </h2>

            <ul className="list-disc pl-5 text-[13px] grid grid-cols-2 gap-y-1">
              <li>Atención integral del paciente</li>
              <li>Trabajo interdisciplinario</li>
              <li>Control de signos vitales</li>
              <li>Comunicación empática</li>
              <li>Responsabilidad profesional</li>
              <li>Adaptación a guardias</li>
              <li>Vocación de servicio</li>
              <li>Aprendizaje continuo</li>
            </ul>
          </section>

          {/* INFORMACIÓN */}
          <section className="pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2">
              Información adicional
            </h2>

            <ul className="list-disc pl-5 text-[13px] space-y-1">
              <li>Disponibilidad inmediata</li>
              <li>Disponibilidad para turnos rotativos</li>
              <li>Predisposición para incorporación inmediata</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}