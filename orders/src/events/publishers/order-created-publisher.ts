import {
  OrderCreatedEvent,
  Publisher,
  Subjects,
} from '@muzammil-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
