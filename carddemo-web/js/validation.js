// CardDemo - Validation Module
// Field validation rules matching COBOL business logic

const Validation = {
    // Validate user ID
    validateUserId(userId) {
        if (!userId || userId.trim() === '') {
            return { valid: false, message: 'User ID is required' };
        }
        if (userId.length !== 8) {
            return { valid: false, message: 'User ID must be exactly 8 characters' };
        }
        if (!/^[A-Z0-9]+$/.test(userId)) {
            return { valid: false, message: 'User ID must be alphanumeric' };
        }
        return { valid: true };
    },
    
    // Validate password
    validatePassword(password) {
        if (!password || password.trim() === '') {
            return { valid: false, message: 'Password is required' };
        }
        if (password.length !== 8) {
            return { valid: false, message: 'Password must be exactly 8 characters' };
        }
        return { valid: true };
    },
    
    // Validate account number
    validateAccountNumber(accountNumber) {
        if (!accountNumber || accountNumber.trim() === '') {
            return { valid: false, message: 'Account Number is required' };
        }
        if (accountNumber.length !== 11) {
            return { valid: false, message: 'Account Number must be exactly 11 digits' };
        }
        if (!/^\d{11}$/.test(accountNumber)) {
            return { valid: false, message: 'Account Number must be numeric' };
        }
        return { valid: true };
    },
    
    // Validate card number
    validateCardNumber(cardNumber) {
        if (!cardNumber || cardNumber.trim() === '') {
            return { valid: false, message: 'Card Number is required' };
        }
        if (cardNumber.length !== 16) {
            return { valid: false, message: 'Card Number must be exactly 16 digits' };
        }
        if (!/^\d{16}$/.test(cardNumber)) {
            return { valid: false, message: 'Card Number must be numeric' };
        }
        return { valid: true };
    },
    
    // Validate amount
    validateAmount(amount) {
        if (!amount || amount.trim() === '') {
            return { valid: false, message: 'Amount is required' };
        }
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) {
            return { valid: false, message: 'Amount must be numeric' };
        }
        if (numAmount <= 0) {
            return { valid: false, message: 'Amount must be greater than zero' };
        }
        if (numAmount > 999999999.99) {
            return { valid: false, message: 'Amount exceeds maximum allowed' };
        }
        // Check decimal places
        const decimalPart = amount.split('.')[1];
        if (decimalPart && decimalPart.length > 2) {
            return { valid: false, message: 'Amount can have at most 2 decimal places' };
        }
        return { valid: true, value: numAmount };
    },
    
    // Validate date
    validateDate(dateStr) {
        if (!dateStr || dateStr.trim() === '') {
            return { valid: false, message: 'Date is required' };
        }
        
        // Try to parse various date formats
        let date;
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            date = new Date(dateStr);
        } else if (/^\d{2}\/\d{2}\/\d{2}$/.test(dateStr)) {
            const parts = dateStr.split('/');
            date = new Date(2000 + parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
        } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
            const parts = dateStr.split('/');
            date = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
        } else {
            return { valid: false, message: 'Invalid date format (use MM/DD/YY or YYYY-MM-DD)' };
        }
        
        if (isNaN(date.getTime())) {
            return { valid: false, message: 'Invalid date' };
        }
        
        return { valid: true, value: date };
    },
    
    // Validate transaction type
    validateTransactionType(typeCode) {
        const validTypes = ['01', '02', '03', '04', '05'];
        if (!typeCode || !validTypes.includes(typeCode)) {
            return { valid: false, message: 'Invalid transaction type' };
        }
        return { valid: true };
    },
    
    // Validate category code
    validateCategoryCode(categoryCode) {
        if (!categoryCode || categoryCode.trim() === '') {
            return { valid: false, message: 'Category Code is required' };
        }
        if (!/^\d{4}$/.test(categoryCode)) {
            return { valid: false, message: 'Category Code must be 4 digits' };
        }
        return { valid: true };
    },
    
    // Validate description
    validateDescription(description, maxLength = 100) {
        if (!description || description.trim() === '') {
            return { valid: false, message: 'Description is required' };
        }
        if (description.length > maxLength) {
            return { valid: false, message: `Description cannot exceed ${maxLength} characters` };
        }
        return { valid: true };
    },
    
    // Validate name
    validateName(name, fieldName = 'Name', maxLength = 20) {
        if (!name || name.trim() === '') {
            return { valid: false, message: `${fieldName} is required` };
        }
        if (name.length > maxLength) {
            return { valid: false, message: `${fieldName} cannot exceed ${maxLength} characters` };
        }
        if (!/^[A-Za-z\s\-']+$/.test(name)) {
            return { valid: false, message: `${fieldName} contains invalid characters` };
        }
        return { valid: true };
    },
    
    // Validate menu option
    validateMenuOption(option, maxOption) {
        if (!option || option.trim() === '') {
            return { valid: false, message: 'Please select an option' };
        }
        const numOption = parseInt(option);
        if (isNaN(numOption)) {
            return { valid: false, message: 'Option must be numeric' };
        }
        if (numOption < 1 || numOption > maxOption) {
            return { valid: false, message: `Option must be between 1 and ${maxOption}` };
        }
        return { valid: true, value: numOption };
    },
    
    // Validate selection
    validateSelection(selection) {
        if (!selection || selection.trim() === '') {
            return { valid: false, message: 'Please make a selection' };
        }
        if (selection.toUpperCase() !== 'S') {
            return { valid: false, message: 'Enter S to select' };
        }
        return { valid: true };
    },
    
    // Validate SSN
    validateSSN(ssn) {
        if (!ssn || ssn.trim() === '') {
            return { valid: false, message: 'SSN is required' };
        }
        if (!/^\d{3}-\d{2}-\d{4}$/.test(ssn)) {
            return { valid: false, message: 'SSN must be in format XXX-XX-XXXX' };
        }
        return { valid: true };
    },
    
    // Validate phone number
    validatePhone(phone) {
        if (!phone || phone.trim() === '') {
            return { valid: true }; // Phone is optional
        }
        if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
            return { valid: false, message: 'Phone must be in format XXX-XXX-XXXX' };
        }
        return { valid: true };
    },
    
    // Validate zip code
    validateZipCode(zipCode) {
        if (!zipCode || zipCode.trim() === '') {
            return { valid: false, message: 'Zip Code is required' };
        }
        if (!/^\d{5}$/.test(zipCode)) {
            return { valid: false, message: 'Zip Code must be 5 digits' };
        }
        return { valid: true };
    },
    
    // Validate state code
    validateStateCode(stateCode) {
        if (!stateCode || stateCode.trim() === '') {
            return { valid: false, message: 'State Code is required' };
        }
        if (!/^[A-Z]{2}$/.test(stateCode)) {
            return { valid: false, message: 'State Code must be 2 uppercase letters' };
        }
        return { valid: true };
    },
    
    // Validate FICO score
    validateFicoScore(score) {
        if (!score || score.trim() === '') {
            return { valid: false, message: 'FICO Score is required' };
        }
        const numScore = parseInt(score);
        if (isNaN(numScore)) {
            return { valid: false, message: 'FICO Score must be numeric' };
        }
        if (numScore < 300 || numScore > 850) {
            return { valid: false, message: 'FICO Score must be between 300 and 850' };
        }
        return { valid: true, value: numScore };
    },
    
    // Validate user type
    validateUserType(userType) {
        if (!userType || userType.trim() === '') {
            return { valid: false, message: 'User Type is required' };
        }
        if (userType !== 'U' && userType !== 'A') {
            return { valid: false, message: 'User Type must be U (User) or A (Admin)' };
        }
        return { valid: true };
    },
    
    // Format amount for display
    formatAmount(amount) {
        const num = parseFloat(amount);
        if (isNaN(num)) return '0.00';
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Format date for display
    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    },
    
    // Pad string
    padLeft(str, length, char = '0') {
        return String(str).padStart(length, char);
    },
    
    padRight(str, length, char = ' ') {
        return String(str).padEnd(length, char);
    }
};

// Made with Bob
