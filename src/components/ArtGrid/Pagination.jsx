
/* eslint-disable react/prop-types */

export function Pagination({
  count,
  current,
  onChange,
  label = "Pagina",
}) {
  if (count <= 1) return null;

  return (
    <div
      role="group"
      aria-label={label}
      className="
        relative isolate inline-flex min-h-9
        items-center justify-center overflow-hidden
        rounded-2xl border border-violet-400/20
        bg-gradient-to-br from-violet-950/10
        via-indigo-950/5 to-cyan-950/10
        px-4 py-1
        shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_24px_rgba(139,92,246,0.06)]
        dark:border-violet-300/15
        dark:from-indigo-950/70
        dark:via-violet-950/50
        dark:to-slate-950/70
      "
    >
      {/* Nebulosa cósmica */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -inset-1/2 -z-30
          animate-[spin_32s_linear_infinite]
          bg-[conic-gradient(from_0deg,transparent_0deg,rgba(168,85,247,0.18)_65deg,transparent_120deg,rgba(34,211,238,0.15)_220deg,transparent_290deg,rgba(244,114,182,0.12)_330deg,transparent_360deg)]
        "
      />

      {/* Resplandor ambiental */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-20
          bg-[radial-gradient(ellipse_at_20%_50%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(ellipse_at_85%_50%,rgba(34,211,238,0.14),transparent_55%)]
          blur-xl
        "
      />

      {/* Polvo estelar */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10 opacity-50
          bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0.7px,transparent_1.5px),radial-gradient(circle,rgba(103,232,249,0.8)_0.8px,transparent_1.6px)]
          bg-[length:31px_27px,47px_39px]
          bg-[position:4px_5px,21px_13px]
        "
      />

      {/* Indicadores */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: count }, (_, i) => {
          const active = i === current;

          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(i)}
              aria-label={`${label} ${i + 1}`}
              aria-current={active ? "page" : undefined}
              className={`
                relative isolate shrink-0 rounded-full
                transition-[width,height,transform,background-color,box-shadow]
                duration-300 ease-out
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-cyan-400
                ${
                  active
                    ? "h-3 w-8"
                    : "h-2 w-2 bg-slate-400/60 hover:scale-150 hover:bg-cyan-400 dark:bg-slate-300/40"
                }
              `}
              style={
                active
                  ? {
                      background:
                        "linear-gradient(100deg,#67e8f9,#818cf8,#e879f9,#c084fc,#67e8f9)",
                      backgroundSize: "200% 100%",
                      boxShadow:
                        "0 0 5px #fff, 0 0 12px rgba(168,85,247,.95), 0 0 26px rgba(139,92,246,.7), 0 0 42px rgba(34,211,238,.32)",
                    }
                  : undefined
              }
            >
              {active && (
                <>
                  {/* Halo multicolor */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute -inset-2 -z-10
                      rounded-full
                      bg-gradient-to-r from-cyan-400/70
                      via-violet-500/80 to-pink-400/70
                      opacity-90 blur-lg
                      animate-pulse
                    "
                  />

                  {/* Aura exterior */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute -inset-1 -z-10
                      rounded-full
                      bg-gradient-to-r from-cyan-300/50
                      via-fuchsia-400/50 to-violet-400/50
                      blur-md
                    "
                  />

                  {/* Núcleo luminoso */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute left-1/2 top-1/2
                      h-0.5 w-4 -translate-x-1/2 -translate-y-1/2
                      rounded-full
                      bg-gradient-to-r from-transparent
                      via-white to-transparent
                      shadow-[0_0_6px_white,0_0_12px_rgba(255,255,255,0.8)]
                    "
                  />

                  {/* Destello */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute -right-0.5 -top-1
                      h-1.5 w-1.5 rounded-full bg-white
                      shadow-[0_0_5px_white,0_0_10px_cyan,0_0_16px_violet]
                      animate-pulse
                    "
                  />
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
