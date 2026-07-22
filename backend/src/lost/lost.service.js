import { pool } from "../db/client.js";

export async function createLostReport(userId, data) {
  const {
    pet_id,
    title,
    description,
    last_seen_at,
    last_seen_location_text,
    latitude,
    longitude,
    reward_note
  } = data;

  if (!pet_id) throw new Error("pet_id es obligatorio");
  if (!title?.trim()) throw new Error("El título es obligatorio");
  if (!description?.trim()) throw new Error("La descripción es obligatoria");
  if (!last_seen_at) throw new Error("last_seen_at es obligatorio");
  if (!last_seen_location_text?.trim()) {
    throw new Error("La ubicación textual es obligatoria");
  }

  const petCheck = await pool.query(
    "SELECT id, owner_id, name FROM pets WHERE id = $1",
    [pet_id]
  );

  if (petCheck.rows.length === 0) {
    throw new Error("La mascota no existe");
  }

  if (petCheck.rows[0].owner_id !== userId) {
    throw new Error("No puedes reportar como perdida una mascota que no te pertenece");
  }

  const result = await pool.query(
    `INSERT INTO lost_reports (
      pet_id,
      owner_id,
      title,
      description,
      last_seen_at,
      last_seen_location_text,
      latitude,
      longitude,
      reward_note
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *`,
    [
      pet_id,
      userId,
      title.trim(),
      description.trim(),
      last_seen_at,
      last_seen_location_text.trim(),
      latitude || null,
      longitude || null,
      reward_note || null
    ]
  );

  return result.rows[0];
}

export async function getActiveLostReports() {
  const result = await pool.query(
    `SELECT
        lr.*,
        p.name AS pet_name,
        p.species,
        p.breed,
        u.name AS owner_name
     FROM lost_reports lr
     JOIN pets p ON p.id = lr.pet_id
     JOIN users u ON u.id = lr.owner_id
     WHERE lr.status = 'active'
     ORDER BY lr.created_at DESC`
  );

  return result.rows;
}

export async function addSighting(userId, data) {
  const {
    lost_report_id,
    note,
    seen_at,
    location_text,
    latitude,
    longitude,
    image_url
  } = data;

  if (!lost_report_id) throw new Error("lost_report_id es obligatorio");
  if (!note?.trim()) throw new Error("La nota es obligatoria");
  if (!location_text?.trim()) throw new Error("La ubicación es obligatoria");

  const reportCheck = await pool.query(
    "SELECT id, status FROM lost_reports WHERE id = $1",
    [lost_report_id]
  );

  if (reportCheck.rows.length === 0) {
    throw new Error("El reporte de pérdida no existe");
  }

  if (reportCheck.rows[0].status !== "active") {
    throw new Error("El reporte no está activo");
  }

  const result = await pool.query(
    `INSERT INTO sightings (
      lost_report_id,
      reporter_id,
      note,
      seen_at,
      location_text,
      latitude,
      longitude,
      image_url
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [
      lost_report_id,
      userId || null,
      note.trim(),
      seen_at || null,
      location_text.trim(),
      latitude || null,
      longitude || null,
      image_url || null
    ]
  );

  return result.rows[0];
}

export async function getSightingsByReport(reportId) {
  const result = await pool.query(
    `SELECT
        s.*,
        u.name AS reporter_name
     FROM sightings s
     LEFT JOIN users u ON u.id = s.reporter_id
     WHERE s.lost_report_id = $1
     ORDER BY s.created_at DESC`,
    [reportId]
  );

  return result.rows;
}

export async function closeLostReport(userId, reportId) {
  const report = await pool.query(
    `SELECT id, owner_id, status
     FROM lost_reports
     WHERE id = $1`,
    [reportId]
  );

  if (report.rows.length === 0) {
    throw new Error("Reporte no encontrado");
  }

  if (report.rows[0].owner_id !== userId) {
    throw new Error("No puedes cerrar un reporte que no te pertenece");
  }

  const result = await pool.query(
    `UPDATE lost_reports
     SET status = 'resolved'
     WHERE id = $1
     RETURNING *`,
    [reportId]
  );

  return result.rows[0];
}