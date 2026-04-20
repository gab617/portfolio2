import React, { useRef, useState, useContext } from "react";
import "./Credit.css";
import { ButtonVolver } from "../../components/ButtonVolver";
import { Link } from "react-router-dom";
import { Folleto } from "./Folleto";
import ReactToPrint from "react-to-print";
import { Calculadora } from "./Calculadora";
import {
  TABLA,
  TABLASEMANAL,
  TABLA_REDONDEADA_116_NO_REDONDEADA,
  TABLA_REDONDEADA_116_REDONDEADA,
} from "./tablas";
import { ListadoValores116 } from "./components/ListadoValores116";
import { Context } from "../../Context/Context";

// Tarjeta informativa para cada herramienta
const ToolCard = ({ title, description, icon, children }) => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  return (
    <div 
      className="rounded-xl overflow-hidden mb-6 backdrop-blur-sm"
      style={{ 
        backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
      }}
    >
      <div 
        className="p-4 flex items-center gap-3"
        style={{ 
          backgroundColor: isDark ? 'rgba(40, 40, 40, 0.9)' : 'rgba(240, 240, 240, 0.9)',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
        }}
      >
        <span className="text-2xl">{icon}</span>
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
            {description}
          </p>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

// Generador de casilleros para el cartón de financiación
const casilleros = [];
for (let i = 1; i <= 30; i++) {
  casilleros.push(
    <div
      key={i}
      className="flex font-semibold text-base gap-1"
    >
      <div className="border-2 border-gray-600 w-[38%] h-[3.8em]"></div>
      <div className="flex items-center justify-center w-[10%] border-2 border-gray-600 h-[3.8em] text-center">
        {i}
      </div>
      <div className="border-2 border-gray-600 w-[57%] h-[3.8em]"></div>
    </div>
  );
}

export function Credit() {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  
  const creditsPDFRef = useRef();
  const cartonsitoPDFRef = useRef();
  const [modePay, setModePay] = useState(true);
  const [usarRedondeada, setUsarRedondeada] = useState(true);
  const [activeSection, setActiveSection] = useState('calculadora');

  function changeModePay() {
    setModePay((prev) => !prev);
  }

  const sections = [
    { id: 'calculadora', title: 'Calculadora', icon: '🧮', desc: 'Calcula cuotas y intereses' },
    { id: 'valores', title: 'Tabla de Valores', icon: '📊', desc: 'Valores por cuota' },
    { id: 'volante', title: 'Volante PDF', icon: '📄', desc: 'Genera volantes imprimibles' },
    { id: 'financiacion', title: 'Financiación', icon: '💰', desc: 'Cartón de financiación' },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header 
        className="sticky top-0 z-40 backdrop-blur-md"
        style={{ 
          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
        }}
      >
        <div className="flex justify-between items-center max-w-5xl mx-auto p-4">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h1 className="text-xl font-bold">Herramientas</h1>
          </div>
          <Link to="/">
            <ButtonVolver />
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Introducción */}
        <div 
          className="rounded-xl p-6 mb-8 backdrop-blur-sm"
          style={{ 
            backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
          }}
        >
          <h2 className="text-2xl font-bold mb-3">Recursos para Empresas de Créditos</h2>
          <p 
            className="text-base leading-relaxed"
            style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
          >
            Herramientas profesionales para gestionar préstamos y financiaciones. 
            Incluye calculadora de cuotas, tablas de valores, volantes PDF y cartons de financiación 
            listos para imprimir.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Calculadora interactiva</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>PDFs imprimibles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Listos para usar</span>
            </div>
          </div>
        </div>

        {/* Navegación de secciones */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === section.id 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>

        {/* Calculadora */}
        {activeSection === 'calculadora' && (
          <ToolCard 
            title="Calculadora de Cuotas" 
            description="Calcula el valor de las cuotas según el monto y tasa de interés"
            icon="🧮"
          >
            <Calculadora />
          </ToolCard>
        )}

        {/* Tabla de Valores */}
        {activeSection === 'valores' && (
          <ToolCard 
            title="Tabla de Valores" 
            description="Valores exactos por cantidad de cuotas"
            icon="📊"
          >
            <div className="flex gap-2 justify-center mb-4">
              <button
                onClick={() => setUsarRedondeada(true)}
                className={`px-4 py-2 rounded font-semibold border ${
                  usarRedondeada ? "bg-teal-500 text-white" : "bg-gray-200"
                }`}
              >
                Redondeada
              </button>
              <button
                onClick={() => setUsarRedondeada(false)}
                className={`px-4 py-2 rounded font-semibold border ${
                  !usarRedondeada ? "bg-teal-500 text-white" : "bg-gray-200"
                }`}
              >
                No Redondeada
              </button>
            </div>
            <ListadoValores116 usarRedondeada={usarRedondeada} />
          </ToolCard>
        )}

        {/* Volante PDF */}
        {activeSection === 'volante' && (
          <ToolCard 
            title="Volante PDF" 
            description="Genera volantes profesionales para imprimir"
            icon="📄"
          >
            <div ref={creditsPDFRef} className="flex bg-white">
              <Folleto
                TABLA={
                  usarRedondeada
                    ? TABLA_REDONDEADA_116_REDONDEADA
                    : TABLA_REDONDEADA_116_NO_REDONDEADA
                }
                TABLASEMANAL={TABLASEMANAL}
                changeModePay={changeModePay}
                modePay={modePay}
                usarRedondeada={usarRedondeada}
              />
            </div>
            <div className="flex justify-center mt-4">
              <div className="bg-teal-500 bg-opacity-30 lg:rounded-sm rounded-xl p-2 transform transition-transform duration-300 ease-in-out hover:scale-110">
                <ReactToPrint
                  trigger={() => <button className="font-semibold">Guardar como PDF</button>}
                  content={() => creditsPDFRef.current}
                />
              </div>
            </div>
          </ToolCard>
        )}

        {/* Financiación */}
        {activeSection === 'financiacion' && (
          <ToolCard 
            title="Cartón de Financiación" 
            description="Cartón para gestionar 30 clientes"
            icon="💰"
          >
            <div className="flex flex-col lg:flex-row justify-center gap-7">
              <div
                ref={cartonsitoPDFRef}
                className="w-full items-center bg-white text-black text-center"
                style={{ fontFamily: "'Lato',serif" }}
              >
                <div>
                  <h1
                    style={{
                      background: `linear-gradient(90deg, rgba(238,237,235,1) 54%, rgba(45,45,45,0.8127626050420168) 98%)`,
                    }}
                    className="text-xl p-5 font-semibold mb-2"
                  >
                    FINANCIACIÓN
                  </h1>
                  <div className="flex w-[99%] p-1 font-bold text-start">
                    <div className="grid grid-cols-2 w-[80%]">
                      <div className="flex">
                        <img className="h-[1.3em] w-[1.3em] mr-1" src="/user.png"></img>
                        <h1>CLIENTE: </h1>
                      </div>
                      <h1>CUOTAS: </h1>
                      <div className="flex">
                        <img className="h-[1.3em] w-[1.3em] mr-1" src="/calendar.png"></img>
                        <h1>FECHA INICIO: </h1>
                      </div>
                      <h1>IMPORTE CUOTA: </h1>
                      <div className="flex">
                        <img className="h-[1.3em] w-[1.3em] mr-1" src="/calendar.png"></img>
                        <h1>FECHA VENC.: </h1>
                      </div>
                    </div>
                    <div className="mx-auto w-[20%]">
                      <img className="w-[100%] mx-auto rounded-full" src="/creditsmedia/logo4.png"></img>
                    </div>
                  </div>
                </div>

                <div className="w-[99%] mx-auto mt-2 grid grid-cols-3 gap-3 bg-white text-black">
                  {casilleros.map((casillero) => <>{casillero}</>)}
                </div>

                <div className="mt-5 w-[10%] mx-auto">
                  <img className="" src="/creditsmedia/plants.png"></img>
                </div>

                <hr
                  style={{
                    background: `linear-gradient(90deg, rgba(238,237,235,1) 54%, rgba(45,45,45,0.8127626050420168) 98%)`,
                  }}
                  className="mt-5 p-4"
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <div className="bg-teal-500 bg-opacity-30 lg:rounded-sm rounded-xl p-2 transform transition-transform duration-300 ease-in-out hover:scale-110">
                <ReactToPrint
                  trigger={() => <button className="font-semibold">Guardar como PDF</button>}
                  content={() => cartonsitoPDFRef.current}
                />
              </div>
            </div>
          </ToolCard>
        )}
      </main>
    </div>
  );
}