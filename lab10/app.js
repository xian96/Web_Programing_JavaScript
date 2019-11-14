// We first require our express package
const express = require('express');
const cookieParser = require('cookie-parser');
// We create our express isntance:
const app = express();

//require the view engine
// const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');

// It creates a cookie for the browser that will be used to track the current session of the user
const session = require('express-session');


app.use('/public', static);//?
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true}));//It parses incoming requests with urlencoded payloads and is based on body-parser.

// app.engine('handlebars', handlebarsInstance.engine);
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));//how to find path? layouts?
app.set('view engine', 'handlebars');// what is view engine.

// create the Middlewares:
// const configMiddleware = require("./middleware");
// configMiddleware(app);

const configRoute = require("./routes");
configRoute(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
  });