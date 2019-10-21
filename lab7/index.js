const express = require('express');
const app = express();
const configRoutes = require('./routes');

app.use(express.json());//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});