export default function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-bottom">
        <a className="wordmark" href="#inicio">
          JHEON<span className="wordmark-dot">.</span>
        </a>
        <span>PORTAFOLIO DE PROYECTOS</span>
        <span>© {new Date().getFullYear()} JHEON</span>
      </div>
    </footer>
  );
}
