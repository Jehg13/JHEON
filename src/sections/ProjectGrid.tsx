import { useRef } from "react";
import ProjectCard from "../components/ProjectCard";
import SectionLabel from "../components/SectionLabel";
import { projects, type Project } from "../data/projects";
import useScrollReveal from "../hooks/useScrollReveal";

type ProjectGridProps = {
  onSelect: (project: Project) => void;
};

export default function ProjectGrid({ onSelect }: ProjectGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section className="project-grid-section section-shell" id="projects" ref={sectionRef}>
      <div className="grid-heading" data-reveal>
        <div>
          <SectionLabel number="03">OTROS PROYECTOS</SectionLabel>
          <h2>
            MÁS
            <br />
            <span>PROYECTOS.</span>
          </h2>
        </div>
        <p className="eyebrow">
          {String(otherProjects.length).padStart(2, "0")} PROYECTOS
          <br />
          ADICIONALES.
        </p>
      </div>
      <div className="project-grid editorial-grid">
        {otherProjects.map((project, index) => (
          <div data-reveal key={project.id}>
            <ProjectCard
              project={project}
              index={index + 3}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
      <div className="grid-bottom-line eyebrow">
        <span>OTROS PROYECTOS / {String(otherProjects.length).padStart(2, "0")}</span>
        <span>TOTAL / {String(projects.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
