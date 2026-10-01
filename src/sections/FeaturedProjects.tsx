import { useRef, type MouseEvent } from "react";
import { projects, type Project } from "../data/projects";
import MagneticButton from "../components/MagneticButton";
import ProjectArtwork from "../components/ProjectArtwork";
import SectionLabel from "../components/SectionLabel";
import useScrollReveal from "../hooks/useScrollReveal";

type FeaturedProjectsProps = {
  onSelect: (project: Project) => void;
};

export default function FeaturedProjects({
  onSelect,
}: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const featuredProjects = projects.filter((project) => project.featured);
  const handlePointerMove = (event: MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <section className="featured-section section-shell" id="proyectos" ref={sectionRef}>
      <div className="featured-heading">
        <SectionLabel number="02">PROYECTOS DESTACADOS</SectionLabel>
        <span className="eyebrow">
          VISTA DETALLADA / {String(featuredProjects.length).padStart(2, "0")}
        </span>
      </div>
      <div className="featured-list">
        {featuredProjects.map((project, index) => (
          <article
            className={`featured-project featured-project--${index % 2 === 0 ? "visual-left" : "visual-right"}`}
            key={project.id}
            data-reveal
          >
            <button
              type="button"
              className="featured-visual"
              onClick={() => onSelect(project)}
              onMouseMove={handlePointerMove}
              aria-label={`Ver detalles del proyecto ${project.title}`}
              data-reveal-image
            >
              <ProjectArtwork
                index={index}
                image={project.image}
                title={project.title}
              />
              <span className="featured-number eyebrow">
                PROYECTO / {project.id}
              </span>
              <span className="featured-orbit-mark" aria-hidden="true">↗</span>
            </button>
            <div className="featured-content">
              <p className="featured-category eyebrow">
                <span aria-hidden="true" />
                {project.category}
              </p>
              <h3>{project.title}</h3>
              {project.summary && (
                <p className="featured-summary">{project.summary}</p>
              )}
              <button
                className="featured-view eyebrow"
                type="button"
                onClick={() => onSelect(project)}
              >
                <MagneticButton label="VER PROYECTO" />
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="project-connector" aria-hidden="true">
        <span />
        <span className="eyebrow">SIGUE EXPLORANDO</span>
      </div>
    </section>
  );
}
