/**
 * Toast Notification Component
 * Displays temporary notification messages
 */

const Toast = {
    container: null,

    init() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            console.error('Toast container not found');
        }
    },

    show(message, type = 'info', duration = 3000) {
        if (!this.container) this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const iconSvg = this.getIcon(type);
        
        toast.innerHTML = `
            ${iconSvg}
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close">
                <svg class="icon icon-small" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
        `;

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.remove(toast));

        this.container.appendChild(toast);

        if (duration > 0) {
            setTimeout(() => this.remove(toast), duration);
        }

        return toast;
    },

    getIcon(type) {
        const icons = {
            success: '<svg class="toast-icon icon" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
            error: '<svg class="toast-icon icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
            warning: '<svg class="toast-icon icon" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
            info: '<svg class="toast-icon icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
        };
        return icons[type] || icons.info;
    },

    remove(toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    },

    success(message, duration) {
        return this.show(message, 'success', duration);
    },

    error(message, duration) {
        return this.show(message, 'error', duration);
    },

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    },

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
};

// Made with Bob
