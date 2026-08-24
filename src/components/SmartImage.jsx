import React, { useState } from 'react';

/**
 * SmartImage
 * -------------------------------------------------------------------------
 * A thin wrapper around <img> for rendering backend-sourced image URLs
 * resiliently. Image URLs are already normalised at the data layer (see
 * `normalizeImageUrl` wired into the landing-page service mapper), but a URL
 * can still fail to load at runtime — e.g. a Google Drive file that isn't
 * shared as "Anyone with the link", or Drive's thumbnail endpoint being
 * rate-limited under load. When that happens we:
 *
 *   1. console.warn the failing URL (so it's debuggable), and
 *   2. render a fallback instead of a broken-image icon.
 *
 * The fallback is, by default, a neutral placeholder box sized by the same
 * `className` as the image. Callers can override it:
 *   • pass a custom `fallback` node (e.g. an initials chip for a logo), or
 *   • pass `fallback={null}` to render nothing (for purely decorative images).
 *
 * @param {object}   props
 * @param {string}   [props.src]        Normalised image URL. Falsy → fallback.
 * @param {string}   [props.alt]        Alt text (also labels the placeholder).
 * @param {string}   [props.className]  Classes applied to both img and placeholder.
 * @param {React.ReactNode} [props.fallback] Custom fallback. Omit for the default
 *                                           placeholder box; pass null to hide.
 */
const SmartImage = ({ src, alt = '', className = '', fallback, ...rest }) => {
  const [failed, setFailed] = useState(false);

  const showFallback = !src || failed;

  if (showFallback) {
    // `fallback` explicitly provided (including null) → caller controls the fallback UI.
    if (fallback !== undefined) return fallback;

    // Default: a neutral, theme-agnostic placeholder box. No network request, so
    // it can't itself be rate-limited/fail the way the original image did.
    return (
      <div
        className={className}
        role="img"
        aria-label={alt || 'Image unavailable'}
        style={{ backgroundImage: 'linear-gradient(135deg, #eef2f7 0%, #e2e8f0 100%)' }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        console.warn('[SmartImage] Image failed to load, showing fallback:', src);
        setFailed(true);
      }}
      {...rest}
    />
  );
};

export default SmartImage;
