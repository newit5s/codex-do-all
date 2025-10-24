import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import { initialState } from '@store/data';
import { AppAction, AppState, BookingStatus, TableStatus } from '@store/types';

const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<React.Dispatch<AppAction> | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'BOOKING_CREATE':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'BOOKING_STATUS_UPDATE':
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking.id === action.payload.bookingId ? { ...booking, status: action.payload.status } : booking
        )
      };
    case 'TABLE_STATUS_UPDATE':
      return {
        ...state,
        tables: state.tables.map((table) =>
          table.id === action.payload.tableId ? { ...table, status: action.payload.status } : table
        )
      };
    case 'TABLE_ASSIGN_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking.id === action.payload.bookingId ? { ...booking, tableIds: action.payload.tableIds } : booking
        )
      };
    case 'CUSTOMER_UPDATE_TIER':
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.customerId ? { ...customer, tier: action.payload.tier } : customer
        )
      };
    default:
      return state;
  }
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const memoizedState = useMemo(() => state, [state]);

  return (
    <AppStateContext.Provider value={memoizedState}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (!context) {
    throw new Error('useAppDispatch must be used within AppStateProvider');
  }
  return context;
};

export const bookingStatuses: BookingStatus[] = ['pending', 'confirmed', 'cancelled', 'no_show'];
export const tableStatuses: TableStatus[] = ['available', 'occupied', 'reserved', 'unavailable'];
