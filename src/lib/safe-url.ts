const ALLOWED_EXTERNAL_PROTOCOLS = new Set(['https:', 'mailto:', 'tel:']);

export function safeInternalPath(value: string, fallback = '/'): string {
  const normalized = value.trim();
  if (!normalized.startsWith('/') || normalized.startsWith('//') || /\s/.test(normalized)) {
    return fallback;
  }
  return normalized;
}

export function safeExternalUrl(value: string, fallback = '#'): string {
  const normalized = value.trim();
  try {
    const parsed = new URL(normalized);
    if (ALLOWED_EXTERNAL_PROTOCOLS.has(parsed.protocol)) {
      return normalized;
    }
    return fallback;
  } catch {
    return fallback;
  }
}
