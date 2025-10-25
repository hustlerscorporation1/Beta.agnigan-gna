import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiSend } from 'react-icons/fi';
import Message from './Message';
import '../styles/ChatWindow.css';

const ChatWindow = ({ messages, isTyping, onSendMessage }) => {
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isTyping) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-window__header">
        <h3>Assistant Virtuel</h3>
        <p>Nous sommes là pour vous aider</p>
      </div>
      
      <div className="chat-window__messages">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isTyping && (
          <Message 
            message={{
              id: 'typing',
              text: '',
              sender: 'bot',
              isTyping: true
            }} 
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-window__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tapez votre message..."
          disabled={isTyping}
        />
        <button 
          type="submit" 
          disabled={!inputValue.trim() || isTyping}
          aria-label="Envoyer le message"
        >
          <FiSend className="send-icon" />
        </button>
      </form>
    </div>
  );
};

ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      sender: PropTypes.oneOf(['user', 'bot']).isRequired,
      isTyping: PropTypes.bool
    })
  ).isRequired,
  isTyping: PropTypes.bool.isRequired,
  onSendMessage: PropTypes.func.isRequired
};

export default ChatWindow;
