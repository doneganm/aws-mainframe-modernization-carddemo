// CardDemo - Main Menu Screen (COMEN01C)
// Main menu for regular and admin users

const MainMenuScreen = {
    render() {
        const user = SessionManager.getCurrentUser();
        const isAdmin = SessionManager.isAdmin();
        
        // Define menu options based on user type
        const menuOptions = [
            { num: 1, text: 'View Account', screen: 'account-view' },
            { num: 2, text: 'List Credit Cards', screen: 'card-list' },
            { num: 3, text: 'View Transactions', screen: 'transaction-list' },
            { num: 4, text: 'Add Transaction', screen: 'transaction-add' },
            { num: 5, text: 'Bill Payment', screen: 'bill-payment' },
            { num: 6, text: 'Transaction Reports', screen: 'reports' }
        ];
        
        if (isAdmin) {
            menuOptions.push({ num: 7, text: 'Admin Menu', screen: 'admin-menu' });
        }
        
        // Build menu options HTML
        let optionsHtml = '';
        menuOptions.forEach(option => {
            const paddedNum = String(option.num).padStart(2, ' ');
            optionsHtml += `<div class="menu-option blue">${paddedNum}. ${option.text}</div>`;
        });
        
        // Pad remaining options
        for (let i = menuOptions.length; i < 12; i++) {
            optionsHtml += `<div class="menu-option blue">&nbsp;</div>`;
        }
        
        return `
            <div class="screen" data-screen="main-menu">
                <div class="screen-header">
                    <div class="header-line">
                        <div>
                            <span class="label blue">Tran: </span>
                            <span class="value blue">CM00</span>
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
                            <span class="value blue">COMEN01C</span>
                        </div>
                        <span class="title yellow">Main Menu - Admin User</span>
                        <div>
                            <span class="label blue">Time: </span>
                            <span class="value blue">${SessionManager.getFormattedTime()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="screen-body">
                    <h2 class="screen-title neutral bright">Main Menu</h2>
                    
                    <div class="menu-options">
                        ${optionsHtml}
                    </div>
                    
                    <div class="input-group menu-selection">
                        <label class="turquoise bright">Please select an option :</label>
                        <input type="text" id="menu-option" class="input-field green underline" maxlength="2" autocomplete="off">
                    </div>
                </div>
                
                <div class="screen-footer">
                    <div class="error-message red" id="error-msg"></div>
                    <div class="function-keys yellow">ENTER=Continue  F3=Exit</div>
                </div>
            </div>
        `;
    },
    
    init() {
        // Store menu options for validation
        const isAdmin = SessionManager.isAdmin();
        const maxOption = isAdmin ? 7 : 6;
        
        // Register key handlers
        Navigation.registerKeyHandler('enter', () => this.handleSelection(maxOption));
        Navigation.registerKeyHandler('f3', () => Navigation.logout());
        
        // Focus on option input
        Navigation.focusFirstInput();
        
        // Add event listener for Enter key on input
        const optionInput = document.getElementById('menu-option');
        if (optionInput) {
            optionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSelection(maxOption);
                }
            });
        }
    },
    
    handleSelection(maxOption) {
        Navigation.clearError();
        
        const option = document.getElementById('menu-option').value.trim();
        
        // Validate option
        const validation = Validation.validateMenuOption(option, maxOption);
        if (!validation.valid) {
            Navigation.showError(validation.message);
            document.getElementById('menu-option').focus();
            return;
        }
        
        // Clear input
        document.getElementById('menu-option').value = '';
        
        // Navigate based on selection
        const selectedOption = validation.value;
        
        switch(selectedOption) {
            case 1:
                Navigation.navigateTo('account-view');
                break;
            case 2:
                Navigation.navigateTo('card-list');
                break;
            case 3:
                Navigation.navigateTo('transaction-list');
                break;
            case 4:
                Navigation.navigateTo('transaction-add');
                break;
            case 5:
                Navigation.navigateTo('bill-payment');
                break;
            case 6:
                Navigation.navigateTo('reports');
                break;
            case 7:
                if (SessionManager.isAdmin()) {
                    Navigation.navigateTo('admin-menu');
                } else {
                    Navigation.showError('Invalid option');
                }
                break;
            default:
                Navigation.showError('Invalid option');
        }
    }
};

// Made with Bob
