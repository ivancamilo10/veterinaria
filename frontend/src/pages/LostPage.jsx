import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function LostPage() {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("casos");

  const [cases, setCases] = useState([
    {
      id: 1,
      name: "Luna",
      species: "Perra Criolla (Manchas blancas y café)",
      location: "El Rodadero, Santa Marta",
      status: "Alerta Guardianes Activa",
      sightings: 4,
      lastSeen: "Hace 2 horas",
      photoUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80",
      lat: 11.1972,
      lng: -74.2255
    },
    {
      id: 2,
      name: "Max",
      species: "Labrador Retriever Miel",
      location: "Centro Histórico, Parque de los Novios",
      status: "Mapa Colaborativo",
      sightings: 2,
      lastSeen: "Hace 5 horas",
      photoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&auto=format&fit=crop&q=80",
      lat: 11.2443,
      lng: -74.2120
    },
    {
      id: 3,
      name: "Toby",
      species: "Beagle Tricolor",
      location: "Sector Bahía Concha",
      status: "Avistamiento Reciente",
      sightings: 6,
      lastSeen: "Ayer",
      photoUrl: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=300&auto=format&fit=crop&q=80",
      lat: 11.2891,
      lng: -74.1504
    }
  ]);

  useEffect(() => {
    api.get("/lost/reports")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCases(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const [newAlertForm, setNewAlertForm] = useState({
    name: "",
    species: "",
    location: "",
    description: ""
  });

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    if (!newAlertForm.name) return;

    const payload = {
      petName: newAlertForm.name,
      lastLocation: newAlertForm.location,
      description: newAlertForm.description
    };

    try {
      const res = await api.post("/lost/reports", payload);
      if (res.data) {
        setCases([res.data, ...cases]);
      }
    } catch (_err) {
      const created = {
        id: Date.now(),
        name: newAlertForm.name,
        species: newAlertForm.species || "Mascota",
        location: newAlertForm.location || "Sector Urbano",
        status: "Alerta Guardianes Activa",
        sightings: 0,
        lastSeen: "Hace unos momentos",
        photoUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&auto=format&fit=crop&q=80",
        lat: 11.24,
        lng: -74.2
      };
      setCases([created, ...cases]);
    }

    setNewAlertForm({ name: "", species: "", location: "", description: "" });
    setIsAlertOpen(false);
  };

  return (
    <section className="page-stack">
      <section className="page-block">
        <div className="section-row">
          <div>
            <p className="section-kicker">Localización & Guardianes</p>
            <h1>Mascotas Perdidas & Mapa OpenSource</h1>
            <p>
              Alertas automáticas en tiempo real transmitidas a Guardianes, veterinarias y fundaciones de la zona.
            </p>
          </div>

          <button className="store-btn primary" onClick={() => setIsAlertOpen(true)} aria-label="Emitir Alerta de Pérdida">
            🚨 Emitir Alerta de Pérdida
          </button>
        </div>

        <div className="dashboard-grid" style={{ marginTop: 16 }}>
          <article className="dashboard-card">
            <small>Guardianes Activos</small>
            <strong>1,420</strong>
            <p>Comunidad lista para apoyar.</p>
          </article>

          <article className="dashboard-card">
            <small>Casos Activos</small>
            <strong>{cases.length}</strong>
            <p>Reportes en seguimiento.</p>
          </article>

          <article className="dashboard-card">
            <small>Avistamientos Hoy</small>
            <strong>12</strong>
            <p>Reportes con GPS y fotos.</p>
          </article>
        </div>
      </section>

      <section className="page-block">
        <div className="section-row">
          <div className="pet-actions">
            <button 
              className={activeTab === "casos" ? "pill-btn pill-btn-dark" : "pill-btn"} 
              onClick={() => setActiveTab("casos")}
              aria-label="Listado de Casos"
            >
              Listado de Casos
            </button>
            <button 
              className={activeTab === "mapa" ? "pill-btn pill-btn-dark" : "pill-btn"} 
              onClick={() => setActiveTab("mapa")}
              aria-label="Mapa OpenStreetMap Vivo"
            >
              🗺️ Mapa OpenStreetMap Vivo
            </button>
          </div>
        </div>

        {activeTab === "casos" ? (
          <div className="lost-grid" style={{ marginTop: 16 }}>
            {cases.map((item) => (
              <article className="lost-card" key={item.id}>
                <div className="lost-card-head">
                  <img src={item.photoUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80"} alt={item.name || item.petName || "Mascota perdida"} className="pet-avatar-img" />
                  <div>
                    <h3 style={{ margin: 0 }}>{item.name || item.petName}</h3>
                    <p style={{ fontSize: "0.82rem", margin: 0 }}>{item.species || "Mascota en búsqueda"}</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff6a5c", marginTop: 4 }}></span>
                  <strong style={{ fontSize: "0.85rem" }}>{item.status || "Alerta Transmitida"}</strong>
                </div>

                <p style={{ margin: "8px 0", fontSize: "0.88rem" }}>
                  📍 <strong>Ubicación:</strong> {item.location || item.lastLocation}
                </p>

                <div className="card-actions" style={{ marginTop: 12 }}>
                  <button className="pill-btn pill-btn-dark" onClick={() => navigate(`/lost/${item.id}`)} style={{ width: "100%" }} aria-label={`Ver caso de ${item.name || item.petName}`}>
                    Ver Caso & Reportar Avistamiento
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: "1.2rem", margin: "0 0 4px" }}>🗺️ Mapa OpenSource (OpenStreetMap)</h2>
              <p style={{ fontSize: "0.88rem", color: "rgba(8,56,58,0.7)", margin: 0 }}>
                Visualiza libremente la cartografía abierta de avistamientos y alertas de mascotas perdidas.
              </p>
            </div>

            <div style={{ borderRadius: 20, overflow: "hidden", border: "2px solid rgba(8,56,58,0.2)", height: 400 }}>
              <iframe
                title="Mapa OpenStreetMap Peluvis"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.25,11.18,-74.15,11.28&amp;layer=mapnik&amp;marker=11.2443,-74.2120"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>
        )}
      </section>

      {isAlertOpen && (
        <div className="modal-backdrop" onClick={() => setIsAlertOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Emitir Alerta de Pérdida</h3>
              <button className="modal-close" onClick={() => setIsAlertOpen(false)} aria-label="Cerrar modal">✕</button>
            </div>

            <form className="modal-form" onSubmit={handleCreateAlert}>
              <input 
                type="text" 
                placeholder="Nombre de la mascota" 
                value={newAlertForm.name}
                onChange={(e) => setNewAlertForm({...newAlertForm, name: e.target.value})}
                required
                aria-label="Nombre de la mascota"
              />
              <input 
                type="text" 
                placeholder="Especie / Raza y rasgos particulares" 
                value={newAlertForm.species}
                onChange={(e) => setNewAlertForm({...newAlertForm, species: e.target.value})}
                aria-label="Especie / Raza"
              />
              <input 
                type="text" 
                placeholder="Última ubicación vista (Barrio / Sector)" 
                value={newAlertForm.location}
                onChange={(e) => setNewAlertForm({...newAlertForm, location: e.target.value})}
                required
                aria-label="Última ubicación vista"
              />
              <textarea 
                rows="4" 
                placeholder="Descripción detallada, teléfono de contacto y recompensa si aplica..." 
                value={newAlertForm.description}
                onChange={(e) => setNewAlertForm({...newAlertForm, description: e.target.value})}
                aria-label="Descripción del caso"
              />

              <div className="modal-actions">
                <button type="button" className="pill-btn" onClick={() => setIsAlertOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="store-btn primary">
                  🚨 Transmitir Alerta a la Red
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default LostPage;