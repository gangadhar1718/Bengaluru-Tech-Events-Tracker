/**
 * Sort events by date (soonest first)
 * @param {Array} events - Array of event objects
 * @returns {Array} Sorted events
 */
export const sortBySoonestDate = (events) => {
  return [...events].sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });
};

/**
 * Sort events by date (latest first)
 * @param {Array} events - Array of event objects
 * @returns {Array} Sorted events
 */
export const sortByLatestDate = (events) => {
  return [...events].sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
};

/**
 * Sort events alphabetically by name (A-Z)
 * @param {Array} events - Array of event objects
 * @returns {Array} Sorted events
 */
export const sortByNameAZ = (events) => {
  return [...events].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};

/**
 * Sort events by category (grouped)
 * @param {Array} events - Array of event objects
 * @returns {Array} Sorted events
 */
export const sortByCategory = (events) => {
  return [...events].sort((a, b) => {
    // First sort by category
    const categoryCompare = a.category.localeCompare(b.category);
    if (categoryCompare !== 0) return categoryCompare;
    
    // Then by name within same category
    return a.name.localeCompare(b.name);
  });
};

/**
 * Apply sorting to events based on sort option
 * @param {Array} events - Array of event objects
 * @param {string} sortOption - Sort option ('soonest', 'latest', 'name', 'category')
 * @returns {Array} Sorted events
 */
export const applySorting = (events, sortOption) => {
  switch (sortOption) {
    case 'soonest':
      return sortBySoonestDate(events);
    case 'latest':
      return sortByLatestDate(events);
    case 'name':
      return sortByNameAZ(events);
    case 'category':
      return sortByCategory(events);
    default:
      return events;
  }
};
