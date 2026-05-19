/**
 * Accounts View
 * Displays customer accounts with search, filter, and detail capabilities
 */

const AccountsView = {
    name: 'accounts',
    
    // Generate demo account data
    generateAccounts() {
        const accounts = [];
        const statuses = ['Active', 'Active', 'Active', 'Suspended', 'Closed'];
        const types = ['Checking', 'Savings', 'Credit', 'Money Market'];
        
        for (let i = 1; i <= 25; i++) {
            const accountNum = String(i).padStart(11, '0');
            const custId = String(Math.floor(Math.random() * 1000) + 1).padStart(9, '0');
            const balance = (Math.random() * 50000 + 1000).toFixed(2);
            const creditLimit = types[Math.floor(Math.random() * types.length)] === 'Credit' 
                ? (Math.random() * 20000 + 5000).toFixed(2) 
                : '0.00';
            
            accounts.push({
                accountId: accountNum,
                customerId: custId,
                accountType: types[Math.floor(Math.random() * types.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                balance: balance,
                creditLimit: creditLimit,
                openDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
                lastActivity: new Date(2026, 4, Math.floor(Math.random() * 13) + 1).toISOString().split('T')[0]
            });
        }
        
        return accounts;
    },
    
    render() {
        const accounts = this.generateAccounts();
        
        return `
            <div class="view-header">
                <div>
                    <h1>Account Management</h1>
                    <p class="text-secondary">View and manage customer accounts</p>
                </div>
                <button class="btn btn-primary" onclick="AccountsView.showAddAccount()">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1a.5.5 0 0 1 .5.5v6h6a.5.5 0 0 1 0 1h-6v6a.5.5 0 0 1-1 0v-6h-6a.5.5 0 0 1 0-1h6v-6A.5.5 0 0 1 8 1z"/>
                    </svg>
                    New Account
                </button>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="search-filter-bar">
                        <div class="search-box">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            <input type="text" id="accountSearch" placeholder="Search by account number, customer ID..." 
                                   onkeyup="AccountsView.filterAccounts()">
                        </div>
                        <select id="statusFilter" onchange="AccountsView.filterAccounts()" class="filter-select">
                            <option value="">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <select id="typeFilter" onchange="AccountsView.filterAccounts()" class="filter-select">
                            <option value="">All Types</option>
                            <option value="Checking">Checking</option>
                            <option value="Savings">Savings</option>
                            <option value="Credit">Credit</option>
                            <option value="Money Market">Money Market</option>
                        </select>
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>Customer ID</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Balance</th>
                                <th>Credit Limit</th>
                                <th>Open Date</th>
                                <th>Last Activity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="accountsTableBody">
                            ${accounts.map(account => `
                                <tr data-account-id="${account.accountId}" 
                                    data-status="${account.status}" 
                                    data-type="${account.accountType}">
                                    <td><strong>${account.accountId}</strong></td>
                                    <td>${account.customerId}</td>
                                    <td><span class="badge badge-info">${account.accountType}</span></td>
                                    <td><span class="badge badge-${account.status === 'Active' ? 'success' : account.status === 'Suspended' ? 'warning' : 'secondary'}">${account.status}</span></td>
                                    <td class="text-right">$${parseFloat(account.balance).toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                                    <td class="text-right">${account.creditLimit !== '0.00' ? '$' + parseFloat(account.creditLimit).toLocaleString('en-US', {minimumFractionDigits: 2}) : '-'}</td>
                                    <td>${account.openDate}</td>
                                    <td>${account.lastActivity}</td>
                                    <td>
                                        <button class="btn-icon" onclick="AccountsView.viewDetails('${account.accountId}')" title="View Details">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/>
                                            </svg>
                                        </button>
                                        <button class="btn-icon" onclick="AccountsView.editAccount('${account.accountId}')" title="Edit">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="card-footer">
                    <div class="pagination-info">
                        Showing <strong id="showingCount">${accounts.length}</strong> of <strong>${accounts.length}</strong> accounts
                    </div>
                </div>
            </div>
        `;
    },
    
    filterAccounts() {
        const searchTerm = document.getElementById('accountSearch').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        const rows = document.querySelectorAll('#accountsTableBody tr');
        
        let visibleCount = 0;
        
        rows.forEach(row => {
            const accountId = row.querySelector('td:first-child').textContent.toLowerCase();
            const customerId = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const status = row.dataset.status;
            const type = row.dataset.type;
            
            const matchesSearch = accountId.includes(searchTerm) || customerId.includes(searchTerm);
            const matchesStatus = !statusFilter || status === statusFilter;
            const matchesType = !typeFilter || type === typeFilter;
            
            if (matchesSearch && matchesStatus && matchesType) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        document.getElementById('showingCount').textContent = visibleCount;
    },
    
    viewDetails(accountId) {
        Toast.show(`Viewing details for account ${accountId}`, 'info');
        // In a real app, this would navigate to a detail view
    },
    
    editAccount(accountId) {
        Toast.show(`Editing account ${accountId}`, 'info');
        // In a real app, this would open an edit modal or navigate to edit view
    },
    
    showAddAccount() {
        Toast.show('Add new account form would open here', 'info');
        // In a real app, this would open a modal or navigate to create view
    }
};

// Register the view
if (typeof window.Views !== 'undefined') {
    window.Views.accounts = AccountsView;
}

// Made with Bob
