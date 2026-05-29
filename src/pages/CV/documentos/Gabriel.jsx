import { Phone, MapPin, Mail } from "lucide-react";

export function CurricVitae({ cvRef }) {
  return (
    <div className="print-container mx-auto" ref={cvRef}>
      <div className="bg-white text-black px-8 py-5">
        {/* HEADER */}
        <div className="mb-3">
          <h1 className="text-2xl font-bold uppercase">
            Gabriel Cabrera Sirlopú
          </h1>

          <p className="text-sm tracking-wide">
            Desarrollador Frontend / Full Stack
          </p>

          <div className="flex gap-4 text-sm mt-1 flex-wrap">
            <span className="flex items-center gap-1">
              <Mail size={14} /> rengav6174@gmail.com
            </span>

            <span className="flex items-center gap-1">
              <MapPin size={14} /> La Plata, Buenos Aires
            </span>
          </div>

          <p className="text-sm mt-1">
            Portfolio: portfolio-gab-zeta.vercel.app
          </p>

          <hr className="mt-2 border-black/30" />
        </div>

        {/* PERFIL */}
        <div className="mb-3">
          <h2 className="font-bold uppercase text-sm mb-1">
            Perfil profesional
          </h2>

          <p className="text-sm leading-snug">
            Desarrollador de software con experiencia en creación de
            aplicaciones web, móviles y sistemas de escritorio. Desarrollo
            soluciones completas integrando frontend, backend y bases de datos,
            desde el diseño funcional hasta la implementación y despliegue.
            Trabajo con React, React Native, Node.js, Express y MySQL, aplicando
            lógica de negocio, arquitectura de datos e integración de APIs.
            Incorporo herramientas de inteligencia artificial para acelerar
            análisis, planificación y desarrollo técnico.
          </p>
        </div>

        {/* EXPERIENCIA DEV */}
        <div className="mb-3">
          <h2 className="font-bold uppercase text-sm mb-1">
            Experiencia en desarrollo
          </h2>

          <p className="text-sm font-semibold">
            Desarrollo independiente
          </p>

          <p className="text-sm leading-snug">
            Diseño y desarrollo de aplicaciones web y móviles, implementación de
            frontend con React/React Native y backend con Node.js, Express y
            MySQL. Creación de sistemas completos con autenticación, APIs,
            sockets, gestión de usuarios y despliegue.
          </p>
<ul className="list-disc pl-5 text-sm mt-2 grid grid-cols-2 gap-x-8 gap-y-1">
  <li>React / React Native</li>
  <li>Node.js / Express</li>
  <li>MySQL y modelado relacional</li>
  <li>Diseño y estructura de bases de datos</li>
  <li>Integración de APIs REST</li>
  <li>Consumo de servicios externos</li>
  <li>WebSockets en tiempo real</li>
  <li>Gestión de estado global</li>
  <li>Hooks y Context API</li>
  <li>Componentización escalable</li>
  <li>Diseño responsive</li>
  <li>UI/UX orientada a producto</li>
  <li>Despliegue y mantenimiento</li>
  <li>Arquitectura de aplicaciones</li>
</ul>
        </div>

        {/* EXPERIENCIA LABORAL */}
        <div className="mb-3">
          <h2 className="font-bold uppercase text-sm mb-1">
            Experiencia complementaria
          </h2>

          <p className="text-sm font-semibold">
            Albano Cozzuol S.A. — Autocontrol de Producción (2018 – 2023)
          </p>

          <ul className="list-disc pl-5 text-sm">
            <li>Control de calidad y clasificación de producción</li>
            <li>Lectura y gestión de planillas técnicas</li>
            <li>Reporte diario de resultados y defectos</li>
            <li>Optimización de procesos</li>
            <li>Capacitación de personal nuevo</li>
            <li>Organización operativa y priorización de tareas</li>
          </ul>
        </div>

        {/* FORMACIÓN */}
        <div className="mb-3">
          <h2 className="font-bold uppercase text-sm mb-1">Formación</h2>

          <ul className="list-disc pl-5 text-sm">
            <li>
              EET N°6 Albert Thomas — Técnico con orientación en Electrónica
            </li>
            <li>UNLP — Informática (3 años)</li>
            <li>Formación autodidacta continua en desarrollo web y mobile</li>
          </ul>
        </div>

        {/* COMPETENCIAS */}
        <div className="mb-3">
          <h2 className="font-bold uppercase text-sm mb-1">Competencias</h2>

          <ul className="list-disc pl-5 text-sm">
            <li>Resolución práctica de problemas</li>
            <li>Integración de tecnologías</li>
            <li>Diseño y arquitectura de soluciones</li>
            <li>Comunicación efectiva</li>
            <li>Aprendizaje continuo</li>
            <li>Pensamiento analítico</li>
            <li>Optimización y escalabilidad</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
