import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";
import ProjectArtwork from "./ProjectArtwork";

type ProjectDialogProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectDialog({
  project,
  onClose,
}: ProjectDialogProps) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const index = project ? Number(project.id) - 1 : 0;

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="dialog-backdrop"
          role="presentation"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            ref={dialogRef}
            className="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.2, 0.75, 0.25, 1] }}
          >
            <button
              ref={closeButtonRef}
              className="dialog-close"
              type="button"
              onClick={onClose}
              aria-label="Cerrar los detalles del proyecto"
            >
              ×
            </button>
            <div className="dialog-art">
              <ProjectArtwork
                index={index}
                image={project.image}
                title={project.title}
              />
              <div className="dialog-art-overlay" aria-hidden="true">
                <span className="dialog-art-label eyebrow">
                  JHEON / PORTAFOLIO DIGITAL
                </span>
                <span className="dialog-art-index">{project.id}</span>
              </div>
            </div>
            <div className="dialog-content">
              <span className="dialog-kicker eyebrow">
                <span className="dialog-status-dot" aria-hidden="true" />
                FICHA DEL PROYECTO / {project.id}
              </span>
              <h2 id="dialog-title">{project.title}</h2>
              <span className="dialog-category eyebrow">{project.category}</span>
              <div className="dialog-divider" />
              <section
                className="dialog-description"
                aria-labelledby="dialog-description-title"
              >
                <h3
                  className="dialog-section-title eyebrow"
                  id="dialog-description-title"
                >
                  SOBRE EL PROYECTO
                </h3>
                <p>{project.description}</p>
              </section>
              {project.technologies.length > 0 && (
                <section
                  className="dialog-tech-section"
                  aria-labelledby="dialog-tech-title"
                >
                  <div className="dialog-tech-heading">
                    <h3 className="dialog-section-title eyebrow" id="dialog-tech-title">
                      TECNOLOGÍAS
                    </h3>
                    <span className="dialog-tech-count eyebrow">
                      {String(project.technologies.length).padStart(2, "0")} HERRAMIENTAS
                    </span>
                  </div>
                  <div className="dialog-tech">
                    {project.technologies.map((technology, technologyIndex) => (
                      <span className="dialog-tech-chip" key={technology}>
                        <span className="dialog-tech-index" aria-hidden="true">
                          {String(technologyIndex + 1).padStart(2, "0")}
                        </span>
                        {technology}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              {(project.demo || project.github || project.apk) && (
                <div className="dialog-links">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      VER PROYECTO <span>↗</span>
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      CÓDIGO FUENTE <span>↗</span>
                    </a>
                  )}
                  {project.apk && (
                    <a href={project.apk} target="_blank" rel="noreferrer">
                      DESCARGAR APK <span>↓</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
