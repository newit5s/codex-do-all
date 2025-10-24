import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '@auth/AuthContext';
import { useTenant } from '@auth/TenantContext';

interface AuthGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactElement;
  requireBranch?: boolean;
}

export const AuthGuard = ({ allowedRoles, children, requireBranch = false }: AuthGuardProps) => {
  const { user } = useAuth();
  const { activeBranch } = useTenant();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requireBranch && user.role !== 'super_admin') {
    if (!user.branchId || user.branchId !== activeBranch.id) {
      return <Navigate to="/switch-branch" replace />;
    }
  }

  return children;
};
