/* eslint-disable react/prop-types */

export function ProgressBar({
  progress = 0,
  thumbRatio = 1,
  accent = "#14b8a6",
  label = "Desplazamiento",
}) {
  const ratio = Math.max(0, Math.min(progress, 1));
  const thumb = Math.max(0.12, Math.min(thumbRatio, 1));
  const widthPct = thumb * 100;
  const leftPct = ratio * (100 - widthPct);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      className="relative h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10 sm:max-w-sm"
      style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 rounded-full transition-[left] duration-150 ease-out"
        style={{
          width: `${widthPct}%`,
          left: `${leftPct}%`,
          background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 55%, transparent), ${accent})`,
          boxShadow: `0 0 10px ${accent}88`,
        }}
      />
    </div>
  );
}
