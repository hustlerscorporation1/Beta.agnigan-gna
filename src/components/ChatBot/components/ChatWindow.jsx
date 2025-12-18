import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiSend, FiX } from 'react-icons/fi';
import Message from './Message';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/ChatWindow.css';

const ChatWindow = ({ isOpen, messages, isTyping, onSendMessage, onClose }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

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
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="chat-window shadow-2xl overflow-hidden"
        >
          {/* Header style ChatGPT */}
          <div className="chat-window__header flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                <span className="text-sm font-bold">AG</span>
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">{t('chatbot.title')}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{t('chatbot.status')}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              aria-label={t('chatbot.close')}
            >
              <FiX size={18} />
            </button>
          </div>
          
          <div className="chat-window__messages custom-scrollbar">
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
          
          <form className="chat-window__form p-4 border-t border-gray-100 bg-white" onSubmit={handleSubmit}>
            <div className="relative flex items-end gap-2 bg-gray-50 rounded-2xl px-4 py-2 hover:bg-gray-100 transition-colors border border-gray-200 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chatbot.placeholder')}
                disabled={isTyping}
                rows={1}
                className="w-full bg-transparent border-none focus:ring-0 p-1 text-sm resize-none max-h-32 custom-scrollbar outline-none"
                style={{ height: 'auto' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                className={`p-1.5 rounded-xl transition-all ${
                  inputValue.trim() && !isTyping 
                    ? 'bg-primary-600 text-white shadow-md hover:bg-primary-700' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FiSend size={16} />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              {t('chatbot.disclaimer')}
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ChatWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      sender: PropTypes.oneOf(['user', 'bot']).isRequired,
      isTyping: PropTypes.bool
    })
  ).isRequired,
  isTyping: PropTypes.bool.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ChatWindow;
