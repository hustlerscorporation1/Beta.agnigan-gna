import React, { useState, useEffect } from 'react';
import { useChat } from './ChatBot/hooks/useChat';
import ChatButton from './ChatBot/components/ChatButton';
import ChatWindow from './ChatBot/components/ChatWindow';
import { properties } from '../data/properties';

/**
 * Composant principal du ChatBot (Assistant Virtuel)
 * Gère l'état d'ouverture, le compteur de messages non lus et l'intégration logicielle.
 */
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Initialisation du hook de chat avec les données réelles des propriétés
  const { messages, isTyping, sendMessage } = useChat(properties);

  // Gestion des notifications de messages non lus
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount(prev => prev + 1);
    } else if (isOpen) {
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const handleSendMessage = (message) => {
    sendMessage(message);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Fenêtre de chat */}
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        onClose={() => setIsOpen(false)}
      />
      
      {/* Bouton flottant */}
      <ChatButton
        isOpen={isOpen}
        onClick={toggleChat}
        unreadCount={unreadCount}
      />
    </div>
  );
};

export default ChatBot;
