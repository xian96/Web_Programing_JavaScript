// const data = require('../data');
// const user = data.user;
const express = require("express");
// const router = express.Router();
const app = express();
// Middlewares:

// 1. One which will log the last time the user has made a request, and store it in a cookie.
function checkAuth(req, res, next) {
    if (!(req.cookies.AuthCookie)) {
        res.status(403).send("Unauthorized");
        res.redirect("/");
    }
    next();
}
app.use(checkAuth);