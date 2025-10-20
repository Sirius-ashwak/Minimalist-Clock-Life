# Minimalist Year Progress Clock

A beautiful, feature-rich web application that displays the remaining time in the current year with customizable themes and advanced tracking features.

## ✨ Features

### Core Features
- **Real-time Countdown**: Shows days, hours, minutes, and seconds remaining in the current year
- **Year Progress Bar**: Visual representation of how much of the year has passed
- **Quarterly Progress**: Track Q1, Q2, Q3, and Q4 completion
- **Monthly & Weekly Progress**: Detailed time-scale tracking
- **Current Date/Time**: Localized display of current date and time

### Visual Styles
- **5 Premium Themes**: 
  - Dark (Default)
  - Light
  - Midnight Blue
  - Charcoal
  - Slate Gray
- **Multiple Progress Styles**: Linear bar, circular, or both
- **3 View Modes**: Minimal, Detailed, Calendar
- **5 Monospace Fonts**: SF Mono, Fira Code, JetBrains Mono, Cascadia Code, Roboto Mono

### Advanced Features
- **Particle System**: Optional animated background particles
- **Daily Motivational Quotes**: Rotating inspirational quotes
- **Holiday Countdowns**: Track upcoming holidays
- **Year Heatmap**: Visual calendar representation
- **Multi-language Support**: English, Spanish, French, German, Japanese
- **Fully Responsive**: Works perfectly on all devices

### Accessibility
- **ARIA Labels**: Full screen reader support
- **Keyboard Navigation**: 
  - Press `F` to toggle fullscreen mode
  - Press `R` to refresh the display
  - Press `ESC` to close settings panel
  - Tab navigation through all controls
- **Focus Indicators**: Clear visual focus states
- **High Contrast**: Accessible color combinations

## 🎨 Design Elements

- **Color Palettes**: Five carefully crafted themes
- **Typography**: Professional monospace fonts
- **Animations**: Smooth transitions and subtle effects
- **Gradient Effects**: Dynamic progress indicators
- **Responsive Layout**: Mobile-first design approach

## 🚀 How to Use

1. Open `index.html` in any modern web browser
2. Click the settings gear icon (⚙️) in the top-right corner
3. Customize your experience:
   - Choose your preferred theme
   - Select view mode and progress style
   - Enable/disable particles, quotes, and holidays
   - Change language and font
4. Your settings are automatically saved!

## 🎯 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `F` | Toggle fullscreen mode |
| `R` | Refresh the display |
| `ESC` | Close settings panel |
| `Tab` | Navigate through controls |

## 🌐 Browser Compatibility

Tested and optimized for:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📁 File Structure

```
minimalist-clock/
├── index.html       # Main HTML structure with accessibility
├── styles.css       # Core layout and responsive design
├── themes.css       # Theme definitions and customization
├── script.js        # Time calculations and core logic
├── features.js      # Advanced features and settings
├── particles.js     # Particle animation system
├── README.md        # This file
└── CHANGELOG.md     # Detailed version history
```

## 🔧 Technical Features

### Performance Optimizations
- ⚡ Cached DOM references (zero repeated queries)
- ⚡ Conditional rendering (particles pause when tab hidden)
- ⚡ Optimized animation frames
- ⚡ Efficient update cycles

### Reliability
- 🛡️ Safe localStorage wrapper with error handling
- 🛡️ Graceful degradation when features unavailable
- 🛡️ Null-safe DOM operations
- 🛡️ Locale fallbacks for date formatting

### Code Quality
- 📝 Comprehensive comments
- 📝 Modular architecture
- 📝 Consistent coding style
- 📝 Separation of concerns

## 🎨 Customization

### Adding Custom Themes
Edit `themes.css` and add your theme variables:

```css
body.custom-theme {
    --bg-primary: #your-color;
    --text-primary: #your-color;
    /* ... other variables ... */
}
```

### Adding Custom Quotes
Edit `features.js` and add to the `quotes` array:

```javascript
{ text: "Your quote here", author: "Author Name" }
```

### Adding Custom Holidays
Edit `features.js` and add to the `holidays.en` array:

```javascript
{ name: "Holiday Name", date: "MM-DD" }
```

## 📊 Version History

### Version 2.0 (Current)
- ✅ Fixed circular progress rendering
- ✅ Fixed particle system memory leaks
- ✅ Fixed settings persistence
- ✅ Improved performance (DOM caching)
- ✅ Enhanced accessibility
- ✅ Added locale-aware formatting
- ✅ Mobile optimizations

See [CHANGELOG.md](CHANGELOG.md) for complete details.

## 🐛 Known Issues

**None** - All critical and major issues have been resolved!

## 🤝 Contributing

Feel free to fork and enhance! Suggestions for future features:
- Custom holiday management
- Real activity tracking for heatmap
- Export/Import settings
- Browser notifications
- PWA support
- Custom theme creator

## 📄 License

Free to use and modify for personal and commercial projects.

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

*No frameworks. No dependencies. Maximum performance and compatibility.*
