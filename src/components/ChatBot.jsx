import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useChat } from './ChatBot/hooks/useChat';
import ChatButton from './ChatBot/components/ChatButton';
import ChatWindow from './ChatBot/components/ChatWindow';
import { botConfig } from './ChatBot/config/config';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { messages, isTyping, sendMessage } = useChat();

  // Gestion des messages non lus
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

  // Données complètes des propriétés du site
  const properties = [
    {
      id: 2,
      title: "Sogan Kokouvi",
      price: "Titre Foncier : En cours",
      location: "Mango – Savanes",
      coordinates: [10.619586, 0.562733],
    },
    {
      id: 3,
      title: "Tchalla Sama",
      price: "73 000 000 Fcfa",
      location: "Atakpamé – Plateaux",
      coordinates: [7.016072, 1.002543],
    },
    {
      id: 4,
      title: "Komlan Yendouma",
      price: "Titre Foncier : Privé",
      location: "Kara – Kara",
      coordinates: [9.587885, 1.035059],
    },
    {
      id: 5,
      title: "Komlan Amegah",
      price: "153 000 000 Fcfa",
      location: "Badou – Plateaux",
      coordinates: [6.87456, 0.8787],
    },
    {
      id: 6,
      title: "Komlan Adjo",
      price: "107 000 000 Fcfa",
      location: "Badou – Plateaux",
      coordinates: [6.968875, 1.026543],
    },
    {
      id: 7,
      title: "Tchalla Atayi",
      price: "71 000 000 Fcfa",
      location: "Atakpamé – Plateaux",
      coordinates: [7.654419, 0.962045],
    },
    {
      id: 8,
      title: "Ayité Mawuli",
      price: "36 000 000 Fcfa",
      location: "Mango – Savanes",
      coordinates: [10.850239, 0.18265],
    },
    {
      id: 10,
      title: "Kokouvi Vincent",
      price: "Titre Foncier : En cours",
      location: "Bafilo – Kara",
      coordinates: [9.867747, 1.109543],
    },
    {
      id: 12,
      title: "Sosougan Sama",
      price: "77 000 000 Fcfa",
      location: "Sokodé – Centrale",
      coordinates: [8.992611, 0.939704],
    },
    {
      id: 13,
      title: "Adjonou Yaovi",
      price: "180 000 000 Fcfa",
      location: "Atakpamé – Plateaux",
      coordinates: [6.893691, 1.091363],
    },
    {
      id: 14,
      title: "Tchalla Atayi",
      price: "135 000 000 Fcfa",
      location: "Sokodé – Centrale",
      coordinates: [8.710915, 1.025952],
    },
    {
      id: 15,
      title: "Tchalla Komlan",
      price: "140 000 000 Fcfa",
      location: "Lomé – Maritime",
      coordinates: [6.424712, 0.921836],
    },
    {
      id: 16,
      title: "Sogan Kokouvi",
      price: "47 000 000 Fcfa",
      location: "Blitta – Centrale",
      coordinates: [8.691007, 1.004937],
    },
    {
      id: 17,
      title: "Vincent Komlan",
      price: "39 000 000 Fcfa",
      location: "Badou – Plateaux",
      coordinates: [7.675154, 1.20691],
    },
    {
      id: 18,
      title: "Adjonou Yendouma",
      price: "Titre Foncier : Privé",
      location: "Kpalimé – Plateaux",
      coordinates: [7.172321, 0.891784],
    },
    {
      id: 19,
      title: "Komlan Gnassingbé",
      price: "Titre Foncier : Privé",
      location: "Mango – Savanes",
      coordinates: [10.829896, 0.494578],
    },
    {
      id: 20,
      title: "Ayité Djidjoho",
      price: "Titre Foncier : En cours",
      location: "Aného – Maritime",
      coordinates: [6.303018, 1.157843],
    },
    {
      id: 23,
      title: "Komlan Mawuli",
      price: "59 000 000 Fcfa",
      location: "Kpalimé – Plateaux",
      coordinates: [7.799061, 1.064678],
    },
    {
      id: 24,
      title: "Ayité Vincent",
      price: "Titre Foncier : En cours",
      location: "Atakpamé – Plateaux",
      coordinates: [6.907002, 1.083036],
    },
    {
      id: 25,
      title: "Komlan Mawuli",
      price: "176 000 000 Fcfa",
      location: "Tchamba – Centrale",
      coordinates: [8.670927, 1.366167],
    },
    {
      id: 27,
      title: "Tcharou Komlan",
      price: "Titre Foncier : Privé",
      location: "Kara – Kara",
      coordinates: [9.906164, 1.000191],
    },
    {
      id: 28,
      title: "Tchalla Vincent",
      price: "43 000 000 Fcfa",
      location: "Dapaong – Savanes",
      coordinates: [10.842058, 0.444564],
    },
    {
      id: 29,
      title: "Sogan Amegah",
      price: "197 000 000 Fcfa",
      location: "Atakpamé – Plateaux",
      coordinates: [7.60278, 1.297138],
    },
    {
      id: 30,
      title: "Sogan Gnassingbé",
      price: "Titre Foncier : Libre",
      location: "Dapaong – Savanes",
      coordinates: [10.960659, 0.48646],
    },
    {
      id: 31,
      title: "Yaovi Amegah",
      price: "Titre Foncier : En cours",
      location: "Tchamba – Centrale",
      coordinates: [8.762481, 1.368696],
    },
    {
      id: 33,
      title: "Agbossou Djidjoho",
      price: "147 000 000 Fcfa",
      location: "Kpalimé – Plateaux",
      coordinates: [7.569809, 0.600225],
    },
    {
      id: 34,
      title: "Yaovi Yaovi",
      price: "Titre Foncier : Libre",
      location: "Lomé – Maritime",
      coordinates: [6.549243, 1.20648],
    },
    {
      id: 35,
      title: "Adjonou Amegah",
      price: "Titre Foncier : Libre",
      location: "Dapaong – Savanes",
      coordinates: [11.038815, 0.150682],
    },
    {
      id: 36,
      title: "Yaovi Vincent",
      price: "123 000 000 Fcfa",
      location: "Kpalimé – Plateaux",
      coordinates: [7.433053, 0.760355],
    },
    {
      id: 37,
      title: "Yaovi Atayi",
      price: "Titre Foncier : Privé",
      location: "Kpalimé – Plateaux",
      coordinates: [7.752543, 1.395314],
    },
    {
      id: 38,
      title: "Sosougan Komlan",
      price: "101 000 000 Fcfa",
      location: "Sokodé – Centrale",
      coordinates: [9.054115, 1.589036],
    },
    {
      id: 40,
      title: "Marvel Gnassingbé",
      price: "Titre Foncier : En cours",
      location: "Tchamba – Centrale",
      coordinates: [9.145064, 1.410804],
    },
    {
      id: 42,
      title: "Vincent Afi",
      price: "32 000 000 Fcfa",
      location: "Sokodé – Centrale",
      coordinates: [8.310623, 1.10945],
    },
    {
      id: 43,
      title: "Sogan Sama",
      price: "Titre Foncier : Libre",
      location: "Niamtougou – Kara",
      coordinates: [9.5494, 1.029691],
    },
    {
      id: 44,
      title: "Yendouma Afi",
      price: "Titre Foncier : En cours",
      location: "Sokodé – Centrale",
      coordinates: [8.903767, 1.39541],
    },
    {
      id: 47,
      title: "Tchalla Sama",
      price: "Titre Foncier : Privé",
      location: "Atakpamé – Plateaux",
      coordinates: [6.701599, 0.668273],
    },
    {
      id: 49,
      title: "Mawuli Yaovi",
      price: "67 000 000 Fcfa",
      location: "Cinkassé – Savanes",
      coordinates: [10.81606, 0.021007],
    },
    {
      id: 50,
      title: "Komlan Mawuli",
      price: "114 000 000 Fcfa",
      location: "Kara – Kara",
      coordinates: [9.524389, 1.077936],
    },
    {
      id: 51,
      title: "Yaovi Komlan",
      price: "116 000 000 Fcfa",
      location: "Atakpamé – Plateaux",
      coordinates: [7.62842, 1.125046],
    },
    {
      id: 52,
      title: "Sosougan Komlan",
      price: "157 000 000 Fcfa",
      location: "Lomé – Maritime",
      coordinates: [6.427323, 1.238343],
    },
    {
      id: 53,
      title: "Vincent Komlan",
      price: "Titre Foncier : En cours",
      location: "Kpalimé – Plateaux",
      coordinates: [7.03462, 1.091997],
    },
    {
      id: 54,
      title: "Mawuli Atayi",
      price: "160 000 000 Fcfa",
      location: "Cinkassé – Savanes",
      coordinates: [10.921153, 0.321437],
    },
    {
      id: 55,
      title: "Yendouma Yendouma",
      price: "Titre Foncier : Privé",
      location: "Blitta – Centrale",
      coordinates: [8.436664, 1.026394],
    },
    {
      id: 56,
      title: "Agbossou Atayi",
      price: "76 000 000 Fcfa",
      location: "Badou – Plateaux",
      coordinates: [7.260271, 1.263261],
    },
    {
      id: 57,
      title: "Marvel Atayi",
      price: "172 000 000 Fcfa",
      location: "Bafilo – Kara",
      coordinates: [9.493638, 1.250046],
    },
    {
      id: 58,
      title: "Tcharou Yaovi",
      price: "Titre Foncier : Libre",
      location: "Kara – Kara",
      coordinates: [9.939606, 1.27321],
    },
    {
      id: 59,
      title: "Mawuli Komlan",
      price: "57 000 000 Fcfa",
      location: "Blitta – Centrale",
      coordinates: [8.204425, 0.96227],
    },
    {
      id: 60,
      title: "Agbossou Yendouma",
      price: "155 000 000 Fcfa",
      location: "Tchamba – Centrale",
      coordinates: [8.028435, 1.039835],
    },
    {
      id: 90,
      title: "Marvel Yaovi",
      price: "200 000 000 Fcfa",
      location: "Tchamba – Centrale",
      coordinates: [9.11709, 1.236737],
    },
    {
      id: 61,
      title: "Sosougan Kokouvi",
      price: "37 000 000 Fcfa",
      location: "Bafilo – Kara",
      coordinates: [9.400439, 1.129036],
    },
    {
      id: 62,
      title: "Marvel Mawuli",
      price: "91 000 000 Fcfa",
      location: "Bafilo – Kara",
      coordinates: [9.525692, 1.051758],
    },
    {
      id: 64,
      title: "Kokouvi Komlan",
      price: "Titre Foncier : Libre",
      location: "Badou – Plateaux",
      coordinates: [6.93962, 0.938495],
    },
    {
      id: 65,
      title: "Adjonou Komlan",
      price: "167 000 000 Fcfa",
      location: "Bafilo – Kara",
      coordinates: [9.328541, 1.352731],
    },
    {
      id: 67,
      title: "Tcharou Gnassingbé",
      price: "103 000 000 Fcfa",
      location: "Niamtougou – Kara",
      coordinates: [9.316429, 1.151805],
    },
    {
      id: 68,
      title: "Yaovi Amouzou",
      price: "Titre Foncier : Privé",
      location: "Tsévié – Maritime",
      coordinates: [6.494125, 0.993892],
    },
    {
      id: 69,
      title: "Kokouvi Yendouma",
      price: "Titre Foncier : Privé",
      location: "Aného – Maritime",
      coordinates: [6.567622, 1.212232],
    },
    {
      id: 70,
      title: "Komlan Mawuli",
      price: "198 000 000 Fcfa",
      location: "Blitta – Centrale",
      coordinates: [8.845475, 0.950768],
    },
    {
      id: 71,
      title: "Tcharou Adjo",
      price: "Titre Foncier : En cours",
      location: "Cinkassé – Savanes",
      coordinates: [10.804346, 0.188675],
    },
    {
      id: 72,
      title: "Ayité Komlan",
      price: "Titre Foncier : En cours",
      location: "Lomé – Maritime",
      coordinates: [6.578217, 1.494932],
    },
    {
      id: 73,
      title: "Ayité Amegah",
      price: "Titre Foncier : Privé",
      location: "Blitta – Centrale",
      coordinates: [8.165745, 0.997608],
    },
    {
      id: 74,
      title: "Adjonou Afi",
      price: "89 000 000 Fcfa",
      location: "Sokodé – Centrale",
      coordinates: [8.853666, 1.228437],
    },
    {
      id: 76,
      title: "Marvel Afi",
      price: "78 000 000 Fcfa",
      location: "Dapaong – Savanes",
      coordinates: [11.059011, 0.112279],
    },
    {
      id: 77,
      title: "Yendouma Sama",
      price: "Titre Foncier : En cours",
      location: "Dapaong – Savanes",
      coordinates: [10.798921, 0.311295],
    },
    {
      id: 78,
      title: "Adjonou Amouzou",
      price: "Titre Foncier : Privé",
      location: "Tchamba – Centrale",
      coordinates: [8.541446, 1.444878],
    },
    {
      id: 79,
      title: "Kokouvi Mawuli",
      price: "Titre Foncier : Privé",
      location: "Atakpamé – Plateaux",
      coordinates: [7.543924, 1.133244],
    },
    {
      id: 80,
      title: "Yendouma Djidjoho",
      price: "Titre Foncier : Privé",
      location: "Dapaong – Savanes",
      coordinates: [10.748806, 0.543584],
    },
    {
      id: 81,
      title: "Adjonou Adjo",
      price: "73 000 000 Fcfa",
      location: "Lomé – Maritime",
      coordinates: [6.398159, 0.995015],
    },
    {
      id: 82,
      title: "Marvel Djidjoho",
      price: "Titre Foncier : En cours",
      location: "Kpalimé – Plateaux",
      coordinates: [7.396741, 0.758245],
    },
    {
      id: 86,
      title: "Yaovi Mawuli",
      price: "68 000 000 Fcfa",
      location: "Badou – Plateaux",
      coordinates: [6.760991, 0.721925],
    },
    {
      id: 87,
      title: "Sogan Sama",
      price: "55 000 000 Fcfa",
      location: "Kpalimé – Plateaux",
      coordinates: [6.941184, 1.292225],
    },
    {
      id: 89,
      title: "Vincent Atayi",
      price: "Titre Foncier : Privé",
      location: "Cinkassé – Savanes",
      coordinates: [10.616844, 0.202664],
    },
    {
      id: 91,
      title: "Labante Amouzou",
      price: "75 000 000 Fcfa",
      location: "Bafilo – Kara",
      coordinates: [9.528972, 1.119012],
    },
    {
      id: 93,
      title: "Labante Kpétigo",
      price: "138 000 000 Fcfa",
      location: "Kara – Kara",
      coordinates: [9.840124, 1.123375],
    },
    {
      id: 94,
      title: "Sosougan Kokouvi",
      price: "25 000 000 Fcfa",
      location: "Kpalimé – Plateaux",
      coordinates: [7.63328, 1.214477],
    },
    {
      id: 95,
      title: "Vincent Amegah",
      price: "Titre Foncier : Privé",
      location: "Tchamba – Centrale",
      coordinates: [8.489336, 1.004721],
    },
    {
      id: 96,
      title: "Mawuli Atayi",
      price: "192 000 000 Fcfa",
      location: "Aného – Maritime",
      coordinates: [6.471441, 1.574492],
    },
    {
      id: 97,
      title: "Adjonou Mawuli",
      price: "187 000 000 Fcfa",
      location: "Dapaong – Savanes",
      coordinates: [10.906111, 0.018806],
    },
    {
      id: 100,
      title: "Marvel Mawuli",
      price: "Titre Foncier : En cours",
      location: "Kpalimé – Plateaux",
      coordinates: [7.52257, 0.770434],
    },
  ];

  // Configuration Hugging Face (API gratuite)
  const HF_API_KEY = process.env.REACT_APP_HF_API_KEY || "hf_demo"; // Clé demo gratuite
  const HF_MODEL = "microsoft/DialoGPT-medium"; // Modèle conversationnel gratuit

  // Fonction pour créer le contexte avec les données du site
  const createSystemContext = () => {
    const totalProperties = properties.length;
    const priceProperties = properties.filter((p) => p.price.includes("Fcfa"));
    const avgPrice =
      priceProperties.length > 0
        ? priceProperties.reduce(
            (sum, p) => sum + parseInt(p.price.replace(/[^0-9]/g, "")),
            0
          ) / priceProperties.length
        : 0;

    const regions = getRegions();
    const titresStats = {
      prive: properties.filter((p) => p.price.includes("Privé")).length,
      enCours: properties.filter((p) => p.price.includes("En cours")).length,
      libre: properties.filter((p) => p.price.includes("Libre")).length,
    };

    return `Tu es un assistant virtuel expert pour Anyigbã nya, une plateforme immobilière au Togo. Tu dois répondre de manière naturelle, amicale et professionnelle.

DONNÉES DE LA PLATEFORME :
- Total propriétés : ${totalProperties}
- Prix moyen : ${Math.round(avgPrice).toLocaleString()} Fcfa
- Régions couvertes : ${regions.join(", ")}
- Titres privés : ${titresStats.prive}, En cours : ${
      titresStats.enCours
    }, Libres : ${titresStats.libre}

Quelques propriétés disponibles :
${properties
  .slice(0, 10)
  .map((p) => `- ${p.title} : ${p.price} à ${p.location}`)
  .join("\n")}

RÈGLES :
1. Réponds en français de manière naturelle et conversationnelle
2. Utilise les données fournies pour donner des informations précises
3. Sois enthousiaste et professionnel
4. Propose toujours d'aider davantage
5. Utilise des emojis avec modération
6. Si tu ne connais pas une information, dis-le honnêtement et propose de contacter l'équipe`;
  };

  // Fonction pour appeler l'API Hugging Face (GRATUITE)
  const callHuggingFaceAPI = async (userMessage) => {
    try {
      // Créer un prompt contextualisé avec les données du site
      const contextualPrompt = `Tu es un assistant immobilier pour Anyigbã nya au Togo. Nous avons ${properties.length} propriétés disponibles avec des prix de 32M à 200M Fcfa. Régions: Maritime, Plateaux, Kara, Centrale, Savanes. Réponds naturellement à: ${userMessage}`;

      const response = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: contextualPrompt,
            parameters: {
              max_length: 200,
              temperature: 0.7,
              do_sample: true,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur API Hugging Face");
      }

      const data = await response.json();

      // Traiter la réponse et l'adapter au contexte immobilier
      let botResponse = data[0]?.generated_text || "";

      // Nettoyer et contextualiser la réponse
      botResponse = botResponse.replace(contextualPrompt, "").trim();

      // Si la réponse est vide ou trop courte, utiliser le fallback intelligent
      if (!botResponse || botResponse.length < 10) {
        return generateIntelligentResponse(userMessage);
      }

      return botResponse;
    } catch (error) {
      console.error("Erreur Hugging Face:", error);
      return generateIntelligentResponse(userMessage);
    }
  };

  // Alternative: API Cohere gratuite (plus performante)
  const callCohereAPI = async (userMessage) => {
    try {
      const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          Authorization: "Bearer COHERE-DEMO-KEY", // Clé demo gratuite
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command-light",
          prompt: `Tu es un assistant immobilier expert pour Anyigbã nya, plateforme immobilière au Togo. Contexte: ${properties.length} propriétés, prix 32M-200M Fcfa, 5 régions. Question: ${userMessage}\n\nRéponse naturelle et professionnelle:`,
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return (
          data.generations[0]?.text?.trim() ||
          generateIntelligentResponse(userMessage)
        );
      }

      throw new Error("API Cohere non disponible");
    } catch (error) {
      console.error("Erreur Cohere:", error);
      return generateIntelligentResponse(userMessage);
    }
  };

  // Fonction de réponse de secours (l'ancienne logique)
  const generateFallbackResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Salutations
    if (
      message.includes("bonjour") ||
      message.includes("salut") ||
      message.includes("hello")
    ) {
      return "Bonjour ! 😊 Je suis ravi de vous aider. Que souhaitez-vous savoir sur nos propriétés ou le territoire togolais ?";
    }

    // Questions sur les régions
    if (message.includes("région") || message.includes("regions")) {
      const regions = getRegions();
      return `🗺️ Le Togo compte ${regions.length} régions :\n\n${regions
        .map((r) => `📍 ${r}`)
        .join(
          "\n"
        )}\n\nSouhaitez-vous des informations sur une région en particulier ?`;
    }

    // Questions sur les préfectures
    if (message.includes("préfecture") || message.includes("prefecture")) {
      return "🏛️ Pour connaître les préfectures, veuillez d'abord me préciser la région qui vous intéresse. Par exemple : 'Quelles sont les préfectures de la région Maritime ?'";
    }

    // Questions spécifiques sur une région
    const regions = getRegions();
    for (const region of regions) {
      if (message.includes(region.toLowerCase())) {
        const prefectures = getPrefectures(region);
        return `📍 Région ${region} :\n\n🏛️ Préfectures (${
          prefectures.length
        }) :\n${prefectures
          .map((p) => `• ${p}`)
          .join(
            "\n"
          )}\n\nVoulez-vous plus d'informations sur une préfecture spécifique ?`;
      }
    }

    // Questions sur les prix
    if (
      message.includes("prix") ||
      message.includes("coût") ||
      message.includes("combien")
    ) {
      const pricesInfo = properties.filter((p) => p.price.includes("Fcfa"));
      const avgPrice =
        pricesInfo.length > 0
          ? pricesInfo.reduce((sum, p) => {
              const price = parseInt(p.price.replace(/[^0-9]/g, ""));
              return sum + price;
            }, 0) / pricesInfo.length
          : 0;

      return `💰 Informations sur les prix :\n\n📊 Prix moyen : ${Math.round(
        avgPrice
      ).toLocaleString()} Fcfa\n📈 Fourchette : 25M - 200M Fcfa\n\n🏠 Exemples de propriétés :\n${pricesInfo
        .slice(0, 3)
        .map((p) => `• ${p.title} : ${p.price}`)
        .join("\n")}\n\nVoulez-vous voir plus de propriétés ?`;
    }

    // Questions sur les titres fonciers
    if (
      message.includes("titre") ||
      message.includes("foncier") ||
      message.includes("propriété")
    ) {
      const titresStats = {
        prive: properties.filter((p) => p.price.includes("Privé")).length,
        enCours: properties.filter((p) => p.price.includes("En cours")).length,
        libre: properties.filter((p) => p.price.includes("Libre")).length,
      };

      return `📋 Statuts des titres fonciers :\n\n✅ Privé : ${titresStats.prive} propriétés\n⏳ En cours : ${titresStats.enCours} propriétés\n🆓 Libre : ${titresStats.libre} propriétés\n\n💡 Les titres privés sont immédiatement disponibles, ceux en cours nécessitent une finalisation administrative.`;
    }

    // Questions sur les locations spécifiques
    if (
      message.includes("kara") ||
      message.includes("lomé") ||
      message.includes("atakpamé") ||
      message.includes("savanes") ||
      message.includes("centrale") ||
      message.includes("badou") ||
      message.includes("mango") ||
      message.includes("sokodé") ||
      message.includes("bafilo") ||
      message.includes("kpalimé") ||
      message.includes("aného") ||
      message.includes("blitta") ||
      message.includes("tchamba") ||
      message.includes("dapaong") ||
      message.includes("cinkassé") ||
      message.includes("niamtougou")
    ) {
      const searchTerms = message.split(" ").filter((term) => term.length > 2);
      const locationProperties = properties.filter((p) =>
        searchTerms.some((term) => p.location.toLowerCase().includes(term))
      );

      if (locationProperties.length > 0) {
        const totalProperties = locationProperties.length;
        const priceProperties = locationProperties.filter((p) =>
          p.price.includes("Fcfa")
        );
        const avgPrice =
          priceProperties.length > 0
            ? priceProperties.reduce(
                (sum, p) => sum + parseInt(p.price.replace(/[^0-9]/g, "")),
                0
              ) / priceProperties.length
            : 0;

        return `📍 **${totalProperties} propriétés trouvées** dans cette zone :\n\n💰 Prix moyen : ${Math.round(
          avgPrice
        ).toLocaleString()} Fcfa\n\n🏠 **Sélection de propriétés** :\n${locationProperties
          .slice(0, 5)
          .map((p) => `• ${p.title} - ${p.price}\n  📍 ${p.location}`)
          .join("\n\n")}${
          totalProperties > 5
            ? `\n\n... et ${totalProperties - 5} autres propriétés`
            : ""
        }\n\nVoulez-vous filtrer par prix ou type de titre ?`;
      }
    }

    // Questions sur les statistiques
    if (
      message.includes("statistique") ||
      message.includes("combien") ||
      message.includes("nombre") ||
      message.includes("total")
    ) {
      const totalProperties = properties.length;
      const priceProperties = properties.filter((p) =>
        p.price.includes("Fcfa")
      );
      const titreProperties = properties.filter((p) =>
        p.price.includes("Titre")
      );

      const regions = [
        ...new Set(properties.map((p) => p.location.split(" – ")[1])),
      ];
      const avgPrice =
        priceProperties.length > 0
          ? priceProperties.reduce(
              (sum, p) => sum + parseInt(p.price.replace(/[^0-9]/g, "")),
              0
            ) / priceProperties.length
          : 0;

      return `📊 **Statistiques de la plateforme** :\n\n🏠 Total propriétés : ${totalProperties}\n💰 Avec prix : ${
        priceProperties.length
      }\n📋 Titres fonciers : ${
        titreProperties.length
      }\n🗺️ Régions couvertes : ${
        regions.length
      }\n\n💵 Prix moyen : ${Math.round(
        avgPrice
      ).toLocaleString()} Fcfa\n📈 Prix min : 32M Fcfa\n📈 Prix max : 200M Fcfa\n\nQuelle information spécifique vous intéresse ?`;
    }

    // Questions sur les prix spécifiques
    if (
      message.includes("moins cher") ||
      message.includes("pas cher") ||
      message.includes("économique")
    ) {
      const cheapProperties = properties
        .filter((p) => p.price.includes("Fcfa"))
        .sort(
          (a, b) =>
            parseInt(a.price.replace(/[^0-9]/g, "")) -
            parseInt(b.price.replace(/[^0-9]/g, ""))
        )
        .slice(0, 5);

      return `💰 **Propriétés les plus abordables** :\n\n${cheapProperties
        .map((p) => `🏠 ${p.title}\n💵 ${p.price}\n📍 ${p.location}`)
        .join(
          "\n\n"
        )}\n\nCes propriétés offrent un excellent rapport qualité-prix ! 😊`;
    }

    if (
      message.includes("plus cher") ||
      message.includes("luxe") ||
      message.includes("haut de gamme")
    ) {
      const expensiveProperties = properties
        .filter((p) => p.price.includes("Fcfa"))
        .sort(
          (a, b) =>
            parseInt(b.price.replace(/[^0-9]/g, "")) -
            parseInt(a.price.replace(/[^0-9]/g, ""))
        )
        .slice(0, 5);

      return `💎 **Propriétés haut de gamme** :\n\n${expensiveProperties
        .map((p) => `🏠 ${p.title}\n💰 ${p.price}\n📍 ${p.location}`)
        .join("\n\n")}\n\nCes propriétés représentent le summum du marché ! ✨`;
    }

    // Questions sur l'aide
    if (
      message.includes("aide") ||
      message.includes("help") ||
      message.includes("comment")
    ) {
      return `🤝 Je peux vous aider avec :\n\n🏠 **Propriétés** : prix, titres, disponibilité\n🗺️ **Territoires** : régions, préfectures, communes\n📍 **Localisation** : où trouver des terrains\n💰 **Finances** : coûts, modes de paiement\n📋 **Procédures** : titres fonciers, démarches\n\n💬 Posez-moi une question spécifique !`;
    }

    // Questions sur le contact
    if (
      message.includes("contact") ||
      message.includes("téléphone") ||
      message.includes("email")
    ) {
      return "📞 Pour nous contacter :\n\n📧 Email : contact@anyigbanya.com\n📱 Téléphone : +228 XX XX XX XX\n🏢 Bureau : Lomé, Togo\n\n⏰ Horaires : Lun-Ven 8h-17h\n\nNotre équipe se ferait un plaisir de vous accompagner ! 😊";
    }

    // Réponse par défaut
    return `🤔 Je ne suis pas sûr de comprendre votre question. \n\n💡 Essayez de me demander :\n• "Quelles sont les régions du Togo ?"\n• "Quels sont les prix des terrains ?"\n• "Propriétés à Lomé"\n• "Titres fonciers disponibles"\n• "Comment vous contacter ?"\n\nQue puis-je faire pour vous ? 😊`;
  };

  // Fonction intelligente de réponse locale (très avancée)
  const generateIntelligentResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Analyse contextuelle avancée
    const context = {
      isGreeting: /bonjour|salut|hello|bonsoir|hey/i.test(message),
      askingPrice: /prix|coût|combien|budget|tarif/i.test(message),
      askingLocation:
        /où|région|ville|localisation|kara|lomé|plateaux|savanes|centrale/i.test(
          message
        ),
      askingCheap:
        /pas cher|économique|abordable|moins cher|petit budget/i.test(message),
      askingLuxury: /luxe|cher|haut de gamme|premium|meilleur/i.test(message),
      askingStats: /combien|nombre|total|statistique/i.test(message),
      askingHelp: /aide|help|comment|que faire/i.test(message),
    };

    // Réponses contextuelles intelligentes
    if (context.isGreeting) {
      const greetings = [
        "Bonjour ! 😊 Ravi de vous accueillir sur Anyigbã nya ! Je suis là pour vous aider à trouver la propriété idéale au Togo. Que recherchez-vous exactement ?",
        "Salut ! 👋 Bienvenue sur notre plateforme immobilière ! Avec plus de 50 propriétés disponibles dans tout le Togo, je suis sûr qu'on va trouver votre bonheur. Par quoi on commence ?",
        "Hello ! 🏠 Content de vous voir ! Je connais toutes nos propriétés par cœur, des terrains abordables aux biens de prestige. Dites-moi ce qui vous intéresse !",
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (context.askingCheap) {
      const cheapProps = properties
        .filter((p) => p.price.includes("Fcfa"))
        .sort(
          (a, b) =>
            parseInt(a.price.replace(/[^0-9]/g, "")) -
            parseInt(b.price.replace(/[^0-9]/g, ""))
        )
        .slice(0, 3);

      return `💰 Excellente question ! Pour les budgets serrés, j'ai de superbes opportunités :\n\n${cheapProps
        .map(
          (p) =>
            `🏠 **${p.title}** - ${p.price}\n📍 ${p.location} - Un excellent rapport qualité-prix !`
        )
        .join(
          "\n\n"
        )}\n\n😊 Ces propriétés sont parfaites pour commencer ! Voulez-vous plus de détails sur l'une d'entre elles ?`;
    }

    if (context.askingLuxury) {
      const luxuryProps = properties
        .filter((p) => p.price.includes("Fcfa"))
        .sort(
          (a, b) =>
            parseInt(b.price.replace(/[^0-9]/g, "")) -
            parseInt(a.price.replace(/[^0-9]/g, ""))
        )
        .slice(0, 3);

      return `✨ Ah, vous avez du goût ! Nos propriétés haut de gamme :\n\n${luxuryProps
        .map(
          (p) =>
            `💎 **${p.title}** - ${p.price}\n📍 ${p.location} - Du prestige à l'état pur !`
        )
        .join(
          "\n\n"
        )}\n\n🌟 Ces biens représentent le summum du marché togolais ! Souhaitez-vous une visite virtuelle ?`;
    }

    // Recherche par région/ville
    const regions = ["maritime", "plateaux", "kara", "centrale", "savanes"];
    const cities = [
      "lomé",
      "kara",
      "atakpamé",
      "sokodé",
      "dapaong",
      "kpalimé",
      "badou",
      "mango",
    ];

    for (const region of regions) {
      if (message.includes(region)) {
        const regionProps = properties.filter((p) =>
          p.location.toLowerCase().includes(region)
        );
        if (regionProps.length > 0) {
          return `🗺️ La région ${
            region.charAt(0).toUpperCase() + region.slice(1)
          } ! Excellent choix ! \n\nJ'ai ${
            regionProps.length
          } propriétés magnifiques dans cette zone :\n\n${regionProps
            .slice(0, 4)
            .map((p) => `🏠 ${p.title} - ${p.price}\n📍 ${p.location}`)
            .join("\n\n")}${
            regionProps.length > 4
              ? `\n\n... et ${regionProps.length - 4} autres !`
              : ""
          }\n\n😊 Cette région offre un cadre de vie exceptionnel ! Quelle propriété vous intéresse le plus ?`;
        }
      }
    }

    if (context.askingStats) {
      const priceProps = properties.filter((p) => p.price.includes("Fcfa"));
      const avgPrice =
        priceProps.reduce(
          (sum, p) => sum + parseInt(p.price.replace(/[^0-9]/g, "")),
          0
        ) / priceProps.length;

      return `📊 Voici un aperçu de notre marché :\n\n🏠 **${
        properties.length
      } propriétés** disponibles\n💰 Prix moyen: **${Math.round(
        avgPrice
      ).toLocaleString()} Fcfa**\n📈 Fourchette: 32M - 200M Fcfa\n🗺️ **5 régions** couvertes\n\n🎯 Que ce soit pour investir ou habiter, nous avons forcément ce qu'il vous faut ! Quel est votre projet ?`;
    }

    // Réponse par défaut intelligente
    return `🤔 Hmm, laissez-moi vous aider autrement ! \n\n💡 Je peux vous renseigner sur :\n\n🏠 **Nos propriétés** (${properties.length} disponibles)\n💰 **Les prix** (de 32M à 200M Fcfa)\n📍 **Les localisations** (5 régions du Togo)\n📋 **Les titres fonciers** (privés, en cours, libres)\n\n😊 Posez-moi une question plus spécifique, je connais chaque terrain par cœur ! Que cherchez-vous exactement ?`;
  };

  // Fonction principale pour générer les réponses
  const generateBotResponse = async (userMessage) => {
    // Essayer les APIs gratuites en cascade
    try {
      // 1. Essayer Hugging Face (gratuit)
      return await callHuggingFaceAPI(userMessage);
    } catch (error) {
      try {
        // 2. Essayer Cohere (gratuit avec limite)
        return await callCohereAPI(userMessage);
      } catch (error2) {
        // 3. Utiliser notre système intelligent local
        return generateIntelligentResponse(userMessage);
      }
    }
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Ajouter le message utilisateur
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Ajouter un indicateur de frappe
    const typingMessage = { sender: "bot", text: "🤔 Je réfléchis..." };
    setMessages([...newMessages, typingMessage]);

    try {
      // Générer une réponse avec OpenAI ou fallback
      const botResponse = await generateBotResponse(input);

      // Remplacer l'indicateur de frappe par la vraie réponse
      setTimeout(() => {
        setMessages([
          ...newMessages,
          {
            sender: "bot",
            text: botResponse,
          },
        ]);
      }, 1000); // Délai pour simuler la réflexion
    } catch (error) {
      console.error("Erreur lors de la génération de réponse:", error);
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "Désolé, j'ai rencontré un problème technique. Pouvez-vous reformuler votre question ? 🤖",
        },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <ChatWindow 
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
        />
      )}
      <ChatButton 
        isOpen={isOpen} 
        onClick={toggleChat} 
        unreadCount={unreadCount} 
      />
    </div>
  );
};

ChatBot.propTypes = {
  // Add prop types here if needed
};

export default ChatBot;
