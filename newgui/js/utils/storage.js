/**
 * Local Storage Management
 * Handles session and data persistence
 */

const Storage = {
    /**
     * Set item in localStorage
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    /**
     * Get item from localStorage
     */
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage get error:', e);
            return null;
        }
    },

    /**
     * Remove item from localStorage
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },

    /**
     * Clear all localStorage
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    },

    /**
     * Session management
     */
    session: {
        set(data) {
            return Storage.set('carddemo_session', {
                ...data,
                timestamp: Date.now()
            });
        },

        get() {
            const session = Storage.get('carddemo_session');
            if (!session) return null;

            // Check if session is expired (30 minutes)
            const thirtyMinutes = 30 * 60 * 1000;
            if (Date.now() - session.timestamp > thirtyMinutes) {
                Storage.session.clear();
                return null;
            }

            return session;
        },

        clear() {
            return Storage.remove('carddemo_session');
        },

        isAuthenticated() {
            return Storage.session.get() !== null;
        }
    }
};

// Made with Bob
