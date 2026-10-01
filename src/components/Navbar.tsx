import { useEffect, useState, type MouseEvent } from "react";

const navigation = [
  { label: "INICIO", href: "#inicio" },
  { label: "DESTACADOS", href: "#proyectos" },
  { label: "PROYECTOS", href: "#projects" },
];

type NavbarProps = {
  isProjectDetail: boolean;
  onNavigateFromDetail: (sectionId: string) => void;
};

export default function Navbar({
  isProjectDetail,
  onNavigateFromDetail,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    if (!isProjectDetail) return;
    event.preventDefault();
    onNavigateFromDetail(sectionId);
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 36));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (isProjectDetail) return;
    const sectionIds = navigation.map(({ href }) => href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isProjectDetail]);

  return (
    <header className={`floating-header${scrolled ? " floating-header--scrolled" : ""}`}>
      <nav
        className="floating-nav flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <a
          className="wordmark"
          href="#inicio"
          aria-label="JHEON, inicio"
          onClick={(event) => handleNavigation(event, "inicio")}
        >
          <span className="wordmark-emblem" aria-hidden="true">J</span>
          <span className="wordmark-name">
            JHEON<span className="wordmark-dot">.</span>
          </span>
        </a>
        <div className="floating-nav-links flex items-center">
          {navigation.map(({ label, href }) => {
            const sectionId = href.slice(1);
            const active = activeSection === sectionId;
            return (
              <a
                aria-current={active ? "location" : undefined}
                className={`floating-nav-link${active ? " is-active" : ""}`}
                href={href}
                key={sectionId}
                onClick={(event) => handleNavigation(event, sectionId)}
              >
                <span className="nav-link-label">{label}</span>
                {active && (
                  <span className="nav-active-indicator" aria-hidden="true" />
                )}
              </a>
            );
          })}
        </div>
        <span className="nav-status eyebrow" aria-label="Portafolio digital 2026">
          <span className="status-dot" />
          <span>PORTAFOLIO <i>/</i> 2026</span>
        </span>
      </nav>
    </header>
  );
}
