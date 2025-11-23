# Requirements Document

## Introduction

The Bengaluru Tech Events Tracker is a single-purpose React micro-tool designed to help users track and manage technology events in Bengaluru. The application provides a clean, responsive, client-side interface for viewing, filtering, and managing event registrations without requiring a backend server. Users can categorize events as upcoming or past, update their registration status, and persist their preferences locally.

## Glossary

- **Event Tracker**: The web application system that displays and manages Bengaluru tech events
- **Event Card**: A visual component displaying summary information about a single event
- **Event Modal**: A popup dialog showing detailed information about a selected event
- **Status Badge**: A visual indicator showing the user's registration status for an event
- **Local Storage**: Browser-based persistent storage mechanism for saving event data
- **Test Dataset**: The initial JSON file containing event information loaded at application start

## Requirements

### Requirement 1

**User Story:** As a user, I want to view events separated into upcoming and past categories, so that I can focus on relevant events based on current date.

#### Acceptance Criteria

1. WHEN the Event Tracker loads THEN the system SHALL display two distinct sections labeled "Upcoming Events" and "Past Events"
2. WHEN comparing event dates to the current date THEN the system SHALL place events with dates equal to or after today in the Upcoming Events section
3. WHEN comparing event dates to the current date THEN the system SHALL place events with dates before today in the Past Events section
4. WHEN an event date changes from future to past THEN the system SHALL automatically move the event to the appropriate section on page refresh

### Requirement 2

**User Story:** As a user, I want to see essential event information on event cards, so that I can quickly scan and identify events of interest.

#### Acceptance Criteria

1. WHEN displaying an event THEN the Event Tracker SHALL show the event name, date, category, type, location, and status dropdown on the Event Card
2. WHEN rendering the event type THEN the Event Tracker SHALL display either "Online" or "Offline" as specified in the event data
3. WHEN rendering the event category THEN the Event Tracker SHALL display one of "Cloud", "AI", or "DevOps"
4. WHEN displaying the status THEN the Event Tracker SHALL show a status badge with appropriate visual styling
5. WHEN rendering multiple events THEN the Event Tracker SHALL display each event as a separate Event Card

### Requirement 3

**User Story:** As a user, I want to update my registration status for events, so that I can track which events I plan to attend.

#### Acceptance Criteria

1. WHEN a user selects a status from the dropdown THEN the Event Tracker SHALL update the event status to one of "None", "Registered", "Waiting", or "Confirmed"
2. WHEN a status is updated THEN the Event Tracker SHALL immediately reflect the change in the Status Badge visual appearance
3. WHEN a status changes THEN the Event Tracker SHALL persist the updated status to Local Storage
4. WHERE a status is "None" THEN the Event Tracker SHALL display a neutral badge color
5. WHERE a status is "Registered", "Waiting", or "Confirmed" THEN the Event Tracker SHALL display distinct badge colors for each status

### Requirement 4

**User Story:** As a user, I want to view detailed event information in a modal, so that I can read the full description and access registration links.

#### Acceptance Criteria

1. WHEN a user clicks on an Event Card THEN the Event Tracker SHALL open an Event Modal displaying full event details
2. WHEN displaying the Event Modal THEN the Event Tracker SHALL show the event name, date, category, type, location, full description, and registration link
3. WHEN the registration link is displayed THEN the Event Tracker SHALL render it as a clickable hyperlink
4. WHEN a user clicks outside the modal or on a close button THEN the Event Tracker SHALL close the Event Modal and return to the main view

### Requirement 5

**User Story:** As a user, I want to search for events by name or category, so that I can quickly find specific events.

#### Acceptance Criteria

1. WHEN a user types text into the search bar THEN the Event Tracker SHALL filter events to show only those with names containing the search text
2. WHEN a user types text into the search bar THEN the Event Tracker SHALL filter events to show only those with categories containing the search text
3. WHEN the search text matches neither name nor category THEN the Event Tracker SHALL display no events in the filtered results
4. WHEN the search bar is empty THEN the Event Tracker SHALL display all events subject to other active filters
5. WHEN filtering by search text THEN the Event Tracker SHALL perform case-insensitive matching

### Requirement 6

**User Story:** As a user, I want to filter events by registration status, so that I can view only events matching my registration state.

#### Acceptance Criteria

1. WHEN a user selects a status filter THEN the Event Tracker SHALL display only events matching the selected status value
2. WHEN the status filter is set to "All" THEN the Event Tracker SHALL display events regardless of their status value
3. WHEN the status filter is set to "None", "Registered", "Waiting", or "Confirmed" THEN the Event Tracker SHALL display only events with that exact status
4. WHEN multiple filters are active THEN the Event Tracker SHALL apply all filters simultaneously using AND logic

### Requirement 7

**User Story:** As a user, I want to filter events by category, so that I can focus on specific technology areas.

#### Acceptance Criteria

1. WHEN a user selects a category filter THEN the Event Tracker SHALL display only events matching the selected category
2. WHEN the category filter is set to "All" THEN the Event Tracker SHALL display events from all categories
3. WHEN the category filter is set to "Cloud", "AI", or "DevOps" THEN the Event Tracker SHALL display only events with that exact category
4. WHEN multiple filters are active THEN the Event Tracker SHALL combine category filter with other active filters

### Requirement 8

**User Story:** As a user, I want to sort events by different criteria, so that I can view events in my preferred order.

#### Acceptance Criteria

1. WHEN a user selects "soonest date first" sort option THEN the Event Tracker SHALL order events with earliest dates appearing first
2. WHEN a user selects "latest date first" sort option THEN the Event Tracker SHALL order events with most recent dates appearing first
3. WHEN a user selects "name A-Z" sort option THEN the Event Tracker SHALL order events alphabetically by name in ascending order
4. WHEN a user selects "category" sort option THEN the Event Tracker SHALL group and order events by their category value
5. WHEN sorting is applied THEN the Event Tracker SHALL maintain the sort order within both Upcoming Events and Past Events sections independently

### Requirement 9

**User Story:** As a user, I want my event status updates to persist across browser sessions, so that I don't lose my registration tracking data.

#### Acceptance Criteria

1. WHEN a user updates an event status THEN the Event Tracker SHALL save the complete event data to Local Storage immediately
2. WHEN the Event Tracker loads THEN the system SHALL retrieve event data from Local Storage if available
3. WHEN Local Storage contains saved event data THEN the Event Tracker SHALL use the saved data instead of the Test Dataset
4. WHEN Local Storage is empty on first load THEN the Event Tracker SHALL load the Test Dataset from the test data JSON file
5. WHEN event data is saved to Local Storage THEN the Event Tracker SHALL preserve all event fields including id, name, date, category, type, location, description, registrationLink, and status

### Requirement 10

**User Story:** As a user, I want to access the application on different devices with a responsive layout, so that I can track events on desktop, tablet, or mobile.

#### Acceptance Criteria

1. WHEN the Event Tracker is viewed on different screen sizes THEN the system SHALL adapt the layout to maintain readability and usability
2. WHEN viewed on mobile devices THEN the Event Tracker SHALL stack Event Cards vertically in a single column
3. WHEN viewed on tablet devices THEN the Event Tracker SHALL display Event Cards in a two-column grid layout
4. WHEN viewed on desktop devices THEN the Event Tracker SHALL display Event Cards in a multi-column grid layout
5. WHEN the Event Modal is displayed on any device THEN the system SHALL ensure the modal content is readable and properly sized

### Requirement 11

**User Story:** As a user, I want a visually appealing interface with a glass-morphism design, so that the application is pleasant to use.

#### Acceptance Criteria

1. WHEN rendering UI components THEN the Event Tracker SHALL apply glass-morphism styling with semi-transparent backgrounds and backdrop blur effects
2. WHEN displaying Event Cards THEN the Event Tracker SHALL use soft shadows and rounded corners consistent with glass-morphism design
3. WHEN rendering Status Badges THEN the Event Tracker SHALL use simple, distinct colors that remain readable against the glass-morphism background
4. WHEN displaying the Event Modal THEN the Event Tracker SHALL apply glass-morphism styling consistent with the rest of the interface

### Requirement 12

**User Story:** As a user, I want the application to load the initial test dataset, so that I can immediately start tracking events without manual data entry.

#### Acceptance Criteria

1. WHEN the Event Tracker loads for the first time THEN the system SHALL fetch event data from the test data JSON file
2. WHEN loading the Test Dataset THEN the Event Tracker SHALL parse the JSON structure containing id, name, date, category, type, location, description, registrationLink, and status fields
3. WHEN the Test Dataset is successfully loaded THEN the Event Tracker SHALL display all events according to their dates and default filters
4. IF the Test Dataset fails to load THEN the Event Tracker SHALL display an error message to the user
5. WHEN the Test Dataset is loaded THEN the Event Tracker SHALL save it to Local Storage for future sessions
