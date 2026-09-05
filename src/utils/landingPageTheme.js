export const resolveColor = (value, fallback) => {
  if (typeof value !== 'string') return fallback;

  const trimmed = value.trim();
  return trimmed || fallback;
};

export const normalizeMediaUrl = (value, fallback = '') => {
  if (typeof value !== 'string') return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  // Convert Google Drive share/view links to a directly embeddable thumbnail URL.
  // e.g. https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  //   → https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
  if (/drive\.google\.com/i.test(trimmed)) {
    const fileId =
      trimmed.match(/\/file\/d\/([^/?#]+)/)?.[1] ||
      trimmed.match(/[?&]id=([^&#]+)/)?.[1] ||
      null;
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    // Unrecognised Drive URL — fall through and return as-is
  }

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('/')
  ) {
    return trimmed;
  }

  return `/${trimmed}`;
};

export const normalizePortalUrl = (value, fallback = '/login') => {
  if (typeof value !== 'string') return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

export const getInitials = (value = '') =>
  value
    .split(' ')
    .filter(Boolean)
    .map((segment) => segment[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const getReadableText = (value, fallback = '') => {
  if (typeof value === 'number') return String(value);
  if (typeof value !== 'string') return fallback;

  const trimmed = value.trim();
  return trimmed || fallback;
};