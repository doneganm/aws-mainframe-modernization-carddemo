# CardDemo Modern GUI - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start a Web Server

Navigate to the `newgui` folder and start a local web server:

```bash
# Using Python 3 (recommended)
python -m http.server 8000

# OR using Node.js
npx http-server -p 8000

# OR using PHP
php -S localhost:8000
```

### Step 2: Open in Browser

Open your web browser and navigate to:
```
http://localhost:8000
```

### Step 3: Login

Use these credentials to login:

**Regular User:**
- Username: `user`
- Password: `password`

**Admin User (with additional permissions):**
- Username: `admin`
- Password: `password`

## ✨ What You'll See

### Login Screen
- Modern, clean login interface
- Credentials displayed for easy access
- Responsive design

### Dashboard
- **Stats Cards**: Overview of accounts, cards, balance, and transactions
- **Quick Actions**: One-click access to common tasks
- **Recent Transactions**: Latest activity at a glance
- **Admin Section**: Additional options for admin users

### Navigation
- **Sidebar**: Easy access to all sections
- **Global Search**: Search across accounts, cards, and transactions (Ctrl/Cmd + K)
- **User Menu**: Profile and logout options
- **Breadcrumbs**: Always know where you are

## 🎯 Key Features to Try

1. **Dashboard Overview**
   - View account statistics
   - See recent transactions
   - Use quick action buttons

2. **Navigation**
   - Click sidebar items to explore different sections
   - Use breadcrumbs to navigate back
   - Try the global search (Ctrl/Cmd + K)

3. **User Menu**
   - Click your avatar in the top right
   - Access profile and settings
   - Logout when done

4. **Admin Features** (admin user only)
   - Access user management
   - View admin-specific options

## 🔧 Troubleshooting

### Port Already in Use
If port 8000 is already in use, try a different port:
```bash
python -m http.server 8080
```
Then navigate to `http://localhost:8080`

### Browser Compatibility
The application works best on:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

### Clear Cache
If you see old content, clear your browser cache:
- Chrome/Edge: Ctrl+Shift+Delete
- Firefox: Ctrl+Shift+Delete
- Safari: Cmd+Option+E

## 📱 Mobile Access

The application is fully responsive! Access it from your mobile device:

1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. On your mobile device, navigate to:
   ```
   http://YOUR_IP_ADDRESS:8000
   ```

## 🎨 Customization

Want to customize the look? Edit these files:

- **Colors**: `css/design-system.css` (CSS variables at the top)
- **Components**: `css/components.css`
- **Layout**: `css/app.css`

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DESIGN-ANALYSIS.md](DESIGN-ANALYSIS.md) for design rationale
- Explore the code in the `js/` folder

## 💡 Tips

- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + K`: Focus global search
  - `Escape`: Close dropdowns/modals

- **Session Management**:
  - Sessions expire after 30 minutes of inactivity
  - You'll be automatically redirected to login

- **Demo Data**:
  - All data is currently mock data for demonstration
  - Real data integration can be added via the data service layer

## 🆘 Need Help?

- Check the browser console (F12) for error messages
- Review the README.md for detailed information
- Ensure JavaScript is enabled in your browser

---

**Enjoy exploring the modern CardDemo GUI!** 🎉