import { botConfig } from '../components/ChatBot/config/config';

// Note: Pour React (CRA), les variables d'environnement DOIVENT commencer par REACT_APP_
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Service pour interagir avec l'IA Gemini
 */
export const aiService = {
  /**
   * Génère une réponse à partir d'un message utilisateur et d'un historique
   * @param {string} userMessage - Le message envoyé par l'utilisateur
   * @param {Array} history - L'historique de la conversation
   * @param {Array} propertyData - Les données des terrains pour le contexte
   */
  generateResponse: async (userMessage, history = [], propertyData = []) => {
    if (!GEMINI_API_KEY) {
      console.warn("Clé API Gemini manquante. Vérifiez que REACT_APP_GEMINI_API_KEY est défini dans .env et que vous avez redémarré le serveur.");
      return null;
    }

    try {
      // Extraire une liste simplifiée des propriétés pour le contexte (limité pour économiser les tokens)
      const propertiesSummary = propertyData.slice(0, 30).map(p => 
        `- ID ${p.id}: ${p.title} à ${p.location} (${p.region}), Prix: ${p.price}, Statut: ${p.status}`
      ).join('\n');

      // Préparation du prompt système ultra-détaillé
      const systemPrompt = `Tu es l'assistant virtuel expert d'Agnigban Gna, la plateforme immobilière de référence au Togo.
Ton rôle est de conseiller les clients sur l'achat et la vente de terrains au Togo avec courtoisie et expertise.

VOICI LES DONNÉES RÉELLES DU CATALOGUE :
${propertiesSummary}

RÈGLES DE RÉPONSE :
1. Utilise les noms de localités exacts (ex: Vogan, Atakpamé, Kara).
2. Si on te demande un terrain spécifique ou dans une zone précise, fouille dans la liste ci-dessus.
3. Si le terrain n'est pas dans la liste, dis poliment que tu ne le trouves pas pour le moment mais propose de noter leur demande.
4. Pour les prix, mentionne toujours qu'ils sont en Fcfa.
5. Sois très chaleureux, utilise des expressions comme "C'est un excellent choix", "Nous avons justement ce qu'il vous faut".
6. Formate les points clés en GRAS. Utilise des listes à puces pour les énumérations.
7. Ne sors JAMAIS du rôle d'assistant Agnigban Gna. Ne dis jamais que tu es un modèle d'IA.

CONTEXTE GÉNÉRAL :
- Agnigban Gna couvre tout le Togo (Maritime, Plateaux, Centrale, Kara, Savanes).
- Nous gérons les titres fonciers privés, en cours et libres.`;

      // Structure de la requête Gemini avec system_instruction
      const requestBody = {
        contents: [
          ...history.slice(-8).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          })),
          {
            role: "user",
            parts: [{ text: userMessage }]
          }
        ],
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      };

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error:", errorData);
        return null;
      }

      const data = await response.json();
      const botText = data.candidates[0]?.content?.parts[0]?.text;

      if (!botText) {
        console.warn("Réponse Gemini vide");
        return null;
      }

      return botText;
    } catch (error) {
      console.error("Erreur aiService:", error);
      return null;
    }
  }
};
