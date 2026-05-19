// CardDemo - All Remaining Screen Implementations
// This file contains all screen implementations for the CardDemo application

// ============================================================================
// ACCOUNT VIEW SCREEN (COACTVWC)
// ============================================================================
const AccountViewScreen = {
    render(data) {
        const accountId = data.accountId || SessionManager.getData('selectedAccountId') || '';
        let accountHtml = '';
        let customerHtml = '';
        
        if (accountId) {
            const account = DataGenerator.getAccount(accountId);
            if (account) {
                const customer = DataGenerator.getCustomer(account.customerId);
                accountHtml = `
                    <div class="data-row">
                        <span class="data-label turquoise">Account Number :</span>
                        <span class="data-value green underline">${account.accountId}</span>
                        <span class="turquoise" style="margin-left: 5ch;">Active Y/N: </span>
                        <span class="green underline">${account.activeStatus}</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label turquoise">Opened:</span>
                        <span class="data-value green underline">${Validation.formatDate(account.openDate)}</span>
                        <span class="turquoise" style="margin-left: 5ch;">Credit Limit        :</span>
                        <span class="green underline">${Validation.formatAmount(account.creditLimit)}</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label turquoise">Expiry:</span>
                        <span class="data-value green underline">${Validation.formatDate(account.expirationDate)}</span>
                        <span class="turquoise" style="margin-left: 5ch;">Cash credit Limit   :</span>
                        <span class="green underline">${Validation.formatAmount(account.cashCreditLimit)}</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label turquoise">Reissue:</span>
                        <span class="data-value green underline">${Validation.formatDate(account.reissueDate)}</span>
                        <span class="turquoise" style="margin-left: 5ch;">Current Balance     :</span>
                        <span class="green underline">${Validation.formatAmount(account.currentBalance)}</span>
                    </div>
                    <div class="data-row">
                        <span class="turquoise" style="margin-left: 28ch;">Current Cycle Credit:</span>
                        <span class="green underline">${Validation.formatAmount(account.currentCycleCredit)}</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label turquoise">Account Group:</span>
                        <span class="data-value green underline">${account.groupId}</span>
                        <span class="turquoise" style="margin-left: 5ch;">Current Cycle Debit :</span>
                        <span class="green underline">${Validation.formatAmount(account.currentCycleDebit)}</span>
                    </div>
                `;
                
                if (customer) {
                    customerHtml = `
                        <h3 class="screen-title neutral">Customer Details</h3>
                        <div class="data-row">
                            <span class="data-label turquoise">Customer id  :</span>
                            <span class="data-value green underline">${customer.customerId}</span>
                            <span class="turquoise" style="margin-left: 10ch;">SSN:</span>
                            <span class="green underline">${customer.ssn}</span>
                        </div>
                        <div class="data-row">
                            <span class="data-label turquoise">Date of birth:</span>
                            <span class="data-value green underline">${Validation.formatDate(customer.dateOfBirth)}</span>
                            <span class="turquoise" style="margin-left: 10ch;">FICO Score:</span>
                            <span class="green underline">${customer.ficoScore}</span>
                        </div>
                        <div class="data-row">
                            <span class="turquoise">First Name: </span><span class="green underline">${customer.firstName}</span>
                            <span class="turquoise" style="margin-left: 2ch;">Middle: </span><span class="green underline">${customer.middleName}</span>
                            <span class="turquoise" style="margin-left: 2ch;">Last Name: </span><span class="green underline">${customer.lastName}</span>
                        </div>
                        <div class="data-row">
                            <span class="turquoise">Address: </span><span class="green underline">${customer.addressLine1}</span>
                            <span class="turquoise" style="margin-left: 2ch;">State: </span><span class="green underline">${customer.state}</span>
                        </div>
                        <div class="data-row">
                            <span class="green underline" style="margin-left: 9ch;">${customer.addressLine2}</span>
                            <span class="turquoise" style="margin-left: 2ch;">Zip: </span><span class="green underline">${customer.zipCode}</span>
                        </div>
                        <div class="data-row">
                            <span class="turquoise">City: </span><span class="green underline">${customer.city}</span>
                            <span class="turquoise" style="margin-left: 2ch;">Country: </span><span class="green underline">${customer.country}</span>
                        </div>
                        <div class="data-row">
                            <span class="turquoise">Phone 1: </span><span class="green underline">${customer.phone1}</span>
                            <span class="turquoise" style="margin-left: 2ch;">Gov ID: </span><span class="green underline">${customer.governmentId}</span>
                        </div>
                        <div class="data-row">
                            <span class="turquoise">Phone 2: </span><span class="green underline">${customer.phone2}</span>
                            <span class="turquoise" style="margin-left: 2ch;">EFT Account: </span><span class="green underline">${customer.eftAccountId}</span>
                        </div>
                    `;
                }
            }
        }
        
        return `
            <div class="screen" data-screen="account-view">
                <div class="screen-header">
                    <div class="header-line">
                        <div>
                            <span class="label blue">Tran: </span>
                            <span class="value blue">CAVW</span>
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
                            <span class="value blue">COACTVWC</span>
                        </div>
                        <span class="title yellow">View Account</span>
                        <div>
                            <span class="label blue">Time: </span>
                            <span class="value blue">${SessionManager.getFormattedTime()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="screen-body">
                    <h2 class="screen-title neutral">View Account</h2>
                    
                    <div class="input-group">
                        <label class="turquoise">Account Number :</label>
                        <input type="text" id="account-id" class="input-field green underline" maxlength="11" value="${accountId}" autocomplete="off">
                    </div>
                    
                    ${accountHtml}
                    ${customerHtml}
                </div>
                
                <div class="screen-footer">
                    <div class="error-message red" id="error-msg"></div>
                    <div class="function-keys yellow">ENTER=Search  F3=Back  F7=Up  F8=Down</div>
                </div>
            </div>
        `;
    },
    
    init(data) {
        Navigation.registerKeyHandler('enter', () => this.handleSearch());
        Navigation.registerKeyHandler('f3', () => Navigation.goBack());
        Navigation.registerKeyHandler('f7', () => this.scrollUp());
        Navigation.registerKeyHandler('f8', () => this.scrollDown());
        
        const accountInput = document.getElementById('account-id');
        if (accountInput && !accountInput.value) {
            accountInput.focus();
        }
    },
    
    scrollUp() {
        const body = document.querySelector('.screen-body');
        if (body) {
            body.scrollTop = Math.max(0, body.scrollTop - 100);
        }
    },
    
    scrollDown() {
        const body = document.querySelector('.screen-body');
        if (body) {
            body.scrollTop = body.scrollTop + 100;
        }
    },
    
    handleSearch() {
        const accountId = document.getElementById('account-id').value.trim();
        const validation = Validation.validateAccountNumber(accountId);
        
        if (!validation.valid) {
            Navigation.showError(validation.message);
            return;
        }
        
        const account = DataGenerator.getAccount(accountId);
        if (!account) {
            Navigation.showError('Account not found');
            return;
        }
        
        SessionManager.setData('selectedAccountId', accountId);
        Navigation.navigateTo('account-view', { accountId });
    }
};

// ============================================================================
// CARD LIST SCREEN (COCRDLIC)
// ============================================================================
const CardListScreen = {
    currentPage: 1,
    pageSize: 7,
    
    render(data) {
        const accountFilter = data.accountFilter || '';
        const cardFilter = data.cardFilter || '';
        this.currentPage = data.page || 1;
        
        let cards = DataGenerator.cards;
        if (accountFilter) {
            cards = cards.filter(c => c.accountId.includes(accountFilter));
        }
        if (cardFilter) {
            cards = cards.filter(c => c.cardNumber.includes(cardFilter));
        }
        
        const totalPages = Math.ceil(cards.length / this.pageSize);
        const startIdx = (this.currentPage - 1) * this.pageSize;
        const pageCards = cards.slice(startIdx, startIdx + this.pageSize);
        
        let cardsHtml = '';
        pageCards.forEach((card, idx) => {
            cardsHtml += `
                <div class="table-row">
                    <input type="text" id="sel-${idx}" class="select-field green underline" maxlength="1" value=" ">
                    <span class="blue">${card.accountId}</span>
                    <span class="blue" style="margin-left: 2ch;">${card.cardNumber}</span>
                    <span class="blue" style="margin-left: 2ch;">${card.activeStatus}</span>
                </div>
            `;
        });
        
        return `
            <div class="screen" data-screen="card-list">
                <div class="screen-header">
                    <div class="header-line">
                        <div>
                            <span class="label blue">Tran: </span>
                            <span class="value blue">CCLI</span>
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
                            <span class="value blue">COCRDLIC</span>
                        </div>
                        <span class="title yellow">List Credit Cards</span>
                        <div>
                            <span class="label blue">Time: </span>
                            <span class="value blue">${SessionManager.getFormattedTime()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="screen-body">
                    <h2 class="screen-title neutral">List Credit Cards <span style="float: right;">Page ${this.currentPage}</span></h2>
                    
                    <div class="input-group">
                        <label class="turquoise">Account Number    :</label>
                        <input type="text" id="account-filter" class="input-field green underline" maxlength="11" value="${accountFilter}" autocomplete="off">
                    </div>
                    <div class="input-group">
                        <label class="turquoise">Credit Card Number:</label>
                        <input type="text" id="card-filter" class="input-field green underline" maxlength="16" value="${cardFilter}" autocomplete="off">
                    </div>
                    
                    <div class="data-table">
                        <div class="table-header neutral">
                            <span>Select</span>
                            <span style="margin-left: 4ch;">Account Number</span>
                            <span style="margin-left: 8ch;">Card Number</span>
                            <span style="margin-left: 8ch;">Active</span>
                        </div>
                        <div class="table-separator neutral">------  ---------------  ----------------  --------</div>
                        ${cardsHtml}
                    </div>
                    
                    <div class="info-line neutral" style="margin-top: 1em;">Type 'S' to select a card for details</div>
                </div>
                
                <div class="screen-footer">
                    <div class="error-message red" id="error-msg"></div>
                    <div class="function-keys yellow">ENTER=Search  F3=Back  F7=Prev  F8=Next</div>
                </div>
            </div>
        `;
    },
    
    init(data) {
        Navigation.registerKeyHandler('enter', () => this.handleSearch());
        Navigation.registerKeyHandler('f3', () => Navigation.goBack());
        Navigation.registerKeyHandler('f7', () => this.prevPage());
        Navigation.registerKeyHandler('f8', () => this.nextPage());
        Navigation.focusFirstInput();
    },
    
    handleSearch() {
        const accountFilter = document.getElementById('account-filter').value.trim();
        const cardFilter = document.getElementById('card-filter').value.trim();
        Navigation.navigateTo('card-list', { accountFilter, cardFilter, page: 1 });
    },
    
    prevPage() {
        if (this.currentPage > 1) {
            const data = SessionManager.getData('screenData') || {};
            Navigation.navigateTo('card-list', { ...data, page: this.currentPage - 1 });
        }
    },
    
    nextPage() {
        const data = SessionManager.getData('screenData') || {};
        Navigation.navigateTo('card-list', { ...data, page: this.currentPage + 1 });
    }
};

// ============================================================================
// TRANSACTION LIST SCREEN (COTRN00C)
// ============================================================================
const TransactionListScreen = {
    currentPage: 1,
    pageSize: 10,
    
    render(data) {
        const searchId = data.searchId || '';
        this.currentPage = data.page || 1;
        
        let transactions = DataGenerator.transactions;
        if (searchId) {
            transactions = transactions.filter(t => t.transactionId.includes(searchId));
        }
        
        const totalPages = Math.ceil(transactions.length / this.pageSize);
        const startIdx = (this.currentPage - 1) * this.pageSize;
        const pageTransactions = transactions.slice(startIdx, startIdx + this.pageSize);
        
        let transHtml = '';
        pageTransactions.forEach((trans, idx) => {
            const date = new Date(trans.originalTimestamp);
            const dateStr = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;
            transHtml += `
                <div class="table-row">
                    <input type="text" id="sel-${idx}" class="select-field green underline" maxlength="1" value=" " data-trans-id="${trans.transactionId}">
                    <span class="blue">${trans.transactionId}</span>
                    <span class="blue" style="margin-left: 2ch;">${dateStr}</span>
                    <span class="blue" style="margin-left: 2ch;">${trans.description.substring(0, 26)}</span>
                    <span class="blue" style="margin-left: 2ch;">${Validation.formatAmount(trans.amount)}</span>
                </div>
            `;
        });
        
        return `
            <div class="screen" data-screen="transaction-list">
                <div class="screen-header">
                    <div class="header-line">
                        <div>
                            <span class="label blue">Tran: </span>
                            <span class="value blue">CT00</span>
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
                            <span class="value blue">COTRN00C</span>
                        </div>
                        <span class="title yellow">List Transactions</span>
                        <div>
                            <span class="label blue">Time: </span>
                            <span class="value blue">${SessionManager.getFormattedTime()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="screen-body">
                    <h2 class="screen-title neutral">List Transactions <span style="float: right;">Page: ${this.currentPage}</span></h2>
                    
                    <div class="input-group">
                        <label class="turquoise">Search Tran ID:</label>
                        <input type="text" id="search-id" class="input-field green underline" maxlength="16" value="${searchId}" autocomplete="off">
                    </div>
                    
                    <div class="data-table">
                        <div class="table-header neutral">
                            <span>Sel</span>
                            <span style="margin-left: 2ch;">Transaction ID</span>
                            <span style="margin-left: 4ch;">Date</span>
                            <span style="margin-left: 4ch;">Description</span>
                            <span style="margin-left: 12ch;">Amount</span>
                        </div>
                        <div class="table-separator neutral">---  ----------------  --------  --------------------------  ------------</div>
                        ${transHtml}
                    </div>
                    
                    <div class="info-line neutral bright" style="margin-top: 1em;">Type 'S' to View Transaction details from the list</div>
                </div>
                
                <div class="screen-footer">
                    <div class="error-message red" id="error-msg"></div>
                    <div class="function-keys yellow">ENTER=Search  F3=Back  F7=Prev  F8=Next</div>
                </div>
            </div>
        `;
    },
    
    init(data) {
        Navigation.registerKeyHandler('enter', () => this.handleSearch());
        Navigation.registerKeyHandler('f3', () => Navigation.goBack());
        Navigation.registerKeyHandler('f7', () => this.prevPage());
        Navigation.registerKeyHandler('f8', () => this.nextPage());
        
        // Add selection handlers
        const selects = document.querySelectorAll('.select-field');
        selects.forEach(sel => {
            sel.addEventListener('change', (e) => {
                if (e.target.value.toUpperCase() === 'S') {
                    const transId = e.target.getAttribute('data-trans-id');
                    Navigation.navigateTo('transaction-detail', { transactionId: transId });
                }
            });
        });
    },
    
    handleSearch() {
        const searchId = document.getElementById('search-id').value.trim();
        Navigation.navigateTo('transaction-list', { searchId, page: 1 });
    },
    
    prevPage() {
        if (this.currentPage > 1) {
            const data = SessionManager.getData('screenData') || {};
            Navigation.navigateTo('transaction-list', { ...data, page: this.currentPage - 1 });
        }
    },
    
    nextPage() {
        const data = SessionManager.getData('screenData') || {};
        Navigation.navigateTo('transaction-list', { ...data, page: this.currentPage + 1 });
    }
};

// ============================================================================
// TRANSACTION DETAIL SCREEN (COTRN01C)
// ============================================================================
const TransactionDetailScreen = {
    render(data) {
        const transId = data.transactionId || '';
        const transaction = DataGenerator.getTransaction(transId);
        
        let detailHtml = '';
        if (transaction) {
            const date = new Date(transaction.originalTimestamp);
            detailHtml = `
                <div class="data-row">
                    <span class="data-label turquoise">Transaction ID:</span>
                    <span class="data-value green underline">${transaction.transactionId}</span>
                </div>
                <div class="data-row">
                    <span class="data-label turquoise">Type Code:</span>
                    <span class="data-value green underline">${transaction.typeCode}</span>
                    <span class="turquoise" style="margin-left: 5ch;">Category:</span>
                    <span class="green underline">${transaction.categoryCode}</span>
                </div>
                <div class="data-row">
                    <span class="data-label turquoise">Amount:</span>
                    <span class="data-value green underline">${Validation.formatAmount(transaction.amount)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label turquoise">Description:</span>
                    <span class="data-value green underline">${transaction.description}</span>
                </div>
                <div class="data-row">
                    <span class="data-label turquoise">Merchant Name:</span>
                    <span class="data-value green underline">${transaction.merchantName}</span>
                </div>
                <div class="data-row">
                    <span class="data-label turquoise">Merchant City:</span>
                    <span class="data-value green underline">${transaction.merchantCity}</span>
                </div>
                <div class="data-row">
                    <span class="data-label turquoise">Card Number:</span>
                    <span class="data-value green underline">${transaction.cardNumber}</span>
                </div>
                <div class="data-row">
                    <span class="data-label turquoise">Date/Time:</span>
                    <span class="data-value green underline">${date.toLocaleString()}</span>
                </div>
            `;
        }
        
        return `
            <div class="screen" data-screen="transaction-detail">
                <div class="screen-header">
                    <div class="header-line">
                        <div>
                            <span class="label blue">Tran: </span>
                            <span class="value blue">CT01</span>
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
                            <span class="value blue">COTRN01C</span>
                        </div>
                        <span class="title yellow">Transaction Detail</span>
                        <div>
                            <span class="label blue">Time: </span>
                            <span class="value blue">${SessionManager.getFormattedTime()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="screen-body">
                    <h2 class="screen-title neutral">Transaction Detail</h2>
                    ${detailHtml}
                </div>
                
                <div class="screen-footer">
                    <div class="error-message red" id="error-msg"></div>
                    <div class="function-keys yellow">F3=Back</div>
                </div>
            </div>
        `;
    },
    
    init(data) {
        Navigation.registerKeyHandler('f3', () => Navigation.goBack());
    }
};

// ============================================================================
// TRANSACTION ADD SCREEN (COTRN02C)
// ============================================================================
const TransactionAddScreen = {
    render(data) {
        return `
            <div class="screen" data-screen="transaction-add">
                <div class="screen-header">
                    <div class="header-line">
                        <div>
                            <span class="label blue">Tran: </span>
                            <span class="value blue">CT02</span>
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
                            <span class="value blue">COTRN02C</span>
                        </div>
                        <span class="title yellow">Add Transaction</span>
                        <div>
                            <span class="label blue">Time: </span>
                            <span class="value blue">${SessionManager.getFormattedTime()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="screen-body">
                    <h2 class="screen-title neutral">Add Transaction</h2>
                    
                    <div class="input-group">
                        <label class="turquoise">Card Number:</label>
                        <input type="text" id="card-number" class="input-field green underline" maxlength="16" autocomplete="off">
                    </div>
                    <div class="input-group">
                        <label class="turquoise">Type Code (01-05):</label>
                        <input type="text" id="type-code" class="input-field green underline" maxlength="2" autocomplete="off">
                    </div>
                    <div class="input-group">
                        <label class="turquoise">Category Code:</label>
                        <input type="text" id="category-code" class="input-field green underline" maxlength="4" autocomplete="off">
                    </div>
                    <div class="input-group">
                        <label class="turquoise">Amount:</label>
                        <input type="text" id="amount" class="input-field green underline" maxlength="12" autocomplete="off">
                    </div>
                    <div class="input-group">
                        <label class="turquoise">Description:</label>
                        <input type="text" id="description" class="input-field green underline" maxlength="100" autocomplete="off">
                    </div>
                    <div class="input-group">
                        <label class="turquoise">Merchant Name:</label>
                        <input type="text" id="merchant-name" class="input-field green underline" maxlength="50" autocomplete="off">
                    </div>
                </div>
                
                <div class="screen-footer">
                    <div class="error-message red" id="error-msg"></div>
                    <div class="function-keys yellow">ENTER=Submit  F3=Cancel</div>
                </div>
            </div>
        `;
    },
    
    init(data) {
        Navigation.registerKeyHandler('enter', () => this.handleSubmit());
        Navigation.registerKeyHandler('f3', () => Navigation.goBack());
        Navigation.focusFirstInput();
    },
    
    handleSubmit() {
        Navigation.clearError();
        
        const cardNumber = document.getElementById('card-number').value.trim();
        const typeCode = document.getElementById('type-code').value.trim();
        const categoryCode = document.getElementById('category-code').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const description = document.getElementById('description').value.trim();
        const merchantName = document.getElementById('merchant-name').value.trim();
        
        // Validate
        const cardValidation = Validation.validateCardNumber(cardNumber);
        if (!cardValidation.valid) {
            Navigation.showError(cardValidation.message);
            return;
        }
        
        const amountValidation = Validation.validateAmount(amount);
        if (!amountValidation.valid) {
            Navigation.showError(amountValidation.message);
            return;
        }
        
        // Create transaction
        const now = new Date();
        const transId = `T${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
        
        const card = DataGenerator.getCard(cardNumber);
        const transaction = {
            transactionId: transId,
            typeCode: typeCode || '01',
            categoryCode: categoryCode || '5999',
            source: 'MANUAL',
            description: description || 'Manual Transaction',
            amount: parseFloat(amount),
            merchantId: '999999999',
            merchantName: merchantName || 'MANUAL ENTRY',
            merchantCity: 'UNKNOWN',
            merchantZip: '00000',
            cardNumber: cardNumber,
            accountId: card ? card.accountId : '00000000000',
            originalTimestamp: now.toISOString(),
            processedTimestamp: now.toISOString()
        };
        
        DataGenerator.addTransaction(transaction);
        
        Navigation.showError('Transaction added successfully');
        setTimeout(() => {
            Navigation.goBack();
        }, 1500);
    }
};

// ============================================================================
// PLACEHOLDER SCREENS
// ============================================================================
const AccountUpdateScreen = {
    render() { return '<div class="screen"><div class="screen-body"><h2 class="screen-title neutral">Account Update - Coming Soon</h2></div><div class="screen-footer"><div class="function-keys yellow">F3=Back</div></div></div>'; },
    init() { Navigation.registerKeyHandler('f3', () => Navigation.goBack()); }
};

const CardDetailScreen = {
    render() { return '<div class="screen"><div class="screen-body"><h2 class="screen-title neutral">Card Detail - Coming Soon</h2></div><div class="screen-footer"><div class="function-keys yellow">F3=Back</div></div></div>'; },
    init() { Navigation.registerKeyHandler('f3', () => Navigation.goBack()); }
};

const CardUpdateScreen = {
    render() { return '<div class="screen"><div class="screen-body"><h2 class="screen-title neutral">Card Update - Coming Soon</h2></div><div class="screen-footer"><div class="function-keys yellow">F3=Back</div></div></div>'; },
    init() { Navigation.registerKeyHandler('f3', () => Navigation.goBack()); }
};

const BillPaymentScreen = {
    render() { return '<div class="screen"><div class="screen-body"><h2 class="screen-title neutral">Bill Payment - Coming Soon</h2></div><div class="screen-footer"><div class="function-keys yellow">F3=Back</div></div></div>'; },
    init() { Navigation.registerKeyHandler('f3', () => Navigation.goBack()); }
};

const ReportsScreen = {
    render() { return '<div class="screen"><div class="screen-body"><h2 class="screen-title neutral">Transaction Reports - Coming Soon</h2></div><div class="screen-footer"><div class="function-keys yellow">F3=Back</div></div></div>'; },
    init() { Navigation.registerKeyHandler('f3', () => Navigation.goBack()); }
};

const UserListScreen = {
    render() {
        const users = DataGenerator.getUsers();
        let usersHtml = '';
        users.forEach((user, idx) => {
            usersHtml += `<div class="table-row"><span class="blue">${user.userId}</span><span class="blue" style="margin-left: 3ch;">${user.firstName} ${user.lastName}</span><span class="blue" style="margin-left: 3ch;">${user.userType === 'A' ? 'Admin' : 'User'}</span></div>`;
        });
        return `<div class="screen"><div class="screen-body"><h2 class="screen-title neutral">User List</h2><div class="data-table">${usersHtml}</div></div><div class="screen-footer"><div class="function-keys yellow">F3=Back</div></div></div>`;
    },
    init() { Navigation.registerKeyHandler('f3', () => Navigation.goBack()); }
};

const UserAddScreen = {
    render() { return '<div class="screen"><div class="screen-body"><h2 class="screen-title neutral">Add User - Coming Soon</h2></div><div class="screen-footer"><div class="function-keys yellow">F3=Back</div></div></div>'; },
    init() { Navigation.registerKeyHandler('f3', () => Navigation.goBack()); }
};

const UserUpdateScreen = {
    render() { return '<div class="screen"><div class="screen-body"><h2 class="screen-title neutral">Update User - Coming Soon</h2></div><div class="screen-footer"><div class="function-keys yellow">F3=Back</div></div></div>'; },
    init() { Navigation.registerKeyHandler('f3', () => Navigation.goBack()); }
};

const UserDeleteScreen = {
    render() { return '<div class="screen"><div class="screen-body"><h2 class="screen-title neutral">Delete User - Coming Soon</h2></div><div class="screen-footer"><div class="function-keys yellow">F3=Back</div></div></div>'; },
    init() { Navigation.registerKeyHandler('f3', () => Navigation.goBack()); }
};

// Made with Bob
