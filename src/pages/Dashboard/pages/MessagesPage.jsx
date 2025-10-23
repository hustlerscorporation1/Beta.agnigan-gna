import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  ClockIcon,
  CheckIcon,
  CheckCheckIcon
} from '@heroicons/react/24/outline';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageText, setMessageText] = useState('');

  const chats = [
    {
      id: 1,
      user: 'KOUASSI Jean',
      lastMessage: 'Je suis intéressé par le terrain à Lomé',
      time: 'Il y a 5min',
      unread: 2,
      online: true
    },
    {
      id: 2,
      user: 'AMOUZOU Marie',
      lastMessage: 'Quand puis-je visiter le terrain?',
      time: 'Il y a 1h',
      unread: 0,
      online: false
    },
    {
      id: 3,
      user: 'AGBEKO Paul',
      lastMessage: 'Merci pour les informations',
      time: 'Il y a 2h',
      unread: 1,
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'user',
      text: 'Bonjour, je suis intéressé par le terrain à Agoènyivé',
      time: '10:30',
      read: true
    },
    {
      id: 2,
      sender: 'admin',
      text: 'Bonjour! Merci pour votre intérêt. De quel terrain parlez-vous exactement?',
      time: '10:32',
      read: true
    },
    {
      id: 3,
      sender: 'user',
      text: 'Le terrain résidentiel de 500m²',
      time: '10:35',
      read: true
    },
    {
      id: 4,
      sender: 'admin',
      text: 'Parfait! Ce terrain est toujours disponible. Souhaitez-vous planifier une visite?',
      time: '10:36',
      read: true
    },
    {
      id: 5,
      sender: 'user',
      text: 'Oui, je serais disponible ce weekend',
      time: '10:40',
      read: false
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      console.log('Message envoyé:', messageText);
      setMessageText('');
    }
  };

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Communiquez avec vos clients</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex overflow-hidden">
        {/* Chats List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ backgroundColor: '#f9fafb' }}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                  selectedChat === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserCircleIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.user}</h3>
                      {chat.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <UserCircleIcon className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{selectedChatData?.user}</h2>
              <p className="text-xs text-gray-500">
                {selectedChatData?.online ? 'En ligne' : 'Hors ligne'}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md ${message.sender === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-3`}>
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <span className={`text-xs ${message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.time}
                    </span>
                    {message.sender === 'admin' && (
                      message.read ? (
                        <CheckCheckIcon className="h-3 w-3 text-blue-200" />
                      ) : (
                        <CheckIcon className="h-3 w-3 text-blue-200" />
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
