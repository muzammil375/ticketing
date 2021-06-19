import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@muzammil-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
