const express = require("express");
const router = express.Router();
// const app = express();
// const data = require("../data");
// const users = data.users;
// const bcrypt = require("bcrypt");


// This route will expire/delete the AuthCookie and inform the user that they have been logged out. 
// It will provide a URL hyperlink to the / route.
router.get("/", async (req, res) => {
    try {
        if (!req.session.authenticate) {//not login no need to logout;
            res.redirect('/login');
        }
        else {
            // req.session.authenticate = false;
            // expire/delete the session AuthCookie 
            //TODO:
            req.session.destroy();
            res.render("logout/logout", { logoutInfo: "You have been logged out" });
        }
    } catch (e) {
        res.status(400).render('error',{error: e});
    }

});

module.exports = router;