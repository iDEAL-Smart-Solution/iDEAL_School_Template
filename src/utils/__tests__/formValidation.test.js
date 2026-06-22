import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateRequired,
  validateContactForm,
  isFormValid,
} from '../formValidation';

// ---------------------------------------------------------------------------
// validateEmail
// ---------------------------------------------------------------------------
describe('validateEmail', () => {
  it('returns empty string for a valid email', () => {
    expect(validateEmail('user@example.com')).toBe('');
    expect(validateEmail('first.last+tag@sub.domain.io')).toBe('');
  });

  it('returns an error string for an empty value', () => {
    expect(validateEmail('')).not.toBe('');
    expect(validateEmail(null)).not.toBe('');
    expect(validateEmail(undefined)).not.toBe('');
  });

  it('returns an error string when @ is missing', () => {
    expect(validateEmail('notanemail')).not.toBe('');
  });

  it('returns an error string for whitespace-only input', () => {
    expect(validateEmail('   ')).not.toBe('');
  });

  it('trims whitespace before validating', () => {
    expect(validateEmail('  user@example.com  ')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// validateRequired
// ---------------------------------------------------------------------------
describe('validateRequired', () => {
  it('returns empty string when value is non-empty', () => {
    expect(validateRequired('Alice', 'Name')).toBe('');
  });

  it('returns a non-empty error when value is empty', () => {
    expect(validateRequired('', 'Name')).not.toBe('');
  });

  it('returns a non-empty error when value is whitespace-only', () => {
    expect(validateRequired('   ', 'Name')).not.toBe('');
  });

  it('includes the label in the error message', () => {
    const msg = validateRequired('', 'Message');
    expect(msg).toMatch(/Message/);
  });
});

// ---------------------------------------------------------------------------
// validateContactForm
// ---------------------------------------------------------------------------
describe('validateContactForm', () => {
  it('returns all-empty errors for a fully valid form', () => {
    const errors = validateContactForm({
      name: 'Alice',
      email: 'alice@example.com',
      message: 'Hello!',
    });
    expect(errors.name).toBe('');
    expect(errors.email).toBe('');
    expect(errors.message).toBe('');
  });

  it('reports errors when all fields are empty', () => {
    const errors = validateContactForm({ name: '', email: '', message: '' });
    expect(errors.name).not.toBe('');
    expect(errors.email).not.toBe('');
    expect(errors.message).not.toBe('');
  });

  it('only reports an error for the invalid field', () => {
    const errors = validateContactForm({ name: 'Bob', email: 'bad', message: 'Hi' });
    expect(errors.name).toBe('');
    expect(errors.email).not.toBe('');
    expect(errors.message).toBe('');
  });
});

// ---------------------------------------------------------------------------
// isFormValid
// ---------------------------------------------------------------------------
describe('isFormValid', () => {
  it('returns true when every error is an empty string', () => {
    expect(isFormValid({ name: '', email: '', message: '' })).toBe(true);
  });

  it('returns false when any error is non-empty', () => {
    expect(isFormValid({ name: 'required', email: '', message: '' })).toBe(false);
    expect(isFormValid({ name: '', email: 'invalid', message: '' })).toBe(false);
    expect(isFormValid({ name: '', email: '', message: 'required' })).toBe(false);
  });
});
