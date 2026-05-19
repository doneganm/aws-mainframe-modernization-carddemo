# CardDemo Web Application - Testing Guide

## Quick Test Instructions

### 1. Open the Application
Simply open `index.html` in your web browser (Chrome, Firefox, Safari, or Edge recommended).

### 2. Login Screen Test
You should see:
- A green terminal screen with black background
- ASCII art "NATIONAL RESERVE NOTE" dollar bill
- Two input fields: User ID and Password
- Function keys at bottom: "ENTER=Sign-on  F3=Exit"

**Test Login:**
- User ID: `USER0001`
- Password: `PASSWORD`
- Press ENTER

### 3. Main Menu Test
After successful login, you should see:
```
Main Menu

 1. View Account
 2. List Credit Cards
 3. View Transactions
 4. Add Transaction
 5. Bill Payment
 6. Transaction Reports
 7. Admin Menu (if logged in as admin)

Please select an option : __
```

**If you DON'T see the numbered menu options**, check:
1. Browser console for JavaScript errors (F12 → Console tab)
2. Ensure all JavaScript files are loading correctly
3. Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)

### 4. Test Each Menu Option

#### Option 1: View Account
- Enter: `1` and press ENTER
- Enter account number: `00000000001`
- Press ENTER
- Should display account details and customer information
- Press F3 to go back

#### Option 2: List Credit Cards
- Enter: `2` and press ENTER
- Should display a list of credit cards
- Use F7/F8 to navigate pages
- Press F3 to go back

#### Option 3: View Transactions
- Enter: `3` and press ENTER
- Should display a list of transactions
- Type 'S' in the Sel column to view details
- Use F7/F8 to navigate pages
- Press F3 to go back

#### Option 4: Add Transaction
- Enter: `4` and press ENTER
- Fill in the form with:
  - Card Number: `4111111111111234`
  - Type Code: `01`
  - Category Code: `5411`
  - Amount: `100.00`
  - Description: `Test Transaction`
  - Merchant Name: `Test Store`
- Press ENTER to submit
- Press F3 to cancel

### 5. Admin Menu Test
Logout (F3 from main menu) and login as admin:
- User ID: `ADMIN001`
- Password: `PASSWORD`

Main menu should now show option 7. Select it to see:
```
Admin Menu

01. List Users
02. Add User
03. Update User
04. Delete User
```

## Troubleshooting

### Menu Options Not Displaying

**Problem**: After login, the main menu shows "Main Menu" title but no numbered options.

**Solutions**:
1. **Check Browser Console** (F12):
   - Look for JavaScript errors
   - Common issues: "Validation is not defined", "SessionManager is not defined"

2. **Verify File Loading Order** in index.html:
   ```html
   <script src="js/data-generator.js"></script>
   <script src="js/session-manager.js"></script>
   <script src="js/validation.js"></script>
   <script src="js/navigation.js"></script>
   <script src="js/screens/login.js"></script>
   <script src="js/screens/main-menu.js"></script>
   <script src="js/screens/admin-menu.js"></script>
   <script src="js/screens/all-screens.js"></script>
   <script src="js/screen-manager.js"></script>
   <script src="js/app.js"></script>
   ```

3. **Clear Browser Cache**:
   - Chrome: Ctrl+Shift+Delete → Clear cached images and files
   - Firefox: Ctrl+Shift+Delete → Cached Web Content
   - Safari: Cmd+Option+E

4. **Check localStorage**:
   - Open Console (F12)
   - Type: `localStorage.clear()` and press Enter
   - Refresh page (F5)

### Login Not Working

**Problem**: "Invalid User ID or Password" error

**Solutions**:
- Ensure User ID is UPPERCASE: `USER0001` not `user0001`
- Password is case-sensitive: `PASSWORD`
- User ID must be exactly 8 characters
- Password must be exactly 8 characters

### Data Not Loading

**Problem**: Console shows "Data loaded: - Users: 0"

**Solutions**:
1. Check if `data-generator.js` is loading
2. Open Console and type: `DataGenerator.reset()`
3. Refresh page

### Keyboard Navigation Not Working

**Problem**: F3, F7, F8 keys don't work

**Solutions**:
- Some browsers intercept function keys
- Try using a different browser
- Check if browser extensions are interfering
- Use ESC instead of F3 for back/exit

## Expected Console Output

When you first load the application, you should see in the console:
```
Generating synthetic data...
Generated: 50 customers, 100 accounts, 200 cards, 1000 transactions
CardDemo Application Starting...
No active session, showing login screen
Data loaded:
- Users: 6
- Customers: 50
- Accounts: 100+
- Cards: 200+
- Transactions: 1000+

=== Test Credentials ===
Admin User: ADMIN001 / PASSWORD
Regular User: USER0001 / PASSWORD
Regular User: USER0002 / PASSWORD
========================
```

## Sample Data for Testing

### Account Numbers (11 digits)
- `00000000001`
- `00000000002`
- `00000000003`
- `00000000010`
- `00000000020`

### Card Numbers (16 digits)
- `4111111111111234`
- `4111111111112345`
- `4111111111113456`

### Transaction IDs (16 characters)
- Check the transaction list screen for actual IDs
- Format: `T20240101000001`

## Visual Verification Checklist

✅ **Login Screen**
- [ ] Black background with green text
- [ ] ASCII art dollar bill visible
- [ ] Blue labels for "Tran:", "Prog:", "Date:", "Time:"
- [ ] Yellow titles
- [ ] Turquoise input labels
- [ ] Green input fields with underline
- [ ] Red error messages (when applicable)
- [ ] Yellow function keys at bottom

✅ **Main Menu**
- [ ] Title "Main Menu" in white/neutral color
- [ ] Numbered options 1-6 (or 1-7 for admin) in blue
- [ ] Each option has format: "01. Option Name"
- [ ] Input field for option selection
- [ ] Turquoise prompt "Please select an option :"
- [ ] Function keys showing "ENTER=Continue  F3=Exit"

✅ **Navigation**
- [ ] ENTER key submits forms
- [ ] F3 key goes back/exits
- [ ] F7/F8 keys navigate pages (on list screens)
- [ ] ESC key works as F3

## Performance Notes

- Initial data generation takes 1-2 seconds
- All data is stored in browser localStorage
- Session persists for 24 hours
- No server required - runs entirely in browser

## Browser-Specific Notes

### Chrome/Edge
- Works best, full F-key support
- localStorage works perfectly

### Firefox
- Full compatibility
- May need to allow localStorage in privacy settings

### Safari
- Works well on macOS
- May need to enable localStorage in Preferences → Privacy

### Mobile Browsers
- Not optimized for mobile
- Function keys not available
- Use desktop browser for best experience

## Need Help?

If menus still don't display:
1. Take a screenshot of the browser console (F12)
2. Note which browser and version you're using
3. Check if any errors appear in red in the console
4. Verify all .js files are in the correct directories