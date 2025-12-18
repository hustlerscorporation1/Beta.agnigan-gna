// controllers/agentController.js
import { v4 as uuidv4 } from "uuid";
import { insertAgent, updateAgentById, getAllAgents } from "../models/Agent.js";

// ➕ Créer un agent
export const createAgent = async (req, res) => {
  try {
    const id = uuidv4();
    const { profile_id, employee_code, branch, commission_rate } = req.body;

    await insertAgent({
      id,
      profile_id,
      employee_code,
      branch,
      commission_rate,
    });

    res.status(201).json({ message: "Agent créé avec succès.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l’agent." });
  }
};

// 🔄 Mettre à jour un agent
export const updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { branch, commission_rate, is_active } = req.body;

    await updateAgentById(id, { branch, commission_rate, is_active });

    res.status(200).json({ message: "Agent mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l’agent." });
  }
};

// 📋 Lister les agents
export const listAgents = async (req, res) => {
  try {
    const agents = await getAllAgents();
    res.status(200).json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors du chargement des agents." });
  }
};
