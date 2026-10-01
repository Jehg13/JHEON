import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";

const HeroScene = lazy(() => import("../three/HeroScene"));

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero section-shell" id="inicio">
      <div className="hero-copy">
        <motion.div
          className="hero-eyebrow eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          PORTAFOLIO DIGITAL
        </motion.div>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
        >
          JHEON
        </motion.h1>
        <motion.p
          className="hero-owner eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
        >
          JESUS EFREN HINOJOSA GUERRA
        </motion.p>
        <motion.div
          className="hero-title-support"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="hero-title-rule" />
          <p>DESARROLLADOR DE SOFTWARE</p>
        </motion.div>
        <motion.p
          className="hero-caption eyebrow"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          Productos digitales, aplicaciones y experiencias web.
        </motion.p>
        <a className="hero-scroll eyebrow" href="#proyectos">
          VER PROYECTOS <span aria-hidden="true">↘</span>
        </a>
      </div>
      <div
        className="hero-scene"
        role="img"
        aria-label="Constelación digital interactiva"
      >
        <div className="scene-orbit scene-orbit--one" />
        <div className="scene-orbit scene-orbit--two" />
        <Suspense fallback={<div className="scene-loading" />}>
          <HeroScene />
        </Suspense>
        <div className="scene-axis scene-axis--top eyebrow">CAMPO / 001</div>
        <div className="scene-axis scene-axis--bottom eyebrow">SISTEMA ACTIVO</div>
        <span className="scene-cross scene-cross--one" />
        <span className="scene-cross scene-cross--two" />
        <div className="scene-readout" aria-hidden="true">
          <span className="scene-readout-label eyebrow">JHEON / PORTAFOLIO</span>
          <span className="scene-readout-title">IDEAS EN<br />MOVIMIENTO</span>
          <span className="scene-readout-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
      <div className="hero-footer eyebrow">
        <span>DISEÑO — INGENIERÍA — DETALLE</span>
        <a href="#proyectos">BAJAR PARA EXPLORAR <span aria-hidden="true">↘</span></a>
      </div>
    </section>
  );
}
