// CardDemo - Application Entry Point
// Initializes the application and handles startup

const App = {
    init() {
        console.log('CardDemo Application Starting...');
        
        // Check if user is already authenticated
        if (SessionManager.isAuthenticated()) {
            console.log('User already authenticated:', SessionManager.getCurrentUser().userId);
            Navigation.navigateTo('main-menu');
        } else {
            console.log('No active session, showing login screen');
            Navigation.navigateTo('login');
        }
        
        // Log data statistics
        console.log('Data loaded:');
        console.log('- Users:', DataGenerator.getUsers().length);
        console.log('- Customers:', DataGenerator.customers.length);
        console.log('- Accounts:', DataGenerator.accounts.length);
        console.log('- Cards:', DataGenerator.cards.length);
        console.log('- Transactions:', DataGenerator.transactions.length);
        
        // Display available test credentials
        console.log('\n=== Test Credentials ===');
        console.log('Admin User: ADMIN001 / PASSWORD');
        console.log('Regular User: USER0001 / PASSWORD');
        console.log('Regular User: USER0002 / PASSWORD');
        console.log('========================\n');
    }
};

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible, update activity
        SessionManager.updateActivity();
    }
});

// Handle beforeunload to save session
window.addEventListener('beforeunload', () => {
    if (SessionManager.isAuthenticated()) {
        SessionManager.saveSession();
    }
});

// Made with Bob
