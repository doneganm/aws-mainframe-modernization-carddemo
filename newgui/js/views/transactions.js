/**
 * Transactions View
 * Displays transaction history with search, filter, and export capabilities
 */

const TransactionsView = {
    name: 'transactions',
    
    // Generate demo transaction data
    generateTransactions() {
        const transactions = [];
        const types = ['Purchase', 'Payment', 'Refund', 'Cash Advance', 'Fee', 'Interest'];
        const categories = ['Groceries', 'Gas', 'Dining', 'Shopping', 'Travel', 'Entertainment', 'Bills', 'Healthcare', 'Other'];
        const merchants = [
            'Amazon.com', 'Walmart', 'Target', 'Costco', 'Shell Gas', 'Chevron',
            'Starbucks', 'McDonald\'s', 'Chipotle', 'Delta Airlines', 'Uber',
            'Netflix', 'Spotify', 'AT&T', 'Electric Company', 'CVS Pharmacy'
        ];
        const statuses = ['Posted', 'Posted', 'Posted', 'Pending', 'Declined'];
        
        for (let i = 1; i <= 100; i++) {
            const transId = String(i).padStart(10, '0');
            const cardNum = `**** **** **** ${String(1000 + Math.floor(Math.random() * 30)).padStart(4, '0')}`;
            const accountId = String(Math.floor(Math.random() * 100) + 1).padStart(11, '0');
            const type = types[Math.floor(Math.random() * types.length)];
            const amount = type === 'Payment' 
                ? -(Math.random() * 500 + 50).toFixed(2)
                : (Math.random() * 300 + 5).toFixed(2);
            const daysAgo = Math.floor(Math.random() * 30);
            const transDate = new Date(2026, 4, 13 - daysAgo);
            
            transactions.push({
                transactionId: transId,
                cardNumber: cardNum,
                accountId: accountId,
                type: type,
                category: type === 'Purchase' ? categories[Math.floor(Math.random() * categories.length)] : type,
                merchant: type === 'Purchase' ? merchants[Math.floor(Math.random() * merchants.length)] : type,
                amount: amount,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                date: transDate.toISOString().split('T')[0],
                time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                description: type === 'Purchase' ? `${merchants[Math.floor(Math.random() * merchants.length)]} - ${categories[Math.floor(Math.random() * categories.length)]}` : type
            });
        }
        
        // Sort by date descending
        transactions.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
        
        return transactions;
    },
    
    render() {
        const transactions = this.generateTransactions();
        const totalSpent = transactions.filter(t => parseFloat(t.amount) > 0).reduce((sum, t) => sum + parseFloat(t.amount), 0);
        const totalPayments = Math.abs(transactions.filter(t => parseFloat(t.amount) < 0).reduce((sum, t) => sum + parseFloat(t.amount), 0));
        const pendingCount = transactions.filter(t => t.status === 'Pending').length;
        
        return `
            <div class="view-header">
                <div>
                    <h1>Transaction History</h1>
                    <p class="text-secondary">View and analyze all transactions</p>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-secondary" onclick="TransactionsView.exportTransactions()">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Export
                    </button>
                    <button class="btn btn-primary" onclick="TransactionsView.showAddTransaction()">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 1a.5.5 0 0 1 .5.5v6h6a.5.5 0 0 1 0 1h-6v6a.5.5 0 0 1-1 0v-6h-6a.5.5 0 0 1 0-1h6v-6A.5.5 0 0 1 8 1z"/>
                        </svg>
                        Add Transaction
                    </button>
                </div>
            </div>
            
            <div class="stats-grid" style="margin-bottom: 2rem;">
                <div class="stat-card">
                    <div class="stat-label">Total Transactions</div>
                    <div class="stat-value">${transactions.length}</div>
                    <div class="stat-change">Last 30 days</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Spent</div>
                    <div class="stat-value">$${totalSpent.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                    <div class="stat-change negative">Purchases & fees</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Payments</div>
                    <div class="stat-value">$${totalPayments.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                    <div class="stat-change positive">Received</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Pending</div>
                    <div class="stat-value">${pendingCount}</div>
                    <div class="stat-change">Awaiting posting</div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="search-filter-bar">
                        <div class="search-box">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            <input type="text" id="transactionSearch" placeholder="Search by merchant, description, transaction ID..." 
                                   onkeyup="TransactionsView.filterTransactions()">
                        </div>
                        <select id="typeFilter" onchange="TransactionsView.filterTransactions()" class="filter-select">
                            <option value="">All Types</option>
                            <option value="Purchase">Purchase</option>
                            <option value="Payment">Payment</option>
                            <option value="Refund">Refund</option>
                            <option value="Cash Advance">Cash Advance</option>
                            <option value="Fee">Fee</option>
                            <option value="Interest">Interest</option>
                        </select>
                        <select id="statusFilter" onchange="TransactionsView.filterTransactions()" class="filter-select">
                            <option value="">All Statuses</option>
                            <option value="Posted">Posted</option>
                            <option value="Pending">Pending</option>
                            <option value="Declined">Declined</option>
                        </select>
                        <input type="date" id="dateFromFilter" onchange="TransactionsView.filterTransactions()" class="filter-select" placeholder="From Date">
                        <input type="date" id="dateToFilter" onchange="TransactionsView.filterTransactions()" class="filter-select" placeholder="To Date">
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>Transaction ID</th>
                                <th>Card</th>
                                <th>Type</th>
                                <th>Merchant/Description</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="transactionsTableBody">
                            ${transactions.map(trans => `
                                <tr data-transaction-id="${trans.transactionId}" 
                                    data-type="${trans.type}" 
                                    data-status="${trans.status}"
                                    data-date="${trans.date}">
                                    <td>
                                        <div>${trans.date}</div>
                                        <div class="text-secondary" style="font-size: 0.875rem;">${trans.time}</div>
                                    </td>
                                    <td><strong>${trans.transactionId}</strong></td>
                                    <td>${trans.cardNumber}</td>
                                    <td><span class="badge badge-${trans.type === 'Purchase' ? 'primary' : trans.type === 'Payment' ? 'success' : 'info'}">${trans.type}</span></td>
                                    <td>${trans.description}</td>
                                    <td><span class="badge badge-secondary">${trans.category}</span></td>
                                    <td class="text-right ${parseFloat(trans.amount) < 0 ? 'text-success' : ''}">
                                        ${parseFloat(trans.amount) < 0 ? '-' : ''}$${Math.abs(parseFloat(trans.amount)).toLocaleString('en-US', {minimumFractionDigits: 2})}
                                    </td>
                                    <td><span class="badge badge-${trans.status === 'Posted' ? 'success' : trans.status === 'Pending' ? 'warning' : 'danger'}">${trans.status}</span></td>
                                    <td>
                                        <button class="btn-icon" onclick="TransactionsView.viewDetails('${trans.transactionId}')" title="View Details">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/>
                                            </svg>
                                        </button>
                                        ${trans.status === 'Pending' ? `
                                            <button class="btn-icon" onclick="TransactionsView.disputeTransaction('${trans.transactionId}')" title="Dispute">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                                </svg>
                                            </button>
                                        ` : ''}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="card-footer">
                    <div class="pagination-info">
                        Showing <strong id="showingCount">${transactions.length}</strong> of <strong>${transactions.length}</strong> transactions
                    </div>
                </div>
            </div>
        `;
    },
    
    filterTransactions() {
        const searchTerm = document.getElementById('transactionSearch').value.toLowerCase();
        const typeFilter = document.getElementById('typeFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const dateFrom = document.getElementById('dateFromFilter').value;
        const dateTo = document.getElementById('dateToFilter').value;
        const rows = document.querySelectorAll('#transactionsTableBody tr');
        
        let visibleCount = 0;
        
        rows.forEach(row => {
            const transId = row.dataset.transactionId;
            const merchant = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
            const type = row.dataset.type;
            const status = row.dataset.status;
            const date = row.dataset.date;
            
            const matchesSearch = transId.includes(searchTerm) || merchant.includes(searchTerm);
            const matchesType = !typeFilter || type === typeFilter;
            const matchesStatus = !statusFilter || status === statusFilter;
            const matchesDateFrom = !dateFrom || date >= dateFrom;
            const matchesDateTo = !dateTo || date <= dateTo;
            
            if (matchesSearch && matchesType && matchesStatus && matchesDateFrom && matchesDateTo) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        document.getElementById('showingCount').textContent = visibleCount;
    },
    
    viewDetails(transactionId) {
        Toast.show(`Viewing details for transaction ${transactionId}`, 'info');
    },
    
    disputeTransaction(transactionId) {
        Toast.show(`Dispute initiated for transaction ${transactionId}`, 'warning');
    },
    
    exportTransactions() {
        Toast.show('Exporting transactions to CSV...', 'success');
    },
    
    showAddTransaction() {
        Toast.show('Add transaction form would open here', 'info');
    }
};

// Register the view
if (typeof window.Views !== 'undefined') {
    window.Views.transactions = TransactionsView;
}

// Made with Bob
