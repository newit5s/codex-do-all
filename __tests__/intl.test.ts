import { formatDate, formatCurrency, formatNumber } from '@shared/utils/intl';

describe('intl utilities', () => {
  it('formats dates using locale', () => {
    const formatted = formatDate('2025-01-15T12:00:00Z', 'en');
    expect(formatted).toBeDefined();
  });

  it('formats currency', () => {
    const formatted = formatCurrency(1234, 'en', 'USD');
    expect(formatted).toContain('$');
  });

  it('formats numbers', () => {
    const formatted = formatNumber(1024, 'vi');
    expect(formatted).toBe('1.024');
  });
});
