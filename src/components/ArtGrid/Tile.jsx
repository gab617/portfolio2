/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Context } from "../../Context/Context";
import "./Tile.css";

export function Tile({ tile, index, onSelect, focusable = true }) {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  const fit = tile.imageFit === "contain";

  return (
    <button
      type="button"
      className="artgrid-tile group relative block aspect-square rounded-xl overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
      style={{ "--tile-accent": tile.accent || "#14b8a6" }}
      onClick={() => onSelect(index)}
      aria-label={`Abrir ${tile.title}`}
      tabIndex={focusable ? undefined : -1}
    >
      <img
        src={tile.image}
        alt=""
        aria-hidden="true"
        draggable={false}
        loading={index < 9 ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110 ${
          fit ? "object-contain p-4 bg-neutral-900/70" : "object-cover"
        }`}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
      />
      <span aria-hidden="true" className="artgrid-tile__shine" />
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 h-1 w-full"
        style={{ backgroundColor: tile.accent }}
      />
      <span className="absolute inset-x-2 bottom-2 z-10 block">
        <span className="block truncate text-sm font-semibold text-white drop-shadow">
          {tile.title}
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-white/70">
          {tile.summary}
        </span>
      </span>
      {tile.route && (
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-1 text-xs leading-none text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          {tile.route.type === "external" ? "↗" : "→"}
        </span>
      )}
      {!isDark && <span aria-hidden="true" className="artgrid-tile__light" />}
    </button>
  );
}
