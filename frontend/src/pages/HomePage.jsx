import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const tiltCardRef = useRef(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (event) => {
    if (!tiltCardRef.current) return;
    const card = tiltCardRef.current;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;

    card.style.transform = `translateX(-50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!tiltCardRef.current) return;
    tiltCardRef.current.style.transform = "translateX(-50%) rotateX(0deg) rotateY(0deg)";
  };

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className={`home-wrapper ${isMenuOpen ? "menu-open" : ""}`} id="top">
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`} id="siteHeader">
        <div className="container nav">
          <a href="#top" className="brand" aria-label="Inicio Peluvis">
            <span className="brand-mark" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor"></rect>
                <path d="M8 10h8M8 13h8M8 16h5" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round"></path>
              </svg>
            </span>

            <span className="brand-copy">
              <strong>Peluvis</strong>
              <span>Infraestructura Digital Animal</span>
            </span>
          </a>

          <nav className="nav-center">
            <a href="#ecosistema">Ecosistema</a>
            <a href="#identidad">Identidad & QR</a>
            <a href="#guardianes">Red de Guardianes</a>
            <a href="#fundaciones">Fundaciones</a>
            <a href="#directorio">Directorio</a>
          </nav>

          <div className="nav-actions">
            <Link to="/login" className="pill-btn pill-btn-light">Iniciar sesión</Link>
            <Link to="/register" className="pill-btn pill-btn-dark">Crear cuenta</Link>
          </div>

          <button 
            className="nav-toggle" 
            id="navToggle" 
            type="button" 
            aria-label="Abrir menú" 
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="mobile-menu container" id="mobileMenu">
          <a href="#ecosistema" onClick={() => setIsMenuOpen(false)}>Ecosistema</a>
          <a href="#identidad" onClick={() => setIsMenuOpen(false)}>Identidad QR</a>
          <a href="#guardianes" onClick={() => setIsMenuOpen(false)}>Guardianes</a>
          <a href="#fundaciones" onClick={() => setIsMenuOpen(false)}>Fundaciones</a>
          <a href="#directorio" onClick={() => setIsMenuOpen(false)}>Directorio</a>
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link>
          <Link to="/register" onClick={() => setIsMenuOpen(false)}>Crear cuenta</Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <p className="hero-mini reveal" ref={addToRefs}>conoce peluvis</p>

            <h1 className="hero-title reveal delay-1" ref={addToRefs}>
              RESCATE, ADOPCIÓN,
              IDENTIDAD Y
              COMUNIDAD PARA
              CUIDAR CADA
              MASCOTA.
            </h1>

            <p className="hero-description reveal delay-2" ref={addToRefs}>
              Peluvis transforma la manera en que cuidamos a los animales. Un solo ecosistema que integra
              identificación digital mediante códigos QR, historial médico vitalicio, alertas comunitarias de pérdida
              con mapa colaborativo, gestión de adopciones y directorio de salud animal.
            </p>

            <div className="hero-actions reveal delay-3" ref={addToRefs}>
              <Link to="/register" className="store-btn primary">Unirme a la comunidad</Link>
              <Link to="/login" className="store-btn secondary">Iniciar sesión</Link>
            </div>

            <div className="hero-device-wrap reveal delay-4" ref={addToRefs}>
              <div className="float-shape float-shape-a"></div>
              <div className="float-shape float-shape-b"></div>

              <div className="phone-stack">
                <article className="phone-card phone-back phone-back-1">
                  <div className="phone-screen muted-screen">
                    <div className="feed-placeholder">
                      <div className="feed-avatar"></div>
                      <div className="feed-lines">
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="phone-card phone-back phone-back-2">
                  <div className="phone-screen muted-screen">
                    <div className="feed-placeholder">
                      <div className="feed-avatar"></div>
                      <div className="feed-lines">
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </article>

                <article 
                  className="phone-card phone-front tilt-card" 
                  id="tiltCard"
                  ref={tiltCardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="phone-screen">
                    <div className="app-top">
                      <span>9:41</span>
                      <span className="dynamic-island"></span>
                      <span>●●●</span>
                    </div>

                    <div className="app-content">
                      <h3>Hola, Guardián</h3>
                      <p>¿Cómo vas a proteger a tu mascota hoy?</p>

                      <div className="quick-grid">
                        <div className="quick-box quick-yellow">
                          <span>Perfil QR</span>
                        </div>
                        <div className="quick-box quick-green">
                          <span>Adoptar</span>
                        </div>
                        <div className="quick-box quick-pink">
                          <span>Alerta Pérdida</span>
                        </div>
                      </div>

                      <div className="feed-card">
                        <strong>Red de Guardianes activa</strong>
                        <p>12 avistamientos reportados en el mapa colaborativo hoy.</p>
                      </div>

                      <div className="mini-post">
                        <div className="mini-post-avatar"></div>
                        <div className="mini-post-text">
                          <strong>Luna tiene placas QR</strong>
                          <span>Salud al 100% · Vacuna al día</span>
                        </div>
                      </div>

                      <div className="bottom-nav">
                        <span></span>
                        <span></span>
                        <span className="active"></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="ecosistema" className="intro-band">
          <div className="container intro-band-inner reveal" ref={addToRefs}>
            <h2>Más que adopción: la infraestructura digital que conecta dueños, fundaciones, rescatistas y veterinarias.</h2>
          </div>
        </section>

        <section id="identidad" className="content-section">
          <div className="container">
            <div className="section-head reveal" ref={addToRefs}>
              <p className="section-kicker">Pilares Fundamentales</p>
              <h2>Un ecosistema diseñado para todo el ciclo de vida animal</h2>
              <p>
                Desde la llegada de una mascota hasta su etapa senior, Peluvis acompaña con información médica centralizada,
                identidad física y digital y soporte comunitario constante.
              </p>
            </div>

            <div className="feature-grid">
              <article className="feature-card reveal delay-1" ref={addToRefs}>
                <small>01</small>
                <h3>Identidad Digital & Placas QR</h3>
                <p>
                  Cada mascota posee un perfil único con datos de contacto, historial de vacunas, alergias y fotos. 
                  Cualquier persona puede escanear su código QR para facilitar el reencuentro inmediato.
                </p>
              </article>

              <article className="feature-card reveal delay-2" ref={addToRefs}>
                <small>02</small>
                <h3>Cartilla & Historial Médico</h3>
                <p>
                  Centraliza vacunas, desparasitaciones, exámenes, tratamientos y registros médicos para que su salud
                  esté siempre documentada y disponible al visitar cualquier veterinaria.
                </p>
              </article>

              <article className="feature-card reveal delay-3" ref={addToRefs}>
                <small>03</small>
                <h3>Red de Guardianes & Mapa de Pérdidas</h3>
                <p>
                  Emite alertas automáticas a la comunidad cercana al reportar una pérdida. Los miembros reportan
                  avistamientos con foto y ubicación exacta creando un mapa colaborativo en tiempo real.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="fundaciones" className="mosaic-section">
          <div className="container">
            <div className="section-head reveal" ref={addToRefs}>
              <p className="section-kicker">Comunidad & Aliados</p>
              <h2>Módulos especializados para cada actor del ecosistema</h2>
            </div>

            <div className="mosaic-grid">
              <article className="mosaic-card card-peach reveal" data-label="Procesos de Adopción" ref={addToRefs}>
                <div className="mosaic-visual visual-pillar"></div>
              </article>

              <article className="mosaic-card card-red reveal delay-1" data-label="Alertas & Mapa Colaborativo" ref={addToRefs}>
                <div className="mosaic-visual visual-cards"></div>
              </article>

              <article className="mosaic-card card-dark reveal delay-2" data-label="Historial Clínico Vitalicio" ref={addToRefs}>
                <div className="mosaic-visual visual-orb"></div>
              </article>

              <article className="mosaic-card card-pink reveal delay-3" data-label="Gestión de Voluntarios" ref={addToRefs}>
                <div className="mosaic-visual visual-ribbons"></div>
              </article>

              <article className="mosaic-card card-cream reveal delay-2" data-label="Panel de Fundaciones" ref={addToRefs}>
                <div className="mosaic-visual visual-bag"></div>
              </article>

              <article className="mosaic-card card-blue reveal delay-1" data-label="Directorio de Servicios" ref={addToRefs}>
                <div className="mosaic-visual visual-type"></div>
              </article>
            </div>
          </div>
        </section>

        <section id="directorio" className="content-section content-section-bottom">
          <div className="container">
            <div className="section-head reveal" ref={addToRefs}>
              <p className="section-kicker">Red Comercial & Salud</p>
              <h2>Directorio de Servicios & Aliados Cercanos</h2>
              <p>
                Conecta de forma transparente con veterinarias de urgencias, servicios de peluquería, hoteles caninos, 
                tiendas de nutrición y parques comunitarios recomendados.
              </p>
            </div>

            <div className="feature-grid">
              <article className="feature-card reveal delay-1" ref={addToRefs}>
                <small>A</small>
                <h3>Veterinarias & Urgencias</h3>
                <p>Encuentra clínicas afiliadas con acceso al historial médico de tu mascota para una atención precisa.</p>
              </article>

              <article className="feature-card reveal delay-2" ref={addToRefs}>
                <small>B</small>
                <h3>Fundaciones & Rescatistas</h3>
                <p>Paneles de administración de adopción, control de animales en refugios y colecta de donaciones transparente.</p>
              </article>

              <article className="feature-card reveal delay-3" ref={addToRefs}>
                <small>C</small>
                <h3>Comunidad Social</h3>
                <p>Publica actualizaciones, avistamientos, eventos de concientización y consejos de tenencia responsable.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
