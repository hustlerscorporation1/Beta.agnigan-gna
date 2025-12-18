import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { logAgentAction } from "../models/agentAction.js";

// ➕ Enregistrer une action d’agent
export const logAgentAction = async (req, res) => {
  const { agent_id, action_type, target_table, target_id, details } = req.body;
  try {
    const id = uuidv4();

    await logAgentAction({
      id,
      agent_id,
      action_type,
      target_table,
      target_id,
      details: JSON.stringify(details),
    });

    res.status(201).json({ message: "Action enregistrée.", id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de l’enregistrement de l’action." });
  }
};

// 📋 Lister les actions d’un agent
export const listAgentActions = async (req, res) => {
  const { agentId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM agent_actions WHERE agent_id = ? ORDER BY created_at DESC`,
      [agentId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors du chargement des actions." });
  }
};
