import { useState, useCallback, useEffect } from 'react';
import { botConfig, botResponses } from '../config/config';

export const useChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: botConfig.welcomeMessage, sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Fonction pour simuler la frappe du bot
  const simulateTyping = useCallback((text, delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsTyping(true);
        const messageId = Date.now();
        let currentText = '';
        
        const typingInterval = setInterval(() => {
          if (currentText.length < text.length) {
            currentText = text.substring(0, currentText.length + 1);
            setMessages(prev => {
              // Supprimer le message de frappe précédent s'il existe
              const filteredMessages = prev.filter(msg => msg.id !== messageId);
              // Ajouter le nouveau message avec le texte mis à jour
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
            // Remplacer le message de frappe par le message final sans l'indicateur de frappe
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
        }, botConfig.typingSpeed);
      }, delay);
    });
  }, []);

  // Gestion des réponses du bot
  const getBotResponse = useCallback(async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Réponses prédéfinies
    if (/bonjour|salut|coucou|hey|hi|hello/.test(lowerMessage)) {
      const randomIndex = Math.floor(Math.random() * botResponses.salutations.length);
      await simulateTyping(botResponses.salutations[randomIndex], 500);
    } 
    else if (/merci|super|génial|parfait/.test(lowerMessage)) {
      const randomIndex = Math.floor(Math.random() * botResponses.remerciements.length);
      await simulateTyping(botResponses.remerciements[randomIndex], 500);
    }
    else if (/acheter|achat|achete|recherche|trouver/.test(lowerMessage)) {
      await simulateTyping(botResponses.achat.procedure, 500);
      await simulateTyping(" " + botResponses.achat.contact, 200);
    }
    else if (/vendre|vente|vends|mettre en vente/.test(lowerMessage)) {
      await simulateTyping(botResponses.vente.procedure, 500);
      await simulateTyping(" " + botResponses.vente.conditions, 200);
    }
    else {
      await simulateTyping(botConfig.defaultResponse, 500);
    }
  }, [simulateTyping]);

  // Gestion de l'envoi de message
  const sendMessage = useCallback(async (text) => {
    const trimmedText = text.trim();
    if (!trimmedText || isTyping) return;

    // Créer un nouvel ID pour le message utilisateur
    const userMessageId = Date.now();
    
    // Ajout du message de l'utilisateur
    setMessages(prev => [
      ...prev,
      {
        id: userMessageId,
        text: trimmedText,
        sender: 'user'
      }
    ]);
    
    // Réponse du bot
    try {
      await getBotResponse(trimmedText);
    } catch (error) {
      console.error('Erreur lors de la génération de la réponse du bot:', error);
      await simulateTyping("Désolé, une erreur s'est produite. Veuillez réessayer.", 500);
    }
  }, [getBotResponse, isTyping, simulateTyping]);

  return {
    messages,
    isTyping,
    sendMessage
  };
};
