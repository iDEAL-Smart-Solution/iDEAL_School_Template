/**
 *
 * @param {string} url - raw URL as stored on the backend
 * @returns {string|null} a renderable URL, or null if input is empty/malformed
 */
export function normalizeImageUrl(url) {
  // Never throw on bad input — just signal "no usable URL" with null so callers
  // (and the <img> onError fallback) can handle it gracefully.
  if (typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // Only Google Drive links need rewriting; everything else passes through.
  if (!/drive\.google\.com/i.test(trimmed)) return trimmed;

  // Extract the Drive FILE_ID from the common share/view/open/uc URL shapes:
  //   /file/d/FILE_ID/view   ·   open?id=FILE_ID   ·   uc?id=FILE_ID
  const fileId =
    trimmed.match(/\/file\/d\/([^/?#]+)/)?.[1] ||
    trimmed.match(/[?&]id=([^&#]+)/)?.[1] ||
    null;

  // Recognized as Drive but with no extractable file id (e.g. a folder link) —
  // leave it untouched rather than producing a bogus thumbnail URL.
  if (!fileId) return trimmed;

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}

export default normalizeImageUrl;
