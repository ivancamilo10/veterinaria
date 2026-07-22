import { pool } from "../db/client.js";

export async function createPet(userId, data) {
  const {
    name,
    species,
    breed,
    sex,
    age_months,
    size,
    color
  } = data;

  const result = await pool.query(
    `INSERT INTO pets (
      owner_id,
      name,
      species,
      breed,
      sex,
      age_months,
      size,
      color
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [userId, name, species, breed || null, sex || null, age_months || null, size || null, color || null]
  );

  return result.rows[0];
}

export async function getMyPets(userId) {
  const result = await pool.query(
    `SELECT *
     FROM pets
     WHERE owner_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
}