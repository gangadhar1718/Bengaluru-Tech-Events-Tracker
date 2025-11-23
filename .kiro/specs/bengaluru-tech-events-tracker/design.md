# Design Document

## Overview

The Bengaluru Tech Events Tracker is a client-side React application that provides event tracking functionality without requiring a backend server. The application uses a Flask development server (port 8000) to serve the React build, but all business logic executes in the browser. The architecture emphasizes simplicity, using React hooks for state management, browser Local Storage for persistence, and a glass-morphism design aesthetic for visual appeal.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │           React Application                     │    │
│  │                                                 │    │
│  │  ┌──────────────┐      ┌──────────────┐       │    │
│  │  │   App.jsx    │──────│  Components  │       │    │
│  │  │  (Main)      │      │  - EventCard │       │    │
│  │  │              │      │  - EventModal│       │    │
│  │  │              │      │  - Filters   │       │    │
│  │  └──────────────┘      └──────────────┘       │    │
│  │         │                                      │    │
│  │         │                                      │    │
│  │  ┌──────▼──────────────────────────────┐      │    │
│  │  │    State Management (useState)      │      │    │
│  │  │  - events, filters, sort, modal     │      │    │
│  │  └──────┬──────────────────────────────┘      │    │
│  │         │                                      │    │
│  │  ┌──────▼──────────────────────────────┐      │    │
│  │  │   Local Storage Interface           │      │    │
│  │  │  - saveEvents()                     │      │    │
│  │  │  - loadEvents()                     │      │    │
│  │  └─────────────────────────────────────┘      │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP (initial load)
                          │
┌─────────────────────────▼─────────────────────────────┐
│              Flask Server (Port 8000)                  │
│                                                        │
│  - Serves static React build files                    │
│  - Serves test data.json                              │
│  - No backend logic or database                       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: React 18+ with functional components and hooks
- **Development Server**: Flask (Python) on port 8000
- **Styling**: CSS with glass-morphism design patterns
- **State Management**: React useState and useEffect hooks
- **Persistence**: Browser Local Storage API
- **Build Tool**: Vite or Create React App
- **Python Environment**: Virtual environment (venv)

## Components and Interfaces

### Component Hierarchy

```
App
├── SearchBar
├── FilterControls
│   ├── StatusFilter
│   ├── CategoryFilter
│   └── SortOptions
├── EventSection (Upcoming)
│   └── EventCard[]
├── EventSection (Past)
│   └── EventCard[]
└── EventModal (conditional)
```

### Core Components

#### App Component

**Responsibilities:**
- Manage global application state (events, filters, sort order, modal state)
- Load initial data from test data.json or Local Storage
- Coordinate filtering, sorting, and date-based event categorization
- Persist changes to Local Storage

**State:**
```javascript
{
  events: Event[],
  searchText: string,
  statusFilter: string,
  categoryFilter: string,
  sortOption: string,
  selectedEvent: Event | null,
  isModalOpen: boolean
}
```

**Key Functions:**
- `loadInitialData()`: Fetch from Local Storage or test data.json
- `updateEventStatus(eventId, newStatus)`: Update status and persist
- `applyFilters()`: Filter events based on search, status, category
- `applySorting()`: Sort events based on selected option
- `categorizeByDate()`: Split events into upcoming and past

#### EventCard Component

**Props:**
```javascript
{
  event: Event,
  onStatusChange: (eventId, status) => void,
  onClick: (event) => void
}
```

**Responsibilities:**
- Display event summary information
- Render status dropdown and badge
- Handle click events to open modal
- Emit status change events

#### EventModal Component

**Props:**
```javascript
{
  event: Event,
  isOpen: boolean,
  onClose: () => void
}
```

**Responsibilities:**
- Display full event details in overlay
- Render clickable registration link
- Handle close interactions (click outside, close button, ESC key)

#### FilterControls Component

**Props:**
```javascript
{
  searchText: string,
  statusFilter: string,
  categoryFilter: string,
  sortOption: string,
  onSearchChange: (text) => void,
  onStatusFilterChange: (status) => void,
  onCategoryFilterChange: (category) => void,
  onSortChange: (option) => void
}
```

**Responsibilities:**
- Render search input
- Render filter dropdowns
- Render sort options
- Emit filter/sort change events

### Data Models

#### Event Model

```javascript
{
  id: number,
  name: string,
  date: string,           // ISO format: "YYYY-MM-DD"
  category: "Cloud" | "AI" | "DevOps",
  type: "Online" | "Offline",
  location: string,
  description: string,
  registrationLink: string,
  status: "None" | "Registered" | "Waiting" | "Confirmed"
}
```

### Local Storage Interface

**Key:** `bengaluru-tech-events`

**Storage Format:**
```javascript
{
  events: Event[],
  lastUpdated: string  // ISO timestamp
}
```

**Functions:**
- `saveToLocalStorage(events)`: Serialize and save event array
- `loadFromLocalStorage()`: Deserialize and return event array or null
- `clearLocalStorage()`: Remove stored data (utility function)

### Flask Server Structure

```
/
├── app.py                 # Flask server entry point
├── static/
│   └── (React build files)
├── test data.json         # Initial event dataset
└── requirements.txt       # Flask dependency
```

**app.py Structure:**
```python
from flask import Flask, send_from_directory, jsonify
import json

app = Flask(__name__, static_folder='build')

@app.route('/')
def serve_react():
    return send_from_directory('build', 'index.html')

@app.route('/test-data.json')
def serve_test_data():
    with open('test data.json') as f:
        return jsonify(json.load(f))

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('build', path)

if __name__ == '__main__':
    app.run(port=8000, debug=True)
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several redundancies were identified:
- Properties 1.3 and 1.4 are redundant with 1.2 (date categorization logic)
- Properties 2.2 and 2.3 are redundant with 2.1 (field display)
- Property 6.3 is redundant with 6.1 (status filtering)
- Property 7.3 is redundant with 7.1 (category filtering)
- Property 7.4 is redundant with 6.4 (filter combination)
- Property 12.3 is redundant with other display properties
- Property 12.5 is redundant with 9.1 (persistence)

The following properties represent the unique, non-redundant correctness guarantees:

### Core Properties

**Property 1: Date-based event categorization**
*For any* event with a date, if the date is greater than or equal to today's date, the event should appear in the Upcoming Events section; otherwise, it should appear in the Past Events section.
**Validates: Requirements 1.2, 1.3, 1.4**

**Property 2: Event card field completeness**
*For any* event, the rendered Event Card should contain the event's name, date, category, type, location, and a status dropdown element.
**Validates: Requirements 2.1, 2.2, 2.3**

**Property 3: Status badge presence**
*For any* event with a status value, the rendered Event Card should include a status badge element.
**Validates: Requirements 2.4**

**Property 4: Event card count matches event list**
*For any* list of events, the number of rendered Event Cards should equal the number of events in the list.
**Validates: Requirements 2.5**

**Property 5: Status update persistence**
*For any* event, updating its status and then reading from Local Storage should return the updated status value.
**Validates: Requirements 3.1, 3.3**

**Property 6: Status badge visual differentiation**
*For any* two events with different status values, their rendered status badges should have different CSS classes or styling attributes.
**Validates: Requirements 3.5**

**Property 7: Event card click opens modal**
*For any* event, simulating a click on its Event Card should result in the modal state changing to open with that event selected.
**Validates: Requirements 4.1**

**Property 8: Modal field completeness**
*For any* event, the rendered Event Modal should contain the event's name, date, category, type, location, description, and registration link.
**Validates: Requirements 4.2**

**Property 9: Registration link is hyperlink**
*For any* event with a registration link, the rendered modal should contain an anchor element with href attribute matching the registration link.
**Validates: Requirements 4.3**

**Property 10: Modal close action**
*For any* open modal, simulating a close action (close button click or outside click) should result in the modal state changing to closed.
**Validates: Requirements 4.4**

**Property 11: Search filters by name or category**
*For any* list of events and search text, the filtered results should include only events where the name or category contains the search text (case-insensitive).
**Validates: Requirements 5.1, 5.2, 5.5**

**Property 12: Status filter correctness**
*For any* list of events and status filter value (excluding "All"), the filtered results should include only events with that exact status value.
**Validates: Requirements 6.1, 6.3**

**Property 13: Multiple filters combine with AND logic**
*For any* list of events with multiple active filters (search, status, category), an event should appear in results only if it satisfies all filter conditions simultaneously.
**Validates: Requirements 6.4, 7.4**

**Property 14: Category filter correctness**
*For any* list of events and category filter value (excluding "All"), the filtered results should include only events with that exact category value.
**Validates: Requirements 7.1, 7.3**

**Property 15: Soonest date first sorting**
*For any* list of events sorted by "soonest date first", each event should have a date less than or equal to the date of the event following it.
**Validates: Requirements 8.1**

**Property 16: Latest date first sorting**
*For any* list of events sorted by "latest date first", each event should have a date greater than or equal to the date of the event following it.
**Validates: Requirements 8.2**

**Property 17: Alphabetical name sorting**
*For any* list of events sorted by "name A-Z", each event's name should be lexicographically less than or equal to the name of the event following it.
**Validates: Requirements 8.3**

**Property 18: Category grouping in sort**
*For any* list of events sorted by "category", all events with the same category should appear consecutively in the sorted list.
**Validates: Requirements 8.4**

**Property 19: Sort preserves section boundaries**
*For any* sorted event list, no event from the Past Events section should appear in the Upcoming Events section, and vice versa.
**Validates: Requirements 8.5**

**Property 20: Local Storage round-trip preservation**
*For any* event, saving it to Local Storage and then loading it back should return an event with all fields (id, name, date, category, type, location, description, registrationLink, status) having identical values.
**Validates: Requirements 9.1, 9.2, 9.5, 12.5**

**Property 21: Local Storage takes precedence**
*For any* application load, if Local Storage contains event data, the application should use that data rather than fetching the test dataset.
**Validates: Requirements 9.3**

**Property 22: JSON parsing preserves all fields**
*For any* valid event JSON object, parsing it should produce an event object with all fields (id, name, date, category, type, location, description, registrationLink, status) correctly populated.
**Validates: Requirements 12.2**

## Error Handling

### Data Loading Errors

**Test Dataset Load Failure:**
- If fetch fails for test data.json, display user-friendly error message
- Provide retry mechanism or fallback to empty state
- Log error details to console for debugging

**JSON Parse Errors:**
- Validate JSON structure before parsing
- Handle malformed JSON gracefully with error message
- Fall back to empty event list if parsing fails

### Local Storage Errors

**Storage Quota Exceeded:**
- Catch QuotaExceededError when saving
- Notify user that storage is full
- Provide option to clear old data

**Storage Access Denied:**
- Handle SecurityError for browsers with storage disabled
- Gracefully degrade to session-only mode
- Inform user that changes won't persist

**Corrupted Storage Data:**
- Validate structure when loading from Local Storage
- Clear corrupted data and fall back to test dataset
- Log warning to console

### UI Error Boundaries

**React Error Boundaries:**
- Wrap main App component in error boundary
- Display fallback UI when component errors occur
- Provide "Reload" button to recover

**Modal Errors:**
- Handle missing event data gracefully
- Prevent modal from opening with invalid event
- Close modal if event becomes unavailable

### Network Errors

**Flask Server Unavailable:**
- Display connection error message
- Provide retry mechanism
- Show last known data from Local Storage if available

## Testing Strategy

### Unit Testing

Unit tests will verify specific examples, edge cases, and component behavior:

**Component Tests:**
- EventCard renders with valid event data
- EventModal displays all fields correctly
- FilterControls emit correct events on user interaction
- Status dropdown shows all four status options

**Edge Cases:**
- Empty event list displays appropriate message
- Search with no matches shows "No events found"
- Empty search bar shows all events
- "All" filter options show all events
- Events on today's date appear in Upcoming section
- Modal closes on ESC key press

**Integration Tests:**
- Status update triggers Local Storage save
- Initial load fetches from correct source (Local Storage vs test data)
- Filter changes update displayed events
- Sort changes reorder events correctly

### Property-Based Testing

Property-based testing will verify universal correctness properties across all inputs using **fast-check** (JavaScript property-based testing library).

**Configuration:**
- Each property test MUST run a minimum of 100 iterations
- Each test MUST be tagged with a comment referencing the design document property
- Tag format: `// Feature: bengaluru-tech-events-tracker, Property X: [property text]`
- Each correctness property MUST be implemented by a SINGLE property-based test

**Test Generators:**

Custom generators will be created for:
- Random events with valid field values
- Random dates (past, present, future)
- Random status values
- Random category values
- Random search strings
- Random filter combinations

**Property Test Coverage:**

The following properties will be implemented as property-based tests:

1. Date categorization (Property 1)
2. Event card field completeness (Property 2)
3. Status badge presence (Property 3)
4. Event card count (Property 4)
5. Status update persistence (Property 5)
6. Status badge differentiation (Property 6)
7. Event card click behavior (Property 7)
8. Modal field completeness (Property 8)
9. Registration link structure (Property 9)
10. Modal close behavior (Property 10)
11. Search filtering (Property 11)
12. Status filtering (Property 12)
13. Multiple filter combination (Property 13)
14. Category filtering (Property 14)
15. Soonest date sorting (Property 15)
16. Latest date sorting (Property 16)
17. Alphabetical sorting (Property 17)
18. Category grouping (Property 18)
19. Sort section boundaries (Property 19)
20. Local Storage round-trip (Property 20)
21. Local Storage precedence (Property 21)
22. JSON parsing (Property 22)

**Example Property Test Structure:**

```javascript
// Feature: bengaluru-tech-events-tracker, Property 1: Date-based event categorization
test('events are categorized by date correctly', () => {
  fc.assert(
    fc.property(
      fc.array(eventGenerator()),
      (events) => {
        const categorized = categorizeEventsByDate(events);
        const today = new Date().toISOString().split('T')[0];
        
        return categorized.upcoming.every(e => e.date >= today) &&
               categorized.past.every(e => e.date < today);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Testing Approach

- **Implementation-first development**: Implement features before writing corresponding tests
- **Complementary testing**: Unit tests catch specific bugs, property tests verify general correctness
- **Early validation**: Run tests after each major feature implementation
- **Test-driven debugging**: When bugs are found, write tests to reproduce before fixing

### Manual Testing Checklist

- Verify glass-morphism styling appears correctly
- Test responsive layout on mobile, tablet, desktop
- Verify smooth animations and transitions
- Test keyboard navigation (Tab, Enter, ESC)
- Verify accessibility (screen reader compatibility)
- Test in multiple browsers (Chrome, Firefox, Safari)

## Implementation Notes

### Date Handling

- Use JavaScript Date object for date comparisons
- Store dates in ISO format (YYYY-MM-DD) for consistency
- Compare dates as strings for simplicity (ISO format is lexicographically sortable)
- Get today's date using: `new Date().toISOString().split('T')[0]`

### Local Storage Best Practices

- Wrap all Local Storage operations in try-catch blocks
- Validate data structure before using loaded data
- Use JSON.stringify/parse for serialization
- Consider storage size limits (typically 5-10MB)
- Provide clear error messages when storage fails

### Performance Considerations

- Memoize filtered and sorted event lists to avoid unnecessary recalculations
- Use React.memo for EventCard components to prevent unnecessary re-renders
- Debounce search input to reduce filter operations
- Lazy load event descriptions in modal (already loaded, but keep in mind)

### Accessibility

- Use semantic HTML elements (button, nav, section)
- Provide ARIA labels for interactive elements
- Ensure keyboard navigation works for all interactions
- Maintain sufficient color contrast for text readability
- Add focus indicators for keyboard users

### Glass-Morphism Styling Guidelines

**Core CSS Properties:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

**Color Palette:**
- Background: Gradient (e.g., purple to blue)
- Card backgrounds: Semi-transparent white (10-20% opacity)
- Text: High contrast (white or dark depending on background)
- Status badges: Solid colors with 80% opacity
  - None: Gray (#6B7280)
  - Registered: Blue (#3B82F6)
  - Waiting: Yellow (#F59E0B)
  - Confirmed: Green (#10B981)

### Flask Development Setup

**Virtual Environment:**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
pip install flask
```

**Development Workflow:**
1. Develop React app in development mode
2. Build React app: `npm run build`
3. Copy build files to Flask static folder
4. Run Flask server: `python app.py`
5. Access at http://localhost:8000

### React Build Configuration

**Vite Configuration (vite.config.js):**
```javascript
export default {
  build: {
    outDir: '../build',
    emptyOutDir: true
  }
}
```

**File Structure:**
```
project/
├── frontend/          # React app
│   ├── src/
│   ├── public/
│   └── package.json
├── build/            # React build output
├── app.py           # Flask server
├── test data.json   # Initial dataset
└── requirements.txt # Python dependencies
```
