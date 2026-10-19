/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { projectsF } from "../../assets/jsonData.json";
import { Context } from "../../Context/Context";
import { ModalGallery } from "./ModalGallery";
import { Pagination } from "./Pagination";
import { useModalNav } from "./hooks/useModalNav";
import { useSwipe } from "./hooks/useSwipe";
import "./TileModal.css";

const Section = ({ title, children }) => (
  <div className="mt-5 first:mt-0">
    <h4 className="text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">
      {title}
    </h4>
    {children}
  </div>
);

export function TileModal({ isOpen, tile, index, total, onClose, onIndexChange, children }) {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";
  const panelRef = useRef(null);

  const nav = useModalNav({ isOpen, index, total, onClose, onIndexChange });
  const contentSwipe = useSwipe({
    onSwipeLeft: nav.next,
    onSwipeRight: nav.prev,
    threshold: 70,
  });

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  if (!isOpen || !tile) return null;

  const modal = tile.modal || {};
  const project =
    modal.type === "project" && modal.projectId != null
      ? projectsF.find((p) => p.id === modal.projectId)
      : null;

  const images = project
    ? Array.from(
        { length: project.media_folder.cant },
        (_, i) => `proys_imgs/${project.media_folder.path}/${i + 1}.png`
      )
    : modal.images || [];

  const details = modal.type === "link" ? modal.details || [] : [];
  const skills = modal.type === "tech" ? modal.skills || [] : [];
  const route = tile.route;
  const routeLabel = route?.label || "Abrir";

  const btnPrimary =
    "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white transition-colors";
  const btnGhost =
    "inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-35 disabled:cursor-not-allowed";
  const btnGhostStyle = {
    backgroundColor: isDark ? "rgba(60,60,60,0.8)" : "rgba(229,229,229,0.9)",
    color: isDark ? "#e5e7eb" : "#374151",
  };

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4">
      <div
        className="tile-modal__backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={nav.close}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tile-modal-title"
        className="tile-modal__panel relative w-full max-w-3xl max-h-[88vh] rounded-2xl overflow-hidden flex flex-col outline-none"
        style={{
          backgroundColor: isDark ? "rgba(20,20,20,0.98)" : "rgba(255,255,255,0.98)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        }}
      >
        <div
          className="flex items-center justify-between gap-3 p-4 shrink-0"
          style={{
            backgroundColor: isDark ? "rgba(40,40,40,0.9)" : "rgba(240,240,240,0.95)",
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="h-8 w-1.5 rounded-full shrink-0"
              style={{ backgroundColor: tile.accent }}
            />
            <div className="min-w-0">
              <h3
                id="tile-modal-title"
                className="text-lg font-bold truncate"
                style={{ color: isDark ? "#fff" : "#000" }}
              >
                {tile.title}
              </h3>
              <p className="text-xs text-gray-400 truncate">
                {index + 1} / {total}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={nav.close}
            aria-label="Cerrar"
            className="p-2 rounded-full hover:bg-gray-500/20 transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto p-4 md:p-6"
          style={{ color: isDark ? "#d1d5db" : "#374151" }}
          {...contentSwipe}
        >
          {images.length > 0 && <ModalGallery images={images} alt={tile.title} />}

          <p className="text-sm md:text-base leading-relaxed mt-4">{tile.summary}</p>

          {modal.description && (
            <Section title="Acerca de">
              <p className="text-sm leading-relaxed">{modal.description}</p>
            </Section>
          )}

          {project && (
            <>
              <Section title="La App">
                <p className="text-sm leading-relaxed">{project.description_app}</p>
              </Section>
              <Section title="Desarrollo">
                <p className="text-sm leading-relaxed">{project.description_dev}</p>
              </Section>
              {project.description_list?.length > 0 && (
                <Section title="Caracteristicas">
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {project.description_list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-teal-500 mt-0.5" aria-hidden="true">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
              {project.tecs?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tecs.map((tec, i) => (
                    <img
                      key={i}
                      src={tec}
                      alt=""
                      aria-hidden="true"
                      className="w-7 h-7 rounded-full opacity-80"
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {skills.length > 0 && (
            <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/25"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {details.length > 0 && (
            <Section title="Que vas a encontrar">
              <ul className="grid gap-2">
                {details.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-teal-500 mt-0.5" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {children}
        </div>

        <div
          className="p-3 shrink-0 flex flex-wrap items-center justify-between gap-3"
          style={{
            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          }}
        >
          <Pagination count={total} current={index} onChange={onIndexChange} label="Casillero" />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={nav.prev}
              disabled={index === 0}
              aria-label="Casillero anterior"
              className={btnGhost}
              style={btnGhostStyle}
            >
              ←
            </button>
            <button
              type="button"
              onClick={nav.next}
              disabled={index === total - 1}
              aria-label="Casillero siguiente"
              className={btnGhost}
              style={btnGhostStyle}
            >
              →
            </button>
            {route &&
              (route.type === "external" ? (
                <a
                  href={route.href}
                  target="_blank"
                  rel="noreferrer"
                  className={btnPrimary}
                >
                  {routeLabel} ↗
                </a>
              ) : (
                <Link to={route.to} onClick={nav.close} className={btnPrimary}>
                  {routeLabel} →
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default TileModal;
