import express from "express";
import cors from "cors";
import authRoutes from "./auth/auth.routes.js";
import petsRoutes from "./pets/pets.routes.js";
import postsRoutes from "./posts/posts.routes.js";
import lostRoutes from "./lost/lost.routes.js";
import commentsRoutes from "./comments/comments.routes.js";
import likesRoutes from "./likes/likes.routes.js";
import notificationsRoutes from "./notifications/notifications.routes.js";

const app = express();

// Configuración de Seguridad HTTP y CORS
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Cabeceras de seguridad básicas
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Endpoint de verificación de salud de la API
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Peluvis API running cleanly", timestamp: new Date() });
});

// Rutas de la Aplicación
app.use("/api/auth", authRoutes);
app.use("/api/pets", petsRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/notifications", notificationsRoutes);

// Manejador centralizado de errores para Express
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  res.status(status).json({ ok: false, error: message });
});

export default app;