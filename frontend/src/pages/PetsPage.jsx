import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import api from "../services/api";

function PetsPage() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [isNewPetOpen, setIsNewPetOpen] = useState(false);
  const [qrModalPet, setQrModalPet] = useState(null);

  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Luna",
      species: "Perra Criolla",
      age: "2 años",
      status: "Perfil QR Activo",
      chipId: "985141002983711",
      colorClass: "pet-badge-active",
      photoUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80",
      owner: "Iván Camilo",
      phone: "+57 300 123 4567",
      medicalHistory: [
        { date: "2026-01-10", title: "Vacuna Antirrábica", vet: "Clínica San Francisco", status: "Completada" },
        { date: "2025-11-05", title: "Desparasitación Canina", vet: "Dr. Pet Santa Marta", status: "Completada" }
      ]
    },
    {
      id: 2,
      name: "Milo",
      species: "Gato Mestizo Rescatado",
      age: "8 meses",
      status: "Vacunas Pendientes",
      chipId: "985141002983899",
      colorClass: "pet-badge-warning",
      photoUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&auto=format&fit=crop&q=80",
      owner: "Iván Camilo",
      phone: "+57 300 123 4567",
      medicalHistory: [
        { date: "2026-02-12", title: "Triple Felina Dose 1", vet: "Fundación Peluvis", status: "Completada" }
      ]
    },
    {
      id: 3,
      name: "Max",
      species: "Labrador Retriever",
      age: "4 años",
      status: "Perfil Completo",
      chipId: "985141002981044",
      colorClass: "pet-badge-active",
      photoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&auto=format&fit=crop&q=80",
      owner: "Iván Camilo",
      phone: "+57 300 123 4567",
      medicalHistory: [
        { date: "2025-09-20", title: "Chequeo General", vet: "VetCare Center", status: "Completada" }
      ]
    }
  ]);

  useEffect(() => {
    api.get("/pets/my")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setPets(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const [newPetForm, setNewPetForm] = useState({
    name: "",
    species: "",
    age: "",
    chipId: ""
  });

  const handleCreatePet = async (e) => {
    e.preventDefault();
    if (!newPetForm.name) return;

    try {
      const res = await api.post("/pets", {
        name: newPetForm.name,
        species: newPetForm.species,
        age: newPetForm.age,
        microchip: newPetForm.chipId
      });
      if (res.data) {
        setPets([res.data, ...pets]);
      }
    } catch (_err) {
      const created = {
        id: Date.now(),
        name: newPetForm.name,
        species: newPetForm.species || "Mascota",
        age: newPetForm.age || "Cachorro",
        status: "Perfil QR Activo",
        chipId: newPetForm.chipId || `985${Math.floor(Math.random()*1000000000)}`,
        colorClass: "pet-badge-active",
        photoUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&auto=format&fit=crop&q=80",
        owner: "Iván Camilo",
        phone: "+57 300 123 4567",
        medicalHistory: [
          { date: new Date().toISOString().split('T')[0], title: "Registro Inicial en Peluvis", vet: "Plataforma Peluvis", status: "Completada" }
        ]
      };
      setPets([created, ...pets]);
    }

    setNewPetForm({ name: "", species: "", age: "", chipId: "" });
    setIsNewPetOpen(false);
  };

  return (
    <section className="page-stack">
      <section className="page-block">
        <div className="page-head">
          <p className="section-kicker">Identidad & Salud Digital</p>
          <h1>Mascotas & Registro Médico</h1>
          <p>
            Administra la identidad digital con código QR, historial clínico y contacto de emergencia.
          </p>
        </div>

        <div className="dashboard-grid">
          <article className="dashboard-card">
            <small>Total Registradas</small>
            <strong>{pets.length}</strong>
            <p>Mascotas en tu red.</p>
          </article>

          <article className="dashboard-card">
            <small>Identificación QR</small>
            <strong>{pets.length}</strong>
            <p>Placas activas para escaneo.</p>
          </article>

          <article className="dashboard-card">
            <small>Historial Clínico</small>
            <strong>100%</strong>
            <p>Cartilla al día.</p>
          </article>
        </div>
      </section>

      <section className="page-block">
        <div className="section-row">
          <div>
            <p className="section-kicker">Tus Registros</p>
            <h2 className="subheading">Mis Mascotas</h2>
          </div>

          <button className="store-btn primary" onClick={() => setIsNewPetOpen(true)} aria-label="Registrar Nueva Mascota">
            + Registrar Mascota
          </button>
        </div>

        <div className="pet-grid">
          {pets.map((pet) => (
            <article className="pet-card" key={pet.id}>
              <div className="pet-card-top">
                <img src={pet.photoUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80"} alt={pet.name} className="pet-avatar-img" />
                <div>
                  <h3 style={{ margin: 0 }}>{pet.name}</h3>
                  <p style={{ margin: 0, fontSize: "0.82rem" }}>{pet.species}</p>
                </div>
              </div>

              <div className="pet-meta">
                <span>{pet.age || "1 año"}</span>
                <span className={`pet-badge ${pet.colorClass || "pet-badge-active"}`}>{pet.status || "QR Activo"}</span>
              </div>

              <div className="pet-actions">
                <button className="pill-btn pill-btn-dark" onClick={() => setSelectedPet(pet)} style={{ flex: 1 }} aria-label={`Ver historial de ${pet.name}`}>
                  Historial & QR
                </button>
                <button className="pill-btn pill-btn-light" onClick={() => setQrModalPet(pet)} aria-label={`Placa QR de ${pet.name}`}>
                  Placa QR
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedPet && (
        <div className="modal-backdrop" onClick={() => setSelectedPet(null)}>
          <div className="modal-card modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Historial Clínico - {selectedPet.name}</h3>
              <button className="modal-close" onClick={() => setSelectedPet(null)} aria-label="Cerrar modal">✕</button>
            </div>

            <div className="profile-grid">
              <div>
                <div className="pet-card-top" style={{ marginBottom: 14 }}>
                  <img src={selectedPet.photoUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80"} alt={selectedPet.name} className="pet-avatar-img-large" />
                  <div>
                    <h2 style={{ margin: 0 }}>{selectedPet.name}</h2>
                    <p style={{ color: "rgba(8,56,58,0.7)", margin: "2px 0" }}>{selectedPet.species} · {selectedPet.age}</p>
                    <span className="pet-badge pet-badge-active">Microchip: {selectedPet.chipId || selectedPet.microchip || "985141002"}</span>
                  </div>
                </div>

                <div className="info-list">
                  <div className="info-row">
                    <span>Responsable:</span>
                    <strong>{selectedPet.owner || "Iván Camilo"}</strong>
                  </div>
                  <div className="info-row">
                    <span>Contacto Emergencia:</span>
                    <strong>{selectedPet.phone || "+57 300 123 4567"}</strong>
                  </div>
                </div>

                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <button className="store-btn primary" onClick={() => { setQrModalPet(selectedPet); setSelectedPet(null); }}>
                    Ver Código QR de Emergencia
                  </button>
                </div>
              </div>

              <div>
                <h3 style={{ margin: "0 0 10px" }}>Vacunas y Consultas</h3>
                <div className="notifications-list">
                  {(selectedPet.medicalHistory || [
                    { date: "2026-01-10", title: "Vacuna Antirrábica", vet: "Clínica San Francisco", status: "Completada" }
                  ]).map((item, idx) => (
                    <article className="notification-card" key={idx}>
                      <div className="notification-pill">{item.status}</div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: "0.92rem" }}>{item.title}</h3>
                        <p style={{ margin: 0, fontSize: "0.78rem" }}>{item.vet} · {item.date}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {qrModalPet && (
        <div className="modal-backdrop" onClick={() => setQrModalPet(null)}>
          <div className="modal-card qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Identidad QR - {qrModalPet.name}</h3>
              <button className="modal-close" onClick={() => setQrModalPet(null)} aria-label="Cerrar modal">✕</button>
            </div>

            <div className="qr-box" style={{ display: "grid", placeItems: "center", padding: 20, background: "#FFFFFF", borderRadius: 20 }}>
              <QRCode
                value={`https://peluvis.app/pet-qr/${qrModalPet.chipId || qrModalPet.id}`}
                size={180}
                bgColor="#FFFFFF"
                fgColor="#08383A"
              />
            </div>

            <p className="qr-caption" style={{ textAlign: "center", marginTop: 12, fontSize: "0.85rem" }}>
              Escanea este código QR desde cualquier smartphone para ver el perfil de <strong>{qrModalPet.name}</strong> y contactar a su dueño en caso de pérdida.
            </p>
          </div>
        </div>
      )}

      {isNewPetOpen && (
        <div className="modal-backdrop" onClick={() => setIsNewPetOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Registrar Nueva Mascota</h3>
              <button className="modal-close" onClick={() => setIsNewPetOpen(false)} aria-label="Cerrar modal">✕</button>
            </div>

            <form className="modal-form" onSubmit={handleCreatePet}>
              <input
                type="text"
                placeholder="Nombre de la mascota"
                value={newPetForm.name}
                onChange={(e) => setNewPetForm({...newPetForm, name: e.target.value})}
                required
                aria-label="Nombre de la mascota"
              />
              <input
                type="text"
                placeholder="Especie / Raza"
                value={newPetForm.species}
                onChange={(e) => setNewPetForm({...newPetForm, species: e.target.value})}
                aria-label="Especie / Raza"
              />
              <input
                type="text"
                placeholder="Edad"
                value={newPetForm.age}
                onChange={(e) => setNewPetForm({...newPetForm, age: e.target.value})}
                aria-label="Edad de la mascota"
              />
              <input
                type="text"
                placeholder="Número de Microchip (opcional)"
                value={newPetForm.chipId}
                onChange={(e) => setNewPetForm({...newPetForm, chipId: e.target.value})}
                aria-label="Número de Microchip"
              />

              <div className="modal-actions">
                <button type="button" className="pill-btn" onClick={() => setIsNewPetOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="store-btn primary">
                  Crear Perfil & Generar QR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default PetsPage;