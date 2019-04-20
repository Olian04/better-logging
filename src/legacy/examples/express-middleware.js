const betterLogging = require('../../better-logging');
const express = require('express');
const app = express();
const PORT = 8080;

// Init betterLogging
betterLogging(console, {
    stampColor: Color => Color.Light_Blue
});

// Setup middleware
app.use(betterLogging.expressMiddleware(console));

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => 
    console.info(`Listening on port ${PORT}`)
);