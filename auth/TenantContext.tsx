import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { branches } from '@store/data';
import { Branch } from '@store/types';

interface TenantContextValue {
  activeBranch: Branch;
  switchBranch: (branchId: Branch['id']) => void;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const [activeBranchId, setActiveBranchId] = useState<Branch['id']>(branches[0].id);

  const value = useMemo<TenantContextValue>(() => {
    const activeBranch = branches.find((branch) => branch.id === activeBranchId) ?? branches[0];
    return {
      activeBranch,
      switchBranch: setActiveBranchId
    };
  }, [activeBranchId]);

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
};

export const useTenant = (): TenantContextValue => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
