const express = require("express");
// const router = express.Router();
const app = express();

// your own authentication middleware to only allow valid, logged in users to see this page.
function checkAuthentication(req, res, next) {
    if (!req.session.authenticate) {
        // If a user is not logged in, you will return an HTML page saying that the user is not logged in, and the page must issue an HTTP status code of 403.
        res.status(403).render('login/login',{error: "you are not logged in"});
    }
    else {
        // If the user is logged in, the middleware will "fall through" to the next route calling the next() callback.
        // console.log("authenticated go next");
        next();
    }
}
app.use(checkAuthentication);

module.exports = app;