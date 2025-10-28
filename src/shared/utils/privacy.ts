export const maskContact = (value: string): string => {
  if (!value) {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  if (trimmed.includes('@')) {
    const [localPart, domain] = trimmed.split('@');
    if (!domain) {
      return '***';
    }
    if (localPart.length <= 2) {
      return `${localPart.charAt(0)}***@${domain}`;
    }
    const visible = localPart.slice(0, 2);
    return `${visible}***@${domain}`;
  }

  const normalized = trimmed.replace(/\s+/g, '');
  if (normalized.length <= 4) {
    return `${normalized.charAt(0)}***${normalized.charAt(normalized.length - 1)}`;
  }

  const prefix = normalized.slice(0, 3);
  const suffix = normalized.slice(-2);
  return `${prefix}***${suffix}`;
};
