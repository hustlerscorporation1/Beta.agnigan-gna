// controllers/contractController.js
import { v4 as uuidv4 } from "uuid";
import {
  insertContract,
  signContractById,
  getContractById,
} from "../models/Contract.js";

// ➕ Créer un contrat
export const createContract = async (req, res) => {
  try {
    const id = uuidv4();
    const { terrain_id, seller_id, buyer_id, contract_url } = req.body;

    await insertContract({ id, terrain_id, seller_id, buyer_id, contract_url });
    res.status(201).json({ message: "Contrat créé.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du contrat." });
  }
};

// 🔄 Signer un contrat
export const signContract = async (req, res) => {
  try {
    const { id } = req.params;
    await signContractById(id);
    res.status(200).json({ message: "Contrat signé." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la signature." });
  }
};

// 📋 Récupérer un contrat
export const getContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await getContractById(id);
    if (!contract)
      return res.status(404).json({ message: "Contrat non trouvé." });
    res.status(200).json(contract);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du contrat." });
  }
};
