import React from "react";

export function DescriptionCredit() {
  return (
    <div className="lg:w-[50%]">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Créditos</h1>
        <p className="text-lg text-gray-300 font-semibold  mt-2">
          Soluciones financieras rápidas, seguras y sin complicaciones.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
          ¿Por qué elegirnos?
        </h2>
        <ul className="list-disc pl-6 text-lg">
          <li>
            Préstamos flexibles desde <strong>$100,000</strong> hasta{" "}
            <strong>$1,500,000</strong>.
          </li>
          <li>
            Plazos convenientes: <strong>20, 25, 33 o 50 días</strong>.
          </li>
          <li>
            Pagos diarios accesibles para que mantengas el control de tus
            finanzas.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
          Nuestra Filosofía
        </h2>
        <p className="text-gray-300 font-semibold  leading-relaxed">
          Queremos brindarte un servicio{" "}
          <strong>transparente y confiable</strong>, eliminando trámites
          innecesarios. Con nosotros, puedes obtener el dinero que necesitas de
          forma ágil, para que sigas adelante con tus planes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
          Sobre Nosotros
        </h2>
        <p className="text-gray-300 font-semibold  leading-relaxed">
          En <strong>Créditos</strong>, trabajamos para ayudarte a resolver tus
          necesidades financieras con rapidez y confianza. Ofrecemos préstamos
          personales diseñados para adaptarse a tus requerimientos, con opciones
          flexibles y pagos diarios que se ajustan a tu presupuesto.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
          ¿Cómo Funciona?
        </h2>
        <ol className="list-decimal pl-6 text-lg">
          <li>
            <strong>Inicia el proceso:</strong> Contáctanos por WhatsApp y dinos
            cuánto necesitas. Coordinaremos una visita personalizada a tu
            negocio para conocer tus necesidades y situación financiera.
          </li>
          <li>
            <strong>Análisis en sitio:</strong> Nuestro equipo realizará una
            evaluación profesional en tu lugar de trabajo para garantizar que el
            crédito se ajuste perfectamente a tus objetivos comerciales y flujo
            de ingresos.
          </li>
          <li>
            <strong>Aprobación y entrega:</strong> Una vez completado el
            análisis, recibirás tu dinero de manera ágil y segura, con un
            enfoque transparente y personalizado.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
          Contáctanos
        </h2>
        <p className="text-gray-300 font-semibold  leading-relaxed">
          Escríbenos al <strong>221</strong> para más información y empieza a
          disfrutar de nuestros beneficios.
        </p>
        <p className="text-gray-300 font-semibold  leading-relaxed mt-2">
          ¡En <strong>Créditos</strong>, estamos listos para ayudarte a cumplir
          tus metas financieras!
        </p>
      </section>

      <footer className="text-center mt-8">
        <p className="text-sm text-gray-500">
          © 2024 Créditos. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
