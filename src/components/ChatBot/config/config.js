export const botConfig = {
  name: "AgnignaBot",
  welcomeMessage: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
  defaultResponse: "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question ?",
  typingSpeed: 10, // ms entre chaque caractère
  autoResponseDelay: 500, // ms avant l'envoi d'une réponse automatique
};

export const botResponses = {
  salutations: [
    "Bonjour !",
    "Salut ! Comment puis-je vous aider ?",
    "Bienvenue ! En quoi puis-je vous être utile aujourd'hui ?"
  ],
  remerciements: [
    "Je vous en prie !",
    "Avec plaisir !",
    "N'hésitez pas si vous avez d'autres questions !"
  ],
  achat: {
    procedure: "Pour procéder à un achat, veuillez vous rendre sur la page 'Procéder à un achat' dans le menu principal.",
    contact: "Vous pouvez également nous contacter directement pour plus d'informations."
  },
  vente: {
    procedure: "Pour mettre en vente un bien, veuillez remplir le formulaire dans la section 'Procéder à une vente'.",
    conditions: "Nos conditions de vente sont disponibles sur notre site web."
  }
};

export const quickReplies = [
  { id: 1, text: "Procéder à un achat" },
  { id: 2, text: "Procéder à une vente" },
  { id: 3, text: "Contactez-nous" },
  { id: 4, text: "Voir nos biens" }
];
