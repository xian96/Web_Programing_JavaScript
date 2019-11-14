const express = require('express');
const app = express();//Creates an Express application. The express() function is a top-level function exported by the express module.
/*
Create a new middleware function to serve files from within a given root directory. 
The file to serve will be determined by combining req.url with the provided root directory.
 When a file is not found, instead of sending a 404 response, this module will instead call next() to move on to the next middleware,
  allowing for stacking and fall-backs.
*/
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

app.use('/public', static);//?
app.use(express.json());//It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.urlencoded({extended: true}));//It parses incoming requests with urlencoded payloads and is based on body-parser.

const handlebarsInstance = exphbs.create({
  defaultLayout: 'layout',
  // Specify helpers which are only registered on this instance.
  helpers: {//? ?
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number') return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});
// app.engine('handlebars', exphbs({defaultLayout: 'layout'}));//how to find path
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');// what is view engine?

const configRoutes = require('./routes');
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});