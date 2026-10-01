import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import ProjectDialog from "./components/ProjectDialog";
import type { Project } from "./data/projects";
import FeaturedProjects from "./sections/FeaturedProjects";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
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

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);

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
      <Navbar />
      <main className="relative">
        <Hero />
        <Intro />
        <FeaturedProjects onSelect={setSelectedProject} />
        <ProjectGrid onSelect={setSelectedProject} />
      </main>
      <Footer />
      <ProjectDialog project={selectedProject} onClose={closeProject} />
    </div>
  );
}
