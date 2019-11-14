const data = require('../data');
const user = data.user;
const express = require("express");
// const router = express.Router();
const app = express();
// Middlewares:

// 1. One which will log the last time the user has made a request, and store it in a cookie.
function userCookie(request, response, next) {
    // If we had a user system, we could check to see if we could access /admin

    console.log('The request has all the following cookies:');
    console.log(request.cookies);
    if (request.cookies.lastAccessed) {
        console.log('This user last accessed the site at ' + request.cookies.lastAccessed);
    } else {
        console.log('This user has never accessed the site before');
    }

    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Providing a third parameter is optional, but allows you to set options for the cookies.
    // see: http://expressjs.com/en/api.html#res.cookie
    // for details on what you can do!
    response.cookie('lastAccessed', now.toString(), { expires: expiresAt });
    next();
}
app.use(userCookie);

// // 2. One which will deny all users access to the /admin path.
// function checkAccessAdmin(request, response, next) {
//     // If we had a user system, we could check to see if we could access /admin 

//     console.log("Someone is trying to get access to /admin! We're stopping them!");
//     response.status(403).send('You cannot access /admin');
// }
// app.use('/private', checkAccessAdmin);

module.exports = app;