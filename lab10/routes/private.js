const express = require("express");
const router = express.Router();
// const app = express();
const data = require("../data");
const users = data.user;

// This route will be simple, as well. This route will be protected 
// your own authentication middleware to only allow valid, logged in users to see this page.
router.get("/", (req, res) => {
    // If the user is logged in, you will make a simple view that displays
    //  all details except the password for the currently logged in user.

    // Also, you will need to have a hyperlink at the bottom of the page to /logout.
    try {
        if (!req.session.authenticate) {
            res.redirect('../login');
        }
        else {
            const user = await users.getUserByUsername(req.session.username);
            res.render("private/private",
                // {
                //     Person: Person,
                //     stylesheetLink: "/public/site.css",
                //     title: "People Finder"
                // }
            );
        }
    } catch (e) {

    }

});

module.exports = router;