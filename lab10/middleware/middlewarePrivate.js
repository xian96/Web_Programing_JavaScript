const express = require("express");
// const router = express.Router();
const app = express();

// your own authentication middleware to only allow valid, logged in users to see this page.
function checkAuthentication(req, res, next) {
    if (!req.session.authenticate) {
        res.redirect('../login');
    }
    else {
        next();
    }
}
app.use(checkAuthentication);

module.exports = app;