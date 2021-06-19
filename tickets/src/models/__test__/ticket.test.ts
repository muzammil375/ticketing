import { Ticket } from '../ticket';

it('implements optimisic concurrency control', async (done) => {
  //create an instance of ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 10,
    userId: '123',
  });
  //save the ticket to the database
  // here version:0
  await ticket.save();
  //fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id); // here version:0
  const secInstance = await Ticket.findById(ticket.id); // also here version:0
  //make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 20 });
  secInstance!.set({ price: 30 });
  //save the first fetched ticket
  await firstInstance!.save(); // now here version increase  version:1
  //save the sec fetched ticket
  try {
    await secInstance!.save();
    // here its own Version:0 and firstInstance updated version:1 now when it goes to the database the vesrion not match
    // that is concurrency issue
  } catch (err) {
    return done();
  }

  throw new Error('Should not reach this point');
});

it('icrements the version number on multiple saves', async () => {
  //create an instance of ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 10,
    userId: '123',
  });
  //save the ticket to the database
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
});
