import React, { useState, useMemo, useContext, useEffect } from "react";
import {
  TABLA_REDONDEADA_116_REDONDEADA,
  TABLA_REDONDEADA_116_NO_REDONDEADA,
} from "../tablas";
import { Context } from "../../../Context/Context";

const ITEMS_PER_PAGE = 20;

export function ListadoValores116() {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  
  // Estados con persistencia
  const [selectedCredito, setSelectedCredito] = useState(() => {
    const saved = localStorage.getItem('nwPortf_valores_selected');
    return saved ? JSON.parse(saved) : null;
  });
  const [usarRedondeada, setUsarRedondeada] = useState(() => {
    const saved = localStorage.getItem('nwPortf_valores_redondeada');
    return saved !== null ? saved === 'true' : true;
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('nwPortf_valores_page');
    return saved ? parseInt(saved) : 1;
  });
  const [filtro, setFiltro] = useState(() => {
    const saved = localStorage.getItem('nwPortf_valores_filtro');
    return saved || "";
  });
  const [busquedaActiva, setBusquedaActiva] = useState(() => {
    const saved = localStorage.getItem('nwPortf_valores_busq');
    return saved === 'true';
  });

  // Persistir cambios
  useEffect(() => {
    if (selectedCredito) {
      localStorage.setItem('nwPortf_valores_selected', JSON.stringify(selectedCredito));
    } else {
      localStorage.removeItem('nwPortf_valores_selected');
    }
  }, [selectedCredito]);
  
  useEffect(() => {
    localStorage.setItem('nwPortf_valores_redondeada', usarRedondeada.toString());
  }, [usarRedondeada]);
  
  useEffect(() => {
    localStorage.setItem('nwPortf_valores_page', currentPage.toString());
  }, [currentPage]);
  
  useEffect(() => {
    localStorage.setItem('nwPortf_valores_filtro', filtro);
  }, [filtro]);
  
  useEffect(() => {
    localStorage.setItem('nwPortf_valores_busq', busquedaActiva.toString());
  }, [busquedaActiva]);

  // Elegimos la tabla según el estado
  const tablaActual = usarRedondeada
    ? TABLA_REDONDEADA_116_REDONDEADA
    : TABLA_REDONDEADA_116_NO_REDONDEADA;

  // Filtrar créditos según búsqueda - mejorado
  const tablaFiltrada = useMemo(() => {
    if (!filtro) return tablaActual;
    
    // Limpiar el input de búsqueda
    const filtroNum = parseInt(filtro.replace(/\D/g, ""));
    if (isNaN(filtroNum) || filtroNum < 100) return tablaActual;
    
    setBusquedaActiva(true);
    
    // Buscar el monto exacto o los más cercanos
    const montoEncontrado = tablaActual.find(item => item.credito === filtroNum);
    
    if (montoEncontrado) {
      // Si encuentra exacto, mostrar solo ese
      return [montoEncontrado];
    } else {
      // Buscar los 5 más cercanos hacia arriba y abajo
      const todosMenos = tablaActual.filter(item => item.credito !== filtroNum);
      const cercanos = [...tablaActual]
        .sort((a, b) => Math.abs(a.credito - filtroNum) - Math.abs(b.credito - filtroNum))
        .slice(0, 10);
      
      // Eliminar duplicados y limitar a 10
      const unicos = [];
      const seen = new Set();
      for (const item of cercanos) {
        if (!seen.has(item.credito)) {
          seen.add(item.credito);
          unicos.push(item);
        }
      }
      return unicos;
    }
  }, [tablaActual, filtro]);

  // Paginación
  const totalPages = Math.ceil(tablaFiltrada.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const tablaPaginada = tablaFiltrada.slice(startIndex, endIndex);

  // Rango actual
  const rangoInicio = tablaFiltrada[startIndex]?.creditoStr || "-";
  const rangoFin = tablaFiltrada[Math.min(endIndex, tablaFiltrada.length) - 1]?.creditoStr || "-";
  const totalRegistros = tablaFiltrada.length;

  // Limpiar búsqueda
  const limpiarBusqueda = () => {
    setFiltro("");
    setBusquedaActiva(false);
    setCurrentPage(1);
    setSelectedCredito(null);
  };

  return (
    <div className="flex flex-col">
      {/* Filtro de búsqueda */}
      <div className="mb-4 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => { setUsarRedondeada(true); setCurrentPage(1); limpiarBusqueda(); }}
            className={`px-4 py-2 rounded font-medium transition ${
              usarRedondeada && !busquedaActiva
                ? "bg-teal-500 text-white"
                : "bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200"
            }`}
          >
            Redondeada
          </button>
          <button
            onClick={() => { setUsarRedondeada(false); setCurrentPage(1); limpiarBusqueda(); }}
            className={`px-4 py-2 rounded font-medium transition ${
              !usarRedondeada && !busquedaActiva
                ? "bg-teal-500 text-white"
                : "bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200"
            }`}
          >
            No Redondeada
          </button>
        </div>
        
        {/* Input de búsqueda */}
        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <div className="relative flex-1">
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar monto..."
              value={filtro}
              onChange={(e) => { setFiltro(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-base"
              style={{ 
                backgroundColor: isDark ? 'rgba(20,20,20,0.8)' : 'white',
                borderColor: isDark ? '#374151' : '#d1d5db',
                color: isDark ? '#e5e7eb' : '#1f2937'
              }}
            />
            {filtro && (
              <button
                onClick={limpiarBusqueda}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-500/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Información de resultados */}
      <div className="mb-3 text-sm flex justify-between items-center"
        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
      >
        <span>
          {busquedaActiva 
            ? `🔍 Resultados para: $${parseInt(filtro.replace(/\D/g, "") || 0).toLocaleString("es-AR")}`
            : `Mostrando ${tablaPaginada.length} de ${totalRegistros} créditos`
          }
        </span>
        {busquedaActiva && (
          <button 
            onClick={limpiarBusqueda}
            className="text-teal-500 hover:underline text-sm"
          >
            Ver todos
          </button>
        )}
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Columna izquierda: lista de créditos con scroll */}
        <div className="lg:w-1/3 border rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
          <div 
            className="p-3 sticky top-0"
            style={{ 
              backgroundColor: isDark ? 'rgba(40,40,40,0.95)' : 'rgba(245,245,245,0.95)',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            }}
          >
            <h2 className="font-bold text-base">
              {busquedaActiva ? "Resultados" : `Montos (${rangoInicio} - ${rangoFin})`}
            </h2>
            <p className="text-sm" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
              {busquedaActiva ? `${tablaFiltrada.length} encontrados` : 'Click para ver opciones'}
            </p>
          </div>
          <div className="grid grid-cols-2">
            {tablaPaginada.length > 0 ? (
              tablaPaginada.map((item) => (
                <div
                  key={item.credito}
                  onClick={() => setSelectedCredito(item)}
className={`cursor-pointer p-3 text-base md:text-sm transition ${
                selectedCredito?.credito === item.credito 
                  ? "bg-teal-500/20" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
                >
                  ${item.creditoStr}
                </div>
              ))
            ) : (
              <div className="col-span-2 p-4 text-center" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                No se encontraron resultados
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha: panel de detalles */}
        <div 
          className="lg:w-2/3 border rounded-lg p-4"
          style={{ 
            backgroundColor: isDark ? 'rgba(30,30,30,0.8)' : 'white',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}
        >
          {selectedCredito ? (
            <>
              <h2 className="text-xl font-bold mb-4">
                Opciones para ${selectedCredito.creditoStr}
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr 
                      className="text-base"
                      style={{ backgroundColor: isDark ? 'rgba(50,50,50,0.9)' : '#f3f4f6' }}
                    >
                      <th className="text-left p-3 border">Días</th>
                      <th className="text-left p-3 border">Cuota/Día</th>
                      <th className="text-left p-3 border">Total a Pagar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCredito.dias.map((d) => (
                      <tr
                        key={d.dias}
                        className={`border-b transition ${
                          d.dias === 30 
                            ? "bg-teal-500/20" 
                            : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="p-3 border text-base">
                          {d.dias} días
                          {d.dias === 30 && (
                            <span className="ml-2 text-xs px-2 py-0.5 rounded bg-teal-500 text-white font-medium">
                              mensual
                            </span>
                          )}
                        </td>
                        <td className="p-3 border font-medium text-teal-500 text-base">
                          ${d.valorPorDia.toLocaleString("es-AR")}
                        </td>
                        <td className="p-3 border text-base">
                          ${(d.dias * d.valorPorDia).toLocaleString("es-AR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Resumen */}
              <div 
                className="mt-4 p-3 rounded-lg"
                style={{ backgroundColor: isDark ? 'rgba(20,100,80,0.3)' : 'rgba(20,184,166,0.1)' }}
              >
                <p className="text-base md:text-sm">
                  <span className="font-medium">Nota: </span>
                  <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    Tasa del 1.1667% diario. Valores redondeados a múltiplos de {usarRedondeada ? 500 : 100}.
                  </span>
                </p>
              </div>
            </>
          ) : (
            <div 
              className="text-center p-8"
              style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
            >
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">Selecciona un monto para ver sus opciones</p>
              <p className="text-sm mt-2">Haz clic en cualquier valor de la lista o usa el buscador</p>
            </div>
          )}
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && !busquedaActiva && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            ← Anterior
          </button>
          
          <span className="px-3 py-1">
            {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}