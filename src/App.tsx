import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProjectDialog from "./components/ProjectDialog";
import { projects, type Project } from "./data/projects";
import FeaturedProjects from "./sections/FeaturedProjects";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import ProjectDetail from "./sections/ProjectDetail";
import ProjectGrid from "./sections/ProjectGrid";

const particleColors = ["#79a2ff", "#ff7893", "#d9e2ff", "#9875fa"] as const;

function createBackgroundParticles() {
  let seed = 0x4d4f5641;
  const random = () => {
    seed += 0x6d2b79f5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  return Array.from({ length: 150 }, () => {
    const sizeRoll = random();

    return {
      x: random() * 100,
      y: random() * 100,
      size: sizeRoll > 0.97 ? 4 : sizeRoll > 0.8 ? 3 : 2,
      color: particleColors[Math.floor(random() * particleColors.length)],
      delay: random() * -8,
      duration: 4 + random() * 4,
    };
  });
}

const backgroundParticles = createBackgroundParticles();

function getProjectFromHash() {
  const projectId = window.location.hash.match(/^#proyecto\/(\d{3})$/)?.[1];
  return projects.find((project) => project.id === projectId) ?? null;
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailProject, setDetailProject] = useState<Project | null>(
    getProjectFromHash,
  );
  const [returnHash, setReturnHash] = useState("#projects");
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const openProjectDetails = useCallback((project: Project) => {
    const currentHash = window.location.hash;
    setReturnHash(
      currentHash && !currentHash.startsWith("#proyecto/")
        ? currentHash
        : "#projects",
    );
    window.history.pushState(null, "", `#proyecto/${project.id}`);
    setSelectedProject(null);
    setDetailProject(project);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  const returnToPortfolio = useCallback(() => {
    window.history.replaceState(null, "", returnHash);
    setPendingSection(returnHash.slice(1));
    setDetailProject(null);
  }, [returnHash]);

  const navigateFromDetail = useCallback((sectionId: string) => {
    const hash = `#${sectionId}`;
    window.history.replaceState(null, "", hash);
    setPendingSection(sectionId);
    setDetailProject(null);
  }, []);

  useLayoutEffect(() => {
    if (detailProject || !pendingSection) return;
    const target = document.getElementById(pendingSection);
    if (target) {
      window.scrollTo({
        top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 90),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
    setPendingSection(null);
  }, [detailProject, pendingSection]);

  useEffect(() => {
    const syncProjectRoute = () => {
      const project = getProjectFromHash();
      setSelectedProject(null);
      setDetailProject(project);
      if (window.location.hash.startsWith("#proyecto/") && !project) {
        window.history.replaceState(null, "", "#projects");
      }
    };
    syncProjectRoute();
    window.addEventListener("popstate", syncProjectRoute);
    window.addEventListener("hashchange", syncProjectRoute);
    return () => {
      window.removeEventListener("popstate", syncProjectRoute);
      window.removeEventListener("hashchange", syncProjectRoute);
    };
  }, []);

  return (
    <div className="site-shell">
      <div className="background-system" aria-hidden="true">
        <div className="background-glow background-glow--blue" />
        <div className="background-glow background-glow--violet" />
        <div className="background-glow background-glow--red" />
        <div className="background-orbit" />
        <div className="background-particles">
          {backgroundParticles.map(
            ({ x, y, size, color, delay, duration }) => (
              <span
                className={`background-particle${size >= 3 ? " background-particle--bright" : ""}${size === 4 ? " background-particle--core" : ""}`}
                key={`${x}-${y}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  color,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            ),
          )}
        </div>
      </div>
      <Navbar
        isProjectDetail={detailProject !== null}
        onNavigateFromDetail={navigateFromDetail}
      />
      <main className="relative">
        {detailProject ? (
          <ProjectDetail project={detailProject} onBack={returnToPortfolio} />
        ) : (
          <>
            <Hero />
            <Intro />
            <FeaturedProjects onSelect={setSelectedProject} />
            <ProjectGrid onSelect={setSelectedProject} />
          </>
        )}
      </main>
      {!detailProject && <Footer />}
      {!detailProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={closeProject}
          onViewDetails={openProjectDetails}
        />
      )}
    </div>
  );
}
