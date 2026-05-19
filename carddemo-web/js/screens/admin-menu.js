// CardDemo - Admin Menu Screen (COADM01C)

const AdminMenuScreen = {
    render() {
        const user = SessionManager.getCurrentUser();
        
        return `
            <div class="screen" data-screen="admin-menu">
                <div class="screen-header">
                    <div class="header-line">
                        <div>
                            <span class="label blue">Tran: </span>
                            <span class="value blue">CA00</span>
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
                            <span class="value blue">COADM01C</span>
                        </div>
                        <span class="title yellow">Admin Menu - Admin User</span>
                        <div>
                            <span class="label blue">Time: </span>
                            <span class="value blue">${SessionManager.getFormattedTime()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="screen-body">
                    <h2 class="screen-title neutral bright">Admin Menu</h2>
                    
                    <div class="menu-options">
                        <div class="menu-option blue">01. List Users</div>
                        <div class="menu-option blue">02. Add User</div>
                        <div class="menu-option blue">03. Update User</div>
                        <div class="menu-option blue">04. Delete User</div>
                        <div class="menu-option blue">&nbsp;</div>
                        <div class="menu-option blue">&nbsp;</div>
                        <div class="menu-option blue">&nbsp;</div>
                        <div class="menu-option blue">&nbsp;</div>
                        <div class="menu-option blue">&nbsp;</div>
                        <div class="menu-option blue">&nbsp;</div>
                        <div class="menu-option blue">&nbsp;</div>
                        <div class="menu-option blue">&nbsp;</div>
                    </div>
                    
                    <div class="input-group menu-selection">
                        <label class="turquoise bright">Please select an option :</label>
                        <input type="text" id="menu-option" class="input-field green underline" maxlength="2" autocomplete="off">
                    </div>
                </div>
                
                <div class="screen-footer">
                    <div class="error-message red" id="error-msg"></div>
                    <div class="function-keys yellow">ENTER=Continue  F3=Back</div>
                </div>
            </div>
        `;
    },
    
    init() {
        Navigation.registerKeyHandler('enter', () => this.handleSelection());
        Navigation.registerKeyHandler('f3', () => Navigation.goBack());
        Navigation.focusFirstInput();
        
        const optionInput = document.getElementById('menu-option');
        if (optionInput) {
            optionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSelection();
                }
            });
        }
    },
    
    handleSelection() {
        Navigation.clearError();
        const option = document.getElementById('menu-option').value.trim();
        const validation = Validation.validateMenuOption(option, 4);
        
        if (!validation.valid) {
            Navigation.showError(validation.message);
            return;
        }
        
        document.getElementById('menu-option').value = '';
        
        switch(validation.value) {
            case 1: Navigation.navigateTo('user-list'); break;
            case 2: Navigation.navigateTo('user-add'); break;
            case 3: Navigation.navigateTo('user-update'); break;
            case 4: Navigation.navigateTo('user-delete'); break;
        }
    }
};

// Made with Bob
