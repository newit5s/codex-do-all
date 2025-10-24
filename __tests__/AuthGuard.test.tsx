import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthGuard } from '@app/router/AuthGuard';
import { TestProviders } from '@app/testing/TestProviders';
import { AuthenticatedUser } from '@auth/AuthContext';

const Protected = () => <div>Protected</div>;
const Unauthorized = () => <div>Unauthorized</div>;

const renderWithRouter = (user: AuthenticatedUser | null, initialEntries: string[]) =>
  render(
    <TestProviders user={user}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route
            path="/secure"
            element={
              <AuthGuard allowedRoles={['super_admin', 'branch_admin']} requireBranch>
                <Protected />
              </AuthGuard>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </MemoryRouter>
    </TestProviders>
  );

describe('AuthGuard', () => {
  it('allows authorized user with branch access', () => {
    const user: AuthenticatedUser = {
      id: '2',
      email: 'branch.admin@aurora.example',
      displayName: 'Branch Admin',
      role: 'branch_admin',
      branchId: 'bkk-aurora'
    };
    renderWithRouter(user, ['/secure']);
    expect(screen.getByText('Protected')).toBeInTheDocument();
  });

  it('redirects unauthorized role', () => {
    const user: AuthenticatedUser = {
      id: '3',
      email: 'staff@aurora.example',
      displayName: 'Staff',
      role: 'staff',
      branchId: 'bkk-aurora'
    };
    renderWithRouter(user, ['/secure']);
    expect(screen.queryByText('Protected')).not.toBeInTheDocument();
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });
});
