/**
 * Filter events by search text (matches name or category, case-insensitive)
 * @param {Array} events - Array of event objects
 * @param {string} searchText - Search query
 * @returns {Array} Filtered events
 */
export const filterBySearch = (events, searchText) => {
  if (!searchText || searchText.trim() === '') {
    return events;
  }
  
  const query = searchText.toLowerCase().trim();
  
  return events.filter(event => {
    const nameMatch = event.name.toLowerCase().includes(query);
    const categoryMatch = event.category.toLowerCase().includes(query);
    return nameMatch || categoryMatch;
  });
};

/**
 * Filter events by status
 * @param {Array} events - Array of event objects
 * @param {string} statusFilter - Status to filter by ('All' or specific status)
 * @returns {Array} Filtered events
 */
export const filterByStatus = (events, statusFilter) => {
  if (!statusFilter || statusFilter === 'All') {
    return events;
  }
  
  return events.filter(event => event.status === statusFilter);
};

/**
 * Filter events by category
 * @param {Array} events - Array of event objects
 * @param {string} categoryFilter - Category to filter by ('All' or specific category)
 * @returns {Array} Filtered events
 */
export const filterByCategory = (events, categoryFilter) => {
  if (!categoryFilter || categoryFilter === 'All') {
    return events;
  }
  
  return events.filter(event => event.category === categoryFilter);
};

/**
 * Apply all filters to events (combined with AND logic)
 * @param {Array} events - Array of event objects
 * @param {Object} filters - Object containing all filter values
 * @returns {Array} Filtered events
 */
export const applyAllFilters = (events, filters) => {
  const { searchText, statusFilter, categoryFilter } = filters;
  
  let filtered = events;
  
  // Apply search filter
  filtered = filterBySearch(filtered, searchText);
  
  // Apply status filter
  filtered = filterByStatus(filtered, statusFilter);
  
  // Apply category filter
  filtered = filterByCategory(filtered, categoryFilter);
  
  return filtered;
};
