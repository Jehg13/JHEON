import type { MouseEvent } from "react";
import type { Project } from "../data/projects";
import MagneticButton from "./MagneticButton";
import ProjectArtwork from "./ProjectArtwork";

type ProjectCardProps = {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
};

export default function ProjectCard({
  project,
  index,
  onSelect,
}: ProjectCardProps) {
  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const visual = event.currentTarget.querySelector<HTMLElement>(".project-visual");
    if (!visual) return;

    const bounds = visual.getBoundingClientRect();
    visual.style.setProperty(
      "--pointer-x",
      `${event.clientX - bounds.left}px`,
    );
    visual.style.setProperty(
      "--pointer-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <article
      className={`project-card project-card--${index % 3}`}
      onMouseMove={handlePointerMove}
    >
      <button
        className="project-card-button"
        type="button"
        onClick={() => onSelect(project)}
        aria-label={`Ver detalles del proyecto ${project.title}`}
      >
        <div className="project-visual">
          <ProjectArtwork index={index} image={project.image} title={project.title} />
          <span className="project-index eyebrow">PROYECTO / {project.id}</span>
          <span className="project-open" aria-hidden="true">↗</span>
        </div>
      </button>
      <div className="project-meta flex items-center justify-between">
        <h3>{project.title}</h3>
        <button
          className="project-card-open eyebrow"
          type="button"
          onClick={() => onSelect(project)}
          aria-label={`Abrir los detalles de ${project.title}`}
        >
          <MagneticButton label="VER PROYECTO" />
        </button>
      </div>
    </article>
  );
}
