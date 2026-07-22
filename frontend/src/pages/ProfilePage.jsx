import { useState } from "react";
import QRCode from "react-qr-code";

function ProfilePage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [role, setRole] = useState("Persona / Dueño");

  const [profileData, setProfileData] = useState({
    name: "Iván Camilo",
    email: "ivan@peluvis.org",
    phone: "+57 300 123 4567",
    city: "Santa Marta, Colombia",
    bio: "Guardián de mascotas comprometido con la salud animal y las alertas comunitarias."
  });

  return (
    <section className="page-stack">
      <section className="page-block profile-hero">
        <div className="profile-top">
          <div className="profile-avatar">I</div>

          <div className="profile-copy">
            <p className="section-kicker">Perfil de Guardián</p>
            <h1>{profileData.name}</h1>
            <p>
              Rol actual: <strong>{role}</strong> · {profileData.city}
            </p>
          </div>

          <div className="profile-actions">
            <button className="store-btn primary" onClick={() => setIsEditOpen(true)}>
              Editar Perfil
            </button>

            <button className="pill-btn pill-btn-dark" onClick={() => setIsQrOpen(true)}>
              Mi Código QR
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          <article className="dashboard-card">
            <small>Mascotas a Cargo</small>
            <strong>3</strong>
            <p>Perfiles activos con placas QR.</p>
          </article>

          <article className="dashboard-card">
            <small>Reportes & Avistamientos</small>
            <strong>8</strong>
            <p>Colaboraciones comunitarias registradas.</p>
          </article>

          <article className="dashboard-card">
            <small>Puntos de Guardián</small>
            <strong>350 pts</strong>
            <p>Nivel: Guardián Protector de la Red.</p>
          </article>
        </div>
      </section>

      <section className="profile-grid">
        <article className="page-block">
          <div className="section-row">
            <div>
              <p className="section-kicker">Información General</p>
              <h2 className="subheading">Datos del Perfil</h2>
            </div>
          </div>

          <div className="info-list">
            <div className="info-row">
              <span>Nombre Completo:</span>
              <strong>{profileData.name}</strong>
            </div>
            <div className="info-row">
              <span>Correo Electrónico:</span>
              <strong>{profileData.email}</strong>
            </div>
            <div className="info-row">
              <span>Teléfono Directo:</span>
              <strong>{profileData.phone}</strong>
            </div>
            <div className="info-row">
              <span>Tipo de Perfil / Rol:</span>
              <strong>{role}</strong>
            </div>
            <div className="info-row">
              <span>Ubicación Base:</span>
              <strong>{profileData.city}</strong>
            </div>
          </div>
        </article>

        <article className="page-block">
          <div className="section-row">
            <div>
              <p className="section-kicker">Herramientas del Rol</p>
              <h2 className="subheading">Gestión & Opciones</h2>
            </div>
          </div>

          <div className="info-list" style={{ gap: 16 }}>
            <p style={{ fontSize: "0.92rem", color: "rgba(8,56,58,0.75)" }}>
              Cambia tu tipo de perfil según tu actividad dentro de la plataforma para acceder a paneles de administración.
            </p>

            <div className="pet-actions">
              <button 
                className={role === "Persona / Dueño" ? "pill-btn pill-btn-dark" : "pill-btn"} 
                onClick={() => setRole("Persona / Dueño")}
              >
                Dueño de Mascota
              </button>
              <button 
                className={role === "Fundación / Rescatista" ? "pill-btn pill-btn-dark" : "pill-btn"} 
                onClick={() => setRole("Fundación / Rescatista")}
              >
                Fundación / Rescatista
              </button>
              <button 
                className={role === "Veterinaria / Aliado" ? "pill-btn pill-btn-dark" : "pill-btn"} 
                onClick={() => setRole("Veterinaria / Aliado")}
              >
                Veterinaria / Aliado
              </button>
            </div>

            {role === "Fundación / Rescatista" && (
              <div style={{ padding: 16, background: "#eceb8e", borderRadius: 20, marginTop: 10 }}>
                <strong>📌 Modo Fundación Activo</strong>
                <p style={{ fontSize: "0.86rem", marginTop: 4 }}>
                  Tienes habilitado el panel de control de adopciones, registro de animales en refugios y recepción de donaciones para campañas.
                </p>
              </div>
            )}
          </div>
        </article>
      </section>

      {/* Modal Editar Perfil */}
      {isEditOpen && (
        <div className="modal-backdrop" onClick={() => setIsEditOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Editar Perfil de Usuario</h3>
              <button className="modal-close" onClick={() => setIsEditOpen(false)}>✕</button>
            </div>

            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setIsEditOpen(false); }}>
              <input 
                type="text" 
                value={profileData.name} 
                onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
                placeholder="Nombre completo" 
              />
              <input 
                type="email" 
                value={profileData.email} 
                onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
                placeholder="Correo electrónico" 
              />
              <input 
                type="text" 
                value={profileData.phone} 
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})} 
                placeholder="Teléfono de contacto" 
              />
              <input 
                type="text" 
                value={profileData.city} 
                onChange={(e) => setProfileData({...profileData, city: e.target.value})} 
                placeholder="Ciudad / Ubicación" 
              />

              <div className="modal-actions">
                <button type="button" className="pill-btn" onClick={() => setIsEditOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="store-btn primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal QR Code */}
      {isQrOpen && (
        <div className="modal-backdrop" onClick={() => setIsQrOpen(false)}>
          <div className="modal-card qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Código QR de Guardián</h3>
              <button className="modal-close" onClick={() => setIsQrOpen(false)}>✕</button>
            </div>

            <div className="qr-box" style={{ display: "grid", placeItems: "center", padding: 20, background: "#FFFFFF", borderRadius: 20 }}>
              <QRCode
                value={`https://peluvis.app/user/${profileData.name.toLowerCase().replace(" ", "-")}`}
                size={180}
                bgColor="#FFFFFF"
                fgColor="#08383A"
              />
            </div>

            <p className="qr-caption" style={{ textAlign: "center", marginTop: 14 }}>
              Este código QR acredita tu identidad como Guardián activo dentro de la red Peluvis.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProfilePage;