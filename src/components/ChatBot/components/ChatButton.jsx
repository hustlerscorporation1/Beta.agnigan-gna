import React from 'react';
import PropTypes from 'prop-types';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import '../styles/ChatButton.css';

const ChatButton = ({ isOpen, onClick, unreadCount }) => {
  return (
    <button 
      className={`chat-button ${isOpen ? 'chat-button--open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
    >
      {isOpen ? (
        <FaTimes className="chat-button__icon" />
      ) : (
        <>
          <FaCommentDots className="chat-button__icon" />
          {unreadCount > 0 && (
            <span className="chat-button__badge">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </>
      )}
    </button>
  );
};

ChatButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  unreadCount: PropTypes.number
};

ChatButton.defaultProps = {
  unreadCount: 0
};

export default ChatButton;
