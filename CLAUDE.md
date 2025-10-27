# Claude Code Instructions for Afghan Pathways Project

## Project Overview
This is a mobile-first, offline-capable web application for the Afghan Pathways Program. It's designed for students with limited internet access to learn programming and web development fundamentals.

**Distribution Model**: Courses are organized into parent folders (e.g., `web-level-01`, `python-level-01`) within the `dist/` directory. Each lesson is a self-contained weekly package that includes all necessary files and can be distributed independently via USB, email, or any file-sharing method.

## Build Commands

### Tailwind CSS
When making changes to HTML classes or styling, always rebuild the CSS:

```bash
# Build optimized CSS for production
npm run build

# Watch for changes during development
npm run build-css
```

**Important**: After any HTML changes that add new Tailwind classes, you MUST run `npm run build` to regenerate the CSS file. The current CSS is purged and only includes classes actually used in the HTML.

### Development Server
```bash
# Start local server (recommended for full functionality)
npm run dev

# Or manually:
python3 -m http.server 8000
```

## Project Structure
```
/
   index.html              # Development version
   src/input.css           # Tailwind source file
   css/tailwind.css        # Built CSS (~15KB, auto-generated)
   js/alpine.min.js        # Local Alpine.js (44KB)
   videos/lesson1.mp4      # Development video files
   dist/                   # Distribution packages (share these with students!)
      web-level-01/        # Web Development Level 1 course
         lesson01/         # Week 1 - Complete, self-contained lesson package
            index.html
            css/tailwind.css
            js/alpine.min.js
            videos/lesson1.mp4
            lesson-content.json
            manifest.json
            sw.js
            Assignment 01.pdf
         lesson02/         # Week 2 - Complete, self-contained lesson package
            [same structure]
      python-level-01/     # Python Programming Level 1 course
         lesson01/         # Week 1 - Complete, self-contained lesson package
            [same structure as web lessons]
         lesson02/         # Week 2 - Complete, self-contained lesson package
            [same structure as web lessons]
   sw.js                   # Service worker for offline
   manifest.json           # PWA manifest
   lesson-content.json     # Lesson metadata
   tailwind.config.js      # Tailwind configuration
   package.json            # Build scripts
```

## Key Features
- 📱 Mobile-first responsive design
- 🔌 Complete offline functionality via Service Worker
- 📹 Local video playback with progress tracking
- ❤️ Red-900 accent color theme
- 🚀 PWA ready (installable on mobile devices)
- 📦 Distributable lesson packages (self-contained weekly folders)

## Recent Improvements
- Organized lessons into course-based folders (web-level-01, python-level-01)
- Fixed localStorage collision between lessons (each lesson uses isolated storage keys)
- Fixed hardcoded text in quiz completion sections
- Structured for multiple courses with distributable weekly folders

## Development Workflow

1. **Make HTML/styling changes**
2. **Always run**: `npm run build` (to rebuild CSS)
3. **Test locally**: `npm run dev` or serve via HTTP
4. **For mobile testing**: Use computer's IP address (e.g., `http://192.168.1.100:8000`)

## Important Notes
- The app works when opened directly in browser, but Service Worker requires HTTP server
- All dependencies are local (no CDNs) for offline capability
- CSS file size stays small (~15KB) due to Tailwind purging
- Each lesson has isolated localStorage (no data collision between lessons)
- Replace `videos/lesson1.mp4` with actual educational content

## Common Tasks

### Adding new styles
1. Add Tailwind classes to HTML
2. Run `npm run build`
3. Test the changes

### Adding new content
1. Modify HTML content
2. If new Tailwind classes added, run `npm run build`
3. Update video files in `/videos/` folder as needed

### Creating a new course
1. Create a new folder in `dist/` with course name (e.g., `dist/javascript-level-01/`)
2. Copy an existing lesson from another course as a template
3. Update `index.html` titles to reflect the new course and subject
4. Update `lesson-content.json` with course-appropriate content (titles, descriptions, key concepts)
5. Keep quiz questions as placeholders or update them for the new subject
6. Maintain the same folder structure for consistency

### Creating a new lesson package
1. Copy an existing lesson folder from the same course as a template
2. Update `index.html` with new lesson title and number
3. Replace video files in the `videos/` folder
4. Update `lesson-content.json` with new lesson metadata
5. Update `manifest.json` with lesson-specific details
6. Add the assignment PDF for that week
7. If you made style changes, rebuild CSS in root and copy to the lesson folder

### Distributing a course or lesson
- Copy entire course folder (e.g., `dist/web-level-01/`) or individual lesson (e.g., `dist/web-level-01/lesson01/`)
- Students can open `index.html` directly in their browser
- For full offline/PWA features, they should serve via HTTP (`python3 -m http.server`)
- Each lesson is completely self-contained and independent

### Available courses
- **web-level-01**: Web Development Level 1 (HTML, CSS fundamentals)
- **python-level-01**: Python Programming Level 1 (Python basics and control flow)

### Debugging offline functionality
- Requires HTTP server (not file:// protocol)
- Check browser DevTools > Application > Service Workers
- Clear cache if needed for testing
