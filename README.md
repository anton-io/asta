# ASTA Design System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

ASTA is a monospace UI framework where every element aligns to a character grid to create interfaces that are rhythmic, intentional, and beautifully precise.

Because code is poetry, and poetry deserves rhythm. Monospace typography aligns text, inputs, and components in perfect harmony, creating interfaces that are legible, effortless, and deeply satisfying to use. Ideal for dashboards, terminals, editors, and tools where precision meets beauty.

Lightweight. Performant. Unapologetically minimal.
ASTA shines through simplicity.

**ASTA** means *love*, *bright star*, and sometimes *beautiful goddess*, a name that embodies the elegance, clarity, and quiet strength at the heart of this system.

## Links

- **Live Demo**: [https://anton.io/asta](https://anton.io/asta)
- **GitHub Repository**: [https://github.com/anton-io/asta](https://github.com/anton-io/asta)

## Quick Start

### Development

```bash
# Install dependencies.
npm install

# Start development server with auto-reload.
npm run dev
# or
npm start
```

The server will start on `http://localhost:8181` with:
- ✨ Auto-reload on file changes
- 🔄 SCSS compilation on save
- 🚀 Live updates without manual refresh

### Production Build

```bash
# Build minified CSS and JS
npm run build
```

Output files:
- `src/css/asta.css` - Unminified CSS (~24KB)
- `src/css/asta.min.css` - Minified CSS (~16KB)
- `src/js/asta.min.js` - Minified core JavaScript (~4KB)
- `src/js/examples.min.js` - Documentation page utilities (~3KB, optional)
- `dist/asta.zip` - Distribution package (~370KB)

The distribution package (`dist/asta.zip`) contains everything needed to use ASTA:
- **asta.html** - Starter template with examples
- CSS (minified and source)
- JavaScript (minified and source)
- Fonts (JetBrains Mono in woff2 format)

Simply extract the zip and open `asta.html` in your browser to see it in action!

## Project Structure

```
├── src/                # Source files.
│   ├── scss/           # SCSS source files (edit these).
│   │   ├── asta.scss   # Main entry point.
│   │   ├── fonts.scss  # Font-face declarations.
│   │   ├── components/ # Component styles.
│   │   ├── reset.scss
│   │   ├── variables.scss
│   │   └── base.scss
│   ├── fonts/          # Local font files (woff2)
│   │   ├── JetBrainsMono-Regular.woff2
│   │   ├── JetBrainsMono-Medium.woff2
│   │   ├── JetBrainsMono-SemiBold.woff2
│   │   └── JetBrainsMono-ExtraBold.woff2
│   ├── js/             # JavaScript source and builds
│   │   ├── asta.js          # Core framework
│   │   ├── asta.min.js      # (generated)
│   │   ├── examples.js      # Documentation page utilities
│   │   └── examples.min.js  # (generated)
│   ├── css/            # Generated CSS (don't edit)
│   │   ├── asta.css
│   │   └── asta.min.css
│   └── index.html      # Component showcase
├── package.json
└── postcss.config.js
```

## Development Workflow

1. **Edit SCSS files** in `src/scss/` directory.
2. **Run `npm run dev`** to watch for changes.
3. **SCSS compiles to `src/css/`** automatically.
4. **Browser auto-refreshes** to see changes.

## Build System

The build system uses:
- **Sass** - Compiles SCSS to CSS.
- **PostCSS** + **Autoprefixer** - Adds vendor prefixes.
- **Cssnano** - Minifies CSS.
- **Terser** - Minifies JavaScript.

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm start` or `npm run dev` | Start dev server with auto-reload on port 8181 |
| `npm run build` | Build minified CSS and JS files |
| `npm run watch:scss` | Watch and compile SCSS only |
| `npm run serve` | Start browser-sync server only |
| `npm run build:scss` | Compile SCSS to css/ |
| `npm run build:css` | Optimize and minify CSS |
| `npm run build:js` | Minify JavaScript |

## Source of Truth

**SCSS files** (`src/scss/`) are the source of truth. The `src/css/` directory is **generated** and should not be edited directly.

## Browser Support

Modern browsers with CSS Grid and Flexbox support:
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## Contributing

Contributions are welcome! Here's how you can help improve ASTA:

### Reporting Issues

- Check if the issue already exists in the [GitHub Issues](https://github.com/anton-io/asta/issues)
- Provide a clear description of the problem
- Include steps to reproduce the issue
- Share your browser version and OS

### Submitting Pull Requests

1. **Fork the repository** and create a new branch from `main`
2. **Make your changes** following the project structure:
   - Edit SCSS files in `src/scss/` (not the generated CSS)
   - Edit JavaScript source files in `src/js/`
   - Ensure comments are complete sentences ending with periods
3. **Test your changes**:
   - Run `npm run dev` to test locally
   - Verify in both light and dark modes
   - Check grid alignment with the debug toggle
4. **Build the project**: Run `npm run build` to ensure everything compiles
5. **Submit a PR** with:
   - Clear description of changes
   - Screenshots if visual changes
   - Reference to related issues

### Development Guidelines

- **CSS**: Write semantic, monospace-grid-aligned styles
- **JavaScript**: Keep functions focused and well-documented
- **Comments**: Use complete sentences ending with periods
- **Grid Alignment**: All elements must align to the character grid
- **Theme Support**: Ensure components work in both light and dark modes
- **Performance**: Keep the framework lightweight and performant

### What to Commit

✅ Commit:
- `src/scss/` - Source SCSS files
- `src/fonts/` - Local font files
- `src/js/` - Source JavaScript
- `src/index.html`
- `dist/asta.html` - Starter template
- `package.json`
- Configuration files

❌ Don't commit:
- `node_modules/`
- `src/css/` (generated)
- `src/js/asta.min.js` (generated)
- `src/js/examples.min.js` (generated)
- `dist/css/`, `dist/js/`, `dist/fonts/` (generated)
- `dist/asta.zip` (generated)
- Log files

### Code of Conduct

Be respectful, constructive, and collaborative. We're all here to make ASTA better!

## License

MIT License - see [LICENSE](LICENSE) file

## Author

**ASTA** is crafted by **Dr. António Roldão**, a software engineer, entrepreneur, and PhD in Scientific Computing from Imperial College London. With deep experience at J.P. Morgan and Morgan Stanley, he blends quantitative precision with a passion for elegant, functional design.

He is the co-founder of **[muse.ai](https://muse.ai)**, one of the most advanced AI-powered video search platforms, and the creator of **WebCanvas**, the world’s largest collaborative online painting experience.

ASTA was born from his hobby projects to bring clarity, **simplicity**, and rhythm to web interfaces without compromise.