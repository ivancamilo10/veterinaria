import { pool } from "../db/client.js";

const ALLOWED_TYPES = ["adoption", "lost", "rescue", "update"];

export async function createPost(userId, data) {
  const { pet_id, type, content } = data;

  if (!type || !ALLOWED_TYPES.includes(type)) {
    throw new Error("Tipo de publicación inválido");
  }

  if (!content || !content.trim()) {
    throw new Error("El contenido es obligatorio");
  }

  if (pet_id) {
    const petCheck = await pool.query(
      "SELECT id, owner_id FROM pets WHERE id = $1",
      [pet_id]
    );

    if (petCheck.rows.length === 0) {
      throw new Error("La mascota no existe");
    }

    if (petCheck.rows[0].owner_id !== userId) {
      throw new Error("No puedes publicar con una mascota que no te pertenece");
    }
  }

  const result = await pool.query(
    `INSERT INTO posts (author_id, pet_id, type, content)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, pet_id || null, type, content.trim()]
  );

  return result.rows[0];
}

export async function getFeed(limit = 20) {
  const result = await pool.query(
    `SELECT
        posts.id,
        posts.type,
        posts.content,
        posts.status,
        posts.created_at,
        users.id AS author_id,
        users.name AS author_name,
        pets.id AS pet_id,
        pets.name AS pet_name,
        pets.species,
        pets.breed
     FROM posts
     JOIN users ON users.id = posts.author_id
     LEFT JOIN pets ON pets.id = posts.pet_id
     ORDER BY posts.created_at DESC, posts.id DESC
     LIMIT $1`,
    [limit]
  );

  return result.rows;
}