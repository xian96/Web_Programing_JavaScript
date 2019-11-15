// We first require our express package
const express = require('express');
const cookieParser = require('cookie-parser');
// We create our express isntance:
const app = express();

//require the view engine
const exphbs = require('express-handlebars');// const Handlebars = require('handlebars');
const static = express.static(__dirname + '/public');

// app.engine('handlebars', handlebarsInstance.engine);
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));//how to find path? root = layouts?
app.set('view engine', 'handlebars');// what is view engine.

app.use('/public', static);//is this middleware? when is goes to /public?
app.use(cookieParser());//third party middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));//It parses incoming requests with urlencoded payloads and is based on body-parser.

// create the Application-level middleware: import and use them
const configMiddleware = require("./middleware");
configMiddleware(app);

//create and call all the router:
const configRoute = require("./routes");
configRoute(app);

//Listen for connections.
// A node http.Server is returned, with this application (which is a Function) as its callback. 
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});