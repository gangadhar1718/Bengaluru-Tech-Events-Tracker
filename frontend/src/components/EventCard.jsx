import React from 'react';
import '../styles/EventCard.css';

const EventCard = ({ event, onStatusChange, onClick }) => {
  const handleStatusChange = (e) => {
    e.stopPropagation(); // Prevent card click when changing status
    onStatusChange(event.id, e.target.value);
  };

  const getStatusBadgeClass = (status) => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  return (
    <div className="event-card glass-card" onClick={() => onClick(event)}>
      <h3 className="event-name">{event.name}</h3>
      
      <div className="event-details">
        <div className="event-info">
          <span className="event-label">Date:</span>
          <span className="event-value">{event.date}</span>
        </div>
        
        <div className="event-info">
          <span className="event-label">Category:</span>
          <span className="event-value">{event.category}</span>
        </div>
        
        <div className="event-info">
          <span className="event-label">Type:</span>
          <span className="event-value">{event.type}</span>
        </div>
        
        <div className="event-info">
          <span className="event-label">Location:</span>
          <span className="event-value">{event.location}</span>
        </div>
      </div>
      
      <div className="event-status">
        <label htmlFor={`status-${event.id}`}>Status:</label>
        <select
          id={`status-${event.id}`}
          value={event.status}
          onChange={handleStatusChange}
          className="status-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="None">None</option>
          <option value="Registered">Registered</option>
          <option value="Waiting">Waiting</option>
          <option value="Confirmed">Confirmed</option>
        </select>
        
        <span className={getStatusBadgeClass(event.status)}>
          {event.status}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
