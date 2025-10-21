import React, { useState } from 'react';
import ChatBotButton from './ChatBotButton';
import ChatBotWindow from './ChatBotWindow';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatBotButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatBotWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatBot;
