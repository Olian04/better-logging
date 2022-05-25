import express from 'express';
import betterLogging, { expressMiddleware, Theme } from '..';
betterLogging(console, {
  color: Theme.green,
});

const app = express();

console.logLevel = 4;
app.use(expressMiddleware(console));
app.use(expressMiddleware(console.debug));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8080, () => {
  console.info('Listening on port 8080...');
});
