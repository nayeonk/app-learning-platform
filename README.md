# Afghan Pathways Program - Web Level 1

A mobile-first, offline-capable web application designed for students with limited internet access to learn web development fundamentals.

## Features

- 📱 **Mobile-first design** - Optimized for smartphones and tablets
- 🔌 **Offline support** - Works without internet connection using Service Workers
- 📹 **Local video playback** - Educational videos stored locally
- 🎨 **Clean UI** - Simple, student-friendly interface with red-900 accent color
- 📊 **Progress tracking** - Visual progress bar for video completion
- 🚀 **PWA ready** - Can be installed as a mobile app

## File Structure

```
/
├── index.html              # Main application page
├── css/
│   └── tailwind.min.css   # Local Tailwind CSS (397KB)
├── js/
│   └── alpine.min.js      # Local Alpine.js (44KB)
├── videos/
│   └── lesson1.mp4        # Video file (add your content here)
├── sw.js                  # Service worker for offline functionality
├── manifest.json          # PWA manifest
└── README.md              # This file
```

## Setup Instructions

1. **Add your video content**:
   - Replace `videos/lesson1.mp4` with your actual lesson video
   - The app expects an MP4 format for best compatibility

2. **Serve the application**:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using PHP
   php -S localhost:8000

   # Or using Node.js (if you have http-server installed)
   npx http-server -p 8000
   ```

3. **Access the app**:
   - Open http://localhost:8000 in your browser
   - For mobile testing, use your computer's IP address (e.g., http://192.168.1.100:8000)

## Offline Functionality

The app automatically caches all necessary files when first loaded:
- HTML, CSS, and JavaScript files
- Video content (when available)
- App icons and manifest

Once cached, students can:
- Access the lesson without internet
- Watch videos offline
- See their progress
- Continue learning anywhere

## Mobile Installation

On supported browsers (Chrome, Safari, Firefox), users can:
1. Visit the app URL
2. Look for "Add to Home Screen" or "Install App" prompt
3. Install as a native-like app on their device

## Technical Details

- **Framework**: Vanilla HTML with Alpine.js for interactivity
- **Styling**: Tailwind CSS (fully local, no CDN)
- **Offline**: Service Worker with caching strategies
- **PWA**: Complete manifest with icons and shortcuts
- **Video**: HTML5 video player with custom controls
- **Storage**: No external dependencies or databases required

## Browser Support

- Chrome 60+ (recommended)
- Safari 11+
- Firefox 55+
- Edge 79+

## Customization

To adapt for different lessons:
1. Update the title and lesson information in `index.html`
2. Replace the video file with new content
3. Modify course information section
4. Update manifest.json with new lesson details

## Contributing

This is an educational tool designed to be simple and accessible. When making changes:
- Maintain offline functionality
- Keep mobile-first approach
- Test on actual mobile devices
- Ensure all assets remain local (no CDNs)