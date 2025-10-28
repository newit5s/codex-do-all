import { findBookingConflicts } from '@shared/utils/booking';
import { Booking } from '@store/types';

describe('booking utils', () => {
  const baseBooking: Booking = {
    id: 'existing-1',
    branchId: 'branch-1',
    tableIds: ['t-1'],
    customerId: 'customer-1',
    startAt: '2025-01-01T10:00:00.000Z',
    endAt: '2025-01-01T11:00:00.000Z',
    status: 'confirmed',
    partySize: 4
  };

  it('detects conflicting bookings for the same table and overlapping window', () => {
    const conflicts = findBookingConflicts([baseBooking], {
      startAt: '2025-01-01T10:30:00.000Z',
      endAt: '2025-01-01T11:30:00.000Z',
      tableIds: ['t-1']
    });

    expect(conflicts).toHaveLength(1);
    expect(conflicts[0].id).toBe('existing-1');
  });

  it('returns empty array when tables differ', () => {
    const conflicts = findBookingConflicts([baseBooking], {
      startAt: '2025-01-01T10:30:00.000Z',
      endAt: '2025-01-01T11:30:00.000Z',
      tableIds: ['t-2']
    });

    expect(conflicts).toHaveLength(0);
  });
});
