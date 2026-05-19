/**
 * Payments View
 * Displays payment history, scheduled payments, and payment management
 */

const PaymentsView = {
    name: 'payments',
    
    // Generate demo payment data
    generatePayments() {
        const payments = [];
        const statuses = ['Completed', 'Completed', 'Completed', 'Pending', 'Scheduled', 'Failed'];
        const methods = ['Bank Transfer', 'Debit Card', 'Credit Card', 'Check', 'Wire Transfer'];
        const types = ['Minimum Payment', 'Full Balance', 'Custom Amount', 'Auto Payment'];
        
        for (let i = 1; i <= 50; i++) {
            const paymentId = String(i).padStart(10, '0');
            const accountId = String(Math.floor(Math.random() * 100) + 1).padStart(11, '0');
            const cardNum = `**** **** **** ${String(1000 + Math.floor(Math.random() * 30)).padStart(4, '0')}`;
            const amount = (Math.random() * 2000 + 50).toFixed(2);
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const daysAgo = status === 'Scheduled' ? -Math.floor(Math.random() * 30) : Math.floor(Math.random() * 60);
            const paymentDate = new Date(2026, 4, 13 + daysAgo);
            
            payments.push({
                paymentId: paymentId,
                accountId: accountId,
                cardNumber: cardNum,
                amount: amount,
                status: status,
                method: methods[Math.floor(Math.random() * methods.length)],
                type: types[Math.floor(Math.random() * types.length)],
                date: paymentDate.toISOString().split('T')[0],
                time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                confirmationNumber: status === 'Completed' ? `CNF${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}` : '-',
                processingFee: status === 'Completed' ? (Math.random() * 5).toFixed(2) : '0.00'
            });
        }
        
        // Sort by date descending
        payments.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
        
        return payments;
    },
    
    render() {
        const payments = this.generatePayments();
        const totalPaid = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + parseFloat(p.amount), 0);
        const pendingAmount = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + parseFloat(p.amount), 0);
        const scheduledAmount = payments.filter(p => p.status === 'Scheduled').reduce((sum, p) => sum + parseFloat(p.amount), 0);
        const failedCount = payments.filter(p => p.status === 'Failed').length;
        
        return `
            <div class="view-header">
                <div>
                    <h1>Payment Management</h1>
                    <p class="text-secondary">View payment history and schedule new payments</p>
                </div>
                <button class="btn btn-primary" onclick="PaymentsView.showMakePayment()">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1a.5.5 0 0 1 .5.5v6h6a.5.5 0 0 1 0 1h-6v6a.5.5 0 0 1-1 0v-6h-6a.5.5 0 0 1 0-1h6v-6A.5.5 0 0 1 8 1z"/>
                    </svg>
                    Make Payment
                </button>
            </div>
            
            <div class="stats-grid" style="margin-bottom: 2rem;">
                <div class="stat-card">
                    <div class="stat-label">Total Paid</div>
                    <div class="stat-value">$${totalPaid.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                    <div class="stat-change positive">Last 60 days</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Pending Payments</div>
                    <div class="stat-value">$${pendingAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                    <div class="stat-change">Processing</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Scheduled Payments</div>
                    <div class="stat-value">$${scheduledAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                    <div class="stat-change">Upcoming</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Failed Payments</div>
                    <div class="stat-value">${failedCount}</div>
                    <div class="stat-change ${failedCount > 0 ? 'negative' : ''}">${failedCount > 0 ? 'Requires attention' : 'All good'}</div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="card" style="margin-bottom: 2rem;">
                <div class="card-header">
                    <h3>Quick Actions</h3>
                </div>
                <div class="card-body">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                        <button class="quick-action-btn" onclick="PaymentsView.showMakePayment()">
                            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                            </svg>
                            <div>
                                <strong>Make a Payment</strong>
                                <p>Pay your credit card balance</p>
                            </div>
                        </button>
                        
                        <button class="quick-action-btn" onclick="PaymentsView.setupAutoPay()">
                            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                            </svg>
                            <div>
                                <strong>Setup Auto-Pay</strong>
                                <p>Automate your payments</p>
                            </div>
                        </button>
                        
                        <button class="quick-action-btn" onclick="PaymentsView.schedulePayment()">
                            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                            </svg>
                            <div>
                                <strong>Schedule Payment</strong>
                                <p>Set up a future payment</p>
                            </div>
                        </button>
                        
                        <button class="quick-action-btn" onclick="PaymentsView.viewPaymentMethods()">
                            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                            </svg>
                            <div>
                                <strong>Payment Methods</strong>
                                <p>Manage saved payment methods</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Payment History -->
            <div class="card">
                <div class="card-header">
                    <h3>Payment History</h3>
                    <div class="search-filter-bar">
                        <div class="search-box">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            <input type="text" id="paymentSearch" placeholder="Search by payment ID, account, confirmation..." 
                                   onkeyup="PaymentsView.filterPayments()">
                        </div>
                        <select id="statusFilter" onchange="PaymentsView.filterPayments()" class="filter-select">
                            <option value="">All Statuses</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Failed">Failed</option>
                        </select>
                        <select id="methodFilter" onchange="PaymentsView.filterPayments()" class="filter-select">
                            <option value="">All Methods</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Check">Check</option>
                            <option value="Wire Transfer">Wire Transfer</option>
                        </select>
                        <input type="date" id="dateFromFilter" onchange="PaymentsView.filterPayments()" class="filter-select" placeholder="From Date">
                        <input type="date" id="dateToFilter" onchange="PaymentsView.filterPayments()" class="filter-select" placeholder="To Date">
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>Payment ID</th>
                                <th>Account/Card</th>
                                <th>Type</th>
                                <th>Method</th>
                                <th>Amount</th>
                                <th>Fee</th>
                                <th>Status</th>
                                <th>Confirmation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="paymentsTableBody">
                            ${payments.map(payment => `
                                <tr data-payment-id="${payment.paymentId}" 
                                    data-status="${payment.status}"
                                    data-method="${payment.method}"
                                    data-date="${payment.date}">
                                    <td>
                                        <div>${payment.date}</div>
                                        <div class="text-secondary" style="font-size: 0.875rem;">${payment.time}</div>
                                    </td>
                                    <td><strong>${payment.paymentId}</strong></td>
                                    <td>
                                        <div>${payment.accountId}</div>
                                        <div class="text-secondary" style="font-size: 0.875rem;">${payment.cardNumber}</div>
                                    </td>
                                    <td><span class="badge badge-info">${payment.type}</span></td>
                                    <td><span class="badge badge-secondary">${payment.method}</span></td>
                                    <td class="text-right"><strong>$${parseFloat(payment.amount).toLocaleString('en-US', {minimumFractionDigits: 2})}</strong></td>
                                    <td class="text-right">${payment.processingFee !== '0.00' ? '$' + parseFloat(payment.processingFee).toFixed(2) : '-'}</td>
                                    <td>
                                        <span class="badge badge-${
                                            payment.status === 'Completed' ? 'success' : 
                                            payment.status === 'Pending' ? 'warning' : 
                                            payment.status === 'Scheduled' ? 'info' : 
                                            'danger'
                                        }">${payment.status}</span>
                                    </td>
                                    <td>${payment.confirmationNumber}</td>
                                    <td>
                                        <button class="btn-icon" onclick="PaymentsView.viewDetails('${payment.paymentId}')" title="View Details">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/>
                                            </svg>
                                        </button>
                                        ${payment.status === 'Completed' ? `
                                            <button class="btn-icon" onclick="PaymentsView.downloadReceipt('${payment.paymentId}')" title="Download Receipt">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                                </svg>
                                            </button>
                                        ` : ''}
                                        ${payment.status === 'Scheduled' ? `
                                            <button class="btn-icon" onclick="PaymentsView.cancelPayment('${payment.paymentId}')" title="Cancel Payment">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </button>
                                        ` : ''}
                                        ${payment.status === 'Failed' ? `
                                            <button class="btn-icon" onclick="PaymentsView.retryPayment('${payment.paymentId}')" title="Retry Payment">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
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
                        Showing <strong id="showingCount">${payments.length}</strong> of <strong>${payments.length}</strong> payments
                    </div>
                </div>
            </div>
        `;
    },
    
    filterPayments() {
        const searchTerm = document.getElementById('paymentSearch').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const methodFilter = document.getElementById('methodFilter').value;
        const dateFrom = document.getElementById('dateFromFilter').value;
        const dateTo = document.getElementById('dateToFilter').value;
        const rows = document.querySelectorAll('#paymentsTableBody tr');
        
        let visibleCount = 0;
        
        rows.forEach(row => {
            const paymentId = row.dataset.paymentId;
            const account = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            const confirmation = row.querySelector('td:nth-child(9)').textContent.toLowerCase();
            const status = row.dataset.status;
            const method = row.dataset.method;
            const date = row.dataset.date;
            
            const matchesSearch = paymentId.includes(searchTerm) || account.includes(searchTerm) || confirmation.includes(searchTerm);
            const matchesStatus = !statusFilter || status === statusFilter;
            const matchesMethod = !methodFilter || method === methodFilter;
            const matchesDateFrom = !dateFrom || date >= dateFrom;
            const matchesDateTo = !dateTo || date <= dateTo;
            
            if (matchesSearch && matchesStatus && matchesMethod && matchesDateFrom && matchesDateTo) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        document.getElementById('showingCount').textContent = visibleCount;
    },
    
    showMakePayment() {
        Toast.show('Make payment form would open here', 'info');
    },
    
    setupAutoPay() {
        Toast.show('Auto-pay setup wizard would open here', 'info');
    },
    
    schedulePayment() {
        Toast.show('Schedule payment form would open here', 'info');
    },
    
    viewPaymentMethods() {
        Toast.show('Payment methods management would open here', 'info');
    },
    
    viewDetails(paymentId) {
        Toast.show(`Viewing details for payment ${paymentId}`, 'info');
    },
    
    downloadReceipt(paymentId) {
        Toast.show(`Downloading receipt for payment ${paymentId}`, 'success');
    },
    
    cancelPayment(paymentId) {
        Toast.show(`Payment ${paymentId} has been cancelled`, 'warning');
    },
    
    retryPayment(paymentId) {
        Toast.show(`Retrying payment ${paymentId}...`, 'info');
    }
};

// Register the view
if (typeof window.Views !== 'undefined') {
    window.Views.payments = PaymentsView;
}

// Made with Bob
