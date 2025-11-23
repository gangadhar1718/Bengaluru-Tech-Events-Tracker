# How to Reload Fresh Data from test data.json

## The Problem
The app saves event data to your browser's Local Storage after the first load. This means when you update `test data.json`, the app continues to show the old cached data.

## Solution 1: Use the Reload Button (Easiest)
1. Open the app at http://localhost:8000
2. Look for the **"🔄 Reload Fresh Data"** button at the top of the page
3. Click it
4. Confirm the dialog
5. The page will reload with fresh data from `test data.json`

## Solution 2: Clear Browser Storage Manually
1. Open the app at http://localhost:8000
2. Open browser DevTools (F12)
3. Go to the "Application" tab (Chrome) or "Storage" tab (Firefox)
4. Find "Local Storage" in the left sidebar
5. Click on `http://localhost:8000`
6. Find the key `bengaluru-tech-events` and delete it
7. Refresh the page (F5)

## Solution 3: Use Incognito/Private Mode
Open the app in an incognito/private browser window - it won't have any cached data.

## What Happens When You Reload
- All your status changes (Registered, Waiting, Confirmed) will be lost
- The app will fetch fresh data from `test data.json`
- The new data will be saved to Local Storage
- All events will have status "None" again

## Current Test Data
The app now has 8 events (down from 9):
- Microsoft AI Tour Bengaluru
- Microsoft AI Day Bengaluru 2025
- MongoDB x AWS Immersion Day Workshop
- TiDB India User Group Meetup
- M365 Conference Bengaluru
- AWS Bengaluru User Group – AI for Bharat Kickoff Workshop
- GitHub Universe'25 Recap Bengaluru
- AI for Bharat Kickoff Workshop
