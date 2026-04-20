/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import { endPointsProjects } from "../../assets/jsonData.json";
import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { ButtonVolver } from "../../components/ButtonVolver";
import "./Apis.css";

// Modal para mostrar respuesta de la API
const ResponseModal = ({ isOpen, onClose, response, loading, error, url }) => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ 
          backgroundColor: isDark ? 'rgba(20, 20, 20, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
        }}
      >
        {/* Header del modal */}
        <div 
          className="flex items-center justify-between p-4 shrink-0"
          style={{ 
            backgroundColor: isDark ? 'rgba(40, 40, 40, 0.9)' : 'rgba(240, 240, 240, 0.9)',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
          }}
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-bold">Respuesta de la API</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-500/20 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Info de la solicitud */}
        <div 
          className="px-4 py-3 shrink-0 flex flex-wrap gap-4 text-sm"
          style={{ 
            backgroundColor: isDark ? 'rgba(30, 30, 30, 0.5)' : 'rgba(245, 245, 245, 0.5)',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
          }}
        >
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-green-500 text-white">GET</span>
          </div>
          <code 
            className="text-xs px-2 py-1 rounded"
            style={{ 
              backgroundColor: isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(220, 220, 220, 0.8)',
              color: isDark ? '#86efac' : '#16a34a'
            }}
          >
            {url}
          </code>
        </div>

        {/* Contenido del modal con scroll */}
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Cargando...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-500 font-medium">Error en la solicitud</p>
              <p className="text-sm mt-2" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>{error}</p>
            </div>
          ) : (
            <pre 
              className="text-sm font-mono whitespace-pre-wrap break-all"
              style={{ 
                color: isDark ? '#e5e7eb' : '#1f2937',
                backgroundColor: isDark ? 'rgba(10, 10, 10, 0.5)' : 'rgba(240, 240, 240, 0.5)',
                padding: '1rem',
                borderRadius: '0.5rem'
              }}
            >
              {JSON.stringify(response, null, 2)}
            </pre>
          )}
        </div>

        {/* Footer del modal */}
        <div 
          className="p-4 shrink-0 flex justify-end gap-3"
          style={{ 
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
          }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ 
              backgroundColor: isDark ? 'rgba(60, 60, 60, 0.8)' : 'rgba(220, 220, 220, 0.8)',
              color: isDark ? '#e5e7eb' : '#374151'
            }}
          >
            Cerrar
          </button>
          {!error && !loading && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(response, null, 2));
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copiar JSON
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente para cada API
const ApiCard = ({ apiKey, apiData }) => {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  const [isExpanded, setIsExpanded] = useState(false);
  const [paramValues, setParamValues] = useState({});

  // Estado del modal
  const [modalState, setModalState] = useState({
    isOpen: false,
    response: null,
    loading: false,
    error: null,
    url: ''
  });

  const hasParam = (url) => url.includes('/:');
  
  const getParamName = (url) => {
    const match = url.match(/:(\w+)/);
    return match ? match[1] : '';
  };

  const handleParamChange = (url, value) => {
    setParamValues(prev => ({ ...prev, [url]: value }));
  };

  const buildFullUrl = (endpointUrl) => {
    if (!hasParam(endpointUrl)) {
      return `${apiData.api}${endpointUrl}`;
    }
    const paramValue = paramValues[endpointUrl];
    const urlWithParam = endpointUrl.replace(/:(\w+)/, paramValue || '');
    return `${apiData.api}${urlWithParam}`;
  };

  const openModal = (response, loading, error, url) => {
    setModalState({ isOpen: true, response, loading, error, url });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, response: null, loading: false, error: null, url: '' });
  };

  const handleTestEndpoint = async (endpoint) => {
    const fullUrl = buildFullUrl(endpoint.url[0]);
    
    if (hasParam(endpoint.url[0]) && !paramValues[endpoint.url[0]]) {
      openModal(null, false, `Por favor ingresa el valor del parâmetro ${getParamName(endpoint.url[0])}`, fullUrl);
      return;
    }

    openModal(null, true, null, fullUrl);

    try {
      const response = await fetch(fullUrl);
      const data = await response.json();
      openModal(data, false, null, fullUrl);
    } catch (error) {
      openModal(null, false, error.message, fullUrl);
    }
  };

  return (
    <>
      <ResponseModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal}
        response={modalState.response}
        loading={modalState.loading}
        error={modalState.error}
        url={modalState.url}
      />
    
      <div 
        className="rounded-xl overflow-hidden mb-6 backdrop-blur-sm"
        style={{ 
          backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
        }}
      >
        {/* Header de la API */}
        <div 
          className="p-4 cursor-pointer flex items-center justify-between"
          style={{ 
            backgroundColor: isDark ? 'rgba(40, 40, 40, 0.9)' : 'rgba(240, 240, 240, 0.9)' 
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <h2 className="text-lg font-bold">{apiData.title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <code 
              className="text-sm px-2 py-1 rounded hidden sm:block"
              style={{ 
                backgroundColor: isDark ? 'rgba(20, 20, 20, 0.8)' : 'rgba(220, 220, 220, 0.8)',
                color: isDark ? '#86efac' : '#16a34a'
              }}
            >
              {apiData.api}
            </code>
            <svg 
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Endpoints */}
        {isExpanded && (
          <div className="p-4 space-y-4">
            {apiData.endpoints.map((endpoint, idx) => {
              const needsParam = hasParam(endpoint.url[0]);
              const paramName = getParamName(endpoint.url[0]);
              
              return (
                <div 
                  key={idx}
                  className="rounded-lg p-4"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(20, 20, 20, 0.5)' : 'rgba(245, 245, 245, 0.5)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
                  }}
                >
                  {/* Método y ruta */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span 
                      className="px-2 py-1 text-xs font-bold rounded"
                      style={{ backgroundColor: '#10b981', color: '#fff' }}
                    >
                      GET
                    </span>
                    <code className="text-sm font-mono">{endpoint.url[0]}</code>
                    {needsParam && (
                      <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-500">
                        requiere {paramName}
                      </span>
                    )}
                  </div>

                  {/* Descripción */}
                  <p 
                    className="text-sm mb-3"
                    style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                  >
                    {endpoint.description}
                  </p>

                  {/* Detalles */}
                  {endpoint.details && endpoint.details.length > 0 && (
                    <div className="space-y-1 mb-3">
                      {endpoint.details.map((detail, detailIdx) => (
                        <p 
                          key={detailIdx}
                          className="text-xs font-mono pl-4"
                          style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Input para parámetro */}
                  {needsParam && (
                    <div className="flex items-center gap-2 mb-3">
                      <label 
                        className="text-xs font-medium whitespace-nowrap"
                        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                      >
                        {paramName}:
                      </label>
                      <input
                        type="text"
                        placeholder={`Ingresa ${paramName}...`}
                        value={paramValues[endpoint.url[0]] || ''}
                        onChange={(e) => handleParamChange(endpoint.url[0], e.target.value)}
                        className="flex-1 px-3 py-1.5 text-sm rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-0"
                        style={{ 
                          backgroundColor: isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                          borderColor: isDark ? '#374151' : '#d1d5db',
                          color: isDark ? '#e5e7eb' : '#1f2937'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}

                  {/* Botón de prueba */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTestEndpoint(endpoint);
                    }}
                    className="mt-2 text-xs px-4 py-2 rounded-full border transition-colors hover:bg-teal-500 hover:text-white flex items-center gap-2"
                    style={{ 
                      borderColor: isDark ? '#374151' : '#d1d5db',
                      color: isDark ? '#9ca3af' : '#6b7280'
                    }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Probar endpoint
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export function Apis() {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

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
            <img className="w-10 h-10 rounded-full" src="logo.webp" alt="Logo" />
            <h1 className="text-xl font-bold">Documentación de APIs</h1>
          </div>
          <Link to="/">
            <ButtonVolver />
          </Link>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Intro */}
        <div 
          className="rounded-xl p-6 mb-8 backdrop-blur-sm"
          style={{ 
            backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
          }}
        >
          <h2 className="text-2xl font-bold mb-3">APIs Desarrolladas</h2>
          <p 
            className="text-base leading-relaxed"
            style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
          >
            Documentación técnica de las APIs creadas para mis proyectos. 
            Cada API fue diseñada para ser intuitiva, eficiente y bien documentada, 
            demostrando habilidades en desarrollo backend con Node.js, Express 
            y integración con bases de datos.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Endpoints activos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Respuestas JSON</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Documentación completa</span>
            </div>
          </div>
        </div>

        {/* Lista de APIs */}
        {Object.entries(endPointsProjects).map(([key, apiData]) => (
          <ApiCard key={key} apiKey={key} apiData={apiData} />
        ))}

        {/* Footer info */}
        <div 
          className="rounded-xl p-6 mt-8 text-center backdrop-blur-sm"
          style={{ backgroundColor: isDark ? 'rgba(20, 20, 20, 0.6)' : 'rgba(240, 240, 240, 0.6)' }}
        >
          <p className="text-sm" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
            ¿Necesitas más información? 
            <a href="/contact" className="text-teal-500 hover:underline ml-1">Contáctame</a>
          </p>
        </div>
      </main>
    </div>
  );
}