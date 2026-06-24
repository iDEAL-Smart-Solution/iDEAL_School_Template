// src/utils/formValidation.js

export const validateEmail = (value) => {
  if (!value) return 'Email is required.';
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value.trim()) ? '' : 'Please enter a valid email address.';
};

export const validateRequired = (value, label) => {
  return value.trim() ? '' : `${label} is required.`;
};

export const validateContactForm = ({ name, email, message }) => ({
  name:    validateRequired(name, 'Name'),
  email:   validateEmail(email),
  message: validateRequired(message, 'Message'),
});

export const isFormValid = (errors) =>
  Object.values(errors).every((msg) => msg === '');
