function AlertsPage() {
  const alerts = [
    {
      id: 1,
      title: "Nueva alerta cerca de tu zona",
      description: "Se reportó una mascota perdida en un sector cercano a tu ubicación.",
      time: "Hace 10 min",
      tag: "ALERTA",
    },
    {
      id: 2,
      title: "Avistamiento registrado",
      description: "Un miembro de la comunidad compartió un nuevo reporte visual.",
      time: "Hace 1 h",
      tag: "MAPA",
    },
    {
      id: 3,
      title: "Perfil QR consultado",
      description: "Se escaneó un código QR vinculado a una mascota registrada.",
      time: "Hoy",
      tag: "QR",
    },
  ];

  return (
    <section className="page-stack">
      <section className="page-block">
        <div className="section-row">
          <div>
            <p className="section-kicker">Alertas</p>
            <h1>Centro de notificaciones</h1>
            <p>
              Consulta novedades importantes sobre casos, actividad y seguimiento comunitario.
            </p>
          </div>
        </div>
      </section>

      <section className="page-block">
        <div className="notifications-list">
          {alerts.map((alert) => (
            <article className="notification-card" key={alert.id}>
              <div className="notification-pill">{alert.tag}</div>

              <div className="notification-body">
                <h3>{alert.title}</h3>
                <p>{alert.description}</p>
              </div>

              <span className="notification-time">{alert.time}</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default AlertsPage;