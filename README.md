# Afghan Pathways Program - Learning Platform

A mobile-first, offline-capable web application designed for students with limited internet access to learn programming and web development fundamentals.

## Features

- 📱 **Mobile-first design** - Optimized for smartphones and tablets
- 🔌 **Offline support** - Works without internet connection using Service Workers
- 📹 **Local video playback** - Educational videos stored locally
- 🎨 **Clean UI** - Simple, student-friendly interface with red-900 accent color
- 📊 **Progress tracking** - Visual progress bar for video completion
- 🚀 **PWA ready** - Can be installed as a mobile app
- 📦 **Distributable lessons** - Each lesson is packaged as a self-contained folder

## Recent Improvements

- Organized lessons into course-based folders (web-level-01, python-level-01)
- Fixed localStorage collision between lessons (each lesson now uses isolated storage)
- Fixed hardcoded text in quiz completion sections
- Structured for multiple courses with distributable weekly folders

## Distribution Model

The project is organized for easy course and lesson distribution:

- **Course-based organization**: Courses are organized in parent folders (e.g., `web-level-01`, `python-level-01`)
- **Self-contained packages**: Each lesson includes everything needed to run independently
- **No internet required**: Students can copy a lesson folder to their device and use it offline
- **Easy sharing**: Transfer via USB, email, or any file-sharing method
- **Isolated storage**: Each lesson maintains separate progress tracking
- **Consistent structure**: All lessons follow the same folder layout for familiarity
- **Multiple courses**: Support for different programming languages and topics

This design allows instructors to distribute one course or lesson at a time, making it ideal for environments with limited connectivity.

## File Structure

```
/
├── index.html              # Development version
├── src/
│   └── input.css           # Tailwind source file
├── css/
│   └── tailwind.css        # Built CSS (~15KB, optimized)
├── js/
│   └── alpine.min.js       # Local Alpine.js (44KB)
├── videos/
│   └── lesson1.mp4         # Development video files
├── dist/                   # Distribution packages
│   ├── web-level-01/       # Web Development Level 1 course
│   │   ├── lesson01/       # Week 1 - Self-contained lesson package
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── tailwind.css
│   │   │   ├── js/
│   │   │   │   └── alpine.min.js
│   │   │   ├── videos/
│   │   │   │   └── lesson1.mp4
│   │   │   ├── lesson-content.json
│   │   │   ├── manifest.json
│   │   │   ├── sw.js
│   │   │   └── Assignment 01.pdf
│   │   └── lesson02/       # Week 2 - Self-contained lesson package
│   │       └── [same structure as lesson01]
│   └── python-level-01/    # Python Programming Level 1 course
│       ├── lesson01/       # Week 1 - Self-contained lesson package
│       │   └── [same structure as web lessons]
│       └── lesson02/       # Week 2 - Self-contained lesson package
│           └── [same structure as web lessons]
├── sw.js                   # Service worker for offline functionality
├── manifest.json           # PWA manifest
├── lesson-content.json     # Lesson metadata
├── package.json            # Build scripts
├── tailwind.config.js      # Tailwind configuration
└── README.md               # This file
```

## Setup Instructions

### For Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build Tailwind CSS**:
   ```bash
   # Build once (production/minified)
   npm run build

   # Or watch for changes during development
   npm run build-css
   ```

3. **Serve the application**:
   ```bash
   # Using npm script (recommended)
   npm run dev

   # Or manually using Python 3
   python3 -m http.server 8000

   # Or using PHP
   php -S localhost:8000
   ```

4. **Access the app**:
   - Open http://localhost:8000 in your browser
   - For mobile testing, use your computer's IP address (e.g., http://192.168.1.100:8000)

### For Distribution

Courses are organized in the `dist/` folder, with each lesson as a complete, self-contained package:

1. **Share a course or lesson**:
   - Copy entire course folder (e.g., `dist/web-level-01/`) or individual lesson (e.g., `dist/web-level-01/lesson01/`)
   - Students can open `index.html` directly in a browser (no server needed for basic functionality)
   - For full offline/PWA features, serve via HTTP (students can use Python: `python3 -m http.server`)

2. **Add video content**:
   - Place video files in the lesson's `videos/` folder
   - Update `lesson-content.json` with video metadata
   - MP4 format recommended for best compatibility

3. **Available courses**:
   - **web-level-01**: Web Development Level 1 (HTML, CSS fundamentals)
   - **python-level-01**: Python Programming Level 1 (Python basics and control flow)

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
- **Styling**: Tailwind CSS (fully local, no CDN, ~15KB optimized)
- **Offline**: Service Worker with caching strategies
- **PWA**: Complete manifest with icons and shortcuts
- **Video**: HTML5 video player with custom controls
- **Storage**: localStorage with isolated keys per lesson (prevents data collision)
- **Build**: Tailwind CSS CLI for optimized production builds
- **Distribution**: Self-contained lesson folders, each independently functional

## Browser Support

- Chrome 60+ (recommended)
- Safari 11+
- Firefox 55+
- Edge 79+

## Customization

### Creating a New Course

To create a new course:

1. **Create course folder**: Add a new folder in `dist/` (e.g., `dist/javascript-level-01/`)
2. **Copy lesson template**: Use an existing lesson from another course as a template
3. **Update course content**: Modify JSON files, HTML titles, and lesson content for the new subject
4. **Maintain structure**: Keep the same folder structure for consistency

### Creating a New Lesson

To create a new lesson package within a course:

1. **Copy an existing lesson folder** from the same course as a template
2. **Update the HTML**: Modify `index.html` with new lesson title and number
3. **Add video content**: Replace video files in the `videos/` folder
4. **Update lesson data**: Edit `lesson-content.json` with new lesson metadata (titles, descriptions, key concepts)
5. **Update manifest**: Modify `manifest.json` with lesson-specific details
6. **Add assignment**: Include the lesson's assignment PDF
7. **Rebuild CSS** (if making style changes): Run `npm run build` in the root, then copy to lesson folder

### Modifying Existing Lessons

- Each lesson is isolated with its own localStorage keys (no collision)
- Update `lesson-content.json` for lesson metadata (title, parts, videos, quiz questions)
- Styles are in `css/tailwind.css` (rebuild from root if adding new Tailwind classes)

## Contributing

This is an educational tool designed to be simple and accessible. When making changes:
- Maintain offline functionality
- Keep mobile-first approach
- Test on actual mobile devices
- Ensure all assets remain local (no CDNs)