import { Suspense, lazy, useCallback, useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { Pagination } from "./Pagination";
import { Tile } from "./Tile";
import { useCarouselDrag } from "./hooks/useCarouselDrag";
import tilesData from "./data/tiles.json";
import "./ArtGrid.css";

const TileModal = lazy(() => import("./TileModal"));
const SceneModal = lazy(() => import("./SceneModal"));

const paisajeModules = import.meta.glob("./data/paisajes/*.json", {
  eager: true,
  import: "default",
});

const PAISAJES = Object.keys(paisajeModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => paisajeModules[path]);

const { grid, tiles } = tilesData;
const TILES = [...tiles, ...PAISAJES];
const PER_PANEL = grid.columns * grid.rows;
const AXIS = grid.axis === "vertical" ? "vertical" : "horizontal";
const PAGE_COUNT = Math.max(1, Math.ceil(TILES.length / PER_PANEL));

const PANELS = [];
for (let i = 0; i < TILES.length; i += PER_PANEL) {
  PANELS.push(TILES.slice(i, i + PER_PANEL));
}

const COL_CLASS = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
const GAP_CLASS = { 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4" };

export function ArtGrid() {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  const [active, setActive] = useState(-1);

  const { viewportRef, trackRef, movedRef, page, dragging, goPrev, goNext, goTo, handlers } =
    useCarouselDrag({
      axis: AXIS,
      threshold: grid.threshold,
      slop: grid.slop,
      inertiaMs: grid.inertiaMs,
      pageCount: PAGE_COUNT,
    });

  const handleSelect = useCallback(
    (index) => {
      if (movedRef.current) return;
      setActive(index);
    },
    [movedRef]
  );

  const handleIndexChange = useCallback(
    (index) => {
      setActive(index);
      goTo(Math.floor(index / PER_PANEL));
    },
    [goTo]
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
    <section
      className={`artgrid artgrid--${AXIS} w-full select-none`}
      aria-label="Galeria interactiva"
    >
      <div
        ref={viewportRef}
        className={`artgrid__viewport relative ${dragging ? "is-dragging" : ""}`}
        style={{
          touchAction: AXIS === "horizontal" ? "pan-y" : "pan-x",
          height: AXIS === "vertical" ? grid.viewportHeight || "60vh" : undefined,
        }}
        {...handlers}
      >
        <div ref={trackRef} className="artgrid__track">
          {PANELS.map((panel, p) => (
            <div
              key={p}
              className={`artgrid__panel grid ${COL_CLASS[grid.columns] || "grid-cols-3"} ${
                GAP_CLASS[grid.gap] || "gap-3"
              }`}
              aria-hidden={p !== page}
            >
              {panel.map((tile, i) => (
                <Tile
                  key={tile.id}
                  tile={tile}
                  index={p * PER_PANEL + i}
                  onSelect={handleSelect}
                  focusable={p === page}
                />
              ))}
              {panel.length < PER_PANEL &&
                Array.from({ length: PER_PANEL - panel.length }, (_, k) => (
                  <div
                    key={`ph-${k}`}
                    aria-hidden="true"
                    className={`artgrid__placeholder aspect-square rounded-xl border border-dashed ${
                      isDark ? "border-white/15" : "border-black/10"
                    }`}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={page === 0}
          aria-label="Panel anterior"
          className={navBtnClass(page === 0)}
          style={navBtnStyle}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <Pagination count={PAGE_COUNT} current={page} onChange={goTo} label="Panel" />

        <button
          type="button"
          onClick={goNext}
          disabled={page === PAGE_COUNT - 1}
          aria-label="Panel siguiente"
          className={navBtnClass(page === PAGE_COUNT - 1)}
          style={navBtnStyle}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {active >= 0 && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[70] flex items-center justify-center">
              <div className="w-9 h-9 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          {TILES[active]?.modal?.type === "paisaje" ? (
            <SceneModal
              isOpen
              tile={TILES[active]}
              index={active}
              total={TILES.length}
              onClose={() => setActive(-1)}
              onIndexChange={handleIndexChange}
            />
          ) : (
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
