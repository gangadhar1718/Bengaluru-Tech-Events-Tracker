const STORAGE_KEY = 'bengaluru-tech-events';

/**
 * Save events to Local Storage
 * @param {Array} events - Array of event objects
 * @returns {boolean} Success status
 */
export const saveToLocalStorage = (events) => {
  try {
    const data = {
      events,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to Local Storage:', error);
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded');
    }
    return false;
  }
};

/**
 * Load events from Local Storage
 * @returns {Array|null} Array of events or null if not found
 */
export const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    
    const data = JSON.parse(stored);
    
    // Validate structure
    if (!data.events || !Array.isArray(data.events)) {
      console.warn('Invalid data structure in Local Storage');
      clearLocalStorage();
      return null;
    }
    
    return data.events;
  } catch (error) {
    console.error('Error loading from Local Storage:', error);
    clearLocalStorage();
    return null;
  }
};

/**
 * Clear all data from Local Storage
 */
export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing Local Storage:', error);
  }
};
