import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from '@muzammil-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
