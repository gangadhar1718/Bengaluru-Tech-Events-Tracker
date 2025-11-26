import { loadFromLocalStorage, saveToLocalStorage } from './localStorage.js';

/**
 * Fetch test data from Flask server
 * @returns {Promise<Array>} Array of events
 */
export const fetchTestData = async () => {
  try {
    // Use relative path that works with Vite's base configuration
    const response = await fetch(`${import.meta.env.BASE_URL}test-data.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate data structure
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: expected array');
    }
    
    // Validate each event has required fields
    const requiredFields = ['id', 'name', 'date', 'category', 'type', 'location', 'description', 'registrationLink', 'status'];
    for (const event of data) {
      for (const field of requiredFields) {
        if (!(field in event)) {
          throw new Error(`Missing required field: ${field}`);
        }
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching test data:', error);
    throw error;
  }
};

/**
 * Load initial data - checks Local Storage first, then fetches test data
 * @returns {Promise<Array>} Array of events
 */
export const loadInitialData = async () => {
  try {
    // First, try to load from Local Storage
    const storedEvents = loadFromLocalStorage();
    
    if (storedEvents && storedEvents.length > 0) {
      console.log('Loaded events from Local Storage');
      return storedEvents;
    }
    
    // If no stored data, fetch test data
    console.log('No stored data found, fetching test data');
    const testData = await fetchTestData();
    
    // Save test data to Local Storage for future sessions
    saveToLocalStorage(testData);
    
    return testData;
  } catch (error) {
    console.error('Error loading initial data:', error);
    throw error;
  }
};
