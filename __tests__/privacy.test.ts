import { maskContact } from '@shared/utils/privacy';

describe('maskContact', () => {
  it('masks email addresses by preserving first two characters and domain', () => {
    expect(maskContact('guest@example.com')).toBe('gu***@example.com');
  });

  it('masks phone numbers by keeping prefix and suffix', () => {
    expect(maskContact('0901234567')).toBe('090***67');
  });

  it('returns empty string for empty input', () => {
    expect(maskContact('')).toBe('');
  });
});
