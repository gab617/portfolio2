/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Context } from "../../Context/Context";
import { Pagination } from "./Pagination";
import { SceneTour } from "./SceneTour";
import { useModalNav } from "./hooks/useModalNav";
import { useSwipe } from "./hooks/useSwipe";
import "./SceneModal.css";

export function SceneModal({
  isOpen,
  tile,
  index,
  total,
  onClose,
  onIndexChange,
}) {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  const panelRef = useRef(null);

  const scenes = tile?.modal?.scenes || [];

  const nav = useModalNav({
    isOpen,
    index,
    total,
    onClose,
    onIndexChange,
    enableArrowNav: scenes.length === 0,
  });

  const contentSwipe = useSwipe({
    onSwipeLeft: nav.next,
    onSwipeRight: nav.prev,
    threshold: 70,
  });

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  if (!isOpen || !tile) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-1.5 sm:p-3 xl:p-6">
      <div
        className="scene-modal__backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={nav.close}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="scene-modal-title"
        className="scene-modal__panel relative w-full h-full rounded-2xl overflow-hidden flex flex-col outline-none"
        style={{
          backgroundColor: isDark
            ? "rgba(20,20,20,0.98)"
            : "rgba(255,255,255,0.98)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 bg-gradient-to-b from-black/75 via-black/40 to-transparent p-3 pb-10">
          <div className="flex items-center gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="h-8 w-1.5 rounded-full shrink-0"
              style={{ backgroundColor: tile.accent }}
            />
            <div className="min-w-0">
              <h3
                id="scene-modal-title"
                className="text-lg font-bold truncate text-white drop-shadow-sm"
              >
                {tile.title}
              </h3>
              <p className="text-xs text-white/75 truncate">
                {index + 1} / {total}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={nav.close}
            aria-label="Cerrar"
            className="pointer-events-auto p-2.5 rounded-full bg-black/55 text-white transition-colors hover:bg-black/85 shrink-0"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* ----------------------- */}
        <div>
          <div
            className="relative flex-1 overflow-hidden flex min-h-0"
            style={{ color: isDark ? "#d1d5db" : "#374151" }}
          >
            <div
              className="scene-modal__scroll flex-1 min-w-0 overflow-y-auto flex flex-col"
              {...contentSwipe}
            >
              <SceneTour
                key={tile.id}
                scenes={scenes}
                accent={tile.accent}
                title={tile.title}
              />
            </div>
          </div>

          <div
            className="relative flex shrink-0 flex-wrap items-center justify-between overflow-hidden px-4 "
            style={{
              borderTop: `1px solid ${
                isDark
                  ? "rgba(167, 139, 250, 0.22)"
                  : "rgba(109, 40, 217, 0.14)"
              }`,
              background: isDark
                ? "linear-gradient(90deg, rgba(91, 33, 182, 0.08), transparent 55%, rgba(56, 189, 248, 0.04))"
                : "linear-gradient(90deg, rgba(237, 233, 254, 0.65), rgba(255,255,255,0.7))",
            }}
          >
            {/* Resplandor ambiental */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(167,139,250,0.65), rgba(103,232,249,0.45), transparent)",
                filter: "blur(1px)",
              }}
            />

            <div className="relative z-10">
              <Pagination
                count={total}
                current={index}
                onChange={onIndexChange}
                label="Casillero"
              />
            </div>

            <div className="relative z-10 flex mx-auto items-center gap-2">
              <span
                className="mr-1 hidden text-xs tabular-nums sm:inline"
                style={{
                  color: isDark
                    ? "rgba(196,181,253,0.65)"
                    : "rgba(109,40,217,0.65)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1 opacity-40">/</span>
                {String(total).padStart(2, "0")}
              </span>

              {[
                {
                  action: nav.prev,
                  disabled: index === 0,
                  label: "Casillero anterior",
                  symbol: "←",
                },
                {
                  action: nav.next,
                  disabled: index >= total - 1,
                  label: "Casillero siguiente",
                  symbol: "→",
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  disabled={item.disabled}
                  aria-label={item.label}
                  className="group relative flex h-[1.5em] w-[3em] items-center justify-center rounded-xl border transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
                  style={{
                    color: isDark ? "#ddd6fe" : "#6d28d9",
                    borderColor: isDark
                      ? "rgba(167,139,250,0.24)"
                      : "rgba(109,40,217,0.16)",
                    background: isDark
                      ? "linear-gradient(145deg, rgba(139,92,246,0.12), rgba(30,27,75,0.2))"
                      : "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(237,233,254,0.7))",
                    boxShadow: isDark
                      ? "inset 0 1px rgba(255,255,255,0.04)"
                      : "0 2px 8px rgba(109,40,217,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    if (item.disabled) return;
                    e.currentTarget.style.borderColor = "rgba(167,139,250,0.7)";
                    e.currentTarget.style.boxShadow =
                      "0 0 16px rgba(139,92,246,0.2), inset 0 0 10px rgba(139,92,246,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark
                      ? "rgba(167,139,250,0.24)"
                      : "rgba(109,40,217,0.16)";
                    e.currentTarget.style.boxShadow = isDark
                      ? "inset 0 1px rgba(255,255,255,0.04)"
                      : "0 2px 8px rgba(109,40,217,0.05)";
                  }}
                >
                  <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                    {item.symbol}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default SceneModal;
