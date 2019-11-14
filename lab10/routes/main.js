const express = require("express");
const router = express.Router();
// const app = express();

router.get("/", async (req, res) => {
    //1. If the user is authenticated, it will redirect to /private.
    const authenticated = req.cookies.authenticated;//add when login
    if (authenticated)
        res.redirect("/privare");
    else {
        //2.  If the user is not authenticated, it will render a view with a login form
        res.redirect("/login");
    }
});

module.exports = router;