export function  validatePhoneNumber (phoneNumber) {
    // Regular expression pattern for phone number starting with 05 and having 10 digits
    const regexPattern = /^05\d{8}$/;
    
    return regexPattern.test(phoneNumber);
}

export function  validateFullName (fullName) {
    // Regular expression pattern for a valid full name
    // This pattern allows letters (both uppercase and lowercase), spaces, and hyphens
    const regexPattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    
    return regexPattern.test(fullName);
}

export function validatePassword (password) {
    const minLength = 8;
    const maxLength = 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= minLength && password.length <= maxLength;

    if (!isValidLength) {
        return { isValid: false, message: `Password must be between ${minLength} and ${maxLength} characters long.` };
    }
    if (!hasUpperCase) {
        return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!hasLowerCase) {
        return { isValid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    if (!hasDigit) {
        return { isValid: false, message: 'Password must contain at least one digit.' };
    }
    if (!hasSpecialChar) {
        return { isValid: false, message: 'Password must contain at least one special character.' };
    }

    return { isValid: true, message: 'Password is valid.' };
}

export function formatDate(stringDate) {
    if (!(stringDate instanceof Date)) {
      return '';
    }
    
    const day = String(stringDate.getDate()).padStart(2, '0');
    const month = String(stringDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = stringDate.getFullYear();
  
    return `${year}-${month}-${day}`;
};