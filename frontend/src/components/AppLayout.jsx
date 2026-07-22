import { Link, Outlet, useNavigate } from 'react-router-dom'

function AppLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <nav style={{ display: 'flex', gap: '16px', padding: '20px', background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <Link to="/feed">Feed</Link>
        <Link to="/pets">Mascotas</Link>
        <Link to="/lost">Perdidas</Link>
        <Link to="/notifications">Notificaciones</Link>
        <button onClick={handleLogout}>Salir</button>
      </nav>

      <main style={{ padding: '24px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout