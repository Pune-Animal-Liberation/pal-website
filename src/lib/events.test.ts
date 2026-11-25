import { describe, it, expect } from 'vitest';
import { sortByDateAscending, sortByDateDescending } from './events';
import type { EventEntry } from './events';

describe('events date sorting', () => {
  const eventA = {
    id: 'event-a',
    data: {
      title: 'Event A',
      date: new Date('2023-10-01T10:00:00Z'),
    },
  } as unknown as EventEntry;

  const eventB = {
    id: 'event-b',
    data: {
      title: 'Event B',
      date: new Date('2023-10-15T10:00:00Z'),
    },
  } as unknown as EventEntry;

  const eventC = {
    id: 'event-c',
    data: {
      title: 'Event C',
      date: new Date('2023-10-15T10:00:00Z'), // same date as eventB
    },
  } as unknown as EventEntry;

  const eventD = {
    id: 'event-d',
    data: {
      title: 'Event D',
      date: new Date('2023-11-01T10:00:00Z'),
    },
  } as unknown as EventEntry;

  describe('sortByDateDescending', () => {
    it('should correctly sort events in descending order (newest first)', () => {
      const sorted = [eventA, eventD, eventB].sort(sortByDateDescending);
      expect(sorted).toEqual([eventD, eventB, eventA]);
    });

    it('should return 0 for events with the same date', () => {
      const result = sortByDateDescending(eventB, eventC);
      expect(result).toBe(0);
    });

    it('should return a negative number when the first event is newer than the second', () => {
      const result = sortByDateDescending(eventD, eventA);
      expect(result).toBeLessThan(0);
    });

    it('should return a positive number when the first event is older than the second', () => {
      const result = sortByDateDescending(eventA, eventD);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('sortByDateAscending', () => {
    it('should correctly sort events in ascending order (oldest first)', () => {
      const sorted = [eventD, eventA, eventB].sort(sortByDateAscending);
      expect(sorted).toEqual([eventA, eventB, eventD]);
    });

    it('should return 0 for events with the same date', () => {
      const result = sortByDateAscending(eventB, eventC);
      expect(result).toBe(0);
    });

    it('should return a positive number when the first event is newer than the second', () => {
      const result = sortByDateAscending(eventD, eventA);
      expect(result).toBeGreaterThan(0);
    });

    it('should return a negative number when the first event is older than the second', () => {
      const result = sortByDateAscending(eventA, eventD);
      expect(result).toBeLessThan(0);
    });
  });
});
