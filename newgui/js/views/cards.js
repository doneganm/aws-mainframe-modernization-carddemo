/**
 * Cards View
 * Displays credit/debit cards with search, filter, and management capabilities
 */

const CardsView = {
    name: 'cards',
    
    // Generate demo card data
    generateCards() {
        const cards = [];
        const cardTypes = ['Visa', 'Mastercard', 'American Express', 'Discover'];
        const statuses = ['Active', 'Active', 'Active', 'Blocked', 'Expired'];
        const cardCategories = ['Gold', 'Platinum', 'Standard', 'Business'];
        
        for (let i = 1; i <= 30; i++) {
            const cardNum = `**** **** **** ${String(1000 + i).padStart(4, '0')}`;
            const fullCardNum = String(4000000000000000 + i).padStart(16, '0');
            const accountId = String(Math.floor(Math.random() * 100) + 1).padStart(11, '0');
            const custId = String(Math.floor(Math.random() * 1000) + 1).padStart(9, '0');
            const creditLimit = (Math.random() * 25000 + 5000).toFixed(2);
            const balance = (Math.random() * parseFloat(creditLimit) * 0.7).toFixed(2);
            const expMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
            const expYear = String(2025 + Math.floor(Math.random() * 5));
            
            cards.push({
                cardNumber: cardNum,
                fullCardNumber: fullCardNum,
                accountId: accountId,
                customerId: custId,
                cardType: cardTypes[Math.floor(Math.random() * cardTypes.length)],
                category: cardCategories[Math.floor(Math.random() * cardCategories.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                creditLimit: creditLimit,
                balance: balance,
                availableCredit: (parseFloat(creditLimit) - parseFloat(balance)).toFixed(2),
                expiryDate: `${expMonth}/${expYear}`,
                issueDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
                lastUsed: new Date(2026, 4, Math.floor(Math.random() * 13) + 1).toISOString().split('T')[0]
            });
        }
        
        return cards;
    },
    
    render() {
        const cards = this.generateCards();
        
        return `
            <div class="view-header">
                <div>
                    <h1>Card Management</h1>
                    <p class="text-secondary">View and manage credit and debit cards</p>
                </div>
                <button class="btn btn-primary" onclick="CardsView.showIssueCard()">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                    </svg>
                    Issue New Card
                </button>
            </div>
            
            <div class="stats-grid" style="margin-bottom: 2rem;">
                <div class="stat-card">
                    <div class="stat-label">Total Cards</div>
                    <div class="stat-value">${cards.length}</div>
                    <div class="stat-change positive">+3 this month</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Active Cards</div>
                    <div class="stat-value">${cards.filter(c => c.status === 'Active').length}</div>
                    <div class="stat-change positive">92% active rate</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Credit Limit</div>
                    <div class="stat-value">$${cards.reduce((sum, c) => sum + parseFloat(c.creditLimit), 0).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                    <div class="stat-change">Across all cards</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Available Credit</div>
                    <div class="stat-value">$${cards.reduce((sum, c) => sum + parseFloat(c.availableCredit), 0).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                    <div class="stat-change positive">68% available</div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="search-filter-bar">
                        <div class="search-box">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            <input type="text" id="cardSearch" placeholder="Search by card number, account, customer..." 
                                   onkeyup="CardsView.filterCards()">
                        </div>
                        <select id="cardStatusFilter" onchange="CardsView.filterCards()" class="filter-select">
                            <option value="">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Blocked">Blocked</option>
                            <option value="Expired">Expired</option>
                        </select>
                        <select id="cardTypeFilter" onchange="CardsView.filterCards()" class="filter-select">
                            <option value="">All Types</option>
                            <option value="Visa">Visa</option>
                            <option value="Mastercard">Mastercard</option>
                            <option value="American Express">American Express</option>
                            <option value="Discover">Discover</option>
                        </select>
                        <select id="categoryFilter" onchange="CardsView.filterCards()" class="filter-select">
                            <option value="">All Categories</option>
                            <option value="Gold">Gold</option>
                            <option value="Platinum">Platinum</option>
                            <option value="Standard">Standard</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Card Number</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Account ID</th>
                                <th>Status</th>
                                <th>Credit Limit</th>
                                <th>Balance</th>
                                <th>Available</th>
                                <th>Expiry</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="cardsTableBody">
                            ${cards.map(card => `
                                <tr data-card-number="${card.fullCardNumber}" 
                                    data-status="${card.status}" 
                                    data-type="${card.cardType}"
                                    data-category="${card.category}">
                                    <td><strong>${card.cardNumber}</strong></td>
                                    <td>
                                        <span class="badge badge-${card.cardType === 'Visa' ? 'primary' : card.cardType === 'Mastercard' ? 'warning' : 'info'}">
                                            ${card.cardType}
                                        </span>
                                    </td>
                                    <td><span class="badge badge-secondary">${card.category}</span></td>
                                    <td>${card.accountId}</td>
                                    <td><span class="badge badge-${card.status === 'Active' ? 'success' : card.status === 'Blocked' ? 'danger' : 'secondary'}">${card.status}</span></td>
                                    <td class="text-right">$${parseFloat(card.creditLimit).toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                                    <td class="text-right">$${parseFloat(card.balance).toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                                    <td class="text-right">$${parseFloat(card.availableCredit).toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                                    <td>${card.expiryDate}</td>
                                    <td>
                                        <button class="btn-icon" onclick="CardsView.viewDetails('${card.fullCardNumber}')" title="View Details">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/>
                                            </svg>
                                        </button>
                                        ${card.status === 'Active' ? `
                                            <button class="btn-icon" onclick="CardsView.blockCard('${card.fullCardNumber}')" title="Block Card">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
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
                        Showing <strong id="showingCount">${cards.length}</strong> of <strong>${cards.length}</strong> cards
                    </div>
                </div>
            </div>
        `;
    },
    
    filterCards() {
        const searchTerm = document.getElementById('cardSearch').value.toLowerCase();
        const statusFilter = document.getElementById('cardStatusFilter').value;
        const typeFilter = document.getElementById('cardTypeFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;
        const rows = document.querySelectorAll('#cardsTableBody tr');
        
        let visibleCount = 0;
        
        rows.forEach(row => {
            const cardNumber = row.querySelector('td:first-child').textContent.toLowerCase();
            const accountId = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
            const status = row.dataset.status;
            const type = row.dataset.type;
            const category = row.dataset.category;
            
            const matchesSearch = cardNumber.includes(searchTerm) || accountId.includes(searchTerm);
            const matchesStatus = !statusFilter || status === statusFilter;
            const matchesType = !typeFilter || type === typeFilter;
            const matchesCategory = !categoryFilter || category === categoryFilter;
            
            if (matchesSearch && matchesStatus && matchesType && matchesCategory) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        document.getElementById('showingCount').textContent = visibleCount;
    },
    
    viewDetails(cardNumber) {
        Toast.show(`Viewing details for card ending in ${cardNumber.slice(-4)}`, 'info');
    },
    
    blockCard(cardNumber) {
        Toast.show(`Card ending in ${cardNumber.slice(-4)} has been blocked`, 'warning');
    },
    
    showIssueCard() {
        Toast.show('Issue new card form would open here', 'info');
    }
};

// Register the view
if (typeof window.Views !== 'undefined') {
    window.Views.cards = CardsView;
}

// Made with Bob
