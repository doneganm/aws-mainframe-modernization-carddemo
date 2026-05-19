// CardDemo - Session Manager
// Handles user authentication and session state

const SessionManager = {
    currentUser: null,
    sessionData: {},
    
    // Initialize session
    init() {
        const savedSession = localStorage.getItem('carddemo_session');
        if (savedSession) {
            const session = JSON.parse(savedSession);
            // Check if session is still valid (24 hours)
            const sessionAge = Date.now() - session.timestamp;
            if (sessionAge < 24 * 60 * 60 * 1000) {
                this.currentUser = session.user;
                this.sessionData = session.data || {};
                return true;
            } else {
                this.logout();
            }
        }
        return false;
    },
    
    // Authenticate user
    authenticate(userId, password) {
        const user = DataGenerator.getUser(userId);
        
        if (user && user.password === password) {
            this.currentUser = {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.userType,
                isAdmin: user.userType === 'A'
            };
            
            this.sessionData = {
                loginTime: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            };
            
            this.saveSession();
            return { success: true, user: this.currentUser };
        }
        
        return { success: false, message: 'Invalid User ID or Password' };
    },
    
    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    },
    
    // Check if user is admin
    isAdmin() {
        return this.currentUser && this.currentUser.isAdmin;
    },
    
    // Get current user
    getCurrentUser() {
        return this.currentUser;
    },
    
    // Update last activity
    updateActivity() {
        if (this.currentUser) {
            this.sessionData.lastActivity = new Date().toISOString();
            this.saveSession();
        }
    },
    
    // Save session to localStorage
    saveSession() {
        if (this.currentUser) {
            const session = {
                user: this.currentUser,
                data: this.sessionData,
                timestamp: Date.now()
            };
            localStorage.setItem('carddemo_session', JSON.stringify(session));
        }
    },
    
    // Set session data
    setData(key, value) {
        this.sessionData[key] = value;
        this.saveSession();
    },
    
    // Get session data
    getData(key) {
        return this.sessionData[key];
    },
    
    // Clear session data
    clearData(key) {
        if (key) {
            delete this.sessionData[key];
        } else {
            this.sessionData = {};
        }
        this.saveSession();
    },
    
    // Logout
    logout() {
        this.currentUser = null;
        this.sessionData = {};
        localStorage.removeItem('carddemo_session');
    },
    
    // Get formatted date/time for display
    getFormattedDate() {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        return `${month}/${day}/${year}`;
    },
    
    getFormattedTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
};

// Initialize session on load
SessionManager.init();

// Made with Bob
