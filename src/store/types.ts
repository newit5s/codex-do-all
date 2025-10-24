import { UserRole } from '@auth/AuthContext';

export type BranchStatus = 'open' | 'closed' | 'busy';

export interface Branch {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  openingHours: string;
  status: BranchStatus;
}

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'unavailable';

export interface Table {
  id: string;
  branchId: string;
  name: string;
  capacity: number;
  status: TableStatus;
  mergedWith?: string[];
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'no_show';

export interface Booking {
  id: string;
  branchId: string;
  tableIds: string[];
  customerId: string;
  startAt: string;
  endAt: string;
  status: BookingStatus;
  partySize: number;
  notes?: string;
}

export type CustomerTier = 'regular' | 'vip' | 'blacklist';

export interface Customer {
  id: string;
  branchId: string;
  name: string;
  contact: string;
  tier: CustomerTier;
  visitCount: number;
  lastVisit: string;
}

export interface User {
  id: string;
  branchId: string | null;
  role: UserRole;
  email: string;
  displayName: string;
}

export interface AnalyticsSummary {
  branchId: string;
  date: string;
  bookings: number;
  revenue: number;
  cancellations: number;
  noShows: number;
}

export interface AppState {
  bookings: Booking[];
  tables: Table[];
  customers: Customer[];
  analytics: AnalyticsSummary[];
}

export type AppAction =
  | { type: 'BOOKING_CREATE'; payload: Booking }
  | { type: 'BOOKING_STATUS_UPDATE'; payload: { bookingId: string; status: BookingStatus } }
  | { type: 'TABLE_STATUS_UPDATE'; payload: { tableId: string; status: TableStatus } }
  | { type: 'TABLE_ASSIGN_BOOKING'; payload: { bookingId: string; tableIds: string[] } }
  | { type: 'CUSTOMER_UPDATE_TIER'; payload: { customerId: string; tier: CustomerTier } };
