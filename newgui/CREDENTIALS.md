# CardDemo - Login Credentials

## New Modern GUI (newgui folder)

### Auto-Login Feature
The new GUI automatically logs you in as a demo user when you first access it. No login required!

### Switch User Option
To login as a different user:
1. Click your avatar in the top right corner
2. Select "Switch User" from the dropdown menu
3. Enter credentials below

### Available Credentials

**Regular User:**
- Username: `user`
- Password: `password`

**Admin User:**
- Username: `admin`  
- Password: `password`

---

## Original Mainframe GUI (carddemo-web folder)

### Available Credentials

**Admin Users:**
- Username: `ADMIN001` | Password: `PASSWORD`
- Username: `ADMIN002` | Password: `PASSWORD`

**Regular Users:**
- Username: `USER0001` | Password: `PASSWORD`
- Username: `USER0002` | Password: `PASSWORD`
- Username: `USER0003` | Password: `PASSWORD`
- Username: `USER0004` | Password: `PASSWORD`

### User Details

| User ID | Name | Type | Password |
|---------|------|------|----------|
| ADMIN001 | Admin User | Admin | PASSWORD |
| ADMIN002 | Super Admin | Admin | PASSWORD |
| USER0001 | John Doe | User | PASSWORD |
| USER0002 | Jane Smith | User | PASSWORD |
| USER0003 | Bob Johnson | User | PASSWORD |
| USER0004 | Alice Williams | User | PASSWORD |

---

## Quick Comparison

| Feature | Old GUI | New GUI |
|---------|---------|---------|
| **Login Required** | Yes | No (Auto-login) |
| **Username Format** | UPPERCASE (e.g., USER0001) | Lowercase (e.g., user) |
| **Password** | PASSWORD | password |
| **Switch User** | Logout required | Built-in option |
| **Session Timeout** | Yes | Yes (30 minutes) |

---

## Notes

- **New GUI**: Designed for ease of use with auto-login and simplified credentials
- **Old GUI**: Maintains mainframe-style authentication with uppercase user IDs
- Both systems use session management with automatic timeout
- Passwords are case-sensitive in both systems