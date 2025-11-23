// Quick validation test for utilities
import { categorizeEventsByDate, getTodayDate, compareDates } from './eventUtils.js';

// Test data
const testEvents = [
  { id: 1, name: "Future Event", date: "2025-12-31" },
  { id: 2, name: "Past Event", date: "2024-01-01" },
  { id: 3, name: "Today Event", date: getTodayDate() }
];

console.log('Today:', getTodayDate());
console.log('Categorized:', categorizeEventsByDate(testEvents));
console.log('Compare dates:', compareDates("2025-01-01", "2025-12-31"));
