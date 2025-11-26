# GitHub Pages Deployment Troubleshooting

## Current Error: "Failed to load events. Please try again later."

### Root Cause Analysis

The error occurs because the app cannot fetch the event data. This can happen for several reasons:

1. **GitHub Pages is not enabled** (most likely)
2. **Wrong file path** (fixed in latest commit)
3. **Deployment hasn't completed yet**

## ✅ Fixes Applied

### Commit b3cc272: Fixed data file path
- Changed from `/test-data.json` to `${import.meta.env.BASE_URL}test-data.json`
- This ensures the correct path: `/Bengaluru-Tech-Events-Tracker/test-data.json`

### Files in Build Folder
```
build/
├── index.html
├── test-data.json ✅
├── vite.svg
└── assets/
    ├── index-BBNzr8MG.css
    └── index-pVm1mu7r.js
```

## 🔍 Step-by-Step Verification

### Step 1: Enable GitHub Pages

**THIS IS REQUIRED - THE SITE WON'T WORK WITHOUT THIS!**

1. Go to: https://github.com/gangadhar1718/Bengaluru-Tech-Events-Tracker/settings/pages

2. Under "Build and deployment":
   
   **Option A: GitHub Actions (Recommended)**
   - Source: Select "GitHub Actions"
   - This will trigger automatic deployment
   
   **Option B: Deploy from Branch**
   - Source: Select "Deploy from a branch"
   - Branch: Select "main"
   - Folder: Select "/build"
   - Click Save

3. Wait for deployment (1-5 minutes)

### Step 2: Check Deployment Status

**If using GitHub Actions:**
- Go to: https://github.com/gangadhar1718/Bengaluru-Tech-Events-Tracker/actions
- Look for "Deploy to GitHub Pages" workflow
- Wait for green checkmark ✅

**If using Branch deployment:**
- GitHub will show a message at the top of the Pages settings
- Wait for "Your site is live at..." message

### Step 3: Test the Deployment

1. **Visit the main page:**
   https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/

2. **Test the data file directly:**
   https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/test-data.json
   
   You should see JSON data with events.

3. **Check browser console:**
   - Press F12 to open DevTools
   - Go to Console tab
   - Refresh the page
   - Look for any errors

### Step 4: Verify Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for `test-data.json` request
5. Check if it returns 200 (success) or 404 (not found)

## 🐛 Common Issues & Solutions

### Issue 1: "Failed to load events"
**Symptoms:** Error message on page load
**Causes:**
- GitHub Pages not enabled
- Deployment not complete
- Wrong file path

**Solutions:**
1. Enable GitHub Pages (see Step 1)
2. Wait for deployment to complete
3. Clear browser cache and reload

### Issue 2: 404 Error on Main Page
**Symptoms:** "404 - File not found" on GitHub Pages URL
**Causes:**
- GitHub Pages not enabled
- Wrong branch/folder selected

**Solutions:**
1. Enable GitHub Pages with correct settings
2. Verify branch is "main" and folder is "/build"

### Issue 3: Data File 404
**Symptoms:** Main page loads but no events
**Causes:**
- test-data.json not in build folder
- Wrong path in code

**Solutions:**
1. Already fixed in commit b3cc272
2. Rebuild: `cd frontend && npm run build`
3. Commit and push

### Issue 4: Blank Page
**Symptoms:** White/blank page, no content
**Causes:**
- JavaScript errors
- Wrong base path in vite.config.js

**Solutions:**
1. Check browser console for errors
2. Verify base path is `/Bengaluru-Tech-Events-Tracker/`

## 🧪 Local Testing

To test the exact GitHub Pages environment locally:

```bash
cd frontend
npm run build
npm run preview
```

Visit: http://localhost:4173/Bengaluru-Tech-Events-Tracker/

This should work perfectly. If it does, the issue is with GitHub Pages setup.

## 📋 Checklist

Before asking for help, verify:

- [ ] GitHub Pages is enabled in repository settings
- [ ] Correct source is selected (GitHub Actions or main/build)
- [ ] Deployment has completed (check Actions tab)
- [ ] Latest code is pushed to GitHub
- [ ] Browser cache is cleared
- [ ] test-data.json exists in build folder
- [ ] Local preview works correctly

## 🆘 Still Not Working?

If you've completed all steps and it still doesn't work:

1. **Check the exact error in browser console**
2. **Verify the Network tab shows the request**
3. **Try accessing the data file URL directly**
4. **Check GitHub Actions logs for errors**

## 📞 Quick Test Commands

```bash
# Rebuild everything
cd frontend
npm run build
cd ..

# Check build folder
dir build

# Test locally
cd frontend
npm run preview

# Commit and push
git add .
git commit -m "Test deployment"
git push origin main
```

## ✅ Expected Working State

When everything is working:

1. ✅ GitHub Pages enabled
2. ✅ Deployment completed
3. ✅ Main page loads: https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/
4. ✅ Data file accessible: https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/test-data.json
5. ✅ Events display on the page
6. ✅ No errors in browser console

## 🎯 Most Likely Solution

**If you're seeing "Failed to load events" right now, the most likely cause is that GitHub Pages is not enabled yet.**

Go here NOW: https://github.com/gangadhar1718/Bengaluru-Tech-Events-Tracker/settings/pages

Enable it, wait 2-3 minutes, then refresh your page.
