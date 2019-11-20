const express = require("express");
const router = express.Router();
// const app = express();
const data = require("../data");
const users = data.users;
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    // 1.  If the user is not authenticaed, it will render a view with a login form
    //  for a username and password. 
    try {
        if (req.session.authenticate) {
            res.redirect('/private');
        }
        else {
            res.render("login/login",
                { error: "--- LOGIN TO CONTINUE ---" }
            );
        }
    } catch (e) {
        res.render("error", { error: "--- OOPS ---" + e });
    }
});

router.post("/", async (req, res) => {
    //This route is simple: making a POST to this route will attempt to log a user in with the credentials they provide in the login form.
    try {
        const loginInfo = req.body;
        // console.log(loginInfo);
        if (!loginInfo.UserName)
            res.status(401).render('login/login', { error: `not provide UserName` });
        if (!loginInfo.Password)
            res.status(401).render('login/login', { error: `not provide Password` });
        // console.log("--- Route see you password ---");
        // console.log(loginInfo.Password);
        // console.log("--- but still need to check the correction ---");
        var user = users.getUserByUsername(loginInfo.UserName);
        console.log(user);
        if (user !== null) {
            //If the user provides a successful username / password combination, you will set a cookie named AuthCookie. This cookie must be named AuthCookie or your assignment will receive a major point deduction. //After logging in, you will redirect the user to the /private route.
            var compareToMatch = await bcrypt.compare(loginInfo.Password, user.hashedpassword);
            console.log(compareToMatch);
            if (compareToMatch == false) {
                res.status(401).render('login/login', { error: `password not correct` });
            }
            else {
                // const now = new Date();
                // const expiresAt = new Date();
                // expiresAt.setHours(expiresAt.getHours() + 1);
                req.session.userID = user._id;
                req.session.authenticate = true;
                res.redirect('/private');
            }
        }
        else {
            //     If the user does not provide a valid login, you will render the login screen once again, and this time show an error message (along with an HTTP 401 status code) to the user explaining that they did not provide a valid username and/or password.
            res.status(401).render('login/login', { error: "username is not exist!" });
        }
    } catch (e) {
        res.status(401).render('login/login', { error: e });
    }

});

module.exports = router;