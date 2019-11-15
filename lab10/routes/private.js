const express = require("express");
const router = express.Router();
// const app = express();
const data = require("../data");
const users = data.user;

// This route will be simple, as well. This route will be protected 
// your own authentication middleware to only allow valid, logged in users to see this page.
router.get("/", (req, res) => {
    try {
        if (!req.session.authenticate) {
            res.redirect('../login');
        }
        else {
            // If the user is logged in, you will make a simple view that displays
            //  all details except the password for the currently logged in user.
            const user = users.getUserById(req.session.userID);
            res.render("private/private",
                {
                    // _id: 0,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profession: user.profession,
                    bio: user.bio,
                    // hashedpassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.",
                }
            );
        }
    } catch (e) {

    }

});

module.exports = router;