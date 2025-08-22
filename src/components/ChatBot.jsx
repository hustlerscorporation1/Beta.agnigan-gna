// src/components/Chatbot.jsx
import { useState } from "react";

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
    <div
      className="fixed bottom-5 right-5"
      style={{
        zIndex: 100000000000,
        marginRight: "20px",
        marginBottom: "20px",
      }}
    >
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        💬
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-lg flex flex-col absolute bottom-16 right-0">
          {/* En-tête */}
          <div className="bg-blue-600 text-white p-3 rounded-t-2xl flex justify-between items-center">
            <h2 className="font-bold">Assistant de anyigban </h2>
            <button onClick={() => setIsOpen(false)}>✖️</button>
          </div>

          {/* Zone messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "bot"
                    ? "bg-gray-200 text-left"
                    : "bg-blue-500 text-white ml-auto text-right"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Champ d'entrée */}
          <div className="p-3 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrire un message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
