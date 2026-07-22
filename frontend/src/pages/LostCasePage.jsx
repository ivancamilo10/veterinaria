import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function LostCasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSightingOpen, setIsSightingOpen] = useState(false);

  return (
    <section className="page-stack">
      <section className="page-block">
        <div className="section-row">
          <div>
            <p className="section-kicker">Caso</p>
            <h1>Detalle del caso #{id}</h1>
            <p>
              Aquí puedes revisar la información completa del caso, hacer seguimiento y reportar avistamientos.
            </p>
          </div>

          <div className="profile-actions">
            <button className="pill-btn" onClick={() => navigate("/lost")}>
              Volver
            </button>

            <button className="store-btn primary" onClick={() => setIsSightingOpen(true)}>
              Reportar avistamiento
            </button>
          </div>
        </div>
      </section>

      <section className="profile-grid">
        <article className="page-block">
          <p className="section-kicker">Mascota</p>
          <h2 className="subheading">Luna</h2>
          <div className="info-list">
            <div className="info-row">
              <span>Especie</span>
              <strong>Perra criolla</strong>
            </div>
            <div className="info-row">
              <span>Última zona</span>
              <strong>El Rodadero</strong>
            </div>
            <div className="info-row">
              <span>Estado</span>
              <strong>Activa</strong>
            </div>
          </div>
        </article>

        <article className="page-block">
          <p className="section-kicker">Seguimiento</p>
          <h2 className="subheading">Actividad del caso</h2>

          <div className="notifications-list">
            <article className="notification-card">
              <div className="notification-pill">ALERTA</div>
              <div className="notification-body">
                <h3>Alerta comunitaria enviada</h3>
                <p>Se distribuyó el caso entre guardianes y aliados cercanos.</p>
              </div>
              <span className="notification-time">Hoy</span>
            </article>

            <article className="notification-card">
              <div className="notification-pill">MAPA</div>
              <div className="notification-body">
                <h3>Zona priorizada</h3>
                <p>Se registró una zona de búsqueda activa para seguimiento.</p>
              </div>
              <span className="notification-time">Hace 2 h</span>
            </article>
          </div>
        </article>
      </section>

      {isSightingOpen && (
        <div className="modal-backdrop" onClick={() => setIsSightingOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Reportar avistamiento</h3>
              <button className="modal-close" onClick={() => setIsSightingOpen(false)}>
                Cerrar
              </button>
            </div>

            <form className="modal-form">
              <input type="text" placeholder="Ubicación del avistamiento" />
              <input type="datetime-local" />
              <textarea rows="4" placeholder="Describe lo que viste" />
              <input type="file" />

              <div className="modal-actions">
                <button type="button" className="pill-btn" onClick={() => setIsSightingOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="store-btn primary">
                  Enviar reporte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default LostCasePage;