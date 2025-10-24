import { render, screen } from '@testing-library/react';
import { StatCard } from '@shared/components/StatCard';

describe('StatCard', () => {
  it('renders title and value', () => {
    render(<StatCard title="Sample" value="123" description="Details" />);
    expect(screen.getByText('Sample')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });
});
