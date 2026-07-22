import { pool } from "../db/client.js";

export async function createComment(userId, data) {
  const { post_id, content } = data;

  if (!post_id) throw new Error("post_id es obligatorio");
  if (!content?.trim()) throw new Error("El contenido es obligatorio");

  const postCheck = await pool.query(
    "SELECT id, author_id FROM posts WHERE id = $1",
    [post_id]
  );

  if (postCheck.rows.length === 0) {
    throw new Error("El post no existe");
  }

  const result = await pool.query(
    `INSERT INTO comments (post_id, author_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [post_id, userId, content.trim()]
  );

  const postAuthorId = postCheck.rows[0].author_id;

  if (postAuthorId !== userId) {
    await pool.query(
      `INSERT INTO notifications (recipient_id, actor_id, post_id, type, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [postAuthorId, userId, post_id, "comment", "Comentó en tu publicación"]
    );
  }

  return result.rows[0];
}

export async function getCommentsByPost(postId) {
  const result = await pool.query(
    `SELECT
        c.*,
        u.name AS author_name
     FROM comments c
     JOIN users u ON u.id = c.author_id
     WHERE c.post_id = $1
     ORDER BY c.created_at ASC`,
    [postId]
  );

  return result.rows;
}