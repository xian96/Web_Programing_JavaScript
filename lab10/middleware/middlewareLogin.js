const express = require("express");
// const router = express.Router();
const app = express();

// for every request made to the server
function userSessionCookie(request, response, next) {
    // console.log('The request has all the following session cookies:');
    // console.log(request.session);

    // Current Timestamp: new Date().toUTCString()
    // Request Method: req.method
    // Request Route: req.originalUrl
    // Some string/boolean stating if a user is authenticated
    const now = new Date();;
    let auth = request.session.authenticate;
    console.log(auth);
    if (auth){
        authenticated = request.session.authenticate;
    }
    else { 
        var authenticated = false;
    }
    console.log(now.toUTCString() +" "+ request.method +" "+ request.originalUrl + " UserAuthenticated:" + authenticated);
    next();
}
app.use(userSessionCookie);

module.exports = app;
// // 2. One which will deny all users access to the /admin path.
// function checkAccessAdmin(request, response, next) {
//     // If we had a user system, we could check to see if we could access /admin 

//     console.log("Someone is trying to get access to /admin! We're stopping them!");
//     response.status(403).send('You cannot access /admin');
// }
// app.use('/private', checkAccessAdmin);
