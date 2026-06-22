export const resolveColor = (value, fallback) => {
  if (typeof value !== 'string') return fallback;

  const trimmed = value.trim();
  return trimmed || fallback;
};

export const normalizeMediaUrl = (value, fallback = '') => {
  if (typeof value !== 'string') return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

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