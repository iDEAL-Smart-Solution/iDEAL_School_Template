import { describe, it, expect } from 'vitest';
import { normalizeImageUrl } from '../normalizeImageUrl';

const THUMB = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

describe('normalizeImageUrl', () => {
  // --- Google Drive share/view links get rewritten to the thumbnail endpoint ---
  it('rewrites a /file/d/ID/view share link', () => {
    expect(normalizeImageUrl('https://drive.google.com/file/d/ABC123/view?usp=drivesdk')).toBe(THUMB('ABC123'));
  });

  it('rewrites a /file/d/ID/view link without query params', () => {
    expect(normalizeImageUrl('https://drive.google.com/file/d/ABC123/view')).toBe(THUMB('ABC123'));
  });

  it('rewrites an open?id=ID link', () => {
    expect(normalizeImageUrl('https://drive.google.com/open?id=XYZ789')).toBe(THUMB('XYZ789'));
  });

  it('rewrites a uc?id=ID link', () => {
    expect(normalizeImageUrl('https://drive.google.com/uc?id=XYZ789&export=download')).toBe(THUMB('XYZ789'));
  });

  it('is case-insensitive about the drive.google.com host', () => {
    expect(normalizeImageUrl('https://DRIVE.GOOGLE.COM/file/d/ABC123/view')).toBe(THUMB('ABC123'));
  });

  // --- Non-Drive URLs pass through unchanged ---
  it('leaves a direct S3/R2/https image URL unchanged', () => {
    const url = 'https://bucket.r2.dev/images/hero.jpg';
    expect(normalizeImageUrl(url)).toBe(url);
  });

  it('leaves http URLs unchanged', () => {
    const url = 'http://cdn.example.com/logo.png';
    expect(normalizeImageUrl(url)).toBe(url);
  });

  it('leaves relative and root-relative paths unchanged', () => {
    expect(normalizeImageUrl('/logo.png')).toBe('/logo.png');
    expect(normalizeImageUrl('images/logo.png')).toBe('images/logo.png');
  });

  it('leaves data: URLs unchanged', () => {
    const data = 'data:image/png;base64,abc';
    expect(normalizeImageUrl(data)).toBe(data);
  });

  it('trims surrounding whitespace', () => {
    expect(normalizeImageUrl('  https://example.com/a.png  ')).toBe('https://example.com/a.png');
  });

  // --- Drive links with no extractable file id are left untouched (not turned into bogus thumbnails) ---
  it('leaves a Drive folder link unchanged (no file id)', () => {
    const url = 'https://drive.google.com/drive/folders/FOLDER_ID';
    expect(normalizeImageUrl(url)).toBe(url);
  });

  // --- Malformed / empty input returns null instead of throwing ---
  it('returns null for null, undefined, and non-string input', () => {
    expect(normalizeImageUrl(null)).toBeNull();
    expect(normalizeImageUrl(undefined)).toBeNull();
    expect(normalizeImageUrl(42)).toBeNull();
    expect(normalizeImageUrl({})).toBeNull();
  });

  it('returns null for empty or whitespace-only strings', () => {
    expect(normalizeImageUrl('')).toBeNull();
    expect(normalizeImageUrl('   ')).toBeNull();
  });

  it('never throws on arbitrary input', () => {
    expect(() => normalizeImageUrl('not a url at all')).not.toThrow();
  });
});
