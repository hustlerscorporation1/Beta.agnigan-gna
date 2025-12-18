import { pool } from "../config/db.js";

// ➕ Enregistrer une action d’agent
export const logAgentAction = async (req, res) => {
  const sql = `INSERT INTO agent_actions (id, agent_id, action_type, target_table, target_id, details)
    VALUES (?, ?, ?, ?, ?, ?)`;
  await pool.query(sql, [
    id,
    agent_id,
    action_type,
    target_table,
    target_id,
    JSON.stringify(details),
  ]);
};
