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

// Smooth number transition helper
function animateNumberChange(element, newValue, isBigNumber = false) {
    if (!element) return;
    
    const currentValue = element.textContent.trim();
    const newValueStr = newValue.toString();
    
    if (currentValue === newValueStr) return;
    
    // Add animation class
    element.style.opacity = '0.7';
    element.style.transform = isBigNumber ? 'scale(0.95)' : 'translateY(5px)';
    
    // Use requestAnimationFrame for smooth transition
    requestAnimationFrame(() => {
        setTimeout(() => {
            element.textContent = newValueStr;
            element.style.opacity = '1';
            element.style.transform = isBigNumber ? 'scale(1)' : 'translateY(0)';
        }, 150);
    });
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
        animateNumberChange(daysRemainingElement, timeData.days, true);
    }
    
    // Update hours, minutes, seconds with smooth transitions
    animateNumberChange(hoursElement, padZero(timeData.hours));
    animateNumberChange(minutesElement, padZero(timeData.minutes));
    animateNumberChange(secondsElement, padZero(timeData.seconds));
    
    // Update progress bar with smooth animation
    if (progressBarElement) {
        const currentWidth = parseFloat(progressBarElement.style.width) || 0;
        const newWidth = parseFloat(timeData.progressPercentage);
        
        if (Math.abs(currentWidth - newWidth) > 0.01) {
            progressBarElement.style.width = `${timeData.progressPercentage}%`;
        }
    }
    
    // Update progress percentage with animation
    if (progressPercentageElement) {
        const currentPercent = parseFloat(progressPercentageElement.textContent) || 0;
        const newPercent = parseFloat(timeData.progressPercentage);
        
        if (Math.abs(currentPercent - newPercent) > 0.01) {
            animateNumberChange(progressPercentageElement, timeData.progressPercentage);
        }
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

// Enhanced page load animation
function addPageLoadAnimations() {
    const elements = [
        { selector: '.year-label', delay: 0 },
        { selector: '.big-number', delay: 0.2 },
        { selector: '.time-details', delay: 0.4 },
        { selector: '.progress-section', delay: 0.6 },
        { selector: '.current-time', delay: 0.8 }
    ];
    
    elements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay * 1000);
        }
    });
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
    
    // Add page load animations
    addPageLoadAnimations();
    
    // Initial update
    updateDisplay();
    
    // Update every second with precise timing
    setInterval(() => {
        updateDisplay();
    }, 1000);
    
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

// Hide loading screen and start the clock when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after a brief delay
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 300);
    }
    
    // Initialize clock
    initClock();
});

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
