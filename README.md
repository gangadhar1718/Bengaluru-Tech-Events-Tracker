# Bengaluru Tech Events Tracker

A single-purpose React micro-tool for tracking Bengaluru tech events with a clean, responsive, glass-morphism interface.

🌐 **Live Demo**: https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/

## Features

- **Event Management**: Track upcoming and past tech events
- **Status Tracking**: Mark events as None, Registered, Waiting, or Confirmed
- **Filtering**: Search by name/category, filter by status and category
- **Sorting**: Sort by date (soonest/latest), name (A-Z), or category
- **Persistence**: All changes saved to Local Storage
- **Responsive**: Works on mobile, tablet, and desktop
- **Glass-morphism UI**: Beautiful semi-transparent design

## Setup

### Prerequisites
- Python 3.x
- Node.js and npm

### Installation

1. **Set up Python virtual environment:**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

2. **Install frontend dependencies:**
```bash
cd frontend
npm install
```

3. **Build the React app:**
```bash
npm run build
```

## Running the Application

1. **Activate virtual environment (if not already active):**
```bash
venv\Scripts\activate  # Windows
```

2. **Start the Flask server:**
```bash
python app.py
```

3. **Open your browser:**
Navigate to `http://localhost:8000`

## Development

To work on the frontend in development mode:

```bash
cd frontend
npm run dev
```

This will start Vite dev server. When ready for production, run `npm run build` to rebuild.

## Project Structure

```
├── app.py                 # Flask server
├── requirements.txt       # Python dependencies
├── test data.json        # Initial event dataset
├── build/                # React production build
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── utils/        # Utility functions
│   │   ├── styles/       # CSS files
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── .kiro/
    └── specs/            # Feature specifications
```

## Usage

1. **View Events**: Events are automatically categorized into Upcoming and Past
2. **Update Status**: Use the dropdown on each event card to update registration status
3. **Search**: Type in the search bar to filter by event name or category
4. **Filter**: Use status and category dropdowns to narrow results
5. **Sort**: Choose how to order events (by date, name, or category)
6. **View Details**: Click any event card to see full details and registration link
7. **Persistence**: All status changes are automatically saved to your browser

## Technologies

- **Frontend**: React 18, Vite
- **Backend**: Flask (Python)
- **Styling**: CSS with glass-morphism design
- **Storage**: Browser Local Storage
