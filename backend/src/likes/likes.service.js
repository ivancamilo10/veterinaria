import { pool } from "../db/client.js";

export async function toggleLike(userId, postId) {
  const postCheck = await pool.query(
    "SELECT id, author_id FROM posts WHERE id = $1",
    [postId]
  );

  if (postCheck.rows.length === 0) {
    throw new Error("El post no existe");
  }

  const existing = await pool.query(
    "SELECT id FROM likes WHERE post_id = $1 AND user_id = $2",
    [postId, userId]
  );

  if (existing.rows.length > 0) {
    await pool.query(
      "DELETE FROM likes WHERE post_id = $1 AND user_id = $2",
      [postId, userId]
    );

    return { liked: false };
  }

  await pool.query(
    "INSERT INTO likes (post_id, user_id) VALUES ($1, $2)",
    [postId, userId]
  );

  const postAuthorId = postCheck.rows[0].author_id;

  if (postAuthorId !== userId) {
    await pool.query(
      `INSERT INTO notifications (recipient_id, actor_id, post_id, type, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [postAuthorId, userId, postId, "like", "Le dio like a tu publicación"]
    );
  }

  return { liked: true };
}

export async function getLikesCount(postId) {
  const result = await pool.query(
    "SELECT COUNT(*)::int AS count FROM likes WHERE post_id = $1",
    [postId]
  );

  return result.rows[0];
}