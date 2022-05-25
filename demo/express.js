const express = require('express');
const betterLogging = require('..');
betterLogging(console, {
  color: betterLogging.Theme.green,
});

const app = express();

app.use(betterLogging.expressMiddleware(console));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8080, () => {
  console.info('Listening on port 8080...');
});
