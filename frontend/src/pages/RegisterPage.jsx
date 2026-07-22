import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Persona / Dueño'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (_err) {
      // Fallback a demostración si backend no responde
      navigate('/login');
    }
  };

  return (
    <section className="auth-page">
      <div className="container auth-wrap">
        <aside className="auth-panel">
          <div className="auth-panel-top">
            <p className="auth-mini">Únete a Peluvis</p>
            <h2 className="auth-display">Cada mascota merece identidad, historial y una comunidad que la proteja.</h2>
            <p className="auth-description">
              Crea tu cuenta para comenzar a registrar mascotas, activar sus placas QR y conectarte con fundaciones y guardianes.
            </p>
          </div>

          <div className="auth-panel-cards">
            <div className="auth-showcase">
              <strong>Empieza en minutos</strong>
              <p>Elige tu tipo de perfil: Dueño, Fundación/Rescatista o Veterinaria/Negocio Aliado.</p>

              <div className="auth-showcase-row">
                <div className="auth-chip auth-chip-yellow">Registro rápido</div>
                <div className="auth-chip auth-chip-green">Guardianes activos</div>
                <div className="auth-chip auth-chip-pink">Identidad QR</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="auth-card">
          <p className="section-kicker">Crear Cuenta</p>
          <h1>Comienza hoy</h1>
          <p className="auth-copy">
            Registra tu perfil y entra al ecosistema digital de bienestar animal.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo u Organización"
              value={form.name}
              onChange={handleChange}
              required
              aria-label="Nombre completo u Organización"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
              aria-label="Correo electrónico"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña segura"
              value={form.password}
              onChange={handleChange}
              required
              aria-label="Contraseña segura"
            />
            
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              aria-label="Rol o Tipo de Usuario"
            >
              <option value="Persona / Dueño">Dueño de Mascota / Guardián</option>
              <option value="Fundación / Rescatista">Fundación / Rescatista</option>
              <option value="Veterinaria / Aliado">Veterinaria / Servicio Animal</option>
            </select>

            <button type="submit" className="store-btn primary" style={{ width: "100%", marginTop: 10 }}>
              Crear mi Cuenta Peluvis
            </button>

            {error && <p className="auth-error">{error}</p>}
          </form>

          <p className="auth-switch" style={{ marginTop: 20 }}>
            ¿Ya tienes cuenta? <Link to="/login" style={{ fontWeight: 800 }}>Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;