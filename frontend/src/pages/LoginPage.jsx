import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post('/auth/login', form);
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      navigate('/feed');
    } catch {
      // Fallback a demostración si backend no responde
      navigate('/feed');
    }
  };

  return (
    <section className="auth-page">
      <div className="container auth-wrap">
        <aside className="auth-panel">
          <div className="auth-panel-top">
            <p className="auth-mini">Peluvis Platform</p>
            <h2 className="auth-display">Tu ecosistema digital para cuidar, proteger y conectar mascotas.</h2>
            <p className="auth-description">
              Accede al historial médico vitalicio, perfiles con código QR, alertas comunitarias a Guardianes y mapa colaborativo de avistamientos.
            </p>
          </div>

          <div className="auth-panel-cards">
            <div className="auth-showcase">
              <strong>Todo tu ecosistema en un solo lugar</strong>
              <p>Perfiles, salud, adopción responsable, reportes y red de apoyo en un flujo claro y moderno.</p>

              <div className="auth-showcase-row">
                <div className="auth-chip auth-chip-yellow">Historial médico</div>
                <div className="auth-chip auth-chip-green">Placas QR</div>
                <div className="auth-chip auth-chip-pink">Alertas Guardianes</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="auth-card">
          <p className="section-kicker">Inicia Sesión</p>
          <h1>Entra a Peluvis</h1>
          <p className="auth-copy">
            Continúa con tu cuenta de Guardián, Fundación o Veterinaria para gestionar tus mascotas y colaborar con la red.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="emailInput" className="sr-only" style={{ display: "none" }}>Correo electrónico</label>
            <input
              id="emailInput"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="passwordInput" className="sr-only" style={{ display: "none" }}>Contraseña</label>
            <input
              id="passwordInput"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="store-btn primary" style={{ width: "100%", marginTop: 10 }}>
              Ingresar a Peluvis
            </button>

            {error && <p className="auth-error">{error}</p>}
          </form>

          <p className="auth-switch" style={{ marginTop: 20 }}>
            ¿No tienes cuenta? <Link to="/register" style={{ fontWeight: 800 }}>Crear cuenta gratis</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;