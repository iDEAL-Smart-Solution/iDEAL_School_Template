import { describe, it, expect } from 'vitest';
import { normalizeLandingPageData } from '../landingPageService';

// These lock in the actual bug fix: Google Drive share links stored on the
// backend are rewritten to renderable direct URLs by the shared data-layer
// mapper, so every consuming component gets a working <img src> for free.
describe('normalizeLandingPageData — image URL normalization', () => {
  it('rewrites a Google Drive share-link logo to a thumbnail URL', () => {
    const result = normalizeLandingPageData({
      name: 'Test School',
      logo: 'https://drive.google.com/file/d/ABC123/view?usp=drivesdk',
    });
    expect(result.logo).toBe('https://drive.google.com/thumbnail?id=ABC123&sz=w1000');
  });

  it('rewrites Drive links across hero, about, and secondary images', () => {
    const result = normalizeLandingPageData({
      name: 'Test School',
      hero_image: 'https://drive.google.com/file/d/HERO/view',
      about_image: 'https://drive.google.com/open?id=ABOUT',
      secondary_image: 'https://drive.google.com/uc?id=SECOND',
    });
    expect(result.hero_image).toBe('https://drive.google.com/thumbnail?id=HERO&sz=w1000');
    expect(result.about_image).toBe('https://drive.google.com/thumbnail?id=ABOUT&sz=w1000');
    expect(result.secondary_image).toBe('https://drive.google.com/thumbnail?id=SECOND&sz=w1000');
  });

  it('rewrites Drive links inside program items', () => {
    const result = normalizeLandingPageData({
      name: 'Test School',
      programs: [{ name: 'Science', image: 'https://drive.google.com/file/d/PROG/view' }],
    });
    expect(result.programs[0].image).toBe('https://drive.google.com/thumbnail?id=PROG&sz=w1000');
  });

  it('leaves direct (non-Drive) image URLs unchanged', () => {
    const result = normalizeLandingPageData({
      name: 'Test School',
      logo: 'https://cdn.example.com/logo.png',
      hero_image: 'https://bucket.r2.dev/hero.jpg',
    });
    expect(result.logo).toBe('https://cdn.example.com/logo.png');
    expect(result.hero_image).toBe('https://bucket.r2.dev/hero.jpg');
  });
});
