# 🚀 How to Enable GitHub Pages (REQUIRED!)

## Why You're Seeing the Error

Your app shows **"Failed to load events. Please try again later."** because **GitHub Pages is not enabled yet**.

The code is correct, the files are pushed, but GitHub isn't serving your site yet!

## 🎯 Quick Fix (2 minutes)

### Step 1: Go to Settings
Click this link: https://github.com/gangadhar1718/Bengaluru-Tech-Events-Tracker/settings/pages

### Step 2: Enable GitHub Pages

You'll see a page that says "GitHub Pages" at the top.

Under **"Build and deployment"**, you need to choose how to deploy:

#### Option A: GitHub Actions (Recommended) ⭐

1. Click the dropdown under "Source"
2. Select **"GitHub Actions"**
3. That's it! The workflow will run automatically

#### Option B: Deploy from Branch

1. Click the dropdown under "Source"
2. Select **"Deploy from a branch"**
3. Under "Branch":
   - Select **"main"**
   - Select **"/build"**
4. Click **"Save"**

### Step 3: Wait for Deployment

- **GitHub Actions**: 1-2 minutes (watch the Actions tab)
- **Branch deployment**: 2-5 minutes

You'll see a message like:
> "Your site is live at https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/"

### Step 4: Visit Your Site

Go to: https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/

**Refresh the page** (Ctrl+F5 or Cmd+Shift+R) to clear cache.

## ✅ How to Know It's Working

1. **The page loads** (not 404)
2. **Events are displayed** (no error message)
3. **You can see the event cards** with dates and details

## 🧪 Quick Test

Before visiting the main page, test if the data file is accessible:

https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/test-data.json

If you see JSON data with events, it's working! If you see 404, GitHub Pages isn't enabled yet.

## 📊 Visual Guide

```
GitHub Repository Settings
    ↓
Pages (in left sidebar)
    ↓
Build and deployment
    ↓
Source: [Select one]
    ├─→ GitHub Actions ⭐ (Recommended)
    └─→ Deploy from a branch
            ├─ Branch: main
            └─ Folder: /build
    ↓
[Save button]
    ↓
Wait 1-5 minutes
    ↓
Visit: https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/
    ↓
✅ Working!
```

## 🔍 Troubleshooting

### Still seeing the error after enabling?

1. **Wait a bit longer** - Deployment can take up to 5 minutes
2. **Check Actions tab** - https://github.com/gangadhar1718/Bengaluru-Tech-Events-Tracker/actions
3. **Clear browser cache** - Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
4. **Hard refresh** - Ctrl+F5 (or Cmd+Shift+R on Mac)

### How to check deployment status?

**If using GitHub Actions:**
- Go to Actions tab
- Look for "Deploy to GitHub Pages" workflow
- Green checkmark = deployed ✅
- Yellow circle = deploying ⏳
- Red X = failed ❌

**If using Branch deployment:**
- Go back to Settings → Pages
- Look for green banner saying "Your site is live"

## 📝 Summary

1. ✅ Code is fixed and pushed
2. ✅ Build folder has all files
3. ✅ Data file is included
4. ⏳ **YOU NEED TO: Enable GitHub Pages**
5. ⏳ Wait for deployment
6. ✅ Visit the site

**The ONLY thing left to do is enable GitHub Pages in the repository settings!**

Go here: https://github.com/gangadhar1718/Bengaluru-Tech-Events-Tracker/settings/pages
