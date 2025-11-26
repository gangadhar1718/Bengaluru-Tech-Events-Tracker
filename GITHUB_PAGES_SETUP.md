# GitHub Pages Deployment Guide

## 🎉 Your app is ready to deploy!

**Live URL**: https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/

## What's Been Configured

✅ Vite config updated with base path `/Bengaluru-Tech-Events-Tracker/`
✅ GitHub Actions workflow created for automatic deployment
✅ Build folder generated with production assets
✅ `.nojekyll` file added to build directory
✅ Deploy script added to package.json

## Next Steps: Enable GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Push these changes to GitHub:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages in your repository:**
   - Go to: https://github.com/gangadhar1718/Bengaluru-Tech-Events-Tracker/settings/pages
   - Under "Build and deployment":
     - Source: **GitHub Actions**
   - Click Save

3. **Wait for deployment:**
   - Go to the Actions tab: https://github.com/gangadhar1718/Bengaluru-Tech-Events-Tracker/actions
   - Watch the "Deploy to GitHub Pages" workflow run
   - Once complete (green checkmark), your site is live!

4. **Visit your site:**
   - https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/

### Option 2: Manual Deployment from Build Folder

1. **Push the build folder:**
   ```bash
   git add .
   git commit -m "Add build folder for GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to: https://github.com/gangadhar1718/Bengaluru-Tech-Events-Tracker/settings/pages
   - Under "Build and deployment":
     - Source: **Deploy from a branch**
     - Branch: **main**
     - Folder: **/build**
   - Click Save

3. **Wait a few minutes** for GitHub to deploy

4. **Visit your site:**
   - https://gangadhar1718.github.io/Bengaluru-Tech-Events-Tracker/

## Future Updates

### Automatic (with GitHub Actions)
Just push to main branch:
```bash
cd frontend
npm run build
cd ..
git add .
git commit -m "Update frontend"
git push origin main
```

The GitHub Action will automatically deploy the new build.

### Manual
```bash
cd frontend
npm run build
cd ..
git add build
git commit -m "Deploy updates"
git push origin main
```

## Troubleshooting

### Site shows 404
- Make sure GitHub Pages is enabled in repository settings
- Verify the source is set correctly (GitHub Actions or /build folder)
- Check that the workflow completed successfully in the Actions tab

### Assets not loading
- Verify `base: '/Bengaluru-Tech-Events-Tracker/'` is in `vite.config.js`
- Rebuild: `cd frontend && npm run build`

### Workflow fails
- Check the Actions tab for error details
- Ensure repository has Pages enabled
- Verify workflow permissions are set correctly

## Files Modified

- `frontend/vite.config.js` - Added base path
- `frontend/package.json` - Added deploy script
- `.github/workflows/deploy.yml` - GitHub Actions workflow (NEW)
- `build/.nojekyll` - Prevents Jekyll processing (NEW)
- `README.md` - Added live demo link
- `DEPLOYMENT.md` - Added GitHub Pages section

## Notes

- The frontend is a static React app that loads data from `test data.json`
- No backend is deployed (Flask server is for local development only)
- All data is stored in browser Local Storage
- Users can reload fresh data from the JSON file using the reload button
