import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@muzammil-tickets/common';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true); // for inginx to make request this is add when u use cookieSession
app.use(json());
app.use(
  cookieSession({
    signed: false, // don't encrypt cookie because we have jwt
    secure: process.env.NODE_ENV !== 'test', // make only https request also add  trust proxy for inginx to make requst
  })
);
app.use(currentUser);
app.use(createChargeRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
