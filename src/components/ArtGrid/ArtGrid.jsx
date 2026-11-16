import { Suspense, lazy, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import { ProgressBar } from "./ProgressBar";
import { Tile } from "./Tile";
import { useCarouselDrag } from "./hooks/useCarouselDrag";
import tilesData from "./data/tiles.json";
import "./ArtGrid.css";
import EscenarioMagico from "../media/ActoresIniciales";

const TileModal = lazy(() => import("./TileModal"));

const { grid, tiles } = tilesData;
// Los paisajes ya no ocupan 9 casilleros: el recorrido vive en /recorrido
// y en el grid queda un solo casillero ("Recorrido"). Ese casillero está
// oculto por ahora (`hidden: true`): el recorrido todavía no está completo.
// Para volver a mostrarlo, alcanza con quitar esa propiedad del JSON.
const TILES = tiles.filter((tile) => !tile.hidden);
const AXIS = grid.axis === "vertical" ? "vertical" : "horizontal";

const GAP_CLASS = { 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4" };

export function ArtGrid() {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  const navigate = useNavigate();
  const [active, setActive] = useState(-1);
  const [selected, setSelected] = useState(0);

  const {
    viewportRef,
    trackRef,
    movedRef,
    page,
    pageCount,
    progress,
    thumbRatio,
    dragging,
    goPrev,
    goNext,
    goTo,
    handlers,
  } = useCarouselDrag({
    axis: AXIS,
    slop: grid.slop,
  });

  const handleSelect = useCallback(
    (index) => {
      if (movedRef.current) return;
      setSelected(index);
    },
    [movedRef],
  );

  const handleIndexChange = useCallback(
    (index) => {
      setActive(index);
      setSelected(index);
      goTo(index);
    },
    [goTo]
  );

  const abrirDesdeEscenario = useCallback(
    (actor) => {
      const idx = TILES.findIndex((t) => t.id === actor?.tileId);
      if (idx < 0) return;
      const tile = TILES[idx];
      if (tile.modal?.type) {
        setActive(idx);
      } else if (tile.route?.type === "external") {
        window.open(tile.route.href, "_blank", "noopener,noreferrer");
      } else if (tile.route?.type === "internal") {
        navigate(tile.route.to);
      }
    },
    [navigate],
  );

  const navBtnClass = (disabled) =>
    `flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${
      disabled ? "opacity-30 cursor-not-allowed" : "hover:scale-110"
    }`;

  const navBtnStyle = {
    backgroundColor: isDark ? "rgba(60,60,60,0.8)" : "rgba(229,229,229,0.9)",
    color: isDark ? "#e5e7eb" : "#374151",
  };

  return (
    <section className="artgrid w-full select-none" aria-label="Galeria interactiva">
      {/* Casilleros: una sola fila con scroll horizontal */}
      <div
        ref={viewportRef}
        className={`artgrid__viewport relative ${dragging ? "is-dragging" : ""}`}
        style={{ touchAction: "pan-y" }}
        {...handlers}
      >
        <div
          ref={trackRef}
          className={`artgrid__track ${GAP_CLASS[grid.gap] || "gap-3"}`}
        >
          {TILES.map((tile, i) => (
            <div
              key={tile.id}
              className="artgrid__cell w-32 shrink-0 sm:w-40 lg:w-48"
              style={{ animationDelay: `${(i % 12) * 0.03}s` }}
            >
              <Tile
                tile={tile}
                index={i}
                onSelect={handleSelect}
                selected={selected === i}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-center gap-3 sm:mt-4 sm:gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={page === 0}
          aria-label="Casillero anterior"
          className={navBtnClass(page === 0)}
          style={navBtnStyle}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <ProgressBar
          progress={progress}
          thumbRatio={thumbRatio}
          accent={TILES[selected]?.accent || grid.accent || "#14b8a6"}
          label="Desplazamiento de casilleros"
        />

        <button
          type="button"
          onClick={goNext}
          disabled={page >= pageCount - 1}
          aria-label="Casillero siguiente"
          className={navBtnClass(page >= pageCount - 1)}
          style={navBtnStyle}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Muestra debajo de los casilleros */}
      <div className="mt-3.5 sm:mt-6">
        <EscenarioMagico
          tile={TILES[selected]}
          onSeleccionar={abrirDesdeEscenario}
        />
      </div>

      {active >= 0 && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[70] flex items-center justify-center">
              <div className="w-9 h-9 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          {TILES[active]?.modal?.type && (
            <TileModal
              isOpen
              tile={TILES[active]}
              index={active}
              total={TILES.length}
              onClose={() => setActive(-1)}
              onIndexChange={handleIndexChange}
            />
          )}
        </Suspense>
      )}
    </section>
  );
}
