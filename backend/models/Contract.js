// models/Contract.js
import { pool } from "../config/db.js";

// ➕ Créer un contrat
export const insertContract = async (contract) => {
  const sql = `
    INSERT INTO contracts (id, terrain_id, seller_id, buyer_id, contract_url)
    VALUES (?, ?, ?, ?, ?)
  `;
  await pool.query(sql, [
    contract.id,
    contract.terrain_id,
    contract.seller_id,
    contract.buyer_id,
    contract.contract_url,
  ]);
};

// 🔄 Signer un contrat
export const signContractById = async (id) => {
  const sql = `
    UPDATE contracts SET signed = 1, signed_at = NOW() WHERE id = ?
  `;
  await pool.query(sql, [id]);
};

// 📋 Récupérer un contrat par ID
export const getContractById = async (id) => {
  const sql = `SELECT * FROM contracts WHERE id = ?`;
  const [rows] = await pool.query(sql, [id]);
  return rows[0] || null;
};
