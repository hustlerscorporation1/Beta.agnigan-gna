import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Message.css';

const Message = ({ message }) => {
  const { text, sender, isTyping } = message;
  
  return (
    <div className={`message ${sender}`}>
      <div className={`message-content ${isTyping ? 'typing' : ''}`}>
        {isTyping ? (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <p>{text}</p>
        )}
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
