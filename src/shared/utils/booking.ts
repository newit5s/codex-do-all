import { Booking } from '@store/types';

interface BookingWindow {
  startAt: string;
  endAt: string;
  tableIds: string[];
  bookingId?: string;
}

const OVERLAP_STATUSES: Booking['status'][] = ['pending', 'confirmed'];

const parseDateTime = (value: string): Date | null => {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const rangesOverlap = (startA: Date, endA: Date, startB: Date, endB: Date) => startA < endB && startB < endA;

export const findBookingConflicts = (bookings: Booking[], candidate: BookingWindow): Booking[] => {
  const candidateStart = parseDateTime(candidate.startAt);
  const candidateEnd = parseDateTime(candidate.endAt);

  if (!candidateStart || !candidateEnd || candidateStart >= candidateEnd || candidate.tableIds.length === 0) {
    return [];
  }

  return bookings.filter((booking) => {
    if (candidate.bookingId && booking.id === candidate.bookingId) {
      return false;
    }

    if (!OVERLAP_STATUSES.includes(booking.status)) {
      return false;
    }

    if (!booking.tableIds.some((id) => candidate.tableIds.includes(id))) {
      return false;
    }

    const existingStart = parseDateTime(booking.startAt);
    const existingEnd = parseDateTime(booking.endAt);
    if (!existingStart || !existingEnd) {
      return false;
    }

    return rangesOverlap(candidateStart, candidateEnd, existingStart, existingEnd);
  });
};

export const normalizeDateTimeLocal = (value: string): string | null => {
  const parsed = parseDateTime(value);
  return parsed ? parsed.toISOString() : null;
};
