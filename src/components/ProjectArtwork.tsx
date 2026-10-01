type ProjectArtworkProps = {
  index: number;
  image: string;
  title: string;
};

export default function ProjectArtwork({
  index,
  image,
  title,
}: ProjectArtworkProps) {
  if (image) {
    return (
      <img
        className="project-image"
        src={image}
        alt={`Vista previa del proyecto ${title}`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`artwork artwork--${(index % 4) + 1}`}
      aria-hidden="true"
    >
      <div className="artwork-grid" />
      <div className="artwork-glow" />
      <div className="artwork-orbit artwork-orbit--outer" />
      <div className="artwork-orbit artwork-orbit--middle" />
      <div className="artwork-orbit artwork-orbit--inner" />
      <div className="artwork-cross artwork-cross--horizontal" />
      <div className="artwork-cross artwork-cross--vertical" />
      <div className="artwork-core">
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="artwork-signal artwork-signal--one" />
      <div className="artwork-signal artwork-signal--two" />
      <div className="artwork-corner artwork-corner--one" />
      <div className="artwork-corner artwork-corner--two" />
      <span className="artwork-caption eyebrow">
        ESTUDIO VISUAL&nbsp; / &nbsp;{title.toUpperCase()}
      </span>
    </div>
  );
}
