// CardDemo - Synthetic Data Generator
// Generates realistic data matching COBOL copybook structures

const DataGenerator = {
    // Seed data for users
    users: [
        { userId: 'ADMIN001', firstName: 'Admin', lastName: 'User', password: 'PASSWORD', userType: 'A' },
        { userId: 'USER0001', firstName: 'John', lastName: 'Doe', password: 'PASSWORD', userType: 'U' },
        { userId: 'USER0002', firstName: 'Jane', lastName: 'Smith', password: 'PASSWORD', userType: 'U' },
        { userId: 'USER0003', firstName: 'Bob', lastName: 'Johnson', password: 'PASSWORD', userType: 'U' },
        { userId: 'USER0004', firstName: 'Alice', lastName: 'Williams', password: 'PASSWORD', userType: 'U' },
        { userId: 'ADMIN002', firstName: 'Super', lastName: 'Admin', password: 'PASSWORD', userType: 'A' }
    ],

    // Customer data
    customers: [],
    accounts: [],
    cards: [],
    transactions: [],

    // Helper functions
    padLeft(str, length, char = '0') {
        return String(str).padStart(length, char);
    },

    padRight(str, length, char = ' ') {
        return String(str).padEnd(length, char);
    },

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    },

    formatDate(date) {
        const year = date.getFullYear();
        const month = this.padLeft(date.getMonth() + 1, 2);
        const day = this.padLeft(date.getDate(), 2);
        return `${year}-${month}-${day}`;
    },

    formatAmount(amount) {
        return amount.toFixed(2);
    },

    // Generate Luhn-valid card number
    generateCardNumber() {
        let cardNum = '4111111111111'; // Visa prefix
        let sum = 0;
        
        for (let i = 0; i < 13; i++) {
            let digit = parseInt(cardNum[i]);
            if (i % 2 === 0) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
        }
        
        const checkDigit = (10 - (sum % 10)) % 10;
        return cardNum + this.randomInt(0, 9) + this.randomInt(0, 9) + checkDigit;
    },

    // Generate customers
    generateCustomers(count = 50) {
        const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'William', 'Mary',
                           'James', 'Patricia', 'Richard', 'Jennifer', 'Thomas', 'Linda', 'Charles', 'Barbara', 'Daniel', 'Susan'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
                          'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
        const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'NC', 'MI'];
        const streets = ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Pine Rd', 'Elm St', 'Washington Blvd', 'Park Ave', 'Lake Dr', 'Hill St'];

        this.customers = [];
        for (let i = 0; i < count; i++) {
            const customerId = this.padLeft(i + 1, 9);
            const firstName = firstNames[this.randomInt(0, firstNames.length - 1)];
            const middleName = String.fromCharCode(65 + this.randomInt(0, 25));
            const lastName = lastNames[this.randomInt(0, lastNames.length - 1)];
            const birthYear = this.randomInt(1950, 2000);
            const birthMonth = this.randomInt(1, 12);
            const birthDay = this.randomInt(1, 28);
            
            this.customers.push({
                customerId: customerId,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                dateOfBirth: `${birthYear}-${this.padLeft(birthMonth, 2)}-${this.padLeft(birthDay, 2)}`,
                ssn: `${this.randomInt(100, 999)}-${this.padLeft(this.randomInt(10, 99), 2)}-${this.padLeft(this.randomInt(1000, 9999), 4)}`,
                ficoScore: this.randomInt(550, 850),
                addressLine1: `${this.randomInt(100, 9999)} ${streets[this.randomInt(0, streets.length - 1)]}`,
                addressLine2: this.randomInt(0, 1) ? `Apt ${this.randomInt(1, 999)}` : '',
                city: cities[this.randomInt(0, cities.length - 1)],
                state: states[this.randomInt(0, states.length - 1)],
                zipCode: this.padLeft(this.randomInt(10000, 99999), 5),
                country: 'USA',
                phone1: `${this.randomInt(200, 999)}-${this.randomInt(200, 999)}-${this.padLeft(this.randomInt(1000, 9999), 4)}`,
                phone2: this.randomInt(0, 1) ? `${this.randomInt(200, 999)}-${this.randomInt(200, 999)}-${this.padLeft(this.randomInt(1000, 9999), 4)}` : '',
                governmentId: `DL${this.padLeft(this.randomInt(1000000, 9999999), 9)}`,
                eftAccountId: `EFT${this.padLeft(i + 1, 7)}`,
                primaryCardHolder: 'Y'
            });
        }
    },

    // Generate accounts
    generateAccounts() {
        this.accounts = [];
        const today = new Date();
        
        this.customers.forEach((customer, idx) => {
            const numAccounts = this.randomInt(1, 3);
            
            for (let i = 0; i < numAccounts; i++) {
                const accountId = this.padLeft((idx * 3 + i + 1), 11);
                const openDate = this.randomDate(new Date(2015, 0, 1), new Date(2023, 11, 31));
                const expirationDate = new Date(openDate);
                expirationDate.setFullYear(expirationDate.getFullYear() + 5);
                const reissueDate = new Date(openDate);
                reissueDate.setFullYear(reissueDate.getFullYear() + 3);
                
                const creditLimit = [5000, 10000, 15000, 20000, 25000][this.randomInt(0, 4)];
                const cashCreditLimit = creditLimit * 0.2;
                const currentBalance = this.randomInt(0, creditLimit * 0.8);
                const currentCycleCredit = this.randomInt(0, 2000);
                const currentCycleDebit = this.randomInt(0, 3000);
                
                this.accounts.push({
                    accountId: accountId,
                    customerId: customer.customerId,
                    activeStatus: this.randomInt(0, 9) > 0 ? 'Y' : 'N',
                    currentBalance: currentBalance,
                    creditLimit: creditLimit,
                    cashCreditLimit: cashCreditLimit,
                    openDate: this.formatDate(openDate),
                    expirationDate: this.formatDate(expirationDate),
                    reissueDate: this.formatDate(reissueDate),
                    currentCycleCredit: currentCycleCredit,
                    currentCycleDebit: currentCycleDebit,
                    addressZip: customer.zipCode,
                    groupId: `GROUP${this.padLeft(this.randomInt(1, 10), 4)}`
                });
            }
        });
    },

    // Generate cards
    generateCards() {
        this.cards = [];
        
        this.accounts.forEach(account => {
            const numCards = this.randomInt(1, 2);
            
            for (let i = 0; i < numCards; i++) {
                const expMonth = this.padLeft(this.randomInt(1, 12), 2);
                const expYear = this.randomInt(25, 30);
                
                this.cards.push({
                    cardNumber: this.generateCardNumber(),
                    accountId: account.accountId,
                    customerId: account.customerId,
                    activeStatus: account.activeStatus === 'Y' && this.randomInt(0, 9) > 0 ? 'Y' : 'N',
                    expirationDate: `${expMonth}/${expYear}`,
                    cvv: this.padLeft(this.randomInt(100, 999), 3),
                    cardType: 'VISA'
                });
            }
        });
    },

    // Generate transactions
    generateTransactions() {
        this.transactions = [];
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 90);
        
        const transactionTypes = [
            { code: '01', desc: 'Purchase' },
            { code: '02', desc: 'Cash Advance' },
            { code: '03', desc: 'Payment' },
            { code: '04', desc: 'Refund' },
            { code: '05', desc: 'Fee' }
        ];
        
        const categories = [
            { code: '5411', desc: 'Grocery Stores' },
            { code: '5812', desc: 'Restaurants' },
            { code: '5541', desc: 'Gas Stations' },
            { code: '5311', desc: 'Department Stores' },
            { code: '5999', desc: 'Miscellaneous' },
            { code: '4111', desc: 'Transportation' },
            { code: '5912', desc: 'Drug Stores' },
            { code: '7011', desc: 'Hotels' }
        ];
        
        const merchants = [
            'ACME GROCERY', 'BEST RESTAURANT', 'QUICK GAS', 'MEGA MART', 'COFFEE SHOP',
            'ONLINE STORE', 'LOCAL PHARMACY', 'HOTEL CHAIN', 'AIRLINE TICKETS', 'TAXI SERVICE'
        ];
        
        let transactionCounter = 1;
        
        this.cards.forEach(card => {
            if (card.activeStatus === 'Y') {
                const numTransactions = this.randomInt(5, 20);
                
                for (let i = 0; i < numTransactions; i++) {
                    const transDate = this.randomDate(startDate, today);
                    const transType = transactionTypes[this.randomInt(0, transactionTypes.length - 1)];
                    const category = categories[this.randomInt(0, categories.length - 1)];
                    const merchant = merchants[this.randomInt(0, merchants.length - 1)];
                    const account = this.accounts.find(a => a.accountId === card.accountId);
                    const customer = this.customers.find(c => c.customerId === card.customerId);
                    
                    let amount = this.randomInt(10, 500);
                    if (transType.code === '03') amount = -amount; // Payment
                    if (transType.code === '04') amount = -amount; // Refund
                    
                    const transId = `T${this.formatDate(transDate).replace(/-/g, '')}${this.padLeft(transactionCounter++, 6)}`;
                    
                    this.transactions.push({
                        transactionId: transId,
                        typeCode: transType.code,
                        categoryCode: category.code,
                        source: 'POS',
                        description: `${transType.desc} - ${merchant}`,
                        amount: amount,
                        merchantId: this.padLeft(this.randomInt(100000000, 999999999), 9),
                        merchantName: merchant,
                        merchantCity: customer ? customer.city : 'NEW YORK',
                        merchantZip: customer ? customer.zipCode : '10001',
                        cardNumber: card.cardNumber,
                        accountId: card.accountId,
                        originalTimestamp: transDate.toISOString(),
                        processedTimestamp: new Date(transDate.getTime() + 5000).toISOString()
                    });
                }
            }
        });
        
        // Sort transactions by date descending
        this.transactions.sort((a, b) => new Date(b.originalTimestamp) - new Date(a.originalTimestamp));
    },

    // Initialize all data
    initialize() {
        console.log('Generating synthetic data...');
        this.generateCustomers(50);
        this.generateAccounts();
        this.generateCards();
        this.generateTransactions();
        console.log(`Generated: ${this.customers.length} customers, ${this.accounts.length} accounts, ${this.cards.length} cards, ${this.transactions.length} transactions`);
        
        // Store in localStorage
        this.saveToStorage();
    },

    // Save to localStorage
    saveToStorage() {
        localStorage.setItem('carddemo_users', JSON.stringify(this.users));
        localStorage.setItem('carddemo_customers', JSON.stringify(this.customers));
        localStorage.setItem('carddemo_accounts', JSON.stringify(this.accounts));
        localStorage.setItem('carddemo_cards', JSON.stringify(this.cards));
        localStorage.setItem('carddemo_transactions', JSON.stringify(this.transactions));
    },

    // Load from localStorage
    loadFromStorage() {
        const users = localStorage.getItem('carddemo_users');
        const customers = localStorage.getItem('carddemo_customers');
        const accounts = localStorage.getItem('carddemo_accounts');
        const cards = localStorage.getItem('carddemo_cards');
        const transactions = localStorage.getItem('carddemo_transactions');
        
        if (users && customers && accounts && cards && transactions) {
            this.users = JSON.parse(users);
            this.customers = JSON.parse(customers);
            this.accounts = JSON.parse(accounts);
            this.cards = JSON.parse(cards);
            this.transactions = JSON.parse(transactions);
            console.log('Data loaded from storage');
            return true;
        }
        return false;
    },

    // Get data methods
    getUsers() {
        return this.users;
    },

    getUser(userId) {
        return this.users.find(u => u.userId === userId);
    },

    getCustomer(customerId) {
        return this.customers.find(c => c.customerId === customerId);
    },

    getAccount(accountId) {
        return this.accounts.find(a => a.accountId === accountId);
    },

    getAccountsByCustomer(customerId) {
        return this.accounts.filter(a => a.customerId === customerId);
    },

    getCard(cardNumber) {
        return this.cards.find(c => c.cardNumber === cardNumber);
    },

    getCardsByAccount(accountId) {
        return this.cards.filter(c => c.accountId === accountId);
    },

    getTransactionsByCard(cardNumber) {
        return this.transactions.filter(t => t.cardNumber === cardNumber);
    },

    getTransactionsByAccount(accountId) {
        return this.transactions.filter(t => t.accountId === accountId);
    },

    getTransaction(transactionId) {
        return this.transactions.find(t => t.transactionId === transactionId);
    },

    // Add new transaction
    addTransaction(transaction) {
        this.transactions.unshift(transaction);
        this.saveToStorage();
    },

    // Update user
    updateUser(userId, updates) {
        const userIndex = this.users.findIndex(u => u.userId === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updates };
            this.saveToStorage();
            return true;
        }
        return false;
    },

    // Add user
    addUser(user) {
        this.users.push(user);
        this.saveToStorage();
    },

    // Delete user
    deleteUser(userId) {
        const userIndex = this.users.findIndex(u => u.userId === userId);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    },

    // Reset data
    reset() {
        localStorage.clear();
        this.initialize();
    }
};

// Initialize data on load
if (!DataGenerator.loadFromStorage()) {
    DataGenerator.initialize();
}

// Made with Bob
