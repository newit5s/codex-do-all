export const formatDate = (value: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: '2-digit'
  }).format(new Date(value));

export const formatCurrency = (value: number, locale: string, currency: string = 'USD') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(value);

export const formatNumber = (value: number, locale: string) =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
