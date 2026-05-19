/**
 * Client-Side Router
 * Handles navigation and view rendering
 */

const Router = {
    routes: {
        'login': LoginView,
        'dashboard': DashboardView,
        'accounts': AccountsView,
        'cards': CardsView,
        'transactions': TransactionsView,
        'customers': CustomersView,
        'reports': ReportsView,
        'payments': PaymentsView,
        'users': { render: () => '<div class="empty-state"><h2>User Management</h2><p>Coming soon...</p></div>', init: () => {} }
    },

    currentRoute: null,

    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });

        // Handle initial route
        this.handleRoute();

        // Setup navigation links
        this.setupNavigation();
    },

    setupNavigation() {
        // Handle nav link clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                if (route) {
                    this.navigate(route);
                }
            });
        });

        // Handle logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Handle switch user
        const switchUserBtn = document.getElementById('switch-user-btn');
        if (switchUserBtn) {
            switchUserBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchUser();
            });
        }

        // Handle menu toggle for mobile
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }

        // Handle user dropdown
        const userButton = document.querySelector('.user-button');
        const userDropdown = document.getElementById('user-dropdown');
        if (userButton && userDropdown) {
            userButton.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                userDropdown.classList.remove('show');
            });
        }
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        let session = Storage.session.get();

        // Auto-login if no session exists
        if (!session) {
            // Create default session for demo
            Storage.session.set({
                userId: 'USER0001',
                username: 'user',
                name: 'Demo User',
                type: 'user',
                isAdmin: false
            });
            session = Storage.session.get();
        }

        // Always redirect to dashboard if trying to access login
        if (hash === 'login') {
            this.navigate('dashboard', false);
            return;
        }

        this.loadRoute(hash);
    },

    loadRoute(routeName) {
        const route = this.routes[routeName];
        
        if (!route) {
            console.error(`Route not found: ${routeName}`);
            this.navigate('dashboard');
            return;
        }

        this.currentRoute = routeName;

        // Update UI based on route
        if (routeName === 'login') {
            this.hideAppShell();
        } else {
            this.showAppShell();
            this.updateNavigation(routeName);
            this.updateBreadcrumbs(routeName);
        }

        // Render the view
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.innerHTML = route.render();
            
            // Initialize the view
            if (route.init) {
                route.init();
            }
        }
    },

    navigate(routeName, pushState = true) {
        if (pushState) {
            window.history.pushState({}, '', `#${routeName}`);
        }
        this.handleRoute();
    },

    hideAppShell() {
        const header = document.querySelector('.app-header');
        const sidebar = document.querySelector('.app-sidebar');
        const breadcrumbs = document.querySelector('.breadcrumbs');
        
        if (header) header.style.display = 'none';
        if (sidebar) sidebar.style.display = 'none';
        if (breadcrumbs) breadcrumbs.style.display = 'none';
    },

    showAppShell() {
        const header = document.querySelector('.app-header');
        const sidebar = document.querySelector('.app-sidebar');
        const breadcrumbs = document.querySelector('.breadcrumbs');
        const session = Storage.session.get();
        
        if (header) header.style.display = 'block';
        if (sidebar) sidebar.style.display = 'block';
        if (breadcrumbs) breadcrumbs.style.display = 'block';

        // Update user info in header
        if (session) {
            const userInitials = document.getElementById('user-initials');
            const userName = document.getElementById('user-name');
            
            if (userInitials) {
                userInitials.textContent = session.name.charAt(0).toUpperCase();
            }
            if (userName) {
                userName.textContent = session.name;
            }

            // Show/hide admin nav
            const adminNav = document.getElementById('admin-nav');
            if (adminNav) {
                adminNav.style.display = session.isAdmin ? 'block' : 'none';
            }
        }
    },

    updateNavigation(routeName) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current route
        const activeLink = document.querySelector(`.nav-link[data-route="${routeName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },

    updateBreadcrumbs(routeName) {
        const breadcrumbList = document.getElementById('breadcrumb-list');
        if (!breadcrumbList) return;

        const routeNames = {
            'dashboard': 'Dashboard',
            'accounts': 'Accounts',
            'cards': 'Cards',
            'transactions': 'Transactions',
            'reports': 'Reports',
            'payments': 'Payments',
            'users': 'User Management'
        };

        const routeTitle = routeNames[routeName] || routeName;

        if (routeName === 'dashboard') {
            breadcrumbList.innerHTML = '<li class="breadcrumb-item">Home</li>';
        } else {
            breadcrumbList.innerHTML = `
                <li class="breadcrumb-item"><a href="#dashboard">Home</a></li>
                <li class="breadcrumb-item">${routeTitle}</li>
            `;
        }
    },

    logout() {
        Storage.session.clear();
        Toast.info('You have been logged out');
        setTimeout(() => {
            this.navigate('login');
        }, 500);
    },

    switchUser() {
        Storage.session.clear();
        this.navigate('login');
    }
};

// Made with Bob
