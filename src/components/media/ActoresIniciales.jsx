/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { projectsF } from "../../assets/jsonData.json";

const buildActores = (tile) => {
  if (!tile) return [];
  const modal = tile.modal || {};
  const color = tile.accent || "#67e8f9";
  let datos = [];

  if (modal.type === "paisaje") {
    datos = (modal.scenes || []).map((escena, i) => ({
      nombre: `Escena ${String(i + 1).padStart(2, "0")}`,
      imagen: escena,
      ajuste: "cover",
    }));
  } else if (modal.type === "project") {
    const proyecto = projectsF.find((p) => p.id === modal.projectId);
    const cant = proyecto?.media_folder?.cant ?? 0;
    const lista = proyecto?.description_list || [];
    const total = cant > 0 ? cant : lista.length;
    datos = Array.from({ length: total }, (_, i) => ({
      nombre: lista[i] ?? `${proyecto?.title || tile.title} ${i + 1}`,
      imagen: proyecto?.media_folder
        ? `proys_imgs/${proyecto.media_folder.path}/${i + 1}.png`
        : tile.image,
      ajuste: "cover",
    }));
  } else if (modal.type === "link") {
    datos = (modal.details || []).map((detail) => ({
      nombre: detail,
      imagen: null,
      ajuste: "contain",
    }));
  } else if (modal.type === "tech") {
    datos = (modal.skills || []).map((skill) => ({
      nombre: skill,
      imagen: null,
      ajuste: "contain",
    }));
  } else {
    datos = [
      { nombre: tile.summary || tile.title, imagen: tile.image, ajuste: "contain" },
    ];
  }

  return datos.map((dato, i) => ({
    id: `${tile.id}-a${i}`,
    nombre: dato.nombre,
    descripcion: tile.title,
    imagen: dato.imagen,
    ajuste: dato.ajuste,
    color,
    tileId: tile.id,
    posicion: i,
  }));
};

const enFilasDe2 = (lista) => {
  const filas = [];
  for (let i = 0; i < lista.length; i += 2) filas.push(lista.slice(i, i + 2));
  return filas;
};

export default function EscenarioMagico({ tile, onSeleccionar }) {
  const [actorActivo, setActorActivo] = useState(null);
  const [dims, setDims] = useState({});

  const actores = buildActores(tile);

  // Al cambiar de casillero seleccionado volvemos a estado sin actor.
  useEffect(() => {
    setActorActivo(null);
  }, [tile]);

  const registrarDims = (id) => (e) => {
    const w = e.target.naturalWidth;
    const h = e.target.naturalHeight;
    if (!w || !h) return;
    setDims((prev) =>
      prev[id]?.w === w && prev[id]?.h === h ? prev : { ...prev, [id]: { w, h } }
    );
  };

  const fallaDims = (id) => () => {
    setDims((prev) =>
      prev[id] ? prev : { ...prev, [id]: { w: 1600, h: 900 } }
    );
  };

  const seleccionarActor = (actor) => {
    setActorActivo(actor.id);
    onSeleccionar?.(actor);
  };

  const moverActor = (paso) => {
    if (actores.length === 0) return;
    const i = actores.findIndex((a) => a.id === actorActivo);
    const siguiente =
      i < 0
        ? paso > 0
          ? 0
          : actores.length - 1
        : (i + paso + actores.length) % actores.length;
    setActorActivo(actores[siguiente].id);
  };

  const actorSeleccionado = actores.find((a) => a.id === actorActivo) || null;

  const esGaleria = actores.some((a) => a.ajuste === "cover");
  const fotos = actores.filter((a) => a.ajuste === "cover");
  const tipo = tile?.modal?.type;
  const esPaisaje = tipo === "paisaje";
  const esTech = tipo === "tech";
  // Proyectos = fotos horizontales uniformes -> carrusel interno.
  const usarCarrusel = esGaleria && !esPaisaje;

  const todasOk = esGaleria && fotos.every((f) => dims[f.id]);
  const verticales = fotos.filter(
    (f) => dims[f.id] && dims[f.id].h > dims[f.id].w
  );
  const anchas = fotos.filter((f) => dims[f.id] && dims[f.id].h <= dims[f.id].w);

  // Estado del carrusel de fotos horizontales (proyectos).
  const [fotoIdx, setFotoIdx] = useState(0);
  const [esMobile, setEsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 640
  );
  const carruselRef = useRef(null);

  // Paisaje con carrusel en mobile (una escena por vista); en desktop usa bloques.
  const paisajeCarrusel = esPaisaje && esMobile && fotos.length > 1;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = (e) => setEsMobile(e.matches);
    setEsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setFotoIdx(0);
  }, [tile]);

  const irFotoHasta = (i, lista) => {
    const total = lista?.length || fotos.length;
    setFotoIdx(i);
    const el = carruselRef.current;
    if (!el || total < 2) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (i / (total - 1)) * max, behavior: "smooth" });
  };

  // Drag con mouse (desktop) para desplazar el carrusel de la muestra.
  const dragRef = useRef(null);
  const dragMovedRef = useRef(false);
  const [arrastrando, setArrastrando] = useState(false);

  const onDragDown = (e) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startScroll: carruselRef.current?.scrollLeft ?? 0,
      activo: false,
    };
  };

  const onDragMove = (e) => {
    const d = dragRef.current;
    const el = carruselRef.current;
    if (!d || !el || e.pointerId !== d.id) return;
    const dx = e.clientX - d.startX;
    if (!d.activo) {
      if (Math.abs(dx) < 6) return;
      d.activo = true;
      dragMovedRef.current = true;
      setArrastrando(true);
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* capture opcional */
      }
    }
    el.scrollLeft = d.startScroll - dx;
  };

  const onDragUp = (e) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.id) return;
    dragRef.current = null;
    setArrastrando(false);
    if (d.activo) {
      // Evita que el click posterior al drag seleccione el actor.
      setTimeout(() => {
        dragMovedRef.current = false;
      }, 0);
    }
  };

  // Desplaza el carrusel ~una "pantalla" (ancho visible) hacia un lado.
  const desplazarPantalla = (dir) => {
    const el = carruselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const renderFoto = (actor, modo) => {
    const seleccionado = actorActivo === actor.id;
    const esVertical = modo === "vertical";
    const esNeutral = modo === "neutral";

    const tamClase = esVertical
      ? "max-h-52 max-w-[46vw] sm:max-h-64 sm:max-w-[44vw] lg:max-h-72"
      : esNeutral
        ? "max-h-44 max-w-[46vw] sm:max-h-64 sm:max-w-2xl"
        : "max-h-40 max-w-full sm:max-h-64 sm:max-w-5xl";

    const labelClase = esVertical
      ? "max-w-[46vw] sm:max-w-[44vw]"
      : esNeutral
        ? "max-w-[46vw] sm:max-w-2xl"
        : "max-w-full sm:max-w-5xl";

    return (
      <button
        key={actor.id}
        type="button"
        onClick={() => seleccionarActor(actor)}
        aria-label={`Abrir ${actor.nombre}`}
        aria-pressed={seleccionado}
        title={`Abrir ${actor.nombre}`}
        className="group flex flex-col items-center gap-1.5 outline-none"
      >
        <span
          className={`relative block overflow-hidden rounded-2xl border bg-black/30 transition-all duration-500 ${
            seleccionado ? "scale-[1.03]" : "group-hover:-translate-y-1"
          }`}
          style={{
            borderColor: seleccionado ? actor.color : "rgba(255,255,255,0.14)",
            boxShadow: seleccionado
              ? `0 0 26px ${actor.color}66`
              : "0 12px 30px rgba(0,0,0,0.45)",
          }}
        >
          <img
            src={actor.imagen}
            alt={actor.nombre}
            loading="lazy"
            onLoad={registrarDims(actor.id)}
            onError={fallaDims(actor.id)}
            className={`block object-contain transition-transform duration-500 group-hover:scale-[1.03] ${tamClase}`}
          />
        </span>
        <span
          className={`truncate text-center text-[10px] font-medium leading-tight tracking-wide transition-colors ${labelClase} ${
            seleccionado
              ? "text-white"
              : "text-blue-200/70 group-hover:text-white"
          }`}
          style={seleccionado ? { color: actor.color } : undefined}
        >
          {actor.nombre}
        </span>
      </button>
    );
  };

  // Carrusel de fotos.
  // - Proyectos: 1 visible en mobile, 3 en desktop. Fotos horizontales.
  // - Paisajes (solo mobile): 1 escena por vista.
  const renderCarrusel = (lista, variante) => {
    const esPaisajeVar = variante === "paisaje";
    const anchoCelda = esPaisajeVar
      ? "basis-full"
      : "basis-full sm:basis-[calc(33.333%-0.667rem)]";
    const gapClase = esPaisajeVar ? "gap-3 sm:gap-4" : "gap-2 sm:gap-4";

    if (lista.length === 0) {
      return (
        <div className="flex w-full flex-wrap items-end justify-center gap-2 sm:gap-5">
          {actores.map((a) => renderFoto(a, "neutral"))}
        </div>
      );
    }

    return (
      <div className="relative w-full">
        <div
          ref={carruselRef}
          className={`artgrid-carrusel flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth pb-1 ${gapClase} ${
            arrastrando
              ? "is-dragging cursor-grabbing select-none"
              : "sm:cursor-grab"
          }`}
          onPointerDown={onDragDown}
          onPointerMove={onDragMove}
          onPointerUp={onDragUp}
          onPointerCancel={onDragUp}
          onClickCapture={(e) => {
            if (dragMovedRef.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onScroll={(e) => {
            if (!lista.length) return;
            const el = e.currentTarget;
            const max = el.scrollWidth - el.clientWidth;
            const p = max > 0 ? el.scrollLeft / max : 0;
            setFotoIdx(
              Math.min(lista.length - 1, Math.round(p * (lista.length - 1)))
            );
          }}
        >
          {lista.map((actor) => {
            const seleccionado = actorActivo === actor.id;
            return (
              <button
                key={actor.id}
                type="button"
                onClick={() => seleccionarActor(actor)}
                aria-label={`Abrir ${actor.nombre}`}
                aria-pressed={seleccionado}
                title={`Abrir ${actor.nombre}`}
                className={`group flex min-w-0 shrink-0 grow-0 snap-start flex-col items-center gap-1.5 outline-none ${anchoCelda}`}
              >
                <span
                  className={`relative flex w-full items-center justify-center overflow-hidden rounded-2xl border bg-black/30 transition-all duration-500 ${
                    seleccionado ? "scale-[1.02]" : "group-hover:-translate-y-1"
                  }`}
                  style={{
                    borderColor: seleccionado
                      ? actor.color
                      : "rgba(255,255,255,0.14)",
                    boxShadow: seleccionado
                      ? `0 0 26px ${actor.color}66`
                      : "0 12px 30px rgba(0,0,0,0.45)",
                  }}
                >
                  <img
                    src={actor.imagen}
                    alt={actor.nombre}
                    loading="lazy"
                    onLoad={registrarDims(actor.id)}
                    onError={fallaDims(actor.id)}
                    className={
                      esPaisajeVar
                        ? "block max-h-[62vw] w-full object-contain sm:max-h-80"
                        : "block aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    }
                  />
                </span>
                <span
                  className={`line-clamp-2 w-full text-center text-[10px] font-medium leading-tight tracking-wide transition-colors ${
                    seleccionado
                      ? "text-white"
                      : "text-blue-200/70 group-hover:text-white"
                  }`}
                  style={seleccionado ? { color: actor.color } : undefined}
                >
                  {actor.nombre}
                </span>
              </button>
            );
          })}
        </div>

        {lista.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => desplazarPantalla(-1)}
              aria-label="Anterior"
              className="absolute left-1 top-[38%] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-lg text-white/90 backdrop-blur-sm transition hover:scale-110 hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 sm:flex"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => desplazarPantalla(1)}
              aria-label="Siguiente"
              className="absolute right-1 top-[38%] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-lg text-white/90 backdrop-blur-sm transition hover:scale-110 hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 sm:flex"
            >
              ›
            </button>
          </>
        )}

        {lista.length > 1 && (
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {lista.map((actor, i) => (
              <button
                key={actor.id}
                type="button"
                onClick={() => irFotoHasta(i, lista)}
                aria-label={`Foto ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === fotoIdx ? "18px" : "6px",
                  backgroundColor:
                    i === fotoIdx ? actor.color : "rgba(255,255,255,0.28)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const filasVerticales = enFilasDe2(verticales).map((fila, fi) => (
    <div
      key={`v-${fi}`}
      className="flex flex-wrap items-end justify-center gap-2 sm:gap-5"
    >
      {fila.map((a) => renderFoto(a, "vertical"))}
    </div>
  ));

  const columnaAnchas =
    anchas.length > 0 ? (
      <div
        key="anchas"
        className="flex w-full flex-col items-center gap-4 sm:gap-5"
      >
        {anchas.map((a) => renderFoto(a, "ancha"))}
      </div>
    ) : null;

  // Si la ancha es una escena anterior a las verticales, va arriba (orden del recorrido).
  const anchaPrimero =
    anchas.length > 0 &&
    verticales.length > 0 &&
    Math.min(...anchas.map((a) => a.posicion)) <
      Math.min(...verticales.map((a) => a.posicion));

  const bloquesGaleria = anchaPrimero
    ? [columnaAnchas, ...filasVerticales].filter(Boolean)
    : [...filasVerticales, columnaAnchas].filter(Boolean);

  return (
    <section className="relative isolate flex min-h-[420px] w-full flex-col overflow-hidden rounded-3xl bg-[#06152f]">
      {/* Fondo atmosférico */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(37,99,235,0.30),transparent_65%)]" />

      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-600/10 blur-[90px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

      {/* Partículas */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 22 }, (_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 animate-pulse rounded-full bg-cyan-100/70"
            style={{
              left: `${(i * 47 + 13) % 100}%`,
              top: `${(i * 31 + 9) % 100}%`,
              animationDelay: `${(i % 7) * 0.4}s`,
              opacity: 0.25 + (i % 5) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 pt-9 sm:gap-7 sm:pt-11">
      {esGaleria ? (
        /* ---------------- Galería ---------------- */
        <div className="relative z-10 flex w-full flex-col items-center gap-5 sm:gap-7">
          {usarCarrusel ? (
            renderCarrusel(fotos, "project")
          ) : paisajeCarrusel ? (
            renderCarrusel(fotos, "paisaje")
          ) : !todasOk ? (
            <div className="flex flex-wrap items-end justify-center gap-2 sm:gap-5">
              {fotos.map((a) => renderFoto(a, "neutral"))}
            </div>
          ) : (
            bloquesGaleria
          )}
        </div>
      ) : esTech ? (
        /* ---------------- Skills: logo chico + textos destacados ---------------- */
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-4 sm:gap-6">
          <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
            <div
              className="absolute inset-1 rounded-full blur-2xl"
              style={{ backgroundColor: tile?.accent, opacity: 0.4 }}
            />
            {tile?.image ? (
              <img
                src={tile.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_0_12px_rgba(103,232,249,0.35)]"
              />
            ) : (
              <span className="relative z-10 text-4xl" style={{ color: tile?.accent }}>
                ✦
              </span>
            )}
          </div>

          <div className="flex max-h-52 w-full flex-wrap items-center justify-center gap-1.5 overflow-y-auto px-1 sm:max-h-60 sm:gap-2">
            {actores.map((actor) => {
              const sel = actorActivo === actor.id;
              return (
                <button
                  key={actor.id}
                  type="button"
                  onClick={() => seleccionarActor(actor)}
                  aria-pressed={sel}
                  title={actor.nombre}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold leading-tight tracking-wide transition-all sm:text-sm ${
                    sel ? "scale-105 text-white" : "text-blue-100/85 hover:text-white"
                  }`}
                  style={{
                    borderColor: sel
                      ? actor.color
                      : "rgba(255,255,255,0.18)",
                    backgroundColor: sel
                      ? `${actor.color}2e`
                      : "rgba(255,255,255,0.05)",
                    textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                  }}
                >
                  {actor.nombre}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* ---------------- Link: sólo texto, legible, sin logo ---------------- */
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-2.5 px-1 sm:gap-3">
          {actores.map((actor) => {
            const sel = actorActivo === actor.id;
            return (
              <button
                key={actor.id}
                type="button"
                onClick={() => seleccionarActor(actor)}
                aria-pressed={sel}
                title={actor.nombre}
                className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all sm:text-base ${
                  sel ? "scale-[1.01] text-white" : "text-blue-100/85 hover:text-white"
                }`}
                style={{
                  borderColor: sel
                    ? tile?.accent || "#67e8f9"
                    : "rgba(255,255,255,0.12)",
                  backgroundColor: sel
                    ? `${tile?.accent || "#67e8f9"}22`
                    : "rgba(255,255,255,0.04)",
                }}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: tile?.accent || "#67e8f9" }}
                />
                <span className="font-medium leading-snug">{actor.nombre}</span>
              </button>
            );
          })}
        </div>
      )}

      </div>

      {/* Footer: descripciones + botonera */}
      <footer className="relative z-10 flex w-full items-center gap-3 border-t border-white/10 bg-black/45 px-3 py-2.5 backdrop-blur-md sm:px-5">
        <div
          key={actorSeleccionado?.id ?? tile?.id ?? "sin"}
          className="flex min-w-0 flex-1 animate-[subir_0.3s_ease-out] flex-wrap items-baseline gap-x-2.5 gap-y-0.5"
        >
          <span
            className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{
              color: actorSeleccionado?.color || tile?.accent || "#67e8f9",
            }}
          >
            {tile?.title}
          </span>
          {actorSeleccionado && (
            <span className="truncate text-xs font-semibold text-white sm:text-sm">
              {actorSeleccionado.nombre}
            </span>
          )}
          <span className="hidden min-w-0 truncate text-[11px] text-blue-200/55 md:inline">
            {tile?.summary}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {[
            { dir: -1, label: "Actor anterior", simbolo: "←" },
            { dir: 1, label: "Actor siguiente", simbolo: "→" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => moverActor(item.dir)}
              disabled={actores.length < 2}
              aria-label={item.label}
              className="flex h-7 w-7 items-center justify-center rounded-full border text-[11px] text-sky-100 transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
              style={{
                borderColor: `${
                  actorSeleccionado?.color || tile?.accent || "#67e8f9"
                }55`,
                backgroundColor: `${
                  actorSeleccionado?.color || tile?.accent || "#67e8f9"
                }14`,
              }}
            >
              {item.simbolo}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              const actor = actorSeleccionado || actores[0];
              if (actor) onSeleccionar?.(actor);
            }}
            className="ml-1 rounded-full border px-3.5 py-1.5 text-[11px] font-medium text-sky-100 transition-all hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
            style={{
              borderColor: `${
                actorSeleccionado?.color || tile?.accent || "#67e8f9"
              }66`,
              backgroundColor: `${
                actorSeleccionado?.color || tile?.accent || "#67e8f9"
              }1f`,
            }}
          >
            Abrir →
          </button>
        </div>
      </footer>

      {/* Animaciones */}
      <style>{`
        .artgrid-carrusel::-webkit-scrollbar { display: none; }
        .artgrid-carrusel.is-dragging { scroll-snap-type: none; scroll-behavior: auto; }

        @keyframes flotar {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }

        @keyframes destello {
          0%, 100% {
            transform: translateX(-22px) scaleX(0.65);
            opacity: 0.45;
          }
          50% {
            transform: translateX(22px) scaleX(1.1);
            opacity: 1;
          }
        }

        @keyframes subir {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
