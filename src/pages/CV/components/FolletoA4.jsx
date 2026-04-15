import React from "react";
import ReactToPrint from "react-to-print";

export function FolletoA4({ cvRef }) {
  return (
    <div className="w-full max-w-[210mm] mx-auto print-container" ref={cvRef}>
      {/* Container A4 - 210mm width */}
      <div className="bg-white text-black rounded-lg shadow-lg p-8" style={{ minHeight: '297mm' }}>
        {/* Header */}
        <div className="text-center border-b-4 border-teal-500 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-teal-700 mb-2">
            TU TÍTULO AQUÍ
          </h1>
          <p className="text-xl text-gray-600">
            Subtítulo o descripción breve
          </p>
        </div>

        {/* Contenido principal - 2 columnas */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-teal-600 mb-4">
              Sección 1
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Descripción de tu servicio, producto o información principal.
              Este espacio está diseñado para presentar información relevante.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-teal-500">✓</span>
                Característica 1
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-500">✓</span>
                Característica 2
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-500">✓</span>
                Característica 3
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-teal-600 mb-4">
              Sección 2
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Segunda sección con información adicional relevante para el contenido.
            </p>
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Destacado</h3>
              <p className="text-sm">
                Información destacada o dato importante que quieras remarcar.
              </p>
            </div>
          </div>
        </div>

        {/* Servicios o Productos */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
            Servicios / Productos
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold mb-2">Servicio 1</h3>
              <p className="text-sm text-gray-600">Descripción breve</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold mb-2">Servicio 2</h3>
              <p className="text-sm text-gray-600">Descripción breve</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold mb-2">Servicio 3</h3>
              <p className="text-sm text-gray-600">Descripción breve</p>
            </div>
          </div>
        </div>

        {/* Contacto */}
        <div className="bg-teal-50 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">
            Contacto
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-bold">Email:</p>
              <p>tu@email.com</p>
            </div>
            <div>
              <p className="font-bold">Teléfono:</p>
              <p>+54 9 11 1234-5678</p>
            </div>
            <div>
              <p className="font-bold">Dirección:</p>
              <p>Tu dirección aquí</p>
            </div>
            <div>
              <p className="font-bold">Web:</p>
              <p>www.tusitio.com</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-4 border-t border-gray-300 text-sm text-gray-500">
          <p>© 2026 - Tu Nombre - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}

export function FooterFolletoA4({ cvRef }) {
  return (
    <div className="flex justify-between sm:w-80 gap-1 m-auto mb-5 items-center">
      <div className="bg-teal-500 bg-opacity-30 lg:rounded-sm rounded-xl p-2 transform transition-transform duration-300 ease-in-out hover:scale-110">
        <ReactToPrint
          trigger={() => <button>Imprimir en A4</button>}
          content={() => cvRef.current}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Formato A4 Listo</span>
      </div>
    </div>
  );
}