import React, { useEffect } from 'react';
import '../styles/EventModal.css';

const EventModal = ({ event, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content glass-card">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        
        <h2 className="modal-title">{event.name}</h2>
        
        <div className="modal-details">
          <div className="modal-info">
            <span className="modal-label">Date:</span>
            <span className="modal-value">{event.date}</span>
          </div>
          
          <div className="modal-info">
            <span className="modal-label">Category:</span>
            <span className="modal-value">{event.category}</span>
          </div>
          
          <div className="modal-info">
            <span className="modal-label">Type:</span>
            <span className="modal-value">{event.type}</span>
          </div>
          
          <div className="modal-info">
            <span className="modal-label">Location:</span>
            <span className="modal-value">{event.location}</span>
          </div>
          
          <div className="modal-description">
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>
          
          <div className="modal-registration">
            <a 
              href={event.registrationLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="registration-link"
            >
              Register for Event →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
