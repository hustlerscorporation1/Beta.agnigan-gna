import { useState, useCallback } from 'react';
import { botConfig } from '../config/config';
import { aiService } from '../../../services/aiService';

export const useChat = (propertyData = []) => {
  const [messages, setMessages] = useState([
    { id: 1, text: botConfig.welcomeMessage, sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Fonction pour simuler la frappe du bot (plus fluide)
  const simulateTyping = useCallback((text, delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsTyping(true);
        const messageId = Date.now();
        let currentText = '';
        
        // Vitesse de frappe adaptée à la longueur du texte pour simuler le streaming
        const speed = text.length > 100 ? 5 : 15;

        const typingInterval = setInterval(() => {
          if (currentText.length < text.length) {
            currentText = text.substring(0, currentText.length + 1);
            setMessages(prev => {
              const filteredMessages = prev.filter(msg => msg.id !== messageId);
              return [
                ...filteredMessages,
                { 
                  id: messageId, 
                  text: currentText, 
                  sender: 'bot', 
                  isTyping: true 
                }
              ];
            });
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            setMessages(prev => {
              const filteredMessages = prev.filter(msg => msg.id !== messageId);
              return [
                ...filteredMessages,
                { 
                  id: messageId, 
                  text: currentText, 
                  sender: 'bot',
                  isTyping: false
                }
              ];
            });
            resolve();
          }
        }, speed);
      }, delay);
    });
  }, []);

  // Gestion des réponses du bot via l'IA
  const getBotResponse = useCallback(async (userMessage, history) => {
    // Essayer de générer une réponse via l'IA
    const aiResponse = await aiService.generateResponse(userMessage, history, propertyData);
    
    if (aiResponse) {
      await simulateTyping(aiResponse, 300);
    } else {
      // Fallback si l'IA échoue ou si la clé API est absente
      await simulateTyping(botConfig.defaultResponse, 500);
    }
  }, [simulateTyping, propertyData]);

  // Gestion de l'envoi de message
  const sendMessage = useCallback(async (text) => {
    const trimmedText = text.trim();
    if (!trimmedText || isTyping) return;

    const userMessageId = Date.now();
    const newUserMessage = {
      id: userMessageId,
      text: trimmedText,
      sender: 'user'
    };
    
    // Ajout du message de l'utilisateur
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    
    // Réponse du bot
    try {
      await getBotResponse(trimmedText, updatedMessages);
    } catch (error) {
      console.error('Erreur lors de la génération de la réponse du bot:', error);
      await simulateTyping("Désolé, je rencontre une petite difficulté technique. Pourriez-vous reformuler ?", 500);
    }
  }, [getBotResponse, isTyping, simulateTyping, messages]);

  return {
    messages,
    isTyping,
    sendMessage
  };
};
