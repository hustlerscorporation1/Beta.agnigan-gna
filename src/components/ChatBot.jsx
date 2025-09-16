// src/components/Chatbot.jsx
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import "../Styles/ChatBot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Bonjour 👋 Je suis votre assistant virtuel. Comment puis-je vous aider ?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    // Ajouter le message utilisateur
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Réponse automatique du bot (à améliorer si besoin)
    setMessages([
      ...newMessages,
      {
        sender: "bot",
        text: "Merci pour votre message 😊 Je vous répondrai bientôt.",
      },
    ]);

    setInput("");
  };

  return (
    <div className="chatbot-container">
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-button"
      >
        <FaComment className="h-6 w-6" />
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="chatbot-window">
          {/* En-tête */}
          <div className="chatbot-header">
            <h2>Assistant de Anyigbã nya</h2>
            <button onClick={() => setIsOpen(false)} className="chatbot-close">
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          {/* Zone messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Champ d'entrée */}
          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrire un message..."
              className="chatbot-input"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="chatbot-send"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
