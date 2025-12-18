// models/Agent.js
import { pool } from "../config/db.js";

// ➕ Créer un agent
export const insertAgent = async (agent) => {
  const sql = `
    INSERT INTO agents (id, profile_id, employee_code, branch, commission_rate)
    VALUES (?, ?, ?, ?, ?)
  `;
  await pool.query(sql, [
    agent.id,
    agent.profile_id,
    agent.employee_code,
    agent.branch,
    agent.commission_rate,
  ]);
};

// 🔄 Mettre à jour un agent
export const updateAgentById = async (id, data) => {
  const sql = `
    UPDATE agents 
    SET branch = ?, commission_rate = ?, is_active = ? 
    WHERE id = ?
  `;
  await pool.query(sql, [
    data.branch,
    data.commission_rate,
    data.is_active,
    id,
  ]);
};

// 📋 Lister tous les agents
export const getAllAgents = async () => {
  const sql = `
    SELECT a.*, p.first_name, p.last_name, p.phone_number 
    FROM agents a
    LEFT JOIN profiles p ON a.profile_id = p.id
    ORDER BY a.created_at DESC
  `;
  const [rows] = await pool.query(sql);
  return rows;
};
