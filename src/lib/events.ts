import type { CollectionEntry } from 'astro:content';

export const eventStatuses = ['draft', 'upcoming', 'concluded', 'cancelled', 'postponed'] as const;
export type EventStatus = (typeof eventStatuses)[number];
export type EventEntry = CollectionEntry<'events'>;

export const statusLabels: Record<EventStatus, string> = {
  draft: 'Draft',
  upcoming: 'Upcoming',
  concluded: 'Concluded',
  cancelled: 'Cancelled',
  postponed: 'Postponed',
};

export function eventUrl(event: EventEntry) {
  return `/events/${event.data.slug ?? event.id}/`;
}

export function isPublicEvent(event: EventEntry) {
  return event.data.status !== 'draft';
}

function hasPassed(event: EventEntry) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(event.data.endDate ?? event.data.date);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate < today;
}

export function isUpcomingEvent(event: EventEntry) {
  return (event.data.status === 'upcoming' || event.data.status === 'postponed') && !hasPassed(event);
}

export function isPastEvent(event: EventEntry) {
  return event.data.status === 'concluded' || event.data.status === 'cancelled' ||
    ((event.data.status === 'upcoming' || event.data.status === 'postponed') && hasPassed(event));
}

export function effectiveEventStatus(event: EventEntry): EventStatus {
  if (event.data.status === 'upcoming' && hasPassed(event)) {
    return 'concluded';
  }
  return event.data.status;
}

export function sortByDateAscending(a: EventEntry, b: EventEntry) {
  return a.data.date.valueOf() - b.data.date.valueOf();
}

export function sortByDateDescending(a: EventEntry, b: EventEntry) {
  return b.data.date.valueOf() - a.data.date.valueOf();
}
