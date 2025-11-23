import React, { useState, useEffect } from 'react';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';
import FilterControls from './components/FilterControls';
import { loadInitialData } from './utils/dataLoader';
import { saveToLocalStorage } from './utils/localStorage';
import { categorizeEventsByDate } from './utils/eventUtils';
import { applyAllFilters } from './utils/filterUtils';
import { applySorting } from './utils/sortUtils';
import './styles/App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and sort state
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOption, setSortOption] = useState('soonest');
  
  // Modal state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadInitialData();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle status change
  const handleStatusChange = (eventId, newStatus) => {
    const updatedEvents = events.map(event =>
      event.id === eventId ? { ...event, status: newStatus } : event
    );
    setEvents(updatedEvents);
    saveToLocalStorage(updatedEvents);
  };

  // Handle event card click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Handle reload from test data
  const handleReloadData = async () => {
    if (window.confirm('This will clear your saved data and reload from test data. Continue?')) {
      try {
        // Clear Local Storage
        localStorage.removeItem('bengaluru-tech-events');
        // Reload the page to fetch fresh data
        window.location.reload();
      } catch (error) {
        console.error('Error reloading data:', error);
      }
    }
  };

  // Apply filters and sorting
  const getProcessedEvents = () => {
    // Apply filters
    const filtered = applyAllFilters(events, {
      searchText,
      statusFilter,
      categoryFilter
    });
    
    // Apply sorting
    const sorted = applySorting(filtered, sortOption);
    
    // Categorize by date
    return categorizeEventsByDate(sorted);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">{error}</div>
      </div>
    );
  }

  const { upcoming, past } = getProcessedEvents();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bengaluru Tech Events Tracker</h1>
        <p>Track and manage your tech event registrations</p>
        <button onClick={handleReloadData} className="reload-button">
          🔄 Reload Fresh Data
        </button>
      </header>

      <FilterControls
        searchText={searchText}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        sortOption={sortOption}
        onSearchChange={setSearchText}
        onStatusFilterChange={setStatusFilter}
        onCategoryFilterChange={setCategoryFilter}
        onSortChange={setSortOption}
      />

      <main className="app-main">
        <section className="event-section">
          <h2 className="section-title">Upcoming Events</h2>
          {upcoming.length === 0 ? (
            <p className="no-events">No upcoming events found.</p>
          ) : (
            <div className="event-grid">
              {upcoming.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onStatusChange={handleStatusChange}
                  onClick={handleEventClick}
                />
              ))}
            </div>
          )}
        </section>

        <section className="event-section">
          <h2 className="section-title">Past Events</h2>
          {past.length === 0 ? (
            <p className="no-events">No past events found.</p>
          ) : (
            <div className="event-grid">
              {past.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onStatusChange={handleStatusChange}
                  onClick={handleEventClick}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;
