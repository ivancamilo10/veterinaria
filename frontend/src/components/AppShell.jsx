import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={`app-shell ${isMenuOpen ? "menu-open" : ""}`}>
      <header className="site-header">
        <div className="container nav">
          <Link to="/" className="brand" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor"></rect>
                <path d="M8 10h8M8 13h8M8 16h5" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round"></path>
              </svg>
            </span>
            <span className="brand-copy">
              <strong>Peluvis</strong>
              <span>Animal care platform</span>
            </span>
          </Link>

          <nav className="nav-center">
            <Link className={isActive("/feed") ? "pill-btn pill-btn-dark" : "pill-btn"} to="/feed">
              Feed
            </Link>
            <Link className={isActive("/pets") ? "pill-btn pill-btn-dark" : "pill-btn"} to="/pets">
              Mascotas & QR
            </Link>
            <Link className={isActive("/lost") ? "pill-btn pill-btn-dark" : "pill-btn"} to="/lost">
              Perdidas & Mapa
            </Link>
            <Link className={isActive("/alerts") ? "pill-btn pill-btn-dark" : "pill-btn"} to="/alerts">
              Guardianes
            </Link>
            <Link className={isActive("/profile") ? "pill-btn pill-btn-dark" : "pill-btn"} to="/profile">
              Mi Perfil
            </Link>
          </nav>

          <div className="nav-actions">
            <button className="pill-btn pill-btn-dark" onClick={() => navigate("/login")}>
              Cerrar sesión
            </button>
          </div>

          <button
            className="nav-toggle"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="mobile-menu container">
          <Link to="/feed" onClick={closeMenu}>Feed</Link>
          <Link to="/pets" onClick={closeMenu}>Mascotas & QR</Link>
          <Link to="/lost" onClick={closeMenu}>Perdidas & Mapa</Link>
          <Link to="/alerts" onClick={closeMenu}>Guardianes</Link>
          <Link to="/profile" onClick={closeMenu}>Mi Perfil</Link>
          <Link to="/login" onClick={closeMenu}>Cerrar sesión</Link>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-wrap">
          <div>
            <p><strong>Peluvis</strong> · Infraestructura Digital para el Bienestar Animal</p>
            <p>Identidad QR · Historial Médico · Alertas a Guardianes · Mapa OpenSource · Red de Fundaciones</p>
          </div>
          <div>
            <p>© 2026 Peluvis Platform · Cuidando cada mascota juntos.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppShell;