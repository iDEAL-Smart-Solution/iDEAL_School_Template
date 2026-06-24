import { describe, it, expect } from 'vitest';
import {
  resolveColor,
  normalizeMediaUrl,
  normalizePortalUrl,
  getInitials,
  getReadableText,
} from '../landingPageTheme';

// ---------------------------------------------------------------------------
// resolveColor
// ---------------------------------------------------------------------------
describe('resolveColor', () => {
  it('returns the value when it is a non-empty, non-whitespace string', () => {
    expect(resolveColor('#FF0000', '#000')).toBe('#FF0000');
    expect(resolveColor('rgb(0,0,0)', '#000')).toBe('rgb(0,0,0)');
  });

  it('returns the fallback for null', () => {
    expect(resolveColor(null, '#fallback')).toBe('#fallback');
  });

  it('returns the fallback for undefined', () => {
    expect(resolveColor(undefined, '#fallback')).toBe('#fallback');
  });

  it('returns the fallback for an empty string', () => {
    expect(resolveColor('', '#fallback')).toBe('#fallback');
  });

  it('returns the fallback for a whitespace-only string', () => {
    expect(resolveColor('   ', '#fallback')).toBe('#fallback');
  });

  it('never returns the invalid input itself', () => {
    expect(resolveColor('', '#fallback')).not.toBe('');
    expect(resolveColor(null, '#fallback')).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// normalizeMediaUrl
// ---------------------------------------------------------------------------
describe('normalizeMediaUrl', () => {
  it('returns http/https URLs as-is', () => {
    expect(normalizeMediaUrl('https://example.com/img.png', '')).toBe('https://example.com/img.png');
    expect(normalizeMediaUrl('http://cdn.example.com/x.jpg', '')).toBe('http://cdn.example.com/x.jpg');
  });

  it('returns data: URLs as-is', () => {
    const data = 'data:image/png;base64,abc';
    expect(normalizeMediaUrl(data, '')).toBe(data);
  });

  it('returns root-relative paths as-is', () => {
    expect(normalizeMediaUrl('/logo.png', '')).toBe('/logo.png');
  });

  it('prepends / to relative paths', () => {
    expect(normalizeMediaUrl('logo.png', '')).toBe('/logo.png');
  });

  it('returns fallback for empty string', () => {
    expect(normalizeMediaUrl('', '/default.png')).toBe('/default.png');
  });

  it('returns fallback for null', () => {
    expect(normalizeMediaUrl(null, '/default.png')).toBe('/default.png');
  });
});

// ---------------------------------------------------------------------------
// normalizePortalUrl
// ---------------------------------------------------------------------------
describe('normalizePortalUrl', () => {
  it('returns absolute URLs unchanged', () => {
    expect(normalizePortalUrl('https://portal.school.com/login', '/login')).toBe('https://portal.school.com/login');
  });

  it('returns root-relative paths unchanged', () => {
    expect(normalizePortalUrl('/login', '/fallback')).toBe('/login');
  });

  it('prepends / to bare paths', () => {
    expect(normalizePortalUrl('login', '/fallback')).toBe('/login');
  });

  it('returns fallback for empty string', () => {
    expect(normalizePortalUrl('', '/login')).toBe('/login');
  });
});

// ---------------------------------------------------------------------------
// getInitials
// ---------------------------------------------------------------------------
describe('getInitials', () => {
  it('returns up to two uppercase initials from a name', () => {
    expect(getInitials('Alice Bob')).toBe('AB');
    expect(getInitials('Alice')).toBe('A');
    expect(getInitials('Alice Bob Carol')).toBe('AB');
  });

  it('returns empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// getReadableText
// ---------------------------------------------------------------------------
describe('getReadableText', () => {
  it('returns a trimmed string value', () => {
    expect(getReadableText('  hello  ', '')).toBe('hello');
  });

  it('converts numbers to strings', () => {
    expect(getReadableText(42, '')).toBe('42');
  });

  it('returns fallback for null', () => {
    expect(getReadableText(null, 'fallback')).toBe('fallback');
  });

  it('returns fallback for empty string', () => {
    expect(getReadableText('', 'fallback')).toBe('fallback');
  });

  it('returns fallback for whitespace-only string', () => {
    expect(getReadableText('   ', 'fallback')).toBe('fallback');
  });
});
