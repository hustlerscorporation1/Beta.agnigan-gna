import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Message.css';

const Message = ({ message }) => {
  const { text, sender, isTyping } = message;
  const isBot = sender === 'bot';
  
  return (
    <div className={`message-wrapper ${sender} flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`message-container flex gap-3 max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
          isBot ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {isBot ? 'AG' : 'VOUS'}
        </div>

        {/* Bubble */}
        <div className={`message-bubble relative p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
          isBot 
            ? 'bg-white text-gray-800 border border-gray-100 rounded-tl-none' 
            : 'bg-primary-600 text-white rounded-tr-none'
        }`}>
          {isTyping ? (
            <div className="typing-indicator flex gap-1 items-center h-5">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    sender: PropTypes.oneOf(['user', 'bot']).isRequired,
    isTyping: PropTypes.bool
  }).isRequired
};

export default Message;
