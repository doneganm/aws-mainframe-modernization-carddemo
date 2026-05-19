/**
 * Dashboard View
 * Main landing page after login
 */

const DashboardView = {
    render() {
        const session = Storage.session.get();
        const userName = session ? session.name : 'User';
        const isAdmin = session ? session.isAdmin : false;

        return `
            <div class="dashboard">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Welcome, ${userName}!</h1>
                        <p class="page-description">Your credit card management dashboard</p>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="dashboard-stats">
                    <div class="card stat-card">
                        <div class="stat-label">Total Accounts</div>
                        <div class="stat-value">12</div>
                        <div class="stat-change positive">
                            <svg class="icon icon-small" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M7 14l5-5 5 5z"/>
                            </svg>
                            <span>+2 this month</span>
                        </div>
                    </div>

                    <div class="card stat-card">
                        <div class="stat-label">Active Cards</div>
                        <div class="stat-value">24</div>
                        <div class="stat-change positive">
                            <svg class="icon icon-small" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M7 14l5-5 5 5z"/>
                            </svg>
                            <span>+5 this month</span>
                        </div>
                    </div>

                    <div class="card stat-card">
                        <div class="stat-label">Total Balance</div>
                        <div class="stat-value">$45,230</div>
                        <div class="stat-change negative">
                            <svg class="icon icon-small" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                            </svg>
                            <span>-$1,200 this month</span>
                        </div>
                    </div>

                    <div class="card stat-card">
                        <div class="stat-label">Transactions Today</div>
                        <div class="stat-value">18</div>
                        <div class="stat-change positive">
                            <svg class="icon icon-small" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M7 14l5-5 5 5z"/>
                            </svg>
                            <span>+3 from yesterday</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Quick Actions</h3>
                    </div>
                    <div class="card-body">
                        <div class="quick-actions">
                            <button class="quick-action-btn" onclick="Router.navigate('accounts')">
                                <div class="quick-action-icon">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                                    </svg>
                                </div>
                                <span class="quick-action-text">View Accounts</span>
                            </button>

                            <button class="quick-action-btn" onclick="Router.navigate('cards')">
                                <div class="quick-action-icon">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                                    </svg>
                                </div>
                                <span class="quick-action-text">Manage Cards</span>
                            </button>

                            <button class="quick-action-btn" onclick="Router.navigate('transactions')">
                                <div class="quick-action-icon">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                    </svg>
                                </div>
                                <span class="quick-action-text">View Transactions</span>
                            </button>

                            <button class="quick-action-btn" onclick="Router.navigate('payments')">
                                <div class="quick-action-icon">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                    </svg>
                                </div>
                                <span class="quick-action-text">Make Payment</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Recent Transactions -->
                <div class="grid grid-cols-1 mt-2">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Recent Transactions</h3>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-container">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Card</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>05/13/2026</td>
                                            <td>Amazon Purchase</td>
                                            <td>****1234</td>
                                            <td>$89.99</td>
                                            <td><span class="badge badge-success">Approved</span></td>
                                        </tr>
                                        <tr>
                                            <td>05/13/2026</td>
                                            <td>Starbucks</td>
                                            <td>****5678</td>
                                            <td>$5.50</td>
                                            <td><span class="badge badge-success">Approved</span></td>
                                        </tr>
                                        <tr>
                                            <td>05/12/2026</td>
                                            <td>Gas Station</td>
                                            <td>****1234</td>
                                            <td>$45.00</td>
                                            <td><span class="badge badge-success">Approved</span></td>
                                        </tr>
                                        <tr>
                                            <td>05/12/2026</td>
                                            <td>Restaurant</td>
                                            <td>****5678</td>
                                            <td>$67.50</td>
                                            <td><span class="badge badge-success">Approved</span></td>
                                        </tr>
                                        <tr>
                                            <td>05/11/2026</td>
                                            <td>Online Shopping</td>
                                            <td>****1234</td>
                                            <td>$125.00</td>
                                            <td><span class="badge badge-success">Approved</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-ghost" onclick="Router.navigate('transactions')">
                                View All Transactions
                            </button>
                        </div>
                    </div>
                </div>

                ${isAdmin ? this.renderAdminSection() : ''}
            </div>
        `;
    },

    renderAdminSection() {
        return `
            <div class="card mt-2">
                <div class="card-header">
                    <h3 class="card-title">Administration</h3>
                </div>
                <div class="card-body">
                    <div class="quick-actions">
                        <button class="quick-action-btn" onclick="Router.navigate('users')">
                            <div class="quick-action-icon">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                </svg>
                            </div>
                            <span class="quick-action-text">Manage Users</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // Dashboard is initialized
        console.log('Dashboard initialized');
    }
};

// Made with Bob
