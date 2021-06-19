import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from '@muzammil-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
