/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { runActions } from "../runActions";

// Renderer de hotspots: zonas poligonales (SVG) sobre la imagen.
// Cada zona dispara su lista onTap[] contra el registro de acciones.
// También dibuja las "capas" (params.capas) que las acciones muestran.
export function HotspotsRenderer({ scene, api }) {
  const [cargada, setCargada] = useState(false);
  const [activas, setActivas] = useState({});
  const capasRef = useRef({});

  const view = scene?.view || {};
  const overlay = scene?.overlay;
  const zonas = scene?.interact?.params?.zonas || [];
  const capas = scene?.interact?.params?.capas || [];
  const accent = api?.accent || "#d946ef";

  useEffect(() => {
    setCargada(false);
    setActivas({});
  }, [scene?.src]);

  // Publica en el api las capas de esta escena.
  useEffect(() => {
    if (!api) return;
    api.capas = capasRef.current;
  }, [api, capas.length]);

  const onZona = (zona, e) => {
    e.stopPropagation();
    setActivas((prev) => ({ ...prev, [zona.id]: !prev[zona.id] }));
    runActions(zona.onTap, { api, scene, target: zona.id });
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <img
        data-scene-img="true"
        src={scene?.src}
        alt={scene?.alt || ""}
        draggable={false}
        onLoad={() => setCargada(true)}
        onError={() => setCargada(true)}
        className={`h-full w-full ${
          view.mode === "contain" ? "object-contain" : "object-cover"
        } transition-opacity duration-700 ${
          cargada ? "opacity-100" : "opacity-0"
        }`}
        style={{ objectPosition: view.focus || "50% 50%" }}
      />

      {!cargada && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-white/5"
        />
      )}

      {/* Capas (aparecen al disparar acciones) */}
      {capas.map((capa) => (
        <div
          key={capa.id}
          data-capa={capa.id}
          ref={(el) => {
            if (el) capasRef.current[capa.id] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute z-10 opacity-0 transition-opacity duration-500"
          style={{
            left: `${capa.x ?? 50}%`,
            top: `${capa.y ?? 50}%`,
            transform: "translate(-50%, -50%)",
            color: capa.color,
          }}
        >
          {capa.texto && (
            <span
              className="block rounded-full px-3 py-1.5 text-sm font-semibold shadow-lg backdrop-blur"
              style={{
                backgroundColor: capa.fondo || "rgba(6,21,47,0.85)",
                color: capa.color || "#fff",
                boxShadow: `0 0 18px ${capa.color || "#67e8f9"}66`,
              }}
            >
              {capa.texto}
            </span>
          )}
        </div>
      ))}

      {/* Zonas poligonales */}
      <svg
        className="absolute inset-0 z-20 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {zonas.map((zona) => {
          const puntos = (zona.poligono || [])
            .map(([x, y]) => `${x},${y}`)
            .join(" ");
          const activa = !!activas[zona.id];
          return (
            <polygon
              key={zona.id}
              points={puntos}
              data-zona={zona.id}
              role="button"
              aria-label={zona.label || zona.id}
              onClick={(e) => onZona(zona, e)}
              className="cursor-pointer transition-[fill,stroke] duration-300"
              style={{
                fill: activa ? `${accent}44` : "rgba(255,255,255,0.06)",
                stroke: activa ? accent : "rgba(255,255,255,0.45)",
                strokeWidth: 0.4,
                strokeDasharray: activa ? "none" : "2 1.5",
              }}
            />
          );
        })}
      </svg>

      {/* Etiquetas de zona */}
      {zonas.map((zona) => {
        if (!zona.label) return null;
        const xs = (zona.poligono || []).map((p) => p[0]);
        const ys = (zona.poligono || []).map((p) => p[1]);
        const cx = xs.reduce((a, b) => a + b, 0) / (xs.length || 1);
        const cy = ys.reduce((a, b) => a + b, 0) / (ys.length || 1);
        return (
          <span
            key={`l-${zona.id}`}
            aria-hidden="true"
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm"
            style={{ left: `${cx}%`, top: `${cy}%` }}
          >
            {zona.label}
          </span>
        );
      })}

      {overlay && (overlay.titulo || overlay.texto) && (
        <div
          className={`pointer-events-none absolute z-30 max-w-[92%] p-4 ${
            overlay.pos === "top"
              ? "inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent"
              : "inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent"
          }`}
        >
          {overlay.titulo && (
            <h3 className="text-lg font-bold text-white drop-shadow sm:text-2xl">
              {overlay.titulo}
            </h3>
          )}
          {overlay.texto && (
            <p className="mt-1 text-sm leading-relaxed text-white/85 sm:text-base">
              {overlay.texto}
            </p>
          )}
        </div>
      )}

      {scene?.next && (
        <button
          type="button"
          data-no-avanzar="true"
          onClick={() => api?.irA?.(scene.next)}
          aria-label="Continuar"
          className="absolute bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border-4 border-white px-8 py-3 text-base font-black uppercase tracking-wider text-white transition hover:scale-105"
          style={{
            backgroundColor: accent,
            boxShadow: `0 0 40px ${accent}e6`,
          }}
        >
          Continuar →
        </button>
      )}
    </div>
  );
}

export default HotspotsRenderer;
