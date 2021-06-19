import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@muzammil-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
