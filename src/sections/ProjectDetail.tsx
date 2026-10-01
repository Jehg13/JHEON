import { useEffect, useRef } from "react";
import ProjectArtwork from "../components/ProjectArtwork";
import type { Project } from "../data/projects";

type ProjectDetailProps = {
  project: Project;
  onBack: () => void;
};

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const projectIndex = Number(project.id) - 1;
  const screenshots = project.screenshots ?? [];
  const detailRef = useRef<HTMLElement>(null);

  useEffect(() => {
    detailRef.current?.focus();
  }, [project.id]);

  return (
    <section
      className="project-detail section-shell"
      id="project-detail"
      ref={detailRef}
      tabIndex={-1}
      aria-labelledby="project-detail-title"
    >
      <button className="project-detail-back eyebrow" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span> VOLVER A PROYECTOS
      </button>

      <header className="project-detail-heading">
        <div>
          <p className="project-detail-kicker eyebrow">
            PROYECTO / {project.id} <span>—</span> {project.category}
          </p>
          <h1 id="project-detail-title">{project.title}</h1>
          {project.summary && (
            <p className="project-detail-summary">{project.summary}</p>
          )}
        </div>
        <span className="project-detail-index" aria-hidden="true">
          {project.id}
        </span>
      </header>

      <div className="project-detail-cover">
        <ProjectArtwork
          index={projectIndex}
          image={project.image}
          title={project.title}
        />
        <span className="project-detail-cover-label eyebrow">
          PORTADA DEL PROYECTO
        </span>
      </div>

      <div className="project-detail-columns">
        <section
          className="project-detail-about"
          aria-labelledby="project-detail-about-title"
        >
          <p className="eyebrow">DESCRIPCIÓN / 01</p>
          <h2 id="project-detail-about-title">Sobre el proyecto</h2>
          <p>{project.description}</p>
        </section>

        <section
          className="project-detail-stack"
          aria-labelledby="project-detail-stack-title"
        >
          <p className="eyebrow">HERRAMIENTAS / 02</p>
          <h2 id="project-detail-stack-title">Tecnologías</h2>
          <ul>
            {project.technologies.map((technology, index) => (
              <li key={technology}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {technology}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section
        className="project-detail-gallery"
        aria-labelledby="project-detail-gallery-title"
      >
        <div className="project-detail-gallery-heading">
          <div>
            <p className="eyebrow">VISTAS DEL PROYECTO / 03</p>
            <h2 id="project-detail-gallery-title">Capturas y detalles</h2>
          </div>
          <span className="eyebrow">
            {String(screenshots.length).padStart(2, "0")} CAPTURAS
          </span>
        </div>
        {screenshots.length > 0 ? (
          <div className="project-detail-screenshots">
            {screenshots.map((screenshot) => (
              <figure className="project-detail-screenshot" key={screenshot.src}>
                <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
                <figcaption className="eyebrow">{screenshot.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="project-detail-gallery-empty">
            <span className="project-detail-gallery-orbit" aria-hidden="true" />
            <span className="project-detail-gallery-status eyebrow">
              <span aria-hidden="true" />
              GALERÍA EN PREPARACIÓN
            </span>
            <p>
              Las capturas de pantalla de este proyecto aparecerán aquí cuando
              estén disponibles.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
