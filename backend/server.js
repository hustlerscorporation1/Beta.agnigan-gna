import express from "express";
import dotenv from "dotenv";
import { pool } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import terrainRoutes from "./routes/terrain.routes.js";
import terrainAssetsRoutes from "./routes/terrain_assets.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import terrainStudyRoutes from "./routes/terrainStudy.routes.js";
import verificationRoutes from "./routes/verification.routes.js";
import legalStatusRoutes from "./routes/legalStatus.routes.js";
import agentRoutes from "./routes/agent.routes.js";
import agentActionRoutes from "./routes/agentAction.routes.js";
import contractRoutes from "./routes/contract.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import supportRoutes from "./routes/support.routes.js";
import reportRoutes from "./routes/report.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Test de la connexion DB
pool
  .getConnection()
  .then(() => console.log("✅ Connecté à la base MySQL"))
  .catch((err) => console.error("❌ Erreur de connexion MySQL:", err.message));

// Routes

//Auth
app.use("/api/auth", authRoutes);

//Profile
app.use("/api/profiles", profileRoutes);

//Terrain
app.use("/api/terrains", terrainRoutes);

// Terrain Assets image et documents
app.use("/api/terrains/assets", terrainAssetsRoutes);

// favorites
app.use("/api/favorites", favoriteRoutes);

// Transaction
app.use("/api/transactions", transactionRoutes);

// Paiements
app.use("/api/payments", paymentRoutes);

// Studies terrain
app.use("/api/terrain-studies", terrainStudyRoutes);

// Vérification
app.use("/api/verifications", verificationRoutes);

// Status juridique
app.use("/api/legal-status", legalStatusRoutes);

// Agent
app.use("/api/agents", agentRoutes);

// Actions des agents
app.use("/api/agent-actions", agentActionRoutes);

// Documents contractuels
app.use("/api/contracts", contractRoutes);

// Notifications
app.use("/api/notifications", notificationRoutes);

// Chats
app.use("/api/chats", chatRoutes);

// Support
app.use("/api/support", supportRoutes);

// Rapports
app.use("/api/reports", reportRoutes);

// feedback
app.use("/api/feedbacks", feedbackRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
