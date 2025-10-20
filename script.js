// Get DOM elements - Cache references for better performance
let currentYearElement;
let daysRemainingElement;
let hoursElement;
let minutesElement;
let secondsElement;
let progressBarElement;
let progressPercentageElement;
let currentDateTimeElement;

// Initialize DOM references
function initDOMReferences() {
    currentYearElement = document.getElementById('currentYear');
    daysRemainingElement = document.querySelector('#daysRemaining .number');
    hoursElement = document.getElementById('hours');
    minutesElement = document.getElementById('minutes');
    secondsElement = document.getElementById('seconds');
    progressBarElement = document.getElementById('progressBar');
    progressPercentageElement = document.getElementById('progressPercentage');
    currentDateTimeElement = document.getElementById('currentDateTime');
}

// Function to pad numbers with leading zeros
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// Get current language for date formatting
function getCurrentLanguage() {
    return window.currentLanguage || 'en';
}

// Language to locale mapping
const localeMap = {
    'en': 'en-US',
    'es': 'es-ES',
    'fr': 'fr-FR',
    'de': 'de-DE',
    'ja': 'ja-JP'
};

// Function to format date and time
function formatDateTime(date) {
    const lang = getCurrentLanguage();
    const locale = localeMap[lang] || 'en-US';
    
    try {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return date.toLocaleDateString(locale, options).toUpperCase();
    } catch (error) {
        // Fallback to simple format if locale fails
        return date.toUTCString().toUpperCase();
    }
}

// Function to calculate time remaining in the year
function calculateTimeRemaining() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const endOfYear = new Date(nextYear, 0, 1); // January 1st of next year
    const startOfYear = new Date(currentYear, 0, 1); // January 1st of current year
    
    // Calculate time difference
    const timeDiff = endOfYear - now;
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Calculate year progress percentage
    const yearDuration = endOfYear - startOfYear;
    const elapsed = now - startOfYear;
    const progressPercentage = ((elapsed / yearDuration) * 100).toFixed(2);
    
    return {
        year: currentYear,
        days,
        hours,
        minutes,
        seconds,
        progressPercentage,
        currentDateTime: formatDateTime(now)
    };
}

// Function to update the display
function updateDisplay() {
    const timeData = calculateTimeRemaining();
    
    // Update year
    if (currentYearElement) {
        currentYearElement.textContent = timeData.year;
    }
    
    // Update remaining time with smooth transitions
    if (daysRemainingElement) {
        if (daysRemainingElement.textContent !== timeData.days.toString()) {
            daysRemainingElement.style.transform = 'scale(0.95)';
            setTimeout(() => {
                daysRemainingElement.textContent = timeData.days;
                daysRemainingElement.style.transform = 'scale(1)';
            }, 100);
        }
    }
    
    // Update hours, minutes, seconds
    if (hoursElement) hoursElement.textContent = padZero(timeData.hours);
    if (minutesElement) minutesElement.textContent = padZero(timeData.minutes);
    if (secondsElement) secondsElement.textContent = padZero(timeData.seconds);
    
    // Update progress bar
    if (progressBarElement) {
        progressBarElement.style.width = `${timeData.progressPercentage}%`;
    }
    if (progressPercentageElement) {
        progressPercentageElement.textContent = timeData.progressPercentage;
    }
    
    // Update current date and time
    if (currentDateTimeElement) {
        currentDateTimeElement.textContent = timeData.currentDateTime;
    }
    
    // Update circular progress if visible
    if (typeof updateCircularProgress === 'function') {
        updateCircularProgress(timeData.progressPercentage);
    }
}

// Add subtle number change animation
function addNumberChangeAnimation(element, newValue) {
    const currentValue = element.textContent;
    if (currentValue !== newValue) {
        element.style.opacity = '0.7';
        setTimeout(() => {
            element.textContent = newValue;
            element.style.opacity = '1';
        }, 150);
    }
}

// Initialize and start the clock
function initClock() {
    // Initialize DOM references first
    initDOMReferences();
    
    // Ensure the days element exists and set initial value
    if (daysRemainingElement) {
        const timeData = calculateTimeRemaining();
        daysRemainingElement.textContent = timeData.days;
        daysRemainingElement.style.color = '#ffffff';
        daysRemainingElement.style.opacity = '1';
    }
    
    // Initial update
    updateDisplay();
    
    // Update every second
    setInterval(updateDisplay, 1000);
    
    // Add subtle animations to time units on load
    const timeUnits = document.querySelectorAll('.time-unit');
    timeUnits.forEach((unit, index) => {
        unit.style.animation = `fadeIn 0.5s ease-out ${0.1 * index}s both`;
    });
}

// Add smooth transitions for all value changes
document.querySelectorAll('.value').forEach(element => {
    element.style.transition = 'all 0.3s ease';
});

// Start the clock when DOM is loaded
document.addEventListener('DOMContentLoaded', initClock);

// Add a subtle glow effect on hover for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const bigNumber = document.querySelector('.big-number');
    
    bigNumber.addEventListener('mouseenter', () => {
        bigNumber.style.filter = 'brightness(1.2)';
    });
    
    bigNumber.addEventListener('mouseleave', () => {
        bigNumber.style.filter = 'brightness(1)';
    });
});

// Optional: Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'F' for fullscreen
    if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    // Press 'R' to refresh the display
    if (e.key === 'r' || e.key === 'R') {
        updateDisplay();
    }
});

// Add visibility change handler to pause/resume when tab is not visible
let updateInterval;
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateDisplay();
        // Ensure particles are running if enabled
        if (window.particlesEnabled && typeof resumeParticles === 'function') {
            resumeParticles();
        }
    } else {
        // Pause particles when tab is hidden
        if (typeof pauseParticles === 'function') {
            pauseParticles();
        }
    }
});
