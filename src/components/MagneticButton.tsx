import type { MouseEvent } from "react";

type MagneticButtonProps = {
  label: string;
  href?: string;
};

export default function MagneticButton({ label, href }: MagneticButtonProps) {
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
    event.currentTarget.style.setProperty("--magnet-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnet-y", `${y}px`);
  };

  const handleLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--magnet-x", "0px");
    event.currentTarget.style.setProperty("--magnet-y", "0px");
  };

  const content = <>{label}<span aria-hidden="true">↗</span></>;

  if (href) {
    return (
      <a
        className="magnetic-button eyebrow"
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {content}
      </a>
    );
  }

  return <span className="magnetic-button eyebrow">{content}</span>;
}
