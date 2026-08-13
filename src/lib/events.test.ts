import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  eventUrl,
  isPublicEvent,
  isUpcomingEvent,
  isPastEvent,
  effectiveEventStatus,
  sortByDateAscending,
  sortByDateDescending,
  type EventEntry,
} from './events';

function createMockEvent(fields: {
  id?: string;
  slug?: string;
  date: Date | string;
  endDate?: Date | string;
  status?: string;
}): EventEntry {
  return {
    id: fields.id ?? 'test-event',
    data: {
      title: 'Test Event',
      date: new Date(fields.date),
      endDate: fields.endDate ? new Date(fields.endDate) : undefined,
      status: fields.status ?? 'upcoming',
      slug: fields.slug,
    },
  } as unknown as EventEntry;
}

describe('events library helper functions', () => {
  describe('eventUrl', () => {
    it('should generate URL using the event slug if present', () => {
      const event = createMockEvent({ id: 'some-id', slug: 'custom-slug', date: '2024-05-15' });
      expect(eventUrl(event)).toBe('/events/custom-slug/');
    });

    it('should generate URL using the event ID if slug is not present', () => {
      const event = createMockEvent({ id: 'some-id', date: '2024-05-15' });
      expect(eventUrl(event)).toBe('/events/some-id/');
    });
  });

  describe('isPublicEvent', () => {
    it('should return false if the event status is draft', () => {
      const event = createMockEvent({ status: 'draft', date: '2024-05-15' });
      expect(isPublicEvent(event)).toBe(false);
    });

    it('should return true for public event statuses', () => {
      const upcomingEvent = createMockEvent({ status: 'upcoming', date: '2024-05-15' });
      const concludedEvent = createMockEvent({ status: 'concluded', date: '2024-05-15' });
      const cancelledEvent = createMockEvent({ status: 'cancelled', date: '2024-05-15' });
      const postponedEvent = createMockEvent({ status: 'postponed', date: '2024-05-15' });

      expect(isPublicEvent(upcomingEvent)).toBe(true);
      expect(isPublicEvent(concludedEvent)).toBe(true);
      expect(isPublicEvent(cancelledEvent)).toBe(true);
      expect(isPublicEvent(postponedEvent)).toBe(true);
    });
  });

  describe('date-based statuses and helpers', () => {
    beforeEach(() => {
      // Set the system time to a fixed date: May 15, 2024
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-05-15T12:00:00.000Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    describe('isUpcomingEvent', () => {
      it('should return true for upcoming events in the future', () => {
        const event = createMockEvent({ status: 'upcoming', date: '2024-05-16' });
        expect(isUpcomingEvent(event)).toBe(true);
      });

      it('should return true for postponed events in the future', () => {
        const event = createMockEvent({ status: 'postponed', date: '2024-05-16' });
        expect(isUpcomingEvent(event)).toBe(true);
      });

      it('should return true if event date has passed but the end date is in the future', () => {
        const event = createMockEvent({
          status: 'upcoming',
          date: '2024-05-10',
          endDate: '2024-05-16',
        });
        expect(isUpcomingEvent(event)).toBe(true);
      });

      it('should return false if the event date (and end date) has passed', () => {
        const event = createMockEvent({ status: 'upcoming', date: '2024-05-14' });
        expect(isUpcomingEvent(event)).toBe(false);
      });

      it('should return false for other statuses even if in the future', () => {
        const event = createMockEvent({ status: 'concluded', date: '2024-05-16' });
        expect(isUpcomingEvent(event)).toBe(false);
      });
    });

    describe('isPastEvent', () => {
      it('should return true if status is concluded or cancelled', () => {
        const concludedEvent = createMockEvent({ status: 'concluded', date: '2024-05-16' });
        const cancelledEvent = createMockEvent({ status: 'cancelled', date: '2024-05-16' });

        expect(isPastEvent(concludedEvent)).toBe(true);
        expect(isPastEvent(cancelledEvent)).toBe(true);
      });

      it('should return true if upcoming or postponed event has passed', () => {
        const passedUpcoming = createMockEvent({ status: 'upcoming', date: '2024-05-14' });
        const passedPostponed = createMockEvent({ status: 'postponed', date: '2024-05-14' });

        expect(isPastEvent(passedUpcoming)).toBe(true);
        expect(isPastEvent(passedPostponed)).toBe(true);
      });

      it('should return false if upcoming or postponed event is in the future', () => {
        const futureUpcoming = createMockEvent({ status: 'upcoming', date: '2024-05-16' });
        const futurePostponed = createMockEvent({ status: 'postponed', date: '2024-05-16' });

        expect(isPastEvent(futureUpcoming)).toBe(false);
        expect(isPastEvent(futurePostponed)).toBe(false);
      });
    });

    describe('effectiveEventStatus', () => {
      it('should return concluded if an upcoming event has passed', () => {
        const event = createMockEvent({ status: 'upcoming', date: '2024-05-14' });
        expect(effectiveEventStatus(event)).toBe('concluded');
      });

      it('should return upcoming if an upcoming event is in the future', () => {
        const event = createMockEvent({ status: 'upcoming', date: '2024-05-16' });
        expect(effectiveEventStatus(event)).toBe('upcoming');
      });

      it('should return the original status for non-upcoming statuses', () => {
        const postponed = createMockEvent({ status: 'postponed', date: '2024-05-14' });
        const cancelled = createMockEvent({ status: 'cancelled', date: '2024-05-14' });

        expect(effectiveEventStatus(postponed)).toBe('postponed');
        expect(effectiveEventStatus(cancelled)).toBe('cancelled');
      });
    });
  });

  describe('sorting functions', () => {
    it('should sort events by date in ascending order using sortByDateAscending', () => {
      const eventEarly = createMockEvent({ date: '2024-01-01' });
      const eventMiddle = createMockEvent({ date: '2024-02-01' });
      const eventLate = createMockEvent({ date: '2024-03-01' });

      const list = [eventLate, eventEarly, eventMiddle];
      const sorted = [...list].sort(sortByDateAscending);

      expect(sorted).toEqual([eventEarly, eventMiddle, eventLate]);
    });

    it('should sort events by date in descending order using sortByDateDescending', () => {
      const eventEarly = createMockEvent({ date: '2024-01-01' });
      const eventMiddle = createMockEvent({ date: '2024-02-01' });
      const eventLate = createMockEvent({ date: '2024-03-01' });

      const list = [eventMiddle, eventLate, eventEarly];
      const sorted = [...list].sort(sortByDateDescending);

      expect(sorted).toEqual([eventLate, eventMiddle, eventEarly]);
    });

    it('should return 0 or preserve order when dates are equal', () => {
      const eventA = createMockEvent({ date: '2024-01-01', id: 'A' });
      const eventB = createMockEvent({ date: '2024-01-01', id: 'B' });

      expect(sortByDateAscending(eventA, eventB)).toBe(0);
      expect(sortByDateDescending(eventA, eventB)).toBe(0);
    });
  });
});
