import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@muzammil-tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
