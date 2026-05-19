// CardDemo - Login Screen (COSGN00C)
// Signon screen for authentication

const LoginScreen = {
    render() {
        return `
            <div class="screen" data-screen="login">
                <div class="screen-header">
                    <div class="header-line">
                        <div>
                            <span class="label blue">Tran: </span>
                            <span class="value blue">CC00</span>
                        </div>
                        <span class="title yellow">CardDemo - Credit Card Management</span>
                        <div>
                            <span class="label blue">Date: </span>
                            <span class="value blue">${SessionManager.getFormattedDate()}</span>
                        </div>
                    </div>
                    <div class="header-line">
                        <div>
                            <span class="label blue">Prog: </span>
                            <span class="value blue">COSGN00C</span>
                        </div>
                        <span class="title yellow">Signon Screen</span>
                        <div>
                            <span class="label blue">Time: </span>
                            <span class="value blue">${SessionManager.getFormattedTime()}</span>
                        </div>
                    </div>
                    <div class="header-line">
                        <div>
                            <span class="label blue">AppID: </span>
                            <span class="value blue">CARDDEMO</span>
                        </div>
                        <span></span>
                        <div>
                            <span class="label blue">SysID: </span>
                            <span class="value blue">AWS-M2</span>
                        </div>
                    </div>
                </div>
                
                <div class="screen-body">
                    <div class="info-line neutral">This is a Credit Card Demo Application for Mainframe Modernization</div>
                    
                    <div class="dollar-bill">
                        <div class="bill-line blue">+========================================+</div>
                        <div class="bill-line blue">|%%%%%%%  NATIONAL RESERVE NOTE  %%%%%%%%|</div>
                        <div class="bill-line blue">|%(1)  THE UNITED STATES OF KICSLAND (1)%|</div>
                        <div class="bill-line blue">|%$$              ___       ********  $$%|</div>
                        <div class="bill-line blue">|%$    {x}       (o o)                 $%|</div>
                        <div class="bill-line blue">|%$     ******  (  V  )      O N E     $%|</div>
                        <div class="bill-line blue">|%(1)          ---m-m---             (1)%|</div>
                        <div class="bill-line blue">|%%~~~~~~~~~~~ ONE DOLLAR ~~~~~~~~~~~~~%%|</div>
                        <div class="bill-line blue">+========================================+</div>
                    </div>
                    
                    <div class="instruction turquoise">Type your User ID and Password, then press ENTER:</div>
                    
                    <div class="input-group">
                        <label class="turquoise">User ID     :</label>
                        <input type="text" id="user-id" class="input-field green" maxlength="8" autocomplete="off" style="text-transform: uppercase;">
                        <span class="hint blue">(8 Char)</span>
                    </div>
                    
                    <div class="input-group">
                        <label class="turquoise">Password    :</label>
                        <input type="password" id="password" class="input-field green" maxlength="8" autocomplete="off">
                        <span class="hint blue">(8 Char)</span>
                    </div>
                </div>
                
                <div class="screen-footer">
                    <div class="error-message red" id="error-msg"></div>
                    <div class="function-keys yellow">ENTER=Sign-on  F3=Exit</div>
                </div>
            </div>
        `;
    },
    
    init() {
        // Register key handlers
        Navigation.registerKeyHandler('enter', () => this.handleLogin());
        Navigation.registerKeyHandler('f3', () => this.handleExit());
        
        // Focus on user ID field
        Navigation.focusFirstInput();
        
        // Add event listeners
        const userIdInput = document.getElementById('user-id');
        const passwordInput = document.getElementById('password');
        
        if (userIdInput) {
            userIdInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    passwordInput.focus();
                }
            });
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleLogin();
                }
            });
        }
    },
    
    handleLogin() {
        Navigation.clearError();
        
        const userId = document.getElementById('user-id').value.trim().toUpperCase();
        const password = document.getElementById('password').value;
        
        // Validate user ID
        const userIdValidation = Validation.validateUserId(userId);
        if (!userIdValidation.valid) {
            Navigation.showError(userIdValidation.message);
            document.getElementById('user-id').focus();
            return;
        }
        
        // Validate password
        const passwordValidation = Validation.validatePassword(password);
        if (!passwordValidation.valid) {
            Navigation.showError(passwordValidation.message);
            document.getElementById('password').focus();
            return;
        }
        
        // Authenticate
        const result = SessionManager.authenticate(userId, password);
        
        if (result.success) {
            // Clear form
            document.getElementById('user-id').value = '';
            document.getElementById('password').value = '';
            
            // Navigate to main menu
            Navigation.navigateTo('main-menu');
        } else {
            Navigation.showError(result.message);
            document.getElementById('user-id').value = '';
            document.getElementById('password').value = '';
            document.getElementById('user-id').focus();
        }
    },
    
    handleExit() {
        // Show thank you message and clear session
        const container = document.getElementById('screen-container');
        container.innerHTML = `
            <div class="screen">
                <div class="screen-body" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                    <div class="info-line neutral bright" style="font-size: 1.2em;">
                        Thank you for using CardDemo Application
                    </div>
                </div>
            </div>
        `;
        
        // Clear session after a delay
        setTimeout(() => {
            SessionManager.logout();
            Navigation.clearHistory();
            Navigation.navigateTo('login');
        }, 2000);
    }
};

// Made with Bob
