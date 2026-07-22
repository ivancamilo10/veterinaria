import { useState, useEffect } from "react";
import api from "../services/api";

function FeedPage() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Fundación Amor Animal",
      role: "Fundación Aliada",
      type: "adopcion",
      typeTag: "🏡 ADOPCIÓN RESPONSABLE",
      title: "Luna busca un hogar lleno de amor",
      content: "Luna fue rescatada en la zona del mercado. Es una perrita criolla de 2 años, esterilizada, con vacunas al día e identificación QR en Peluvis.",
      photoUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80",
      likes: 24,
      comments: 6,
      time: "Hace 2 horas"
    },
    {
      id: 2,
      author: "Carlos Ruiz (Guardián #412)",
      role: "Comunidad",
      type: "avistamiento",
      typeTag: "👀 AVISTAMIENTO CONFIRMADO",
      title: "Posible avistamiento de Beagle cerca del Parque de los Novios",
      content: "Vi a un perro de raza Beagle con collar azul caminando en dirección a la carrera 3. Comparto foto para verificar si corresponde a la alerta de Toby.",
      photoUrl: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&auto=format&fit=crop&q=80",
      likes: 18,
      comments: 12,
      time: "Hace 4 horas"
    },
    {
      id: 3,
      author: "Clínica Veterinaria San Francisco",
      role: "Veterinaria Afiliada",
      type: "campana",
      typeTag: "💉 CAMPAÑA DE VACUNACIÓN",
      title: "Jornada de Vacunación Antirrábica & Marcación QR Gratuita",
      content: "Este sábado estaremos ofreciendo desparasitación y registro de placas QR Peluvis con 50% de descuento para mascotas de rescatistas independientes.",
      photoUrl: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&auto=format&fit=crop&q=80",
      likes: 45,
      comments: 9,
      time: "Hoy 9:00 AM"
    }
  ]);

  useEffect(() => {
    api.get("/posts/feed")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setPosts(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const [newPostForm, setNewPostForm] = useState({
    title: "",
    type: "adopcion",
    content: ""
  });

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostForm.title) return;

    try {
      const res = await api.post("/posts", {
        title: newPostForm.title,
        content: newPostForm.content,
        type: newPostForm.type
      });
      if (res.data) {
        setPosts([res.data, ...posts]);
      }
    } catch (_err) {
      const typeTags = {
        adopcion: "🏡 ADOPCIÓN RESPONSABLE",
        rescate: "🐾 RESCATE & AYUDA",
        avistamiento: "👀 AVISTAMIENTO",
        campana: "📢 CAMPAÑA"
      };
      const created = {
        id: Date.now(),
        author: "Iván Camilo",
        role: "Guardián Peluvis",
        type: newPostForm.type,
        typeTag: typeTags[newPostForm.type] || "🐾 PUBLICACIÓN",
        title: newPostForm.title,
        content: newPostForm.content,
        photoUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80",
        likes: 1,
        comments: 0,
        time: "Hace unos momentos"
      };
      setPosts([created, ...posts]);
    }

    setNewPostForm({ title: "", type: "adopcion", content: "" });
    setIsCreatePostOpen(false);
  };

  const filteredPosts = activeFilter === "todos" 
    ? posts 
    : posts.filter(p => p.type === activeFilter);

  return (
    <section className="page-stack">
      <section className="page-block" style={{ maxWidth: 640, marginInline: "auto", width: "100%" }}>
        <div className="section-row">
          <div>
            <p className="section-kicker">Comunidad Activa</p>
            <h1 style={{ fontSize: "1.8rem", margin: "4px 0" }}>Feed Social & Red de Apoyo</h1>
          </div>

          <button className="store-btn primary" onClick={() => setIsCreatePostOpen(true)} aria-label="Nueva Publicación">
            + Publicar
          </button>
        </div>

        <div className="pet-actions" style={{ marginTop: 14 }}>
          <button 
            className={activeFilter === "todos" ? "pill-btn pill-btn-dark" : "pill-btn"}
            onClick={() => setActiveFilter("todos")}
            aria-label="Filtrar todos los posts"
          >
            Todos
          </button>
          <button 
            className={activeFilter === "adopcion" ? "pill-btn pill-btn-dark" : "pill-btn"}
            onClick={() => setActiveFilter("adopcion")}
            aria-label="Filtrar adopciones"
          >
            Adopciones
          </button>
          <button 
            className={activeFilter === "avistamiento" ? "pill-btn pill-btn-dark" : "pill-btn"}
            onClick={() => setActiveFilter("avistamiento")}
            aria-label="Filtrar avistamientos"
          >
            Avistamientos
          </button>
          <button 
            className={activeFilter === "campana" ? "pill-btn pill-btn-dark" : "pill-btn"}
            onClick={() => setActiveFilter("campana")}
            aria-label="Filtrar campañas"
          >
            Campañas
          </button>
        </div>
      </section>

      <section className="post-card-container">
        {filteredPosts.map((post) => (
          <article className="post-card" key={post.id}>
            <div className="pet-card-top" style={{ marginBottom: 10 }}>
              <div className="pet-avatar" style={{ background: "#08383a", color: "#fff" }}>
                {(post.author || "Peluvis").charAt(0)}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1rem" }}>{post.author || "Usuario Peluvis"}</h3>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(8,56,58,0.7)" }}>
                  {post.role || "Guardián"} · {post.time || "Reciente"}
                </p>
              </div>
              <span className="pet-badge pet-badge-active" style={{ marginLeft: "auto", fontSize: "0.72rem" }}>
                {post.typeTag || "🐾 PUBLICACIÓN"}
              </span>
            </div>

            <h2 style={{ fontSize: "1.15rem", margin: "6px 0" }}>{post.title}</h2>
            <p style={{ fontSize: "0.94rem", lineHeight: "1.45", margin: "6px 0 12px", color: "#184447" }}>
              {post.content}
            </p>

            {post.photoUrl && (
              <img 
                src={post.photoUrl} 
                alt={post.title} 
                style={{ width: "100%", maxHeight: 280, objectFit: "cover", borderRadius: 16, marginBottom: 12 }} 
              />
            )}

            <div className="pet-meta" style={{ borderTop: "1px solid rgba(8,56,58,0.08)", paddingTop: 10, margin: 0 }}>
              <div className="pet-actions">
                <button className="pill-btn pill-btn-light" style={{ minHeight: 34, padding: "0 12px", fontSize: "0.82rem" }} aria-label="Dar Me Gusta">
                  ❤️ {post.likes || 0}
                </button>
                <button className="pill-btn pill-btn-light" style={{ minHeight: 34, padding: "0 12px", fontSize: "0.82rem" }} aria-label="Comentarios">
                  💬 {post.comments || 0}
                </button>
                <button className="pill-btn pill-btn-light" style={{ minHeight: 34, padding: "0 12px", fontSize: "0.82rem" }} aria-label="Compartir publicación">
                  🔄 Compartir
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {isCreatePostOpen && (
        <div className="modal-backdrop" onClick={() => setIsCreatePostOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Compartir con la Comunidad</h3>
              <button className="modal-close" onClick={() => setIsCreatePostOpen(false)} aria-label="Cerrar modal">✕</button>
            </div>

            <form className="modal-form" onSubmit={handleCreatePost}>
              <input
                type="text"
                placeholder="Título de la publicación"
                value={newPostForm.title}
                onChange={(e) => setNewPostForm({...newPostForm, title: e.target.value})}
                required
                aria-label="Título de la publicación"
              />
              <select 
                value={newPostForm.type}
                onChange={(e) => setNewPostForm({...newPostForm, type: e.target.value})}
                aria-label="Categoría de publicación"
              >
                <option value="adopcion">Adopción Responsable</option>
                <option value="avistamiento">Reporte de Avistamiento</option>
                <option value="rescate">Rescate & Ayuda</option>
                <option value="campana">Campaña / Evento</option>
              </select>
              <textarea
                rows="4"
                placeholder="Escribe los detalles para que la comunidad pueda colaborar..."
                value={newPostForm.content}
                onChange={(e) => setNewPostForm({...newPostForm, content: e.target.value})}
                required
                aria-label="Detalles de la publicación"
              />

              <div className="modal-actions">
                <button type="button" className="pill-btn" onClick={() => setIsCreatePostOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="store-btn primary">
                  Publicar en Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default FeedPage;