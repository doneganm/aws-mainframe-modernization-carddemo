/**
 * Customers View
 * Displays customer information with search, filter, and management capabilities
 */

const CustomersView = {
    name: 'customers',
    
    // Generate demo customer data
    generateCustomers() {
        const customers = [];
        const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Mary', 'William', 'Patricia', 'Richard', 'Jennifer', 'Thomas'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
        const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
        const statuses = ['Active', 'Active', 'Active', 'Inactive', 'Suspended'];
        
        for (let i = 1; i <= 50; i++) {
            const custId = String(i).padStart(9, '0');
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const accountCount = Math.floor(Math.random() * 5) + 1;
            const cardCount = Math.floor(Math.random() * 3) + 1;
            const totalBalance = (Math.random() * 100000 + 5000).toFixed(2);
            
            customers.push({
                customerId: custId,
                firstName: firstName,
                lastName: lastName,
                fullName: `${firstName} ${lastName}`,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
                phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
                address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Maple', 'Cedar', 'Pine'][Math.floor(Math.random() * 5)]} St`,
                city: ['Los Angeles', 'New York', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'][Math.floor(Math.random() * 6)],
                state: states[Math.floor(Math.random() * states.length)],
                zipCode: String(Math.floor(Math.random() * 90000) + 10000),
                status: statuses[Math.floor(Math.random() * statuses.length)],
                accountCount: accountCount,
                cardCount: cardCount,
                totalBalance: totalBalance,
                creditScore: Math.floor(Math.random() * 300) + 500,
                memberSince: new Date(2015 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
                lastContact: new Date(2026, 4, Math.floor(Math.random() * 13) + 1).toISOString().split('T')[0]
            });
        }
        
        return customers;
    },
    
    render() {
        const customers = this.generateCustomers();
        const activeCustomers = customers.filter(c => c.status === 'Active').length;
        const avgBalance = customers.reduce((sum, c) => sum + parseFloat(c.totalBalance), 0) / customers.length;
        const totalAccounts = customers.reduce((sum, c) => sum + c.accountCount, 0);
        
        return `
            <div class="view-header">
                <div>
                    <h1>Customer Management</h1>
                    <p class="text-secondary">View and manage customer information</p>
                </div>
                <button class="btn btn-primary" onclick="CustomersView.showAddCustomer()">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        <path d="M8 1a.5.5 0 0 1 .5.5v6h6a.5.5 0 0 1 0 1h-6v6a.5.5 0 0 1-1 0v-6h-6a.5.5 0 0 1 0-1h6v-6A.5.5 0 0 1 8 1z"/>
                    </svg>
                    New Customer
                </button>
            </div>
            
            <div class="stats-grid" style="margin-bottom: 2rem;">
                <div class="stat-card">
                    <div class="stat-label">Total Customers</div>
                    <div class="stat-value">${customers.length}</div>
                    <div class="stat-change positive">+5 this month</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Active Customers</div>
                    <div class="stat-value">${activeCustomers}</div>
                    <div class="stat-change positive">${Math.round(activeCustomers/customers.length*100)}% active</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Avg Balance</div>
                    <div class="stat-value">$${avgBalance.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                    <div class="stat-change">Per customer</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Accounts</div>
                    <div class="stat-value">${totalAccounts}</div>
                    <div class="stat-change">${(totalAccounts/customers.length).toFixed(1)} avg per customer</div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="search-filter-bar">
                        <div class="search-box">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            <input type="text" id="customerSearch" placeholder="Search by name, email, customer ID..." 
                                   onkeyup="CustomersView.filterCustomers()">
                        </div>
                        <select id="statusFilter" onchange="CustomersView.filterCustomers()" class="filter-select">
                            <option value="">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                        <select id="stateFilter" onchange="CustomersView.filterCustomers()" class="filter-select">
                            <option value="">All States</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                            <option value="IL">Illinois</option>
                        </select>
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Accounts</th>
                                <th>Cards</th>
                                <th>Total Balance</th>
                                <th>Credit Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="customersTableBody">
                            ${customers.map(customer => `
                                <tr data-customer-id="${customer.customerId}" 
                                    data-status="${customer.status}"
                                    data-state="${customer.state}">
                                    <td><strong>${customer.customerId}</strong></td>
                                    <td>
                                        <div><strong>${customer.fullName}</strong></div>
                                        <div class="text-secondary" style="font-size: 0.875rem;">Member since ${customer.memberSince}</div>
                                    </td>
                                    <td>${customer.email}</td>
                                    <td>${customer.phone}</td>
                                    <td>
                                        <div>${customer.city}, ${customer.state}</div>
                                        <div class="text-secondary" style="font-size: 0.875rem;">${customer.zipCode}</div>
                                    </td>
                                    <td><span class="badge badge-${customer.status === 'Active' ? 'success' : customer.status === 'Inactive' ? 'secondary' : 'warning'}">${customer.status}</span></td>
                                    <td class="text-center">${customer.accountCount}</td>
                                    <td class="text-center">${customer.cardCount}</td>
                                    <td class="text-right">$${parseFloat(customer.totalBalance).toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                                    <td class="text-center">
                                        <span class="badge badge-${customer.creditScore >= 700 ? 'success' : customer.creditScore >= 600 ? 'warning' : 'danger'}">
                                            ${customer.creditScore}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn-icon" onclick="CustomersView.viewDetails('${customer.customerId}')" title="View Details">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/>
                                            </svg>
                                        </button>
                                        <button class="btn-icon" onclick="CustomersView.editCustomer('${customer.customerId}')" title="Edit">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10z"/>
                                            </svg>
                                        </button>
                                        <button class="btn-icon" onclick="CustomersView.contactCustomer('${customer.customerId}')" title="Contact">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
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
                        Showing <strong id="showingCount">${customers.length}</strong> of <strong>${customers.length}</strong> customers
                    </div>
                </div>
            </div>
        `;
    },
    
    filterCustomers() {
        const searchTerm = document.getElementById('customerSearch').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const stateFilter = document.getElementById('stateFilter').value;
        const rows = document.querySelectorAll('#customersTableBody tr');
        
        let visibleCount = 0;
        
        rows.forEach(row => {
            const customerId = row.dataset.customerId;
            const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            const status = row.dataset.status;
            const state = row.dataset.state;
            
            const matchesSearch = customerId.includes(searchTerm) || name.includes(searchTerm) || email.includes(searchTerm);
            const matchesStatus = !statusFilter || status === statusFilter;
            const matchesState = !stateFilter || state === stateFilter;
            
            if (matchesSearch && matchesStatus && matchesState) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        document.getElementById('showingCount').textContent = visibleCount;
    },
    
    viewDetails(customerId) {
        Toast.show(`Viewing details for customer ${customerId}`, 'info');
    },
    
    editCustomer(customerId) {
        Toast.show(`Editing customer ${customerId}`, 'info');
    },
    
    contactCustomer(customerId) {
        Toast.show(`Opening contact form for customer ${customerId}`, 'info');
    },
    
    showAddCustomer() {
        Toast.show('Add new customer form would open here', 'info');
    }
};

// Register the view
if (typeof window.Views !== 'undefined') {
    window.Views.customers = CustomersView;
}

// Made with Bob
