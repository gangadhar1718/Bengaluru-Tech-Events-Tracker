/**
 * Get today's date in ISO format (YYYY-MM-DD)
 */
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Categorize events into upcoming and past based on current date
 * @param {Array} events - Array of event objects
 * @returns {Object} Object with upcoming and past arrays
 */
export const categorizeEventsByDate = (events) => {
  const today = getTodayDate();
  
  const upcoming = events.filter(event => event.date >= today);
  const past = events.filter(event => event.date < today);
  
  return { upcoming, past };
};

/**
 * Compare two dates
 * @param {string} date1 - ISO date string
 * @param {string} date2 - ISO date string
 * @returns {number} -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export const compareDates = (date1, date2) => {
  if (date1 < date2) return -1;
  if (date1 > date2) return 1;
  return 0;
};
