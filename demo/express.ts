import express from 'express';
import betterLogging, { expressMiddleware } from '..';
betterLogging(console);

const app = express();

app.use(expressMiddleware(console));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8080, ()  => {
  console.info('Listening on port 8080...');
});
