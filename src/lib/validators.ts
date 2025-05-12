
export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return "Email is required";
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return "Password is required";
  }
  
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  
  // Check for at least one uppercase letter, one lowercase letter, and one number
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!hasUppercase) {
    return "Password must contain at least one uppercase letter";
  }
  
  if (!hasLowercase) {
    return "Password must contain at least one lowercase letter";
  }
  
  if (!hasNumber) {
    return "Password must contain at least one number";
  }
  
  return undefined;
};

export const validateName = (name: string): string | undefined => {
  if (!name) {
    return "Name is required";
  }
  
  if (name.length < 2) {
    return "Name must be at least 2 characters";
  }
  
  return undefined;
};

export const validatePasswordConfirmation = (
  password: string,
  confirmation: string
): string | undefined => {
  if (!confirmation) {
    return "Please confirm your password";
  }
  
  if (password !== confirmation) {
    return "Passwords do not match";
  }
  
  return undefined;
};
