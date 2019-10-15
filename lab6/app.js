const express = require("express");
const app = express();
const configRoutes = require("./routes");

// TypeError: configRoutes is not a function when module.exports ={};
configRoutes(app);//TODO: this will call the (First Method)exports in the "./routes" index.js file! 

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});