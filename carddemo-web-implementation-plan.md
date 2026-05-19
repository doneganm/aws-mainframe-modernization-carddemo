# CardDemo Web Application - Implementation Plan

## Overview
Create a complete HTML/CSS/JavaScript web application that replicates the CardDemo mainframe CICS application experience, including all screens, user journeys, and business logic.

## Project Structure

```
carddemo-web/
├── index.html                 # Main entry point
├── css/
│   ├── mainframe.css         # Core mainframe terminal styling
│   └── screens.css           # Screen-specific styles
├── js/
│   ├── app.js                # Application initialization
│   ├── screen-manager.js     # Screen rendering and transitions
│   ├── navigation.js         # Keyboard navigation (F3, F7, F8, ENTER)
│   ├── session-manager.js    # User session and authentication
│   ├── validation.js         # Field validation rules
│   ├── data-generator.js     # Synthetic data generation
│   └── screens/
│       ├── login.js          # COSGN00C - Login screen
│       ├── main-menu.js      # COMEN01C - Main menu
│       ├── admin-menu.js     # COADM01C - Admin menu
│       ├── account-view.js   # COACTVWC - Account view
│       ├── account-update.js # COACTUPC - Account update
│       ├── card-list.js      # COCRDLIC - Card list
│       ├── card-detail.js    # COCRDSLC - Card detail
│       ├── card-update.js    # COCRDUPC - Card update
│       ├── transaction-list.js   # COTRN00C - Transaction list
│       ├── transaction-detail.js # COTRN01C - Transaction detail
│       ├── transaction-add.js    # COTRN02C - Add transaction
│       ├── bill-payment.js   # COBIL00C - Bill payment
│       ├── reports.js        # CORPT00C - Reports
│       ├── user-list.js      # COUSR00C - User list
│       ├── user-add.js       # COUSR01C - Add user
│       ├── user-update.js    # COUSR02C - Update user
│       └── user-delete.js    # COUSR03C - Delete user
├── data/
│   └── seed-data.json        # Initial synthetic data
└── README.md                 # Usage instructions
```

## Screen Specifications

### 1. Login Screen (COSGN00)
- **Layout**: 24x80 character grid
- **Features**:
  - User ID input (8 characters)
  - Password input (8 characters, masked)
  - ASCII art "National Reserve Note"
  - Date/Time display
  - Error message area
- **Navigation**: ENTER=Sign-on, F3=Exit
- **Users**:
  - ADMIN001 / PASSWORD (Admin)
  - USER0001 / PASSWORD (Regular user)

### 2. Main Menu (COMEN01)
- **Regular User Options**:
  1. View Account
  2. List Credit Cards
  3. View Transactions
  4. Add Transaction
  5. Bill Payment
  6. Transaction Reports
  7. (Admin Menu - if admin)
- **Navigation**: ENTER=Continue, F3=Exit

### 3. Account View (COACTVW)
- **Display Fields**:
  - Account Number (11 digits)
  - Active Status (Y/N)
  - Credit Limit
  - Cash Credit Limit
  - Current Balance
  - Current Cycle Credit/Debit
  - Customer Details (Name, DOB, SSN, FICO, Address, Phone)
- **Navigation**: F3=Exit

### 4. Credit Card List (COCRDLI)
- **Features**:
  - Account Number filter
  - Card Number filter
  - Paginated list (7 cards per page)
  - Selection capability
- **Navigation**: F3=Exit, F7=Backward, F8=Forward

### 5. Transaction List (COTRN00)
- **Features**:
  - Transaction ID search
  - Paginated list (10 transactions per page)
  - Selection for details
  - Date, Description, Amount display
- **Navigation**: ENTER=Continue, F3=Back, F7=Backward, F8=Forward

### 6. Transaction Detail (COTRN01)
- **Display Fields**:
  - Transaction ID
  - Type and Category
  - Amount
  - Merchant details
  - Card number
  - Timestamps
- **Navigation**: F3=Back

### 7. Add Transaction (COTRN02)
- **Input Fields**:
  - Account Number
  - Transaction Type
  - Category Code
  - Amount
  - Description
  - Merchant details
- **Validation**: Required fields, numeric amounts, valid account
- **Navigation**: ENTER=Submit, F3=Cancel

### 8. Bill Payment (COBIL00)
- **Input Fields**:
  - Account Number
  - Payment Amount
  - Payment Date
- **Navigation**: ENTER=Submit, F3=Cancel

### 9. Transaction Reports (CORPT00)
- **Options**:
  - Date range selection
  - Account filter
  - Report generation
- **Navigation**: ENTER=Generate, F3=Back

### 10. Admin Menu (COADM01)
- **Admin Options**:
  1. List Users
  2. Add User
  3. Update User
  4. Delete User
  5. Transaction Type Management (if DB2 module)
- **Navigation**: ENTER=Continue, F3=Back

### 11. User Management Screens (COUSR00-03)
- **List Users**: Paginated user list
- **Add User**: Create new user with ID, name, password, type
- **Update User**: Modify existing user details
- **Delete User**: Remove user with confirmation
- **Navigation**: Various based on screen

## Data Structures

### Account Record (CVACT01Y)
```javascript
{
  accountId: "11111111111",      // 11 digits
  activeStatus: "Y",             // Y/N
  currentBalance: 5432.10,       // Decimal
  creditLimit: 10000.00,
  cashCreditLimit: 2000.00,
  openDate: "2020-01-15",
  expirationDate: "2025-01-15",
  reissueDate: "2023-01-15",
  currentCycleCredit: 1500.00,
  currentCycleDebit: 2000.00,
  addressZip: "10001",
  groupId: "GROUP001"
}
```

### Customer Record (CVCUS01Y)
```javascript
{
  customerId: "000000001",       // 9 digits
  firstName: "John",
  middleName: "Q",
  lastName: "Public",
  dateOfBirth: "1980-05-15",
  ssn: "123-45-6789",
  ficoScore: 750,
  addressLine1: "123 Main Street",
  addressLine2: "Apt 4B",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "USA",
  phone1: "212-555-1234",
  phone2: "212-555-5678",
  governmentId: "DL123456789",
  eftAccountId: "EFT0001",
  primaryCardHolder: "Y"
}
```

### Card Record (CVACT02Y)
```javascript
{
  cardNumber: "4111111111111111", // 16 digits
  accountId: "11111111111",
  activeStatus: "Y",
  expirationDate: "12/25",
  cvv: "123"
}
```

### Transaction Record (CVTRA05Y)
```javascript
{
  transactionId: "T20240101000001", // 16 chars
  typeCode: "01",                   // 2 chars
  categoryCode: "5411",             // 4 digits
  source: "POS",
  description: "GROCERY STORE PURCHASE",
  amount: 125.50,
  merchantId: "123456789",
  merchantName: "ACME GROCERY",
  merchantCity: "NEW YORK",
  merchantZip: "10001",
  cardNumber: "4111111111111111",
  originalTimestamp: "2024-01-01T10:30:00",
  processedTimestamp: "2024-01-01T10:30:05"
}
```

### User Security Record (CSUSR01Y)
```javascript
{
  userId: "USER0001",        // 8 chars
  firstName: "John",
  lastName: "Doe",
  password: "PASSWORD",      // 8 chars
  userType: "U"             // U=User, A=Admin
}
```

## Styling Guidelines

### Colors (Mainframe Terminal)
- Background: `#000000` (Black)
- Default Text: `#00FF00` (Green)
- Blue: `#5555FF`
- Yellow: `#FFFF55`
- Turquoise: `#00FFFF`
- Red: `#FF5555`
- Neutral/White: `#FFFFFF`

### Typography
- Font: `'Courier New', Courier, monospace`
- Size: `16px` for 80-column display
- Line Height: `1.2`

### Layout
- Fixed 24 rows × 80 columns
- Character-based positioning
- No proportional spacing

### Field Attributes
- Input fields: Underlined, green text
- Protected fields: Blue text
- Error messages: Red, bright
- Labels: Turquoise
- Titles: Yellow

## Navigation Implementation

### Keyboard Shortcuts
- **ENTER**: Submit/Continue
- **F3**: Exit/Back
- **F7**: Page Backward
- **F8**: Page Forward
- **ESC**: Cancel current operation

### Screen Flow
```
Login (CC00)
  ↓
Main Menu (CM00)
  ├→ Account View (CAVW)
  ├→ Card List (CCLI) → Card Detail (CCDL) → Card Update (CCUP)
  ├→ Transaction List (CT00) → Transaction Detail (CT01)
  ├→ Add Transaction (CT02)
  ├→ Bill Payment (CB00)
  ├→ Reports (CR00)
  └→ Admin Menu (CA00)
      ├→ User List (CU00)
      ├→ Add User (CU01)
      ├→ Update User (CU02)
      └→ Delete User (CU03)
```

## Validation Rules

### User ID
- Length: Exactly 8 characters
- Format: Alphanumeric
- Required: Yes

### Password
- Length: Exactly 8 characters
- Required: Yes

### Account Number
- Length: Exactly 11 digits
- Format: Numeric only
- Required: Yes

### Card Number
- Length: Exactly 16 digits
- Format: Numeric only
- Validation: Luhn algorithm (optional)

### Transaction Amount
- Format: Numeric with 2 decimal places
- Range: 0.01 to 999,999,999.99
- Required: Yes

### Date Fields
- Format: YYYY-MM-DD or MM/DD/YY
- Validation: Valid date

## Synthetic Data Generation

### Seed Data Requirements
- 10 user accounts (5 regular, 5 admin)
- 50 customer records
- 100 account records
- 200 credit card records
- 1000 transaction records

### Data Relationships
- Each customer has 1-3 accounts
- Each account has 1-2 cards
- Each card has 5-20 transactions
- Transactions span last 90 days

## Implementation Phases

### Phase 1: Core Framework ✓
- [x] Project structure
- [x] Mainframe CSS styling
- [x] Screen manager
- [x] Navigation handler
- [x] Session manager

### Phase 2: Authentication & Menus
- [ ] Login screen
- [ ] Main menu
- [ ] Admin menu
- [ ] User authentication
- [ ] Session persistence

### Phase 3: Account & Card Screens
- [ ] Account view
- [ ] Account update
- [ ] Card list
- [ ] Card detail
- [ ] Card update

### Phase 4: Transaction Screens
- [ ] Transaction list
- [ ] Transaction detail
- [ ] Add transaction
- [ ] Bill payment
- [ ] Reports

### Phase 5: Admin Screens
- [ ] User list
- [ ] Add user
- [ ] Update user
- [ ] Delete user

### Phase 6: Data & Testing
- [ ] Synthetic data generator
- [ ] Data persistence (localStorage)
- [ ] End-to-end testing
- [ ] Documentation

## Testing Checklist

### User Journeys
- [ ] Regular user login → view account → view cards → view transactions
- [ ] Regular user login → add transaction → view updated balance
- [ ] Regular user login → make bill payment
- [ ] Admin user login → list users → add new user
- [ ] Admin user login → update user → verify changes
- [ ] Admin user login → delete user → confirm deletion
- [ ] Invalid login attempts → error messages
- [ ] Navigation with F3/F7/F8 keys
- [ ] Field validation on all input screens
- [ ] Pagination on list screens

### Edge Cases
- [ ] Empty result sets
- [ ] Maximum field lengths
- [ ] Invalid data entry
- [ ] Session timeout
- [ ] Concurrent user sessions

## Deliverables

1. **Complete Web Application**
   - All HTML/CSS/JavaScript files
   - Fully functional screens
   - Synthetic data

2. **README.md**
   - Installation instructions
   - Usage guide
   - User credentials
   - Feature list

3. **Documentation**
   - Screen navigation map
   - Data structure reference
   - API documentation (if applicable)

## Success Criteria

✅ All 15+ screens implemented and functional
✅ Authentic mainframe terminal look and feel
✅ Complete user journeys for regular and admin users
✅ Proper field validation and error handling
✅ Keyboard navigation (F3, F7, F8, ENTER)
✅ Synthetic data that matches COBOL structures
✅ Session management and authentication
✅ Responsive to 80-column terminal width
✅ Comprehensive documentation

## Next Steps

1. Switch to Code mode to begin implementation
2. Create base HTML structure and CSS framework
3. Implement screen manager and navigation
4. Build screens incrementally, testing each
5. Generate synthetic data
6. Perform end-to-end testing
7. Create documentation