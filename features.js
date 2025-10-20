// Features and Advanced Functionality

// Motivational Quotes Database
const quotes = [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Time is what we want most, but what we use worst.", author: "William Penn" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Time flies over us, but leaves its shadow behind.", author: "Nathaniel Hawthorne" },
    { text: "Lost time is never found again.", author: "Benjamin Franklin" },
    { text: "The two most powerful warriors are patience and time.", author: "Leo Tolstoy" },
    { text: "Time is the most valuable thing a man can spend.", author: "Theophrastus" },
    { text: "Better three hours too soon than a minute too late.", author: "William Shakespeare" },
    { text: "Time is a created thing. To say 'I don't have time' is to say 'I don't want to.'", author: "Lao Tzu" },
    { text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.", author: "Stephen Covey" },
    { text: "Yesterday is gone. Tomorrow has not yet come. We have only today.", author: "Mother Teresa" },
    { text: "Time is the wisest counselor of all.", author: "Pericles" },
    { text: "The bad news is time flies. The good news is you're the pilot.", author: "Michael Altshuler" },
    { text: "Don't count the days, make the days count.", author: "Muhammad Ali" }
];

// Multi-language support
const translations = {
    en: {
        days: "DAYS",
        hours: "HOURS",
        minutes: "MINUTES",
        seconds: "SECONDS",
        yearComplete: "OF YEAR COMPLETE",
        quarterlyProgress: "Quarterly Progress",
        month: "Month",
        week: "Week",
        upcomingHolidays: "Upcoming Holidays",
        yearHeatmap: "Year Heatmap",
        past: "Past",
        future: "Future",
        today: "Today",
        daySingular: "day",
        dayPlural: "days"
    },
    es: {
        days: "DÍAS",
        hours: "HORAS",
        minutes: "MINUTOS",
        seconds: "SEGUNDOS",
        yearComplete: "DEL AÑO COMPLETADO",
        quarterlyProgress: "Progreso Trimestral",
        month: "Mes",
        week: "Semana",
        upcomingHolidays: "Próximos Festivos",
        yearHeatmap: "Mapa de Calor del Año",
        past: "Pasado",
        future: "Futuro",
        today: "Hoy",
        daySingular: "día",
        dayPlural: "días"
    },
    fr: {
        days: "JOURS",
        hours: "HEURES",
        minutes: "MINUTES",
        seconds: "SECONDES",
        yearComplete: "DE L'ANNÉE COMPLÈTE",
        quarterlyProgress: "Progrès Trimestriel",
        month: "Mois",
        week: "Semaine",
        upcomingHolidays: "Prochains Jours Fériés",
        yearHeatmap: "Carte Thermique de l'Année",
        past: "Passé",
        future: "Futur",
        today: "Aujourd'hui",
        daySingular: "jour",
        dayPlural: "jours"
    },
    de: {
        days: "TAGE",
        hours: "STUNDEN",
        minutes: "MINUTEN",
        seconds: "SEKUNDEN",
        yearComplete: "DES JAHRES ABGESCHLOSSEN",
        quarterlyProgress: "Quartalsfortschritt",
        month: "Monat",
        week: "Woche",
        upcomingHolidays: "Kommende Feiertage",
        yearHeatmap: "Jahres-Heatmap",
        past: "Vergangenheit",
        future: "Zukunft",
        today: "Heute",
        daySingular: "Tag",
        dayPlural: "Tage"
    },
    ja: {
        days: "日",
        hours: "時間",
        minutes: "分",
        seconds: "秒",
        yearComplete: "年間完了",
        quarterlyProgress: "四半期進捗",
        month: "月",
        week: "週",
        upcomingHolidays: "今後の祝日",
        yearHeatmap: "年間ヒートマップ",
        past: "過去",
        future: "未来",
        today: "今日",
        daySingular: "日",
        dayPlural: "日"
    }
};

// Holiday definitions
const holidayDefinitions = {
    en: [
        { name: "New Year's Day", month: 0, day: 1 },
        { name: "Valentine's Day", month: 1, day: 14 },
        { name: "Easter", dynamic: 'easter' },
        { name: "Independence Day", month: 6, day: 4 },
        { name: "Halloween", month: 9, day: 31 },
        { name: "Thanksgiving", dynamic: 'thanksgiving' },
        { name: "Christmas", month: 11, day: 25 },
        { name: "New Year's Eve", month: 11, day: 31 }
    ]
};

// Calculate Western (Gregorian) Easter date for a given year
function calculateEasterDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0 = January
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day);
}

// Calculate the date of the 4th Thursday in November (US Thanksgiving)
function calculateThanksgivingDate(year) {
    const date = new Date(year, 10, 1); // November 1st
    while (date.getDay() !== 4) { // 4 = Thursday
        date.setDate(date.getDate() + 1);
    }
    date.setDate(date.getDate() + 21); // Advance 3 additional weeks to reach 4th Thursday
    return date;
}

function getHolidaysForLocale(locale, year) {
    const definitions = holidayDefinitions[locale] || holidayDefinitions.en;
    return definitions.map(def => {
        let date;
        if (def.dynamic === 'easter') {
            date = calculateEasterDate(year);
        } else if (def.dynamic === 'thanksgiving') {
            date = calculateThanksgivingDate(year);
        } else {
            date = new Date(year, def.month, def.day);
        }

        return {
            name: def.name,
            date
        };
    });
}

// Settings and State Management
let currentLanguage = 'en';
let currentTheme = 'dark';
let viewMode = 'detailed';
let progressStyle = 'bar';
let particlesEnabled = false;
let quotesEnabled = true;
let holidaysEnabled = true;
let milestoneShown = {};

// Safe localStorage wrapper
const storage = {
    get: (key, defaultValue = null) => {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? value : defaultValue;
        } catch (error) {
            console.warn('localStorage get failed:', error);
            return defaultValue;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.warn('localStorage set failed:', error);
            return false;
        }
    },
    getBoolean: (key, defaultValue = false) => {
        try {
            const value = localStorage.getItem(key);
            return value === 'true' ? true : value === 'false' ? false : defaultValue;
        } catch (error) {
            return defaultValue;
        }
    }
};

// Make currentLanguage globally accessible
window.currentLanguage = currentLanguage;

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    initializeSettings();
    updateQuarterlyProgress();
    updateMonthlyWeeklyProgress();
    updateHolidayCountdowns();
    displayDailyQuote();
    createHeatmapCalendar();
    // checkMilestones(); // Disabled milestone notifications
    
    // Update features every minute
    setInterval(() => {
        updateQuarterlyProgress();
        updateMonthlyWeeklyProgress();
        updateHolidayCountdowns();
        // checkMilestones(); // Disabled milestone notifications
    }, 60000);
    
    // Update quote daily
    setInterval(displayDailyQuote, 86400000);
});

// Initialize Settings Panel
function initializeSettings() {
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    
    settingsToggle.addEventListener('click', () => {
        const isActive = settingsPanel.classList.toggle('active');
        settingsToggle.setAttribute('aria-expanded', isActive);
    });
    
    // Close settings when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
            settingsPanel.classList.remove('active');
            settingsToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Keyboard navigation - ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsPanel.classList.contains('active')) {
            settingsPanel.classList.remove('active');
            settingsToggle.setAttribute('aria-expanded', 'false');
            settingsToggle.focus();
        }
    });
    
    // Theme selector
    document.getElementById('themeSelector').addEventListener('change', (e) => {
        changeTheme(e.target.value);
    });
    
    // View mode selector
    document.getElementById('viewMode').addEventListener('change', (e) => {
        changeViewMode(e.target.value);
    });
    
    // Progress style selector
    document.getElementById('progressStyle').addEventListener('change', (e) => {
        changeProgressStyle(e.target.value);
    });
    
    // Language selector
    document.getElementById('languageSelector').addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });
    
    // Font selector
    document.getElementById('fontSelector').addEventListener('change', (e) => {
        changeFont(e.target.value);
    });
    
    // Particles toggle
    document.getElementById('particlesToggle').addEventListener('change', (e) => {
        toggleParticles(e.target.checked);
    });
    
    // Quotes toggle
    document.getElementById('quotesToggle').addEventListener('change', (e) => {
        toggleQuotes(e.target.checked);
    });
    
    // Holidays toggle
    document.getElementById('holidaysToggle').addEventListener('change', (e) => {
        toggleHolidays(e.target.checked);
    });
}

// Theme Management
function changeTheme(theme) {
    const body = document.body;
    const themes = ['dark-theme', 'light-theme', 'midnight-theme', 'charcoal-theme', 'slate-theme'];
    
    themes.forEach(t => body.classList.remove(t));
    body.classList.add(`${theme}-theme`);
    currentTheme = theme;
    
    storage.set('selectedTheme', theme);
}

// View Mode Management
function changeViewMode(mode) {
    viewMode = mode;
    
    const quarterlyProgress = document.getElementById('quarterlyProgress');
    const timeScales = document.getElementById('timeScales');
    const holidayCountdowns = document.getElementById('holidayCountdowns');
    const heatmapCalendar = document.getElementById('heatmapCalendar');
    
    if (mode === 'minimal') {
        quarterlyProgress.classList.remove('active');
        timeScales.classList.remove('active');
        holidayCountdowns.classList.remove('active');
        heatmapCalendar.style.display = 'none';
    } else if (mode === 'detailed') {
        quarterlyProgress.classList.add('active');
        timeScales.classList.add('active');
        if (holidaysEnabled) holidayCountdowns.classList.add('active');
        heatmapCalendar.style.display = 'none';
    } else if (mode === 'calendar') {
        quarterlyProgress.classList.remove('active');
        timeScales.classList.remove('active');
        holidayCountdowns.classList.remove('active');
        heatmapCalendar.style.display = 'block';
    }
    
    localStorage.setItem('viewMode', mode);
}

// Progress Style Management
function changeProgressStyle(style) {
    progressStyle = style;
    
    const linearProgress = document.querySelector('.progress-section');
    const circularProgress = document.getElementById('circularProgress');
    
    if (style === 'bar') {
        linearProgress.style.display = 'block';
        circularProgress.style.display = 'none';
    } else if (style === 'circle') {
        linearProgress.style.display = 'none';
        circularProgress.style.display = 'block';
    } else if (style === 'both') {
        linearProgress.style.display = 'block';
        circularProgress.style.display = 'block';
    }
    
    updateCircularProgress();
    storage.set('progressStyle', style);
}

// Update Circular Progress - Fixed to work properly
function updateCircularProgress(percentage) {
    const circleProgress = document.getElementById('circleProgress');
    const circlePercent = document.getElementById('circlePercent');
    
    if (!circleProgress || !circlePercent) return;
    
    // Only update if circular progress is visible
    const circularContainer = document.getElementById('circularProgress');
    if (!circularContainer || circularContainer.style.display === 'none') return;
    
    // Get percentage from parameter or calculate it
    let progress = percentage;
    if (progress === undefined && typeof calculateTimeRemaining === 'function') {
        const timeData = calculateTimeRemaining();
        progress = parseFloat(timeData.progressPercentage);
    }
    
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (progress / 100) * circumference;
    
    circleProgress.style.strokeDasharray = circumference;
    circleProgress.style.strokeDashoffset = offset;
    circlePercent.textContent = `${Math.round(progress)}%`;
}

// Make updateCircularProgress globally accessible
window.updateCircularProgress = updateCircularProgress;

// Language Management
function changeLanguage(lang) {
    currentLanguage = lang;
    window.currentLanguage = lang; // Update global reference
    const t = translations[lang];
    
    // Update text elements
    const daysLabel = document.querySelector('#daysRemaining .label');
    if (daysLabel) daysLabel.textContent = t.days;
    
    const unitLabels = document.querySelectorAll('.time-unit .unit-label');
    if (unitLabels[0]) unitLabels[0].textContent = t.hours;
    if (unitLabels[1]) unitLabels[1].textContent = t.minutes;
    if (unitLabels[2]) unitLabels[2].textContent = t.seconds;
    
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        const currentPercent = document.getElementById('progressPercentage')?.textContent || '0';
        progressText.innerHTML = `<span id="progressPercentage">${currentPercent}</span>% ${t.yearComplete}`;
    }
    
    // Update section titles
    const quarterlyTitle = document.querySelector('.quarterly-progress h3');
    if (quarterlyTitle) quarterlyTitle.textContent = t.quarterlyProgress;
    
    const holidayTitle = document.querySelector('.holiday-countdowns h3');
    if (holidayTitle) holidayTitle.textContent = t.upcomingHolidays;
    
    const heatmapTitle = document.querySelector('.heatmap-calendar h3');
    if (heatmapTitle) heatmapTitle.textContent = t.yearHeatmap;
    
    storage.set('language', lang);
    
    // Update current date/time with new language
    if (typeof updateDisplay === 'function') {
        updateDisplay();
    }
}

// Font Management
function changeFont(font) {
    const body = document.body;
    const fonts = ['font-sf-mono', 'font-fira-code', 'font-jetbrains', 'font-cascadia', 'font-roboto'];
    
    fonts.forEach(f => body.classList.remove(f));
    body.classList.add(`font-${font}`);
    
    storage.set('selectedFont', font);
}

// Particle Toggle
function toggleParticles(enabled) {
    particlesEnabled = enabled;
    window.particlesEnabled = enabled; // Make globally accessible
    const canvas = document.getElementById('particleCanvas');
    
    if (enabled) {
        if (canvas) canvas.style.display = 'block';
        if (typeof initParticles === 'function') {
            initParticles();
        }
    } else {
        if (canvas) canvas.style.display = 'none';
        if (typeof stopParticles === 'function') {
            stopParticles();
        }
    }
    
    storage.set('particlesEnabled', enabled);
}

// Quotes Toggle
function toggleQuotes(enabled) {
    quotesEnabled = enabled;
    const quoteContainer = document.getElementById('quoteContainer');
    
    if (quoteContainer) {
        quoteContainer.style.display = enabled ? 'block' : 'none';
    }
    if (enabled) displayDailyQuote();
    
    storage.set('quotesEnabled', enabled);
}

// Holidays Toggle
function toggleHolidays(enabled) {
    holidaysEnabled = enabled;
    const holidayCountdowns = document.getElementById('holidayCountdowns');
    
    if (viewMode === 'detailed' && enabled) {
        holidayCountdowns.classList.add('active');
        updateHolidayCountdowns();
    } else {
        holidayCountdowns.classList.remove('active');
    }
    
    storage.set('holidaysEnabled', enabled);
}

// Quarterly Progress Update
function updateQuarterlyProgress() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const quarter = Math.floor(month / 3) + 1;
    
    for (let q = 1; q <= 4; q++) {
        const startMonth = (q - 1) * 3;
        const endMonth = q * 3;
        const quarterStart = new Date(year, startMonth, 1);
        const quarterEnd = new Date(year, endMonth, 1);
        
        let progress = 0;
        if (quarter > q) {
            progress = 100;
        } else if (quarter === q) {
            const elapsed = now - quarterStart;
            const total = quarterEnd - quarterStart;
            progress = (elapsed / total) * 100;
        }
        
        document.getElementById(`q${q}Progress`).style.width = `${progress}%`;
        document.getElementById(`q${q}Percent`).textContent = `${Math.round(progress)}%`;
    }
}

// Monthly and Weekly Progress Update
function updateMonthlyWeeklyProgress() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    // Month progress
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 1);
    const monthElapsed = now - monthStart;
    const monthTotal = monthEnd - monthStart;
    const monthProgress = (monthElapsed / monthTotal) * 100;
    
    document.getElementById('currentMonth').textContent = monthNames[month];
    document.getElementById('monthProgress').style.width = `${monthProgress}%`;
    
    // Week progress
    const weekNumber = getWeekNumber(now);
    const dayOfWeek = now.getDay();
    const weekProgress = ((dayOfWeek + (now.getHours() / 24)) / 7) * 100;
    
    document.getElementById('currentWeek').textContent = `W${weekNumber}`;
    document.getElementById('weekProgress').style.width = `${weekProgress}%`;
}

// Get week number
function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Holiday Countdowns
function updateHolidayCountdowns() {
    if (!holidaysEnabled) return;
    
    const now = new Date();
    const year = now.getFullYear();
    const holidaysList = document.getElementById('holidaysList');
    
    if (!holidaysList) return;
    
    holidaysList.innerHTML = '';
    const locale = localeMap[currentLanguage] || 'en-US';
    const t = translations[currentLanguage] || translations.en;
    const dateFormatter = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });

    const holidayInstances = [
        ...getHolidaysForLocale(currentLanguage, year),
        ...getHolidaysForLocale(currentLanguage, year + 1)
    ];

    const upcomingHolidays = holidayInstances
        .filter(holiday => holiday.date >= now)
        .map(holiday => {
            const daysUntil = Math.ceil((holiday.date - now) / (1000 * 60 * 60 * 24));
            return {
                name: holiday.name,
                date: holiday.date,
                daysUntil,
                formattedDate: dateFormatter.format(holiday.date)
            };
        })
        .sort((a, b) => a.date - b.date)
        .slice(0, 3);

    upcomingHolidays.forEach(holiday => {
        const item = document.createElement('div');
        item.className = 'holiday-item';
        const dayLabel = holiday.daysUntil === 1 ? t.daySingular : t.dayPlural;
        const countdownLabel = holiday.daysUntil === 0
            ? t.today
            : `${holiday.daysUntil} ${dayLabel}`;
        item.innerHTML = `
            <span class="holiday-name">${holiday.name}</span>
            <span class="holiday-countdown">${holiday.formattedDate} · ${countdownLabel}</span>
        `;
        holidaysList.appendChild(item);
    });
}

// Display Daily Quote
function displayDailyQuote() {
    if (!quotesEnabled) return;
    
    const quoteElement = document.getElementById('dailyQuote');
    const authorElement = document.getElementById('quoteAuthor');
    
    if (!quoteElement || !authorElement) return;
    
    const today = new Date().toDateString();
    let quoteIndex = parseInt(storage.get('quoteIndex', '0'));
    const lastQuoteDate = storage.get('lastQuoteDate');
    
    if (lastQuoteDate !== today) {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        storage.set('quoteIndex', quoteIndex.toString());
        storage.set('lastQuoteDate', today);
    }
    
    const quote = quotes[quoteIndex];
    quoteElement.textContent = `"${quote.text}"`;
    authorElement.textContent = `— ${quote.author}`;
}

// Create Heatmap Calendar
function createHeatmapCalendar() {
    const grid = document.getElementById('heatmapGrid');
    
    if (!grid) return;
    
    // Clear existing cells
    grid.innerHTML = '';
    
    const now = new Date();
    const year = now.getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31);
    
    // Calculate total days in year
    const totalDays = Math.ceil((endOfYear - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
    
    // Get day of week for Jan 1 (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = startOfYear.getDay();
    
    // Add empty cells for days before Jan 1
    for (let i = 0; i < firstDayOfWeek; i++) {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell empty';
        cell.setAttribute('data-level', '0');
        cell.style.opacity = '0.1';
        grid.appendChild(cell);
    }
    
    // Create cells for each day of the year
    for (let dayOfYear = 0; dayOfYear < totalDays; dayOfYear++) {
        const currentDate = new Date(year, 0, 1 + dayOfYear);
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        
        if (currentDate <= now) {
            // Past days - use varied levels for visual interest
            // Days closer to today have higher intensity
            const daysAgo = Math.ceil((now - currentDate) / (1000 * 60 * 60 * 24));
            let level;
            
            if (daysAgo < 30) {
                level = 4; // Recent - brightest
            } else if (daysAgo < 90) {
                level = 3;
            } else if (daysAgo < 180) {
                level = 2;
            } else {
                level = 1; // Long ago - dimmest
            }
            
            cell.setAttribute('data-level', level);
        } else {
            // Future days - empty/grayed
            cell.setAttribute('data-level', '0');
            cell.classList.add('future');
        }
        
        // Tooltip with actual date
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        cell.title = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${year}`;
        
        grid.appendChild(cell);
    }
    
    // Fill remaining cells to complete the grid (optional, for visual balance)
    const totalCells = grid.children.length;
    const cellsNeeded = Math.ceil(totalCells / 7) * 7;
    const remainingCells = cellsNeeded - totalCells;
    
    for (let i = 0; i < remainingCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell empty';
        cell.setAttribute('data-level', '0');
        cell.style.opacity = '0.1';
        grid.appendChild(cell);
    }
}

// Check and Display Milestones
function checkMilestones() {
    const timeData = calculateTimeRemaining();
    const progress = Math.floor(timeData.progressPercentage);
    const milestones = [25, 50, 75, 90];
    
    milestones.forEach(milestone => {
        if (progress >= milestone && !milestoneShown[milestone]) {
            showMilestoneNotification(milestone);
            milestoneShown[milestone] = true;
            localStorage.setItem(`milestone_${milestone}`, 'shown');
        }
    });
}

// Show Milestone Notification
function showMilestoneNotification(percentage) {
    const notification = document.getElementById('milestoneNotification');
    const text = notification.querySelector('.milestone-text');
    
    text.textContent = `${percentage}% of the year completed! Keep going!`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Load saved settings on startup
window.addEventListener('load', () => {
    // Load theme
    const savedTheme = storage.get('selectedTheme', 'dark');
    document.getElementById('themeSelector').value = savedTheme;
    changeTheme(savedTheme);
    
    // Load view mode
    const savedViewMode = storage.get('viewMode', 'detailed');
    document.getElementById('viewMode').value = savedViewMode;
    changeViewMode(savedViewMode);
    
    // Load progress style
    const savedProgressStyle = storage.get('progressStyle', 'bar');
    document.getElementById('progressStyle').value = savedProgressStyle;
    changeProgressStyle(savedProgressStyle);
    
    // Load language
    const savedLanguage = storage.get('language', 'en');
    document.getElementById('languageSelector').value = savedLanguage;
    changeLanguage(savedLanguage);
    
    // Load font
    const savedFont = storage.get('selectedFont', 'sf-mono');
    document.getElementById('fontSelector').value = savedFont;
    changeFont(savedFont);
    
    // Load particles setting
    const savedParticles = storage.getBoolean('particlesEnabled', false);
    document.getElementById('particlesToggle').checked = savedParticles;
    toggleParticles(savedParticles);
    
    // Load quotes setting
    const savedQuotes = storage.getBoolean('quotesEnabled', true);
    document.getElementById('quotesToggle').checked = savedQuotes;
    toggleQuotes(savedQuotes);
    
    // Load holidays setting
    const savedHolidays = storage.getBoolean('holidaysEnabled', true);
    document.getElementById('holidaysToggle').checked = savedHolidays;
    toggleHolidays(savedHolidays);
    
    // Load milestone states
    [25, 50, 75, 90].forEach(milestone => {
        if (storage.get(`milestone_${milestone}`) === 'shown') {
            milestoneShown[milestone] = true;
        }
    });
});
