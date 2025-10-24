import { AppState, Branch, Booking, Customer, Table } from '@store/types';

export const branches: Branch[] = [
  {
    id: 'bkk-aurora',
    name: 'Aurora Bangkok',
    slug: 'aurora-bangkok',
    timezone: 'Asia/Bangkok',
    openingHours: '09:00 - 23:00',
    status: 'open'
  },
  {
    id: 'hcmc-aurora',
    name: 'Aurora Saigon',
    slug: 'aurora-saigon',
    timezone: 'Asia/Ho_Chi_Minh',
    openingHours: '08:00 - 22:00',
    status: 'busy'
  },
  {
    id: 'tokyo-aurora',
    name: 'Aurora Tokyo',
    slug: 'aurora-tokyo',
    timezone: 'Asia/Tokyo',
    openingHours: '10:00 - 00:00',
    status: 'open'
  },
  {
    id: 'singapore-aurora',
    name: 'Aurora Singapore',
    slug: 'aurora-singapore',
    timezone: 'Asia/Singapore',
    openingHours: '09:00 - 22:00',
    status: 'open'
  },
  {
    id: 'hanoi-aurora',
    name: 'Aurora Hanoi',
    slug: 'aurora-hanoi',
    timezone: 'Asia/Ho_Chi_Minh',
    openingHours: '07:00 - 21:00',
    status: 'closed'
  }
];

const tables: Table[] = branches.flatMap((branch) =>
  Array.from({ length: 10 }, (_, index) => ({
    id: `${branch.id}-table-${index + 1}`,
    branchId: branch.id,
    name: `T-${index + 1}`,
    capacity: (index % 4) + 2,
    status: index % 3 === 0 ? 'occupied' : 'available'
  }))
);

const customers: Customer[] = branches.flatMap((branch, index) => [
  {
    id: `${branch.id}-customer-vip`,
    branchId: branch.id,
    name: `${branch.name} VIP`,
    contact: `vip-${index + 1}@aurora.example`,
    tier: 'vip',
    visitCount: 32,
    lastVisit: new Date().toISOString()
  },
  {
    id: `${branch.id}-customer-regular`,
    branchId: branch.id,
    name: `${branch.name} Regular`,
    contact: `guest-${index + 1}@aurora.example`,
    tier: 'regular',
    visitCount: 12,
    lastVisit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
  },
  {
    id: `${branch.id}-customer-blacklist`,
    branchId: branch.id,
    name: `${branch.name} Blacklist`,
    contact: `black-${index + 1}@aurora.example`,
    tier: 'blacklist',
    visitCount: 4,
    lastVisit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString()
  }
]);

const bookings: Booking[] = branches.flatMap((branch, index) => [
  {
    id: `${branch.id}-booking-1`,
    branchId: branch.id,
    tableIds: [`${branch.id}-table-1`],
    customerId: `${branch.id}-customer-vip`,
    startAt: new Date(Date.now() + index * 3600 * 1000).toISOString(),
    endAt: new Date(Date.now() + index * 3600 * 1000 + 3600 * 1000).toISOString(),
    status: 'confirmed',
    partySize: 4,
    notes: 'Preferred window seating'
  },
  {
    id: `${branch.id}-booking-2`,
    branchId: branch.id,
    tableIds: [`${branch.id}-table-3`, `${branch.id}-table-4`],
    customerId: `${branch.id}-customer-regular`,
    startAt: new Date(Date.now() + index * 7200 * 1000).toISOString(),
    endAt: new Date(Date.now() + index * 7200 * 1000 + 7200 * 1000).toISOString(),
    status: 'pending',
    partySize: 6
  }
]);

const analytics = bookings.map((booking, index) => ({
  branchId: booking.branchId,
  date: new Date(Date.now() - index * 86400 * 1000).toISOString(),
  bookings: Math.floor(Math.random() * 20) + 10,
  revenue: Math.floor(Math.random() * 10000) + 2000,
  cancellations: Math.floor(Math.random() * 4),
  noShows: Math.floor(Math.random() * 2)
}));

export const initialState: AppState = {
  bookings,
  tables,
  customers,
  analytics
};
