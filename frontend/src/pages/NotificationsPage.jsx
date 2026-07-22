function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'Alerta',
      title: 'Nuevo avistamiento reportado para Luna',
      description: 'Un guardián compartió ubicación y fotografía cerca del Rodadero.',
      time: 'Hace 12 min',
    },
    {
      id: 2,
      type: 'Salud',
      title: 'Vacuna pendiente para Milo',
      description: 'La cartilla indica una próxima dosis programada esta semana.',
      time: 'Hace 1 hora',
    },
    {
      id: 3,
      type: 'Comunidad',
      title: 'Nueva interacción en tu publicación',
      description: 'Una fundación respondió con apoyo para el caso que compartiste.',
      time: 'Hace 3 horas',
    },
  ]

  return (
    <section className="page-stack">
      <section className="page-block">
        <div className="page-head">
          <p className="section-kicker">Alertas</p>
          <h1>Actividad importante de tu red</h1>
          <p>
            Revisa eventos urgentes, recordatorios y movimientos recientes relacionados con tus mascotas y publicaciones.
          </p>
        </div>

        <div className="notifications-list">
          {notifications.map((item) => (
            <article className="notification-card" key={item.id}>
              <div className="notification-pill">{item.type}</div>

              <div className="notification-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <span className="notification-time">{item.time}</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default NotificationsPage