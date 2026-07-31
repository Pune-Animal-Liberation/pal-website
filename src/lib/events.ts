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

export function isUpcomingEvent(event: EventEntry) {
  return event.data.status === 'upcoming' || event.data.status === 'postponed';
}

export function isPastEvent(event: EventEntry) {
  return event.data.status === 'concluded' || event.data.status === 'cancelled';
}

export function sortByDateAscending(a: EventEntry, b: EventEntry) {
  return a.data.date.valueOf() - b.data.date.valueOf();
}

export function sortByDateDescending(a: EventEntry, b: EventEntry) {
  return b.data.date.valueOf() - a.data.date.valueOf();
}
