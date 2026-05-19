// CardDemo - Screen Manager
// Coordinates screen rendering and transitions

const ScreenManager = {
    screens: {
        'login': LoginScreen,
        'main-menu': MainMenuScreen,
        'admin-menu': AdminMenuScreen,
        'account-view': AccountViewScreen,
        'account-update': AccountUpdateScreen,
        'card-list': CardListScreen,
        'card-detail': CardDetailScreen,
        'card-update': CardUpdateScreen,
        'transaction-list': TransactionListScreen,
        'transaction-detail': TransactionDetailScreen,
        'transaction-add': TransactionAddScreen,
        'bill-payment': BillPaymentScreen,
        'reports': ReportsScreen,
        'user-list': UserListScreen,
        'user-add': UserAddScreen,
        'user-update': UserUpdateScreen,
        'user-delete': UserDeleteScreen
    },
    
    // Render a screen
    render(screenName, data = {}) {
        const screen = this.screens[screenName];
        
        if (!screen) {
            console.error(`Screen not found: ${screenName}`);
            return;
        }
        
        // Get the container
        const container = document.getElementById('screen-container');
        if (!container) {
            console.error('Screen container not found');
            return;
        }
        
        // Render the screen HTML
        container.innerHTML = screen.render(data);
        
        // Initialize the screen
        if (screen.init) {
            screen.init(data);
        }
        
        // Update time every second
        this.startClock();
    },
    
    // Start clock update
    startClock() {
        // Clear any existing interval
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
        }
        
        // Update time every second
        this.clockInterval = setInterval(() => {
            const timeElement = document.querySelector('.header-line .value.blue:last-of-type');
            if (timeElement && timeElement.textContent.includes(':')) {
                timeElement.textContent = SessionManager.getFormattedTime();
            }
        }, 1000);
    },
    
    // Stop clock update
    stopClock() {
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
            this.clockInterval = null;
        }
    }
};

// Made with Bob
