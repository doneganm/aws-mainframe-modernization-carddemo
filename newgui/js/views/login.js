/**
 * Login View
 * Handles user authentication
 */

const LoginView = {
    render() {
        return `
            <div class="login-container">
                <div class="login-card card">
                    <div class="login-header">
                        <h1 class="login-title">CardDemo</h1>
                        <p class="login-subtitle">Credit Card Management System</p>
                    </div>
                    <form id="login-form" class="login-form">
                        <div class="form-group">
                            <label for="username" class="form-label">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                class="form-input" 
                                placeholder="Enter your username"
                                autocomplete="username"
                                required
                                autofocus
                            >
                        </div>
                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                class="form-input" 
                                placeholder="Enter your password"
                                autocomplete="current-password"
                                required
                            >
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary w-full">
                                Sign In
                            </button>
                        </div>
                        <div id="login-error" class="form-error" style="display: none;"></div>
                    </form>
                    <div class="login-footer">
                        <p class="text-sm text-secondary">Demo Credentials:</p>
                        <p class="text-sm text-secondary">Username: <strong>user</strong> | Password: <strong>password</strong></p>
                        <p class="text-sm text-secondary">Admin: <strong>admin</strong> | Password: <strong>password</strong></p>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        const form = document.getElementById('login-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Add CSS for login page
        this.addLoginStyles();
    },

    handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('login-error');

        // Simple authentication
        const validUsers = {
            'user': { password: 'password', type: 'user', name: 'User', id: 'USER0001' },
            'admin': { password: 'password', type: 'admin', name: 'Admin', id: 'ADMIN001' }
        };

        if (validUsers[username] && validUsers[username].password === password) {
            const user = validUsers[username];
            
            // Store session
            Storage.session.set({
                userId: user.id,
                username: username,
                name: user.name,
                type: user.type,
                isAdmin: user.type === 'admin'
            });

            // Show success message
            Toast.success(`Welcome, ${user.name}!`);

            // Navigate to dashboard
            setTimeout(() => {
                Router.navigate('dashboard');
            }, 500);
        } else {
            // Show error
            errorDiv.textContent = 'Invalid username or password';
            errorDiv.style.display = 'block';
            
            // Clear password field
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    },

    addLoginStyles() {
        // Check if styles already added
        if (document.getElementById('login-styles')) return;

        const style = document.createElement('style');
        style.id = 'login-styles';
        style.textContent = `
            .login-container {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: calc(100vh - var(--header-height));
                padding: var(--spacing-06);
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }

            .login-card {
                width: 100%;
                max-width: 400px;
                padding: var(--spacing-08);
            }

            .login-header {
                text-align: center;
                margin-bottom: var(--spacing-07);
            }

            .login-title {
                font-size: var(--font-size-09);
                font-weight: var(--font-weight-semibold);
                color: var(--color-primary);
                margin-bottom: var(--spacing-03);
            }

            .login-subtitle {
                font-size: var(--font-size-03);
                color: var(--color-text-secondary);
                margin: 0;
            }

            .login-form {
                margin-bottom: var(--spacing-06);
            }

            .login-footer {
                text-align: center;
                padding-top: var(--spacing-05);
                border-top: 1px solid var(--color-border-subtle);
            }

            .login-footer p {
                margin-bottom: var(--spacing-02);
            }

            .w-full {
                width: 100%;
            }
        `;
        document.head.appendChild(style);
    }
};

// Made with Bob
