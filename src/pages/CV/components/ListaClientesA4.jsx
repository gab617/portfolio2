import React from "react";
import ReactToPrint from "react-to-print";

// Lista optimizada para máxima cantidad en A4
const datosVacios = Array.from({ length: 45 }, (_, i) => ({
  nombre: "",
  telefono: "",
  pago: "",
}));

export function ListaClientesA4({ cvRef }) {
  return (
    <div className="w-full max-w-[210mm] mx-auto print-container" ref={cvRef}>
      {/* Container A4 exacto - padding mínimo */}
      <div 
        className="bg-white text-black"
        style={{ minHeight: '297mm', width: '210mm', padding: '4mm 5mm' }}
      >
        {/* Header compacto */}
        <div className="text-center mb-2">
          {/* Logo y título */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 flex-shrink-0">
              <img 
                src="./uniexo.png" 
                alt="Logo" 
                className="w-full h-full object-center rounded-full"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="text-center flex gap-1">
              <h1 
                className="text-xl font-bold tracking-[0.2em]"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                UNIVERSO EXOTIC
              </h1>
              <p 
                className="text-sm tracking-[0.3em] text-gray-800 mt-0.5"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                EVENTO
              </p>
            </div>
          </div>
          
          {/* Divisor mini */}
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>
        </div>

        {/* Tabla optimizada - filas mínimas */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black">
              <th className="py-1 text-left text-[9px] font-bold uppercase tracking-wider w-8">
                N°
              </th>
              <th className="py-1 text-left text-[9px] font-bold uppercase tracking-wider">
                Invitado
              </th>
              <th className="py-1 text-left text-[9px] font-bold uppercase tracking-wider w-24">
                Teléfono
              </th>
              <th className="py-1 text-center text-[9px] font-bold uppercase tracking-wider w-12">
                Efec.
              </th>
              <th className="py-1 text-center text-[9px] font-bold uppercase tracking-wider w-12">
                Transf.
              </th>
            </tr>
          </thead>
          <tbody>
            {datosVacios.map((_, index) => (
              <tr key={index} className="border-b border-gray-150">
                <td className="py-0.5 px-0.5 text-[8px] text-gray-400 align-top font-medium">
                  {index + 1}
                </td>
                <td className="py-0.5">
                  <div className="h-4 border-b border-dotted border-gray-300 w-full"></div>
                </td>
                <td className="py-0.5">
                  <div className="h-4 border-b border-dotted border-gray-300 w-full"></div>
                </td>
                <td className="py-0.5 text-center">
                  <div className="w-2.5 h-2.5 border border-gray-400 mx-auto rounded-sm"></div>
                </td>
                <td className="py-0.5 text-center">
                  <div className="w-2.5 h-2.5 border border-gray-400 mx-auto rounded-sm"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer mínimo */}
        <div className="mt-2 pt-1">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 max-w-[60px] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <span 
              className="text-[7px] text-gray-600 tracking-widest uppercase"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Rengav adm
            </span>
            <div className="flex-1 max-w-[60px] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FooterListaClientes({ cvRef }) {
  return (
    <div className="flex justify-between sm:w-80 gap-1 m-auto mb-5 items-center">
      <div className="bg-gray-800 lg:rounded-sm rounded-xl p-2 transform transition-transform duration-300 ease-in-out hover:scale-110">
        <ReactToPrint
          trigger={() => <button className="text-white text-sm">Imprimir</button>}
          content={() => cvRef.current}
        />
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>45 registros</span>
      </div>
    </div>
  );
}