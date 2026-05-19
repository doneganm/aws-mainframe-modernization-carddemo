/**
 * CardDemo Modern GUI - Main Application
 * Application initialization and setup
 */

// Application state
const App = {
    version: '1.0.0',
    initialized: false,

    /**
     * Initialize the application
     */
    init() {
        if (this.initialized) {
            console.warn('App already initialized');
            return;
        }

        console.log(`CardDemo Modern GUI v${this.version}`);
        console.log('Initializing application...');

        // Initialize components
        Toast.init();

        // Initialize router
        Router.init();

        // Setup global error handler
        this.setupErrorHandler();

        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();

        this.initialized = true;
        console.log('Application initialized successfully');
    },

    /**
     * Setup global error handler
     */
    setupErrorHandler() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            Toast.error('An unexpected error occurred. Please try again.');
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            Toast.error('An unexpected error occurred. Please try again.');
        });
    },

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for global search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('global-search');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Escape to close modals/dropdowns
            if (e.key === 'Escape') {
                // Close user dropdown
                const userDropdown = document.getElementById('user-dropdown');
                if (userDropdown) {
                    userDropdown.classList.remove('show');
                }

                // Close sidebar on mobile
                const sidebar = document.getElementById('sidebar');
                if (sidebar && window.innerWidth < 1056) {
                    sidebar.classList.remove('open');
                }
            }
        });
    },

    /**
     * Show loading overlay
     */
    showLoading(message = 'Loading...') {
        const overlay = document.getElementById('loading-overlay');
        const text = overlay.querySelector('.loading-text');
        if (overlay) {
            if (text) text.textContent = message;
            overlay.style.display = 'flex';
        }
    },

    /**
     * Hide loading overlay
     */
    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Export for global access
window.App = App;

// Made with Bob
