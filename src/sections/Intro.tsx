import { useRef } from "react";
import SectionLabel from "../components/SectionLabel";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section className="intro-section section-shell" ref={sectionRef}>
      <SectionLabel number="01">CÓMO TRABAJO</SectionLabel>
      <div className="intro-layout">
        <h2 data-reveal>
          CONVIERTO IDEAS
          <br />
          <span>
            EN PRODUCTOS
            <br />
            DIGITALES.
          </span>
        </h2>
        <aside className="intro-aside" data-reveal>
          <div className="intro-aside-heading">
            <span className="intro-status" aria-hidden="true" />
            <h3 className="eyebrow">DE LA IDEA AL PRODUCTO</h3>
            <span className="eyebrow">01—03</span>
          </div>
          <p className="intro-body">
            Un proceso claro para crear experiencias digitales útiles,
            atractivas y hechas para funcionar.
          </p>
          <ol className="intro-steps">
            <li>
              <span className="intro-step-number">01</span>
              <div>
                <h4>Entender</h4>
                <p>Defino el objetivo y lo que realmente necesita el proyecto.</p>
              </div>
              <span className="intro-step-mark" aria-hidden="true">↗</span>
            </li>
            <li>
              <span className="intro-step-number">02</span>
              <div>
                <h4>Diseñar</h4>
                <p>Organizo la experiencia y doy forma a cada detalle.</p>
              </div>
              <span className="intro-step-mark" aria-hidden="true">↗</span>
            </li>
            <li>
              <span className="intro-step-number">03</span>
              <div>
                <h4>Desarrollar</h4>
                <p>Convierto el diseño en un producto digital funcional.</p>
              </div>
              <span className="intro-step-mark" aria-hidden="true">↗</span>
            </li>
          </ol>
        </aside>
      </div>
    </section>
  );
}
