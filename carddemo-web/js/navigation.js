// CardDemo - Navigation Module
// Handles keyboard navigation (F3, F7, F8, ENTER, ESC)

const Navigation = {
    currentScreen: null,
    screenHistory: [],
    keyHandlers: {},
    
    // Initialize navigation
    init() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    },
    
    // Handle key press
    handleKeyPress(event) {
        // Update session activity
        SessionManager.updateActivity();
        
        // Handle function keys
        switch(event.key) {
            case 'F3':
                event.preventDefault();
                this.handleF3();
                break;
            case 'F7':
                event.preventDefault();
                this.handleF7();
                break;
            case 'F8':
                event.preventDefault();
                this.handleF8();
                break;
            case 'Enter':
                // Let the screen handle Enter key
                if (this.keyHandlers.enter) {
                    event.preventDefault();
                    this.keyHandlers.enter();
                }
                break;
            case 'Escape':
                event.preventDefault();
                this.handleF3(); // ESC acts like F3
                break;
        }
    },
    
    // Register key handler for current screen
    registerKeyHandler(key, handler) {
        this.keyHandlers[key] = handler;
    },
    
    // Clear key handlers
    clearKeyHandlers() {
        this.keyHandlers = {};
    },
    
    // Handle F3 (Exit/Back)
    handleF3() {
        if (this.keyHandlers.f3) {
            this.keyHandlers.f3();
        } else {
            this.goBack();
        }
    },
    
    // Handle F7 (Page Backward)
    handleF7() {
        if (this.keyHandlers.f7) {
            this.keyHandlers.f7();
        }
    },
    
    // Handle F8 (Page Forward)
    handleF8() {
        if (this.keyHandlers.f8) {
            this.keyHandlers.f8();
        }
    },
    
    // Navigate to screen
    navigateTo(screenName, data = {}) {
        // Save current screen to history
        if (this.currentScreen) {
            this.screenHistory.push({
                screen: this.currentScreen,
                data: SessionManager.getData('screenData') || {}
            });
        }
        
        // Clear previous key handlers
        this.clearKeyHandlers();
        
        // Set current screen
        this.currentScreen = screenName;
        
        // Save screen data
        SessionManager.setData('screenData', data);
        
        // Render the screen
        ScreenManager.render(screenName, data);
    },
    
    // Go back to previous screen
    goBack() {
        if (this.screenHistory.length > 0) {
            const previous = this.screenHistory.pop();
            this.currentScreen = previous.screen;
            
            // Clear key handlers
            this.clearKeyHandlers();
            
            // Restore screen data
            SessionManager.setData('screenData', previous.data);
            
            // Render the previous screen
            ScreenManager.render(previous.screen, previous.data);
        } else {
            // No history, go to appropriate menu
            if (SessionManager.isAuthenticated()) {
                if (SessionManager.isAdmin()) {
                    this.navigateTo('main-menu');
                } else {
                    this.navigateTo('main-menu');
                }
            } else {
                this.navigateTo('login');
            }
        }
    },
    
    // Clear history
    clearHistory() {
        this.screenHistory = [];
    },
    
    // Go to main menu
    goToMainMenu() {
        this.clearHistory();
        this.navigateTo('main-menu');
    },
    
    // Go to admin menu
    goToAdminMenu() {
        this.navigateTo('admin-menu');
    },
    
    // Logout and return to login
    logout() {
        SessionManager.logout();
        this.clearHistory();
        this.navigateTo('login');
    },
    
    // Show error message on current screen
    showError(message) {
        const errorElement = document.getElementById('error-msg');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    },
    
    // Clear error message
    clearError() {
        const errorElement = document.getElementById('error-msg');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    },
    
    // Show info message
    showInfo(message) {
        const infoElement = document.getElementById('info-msg');
        if (infoElement) {
            infoElement.textContent = message;
            infoElement.style.display = 'block';
        }
    },
    
    // Clear info message
    clearInfo() {
        const infoElement = document.getElementById('info-msg');
        if (infoElement) {
            infoElement.textContent = '';
            infoElement.style.display = 'none';
        }
    },
    
    // Focus on first input field
    focusFirstInput() {
        setTimeout(() => {
            const firstInput = document.querySelector('input:not([type="hidden"]):not([disabled])');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    },
    
    // Get current screen name
    getCurrentScreen() {
        return this.currentScreen;
    },
    
    // Check if can go back
    canGoBack() {
        return this.screenHistory.length > 0;
    }
};

// Initialize navigation on load
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
});

// Made with Bob
