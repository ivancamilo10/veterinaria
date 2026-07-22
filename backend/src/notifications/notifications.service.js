import { pool } from "../db/client.js";

export async function getMyNotifications(userId) {
  const result = await pool.query(
    `SELECT
        n.*,
        u.name AS actor_name
     FROM notifications n
     JOIN users u ON u.id = n.actor_id
     WHERE n.recipient_id = $1
     ORDER BY n.created_at DESC`,
    [userId]
  );

  return result.rows;
}

export async function markNotificationAsRead(userId, notificationId) {
  const result = await pool.query(
    `UPDATE notifications
     SET is_read = TRUE
     WHERE id = $1 AND recipient_id = $2
     RETURNING *`,
    [notificationId, userId]
  );

  if (result.rows.length === 0) {
    throw new Error("Notificación no encontrada");
  }

  return result.rows[0];
}