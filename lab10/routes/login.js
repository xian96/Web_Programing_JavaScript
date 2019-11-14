const express = require("express");
const router = express.Router();
// const app = express();
const data = require("../data");
const user = data.user;

router.get("/", async (req, res) => {
    // 1.  If the user is not authenticaed, it will render a view with a login form
    //  for a username and password. 
    try {
        if (!req.session.authenticate) {
            res.redirect('../private');
        }
        else {
            res.render("login/login",
                { error: "--- LOGIN TO CONTINUE ---"}
            );
        }
    } catch (e) {
        res.render("login/login", { error: "--- OOPS ---" +e });
    }
});

router.post("/", async (req, res) => {
    //This route is simple: making a POST to this route will attempt to log a user in with the credentials they provide in the login form.
    try {
        const loginInfo = req.body;
        // console.log(loginInfo);
        if (!loginInfo.UserName)
            throw `not provide UserName`;
        if (!loginInfo.Password)
            throw `not provide Password`;

        var loginCheckInfo = await user.CheckLogin(loginInfo.UserName, loginInfo.Password);
        if (loginCheckInfo === true) {
            //If the user provides a successful username / password combination, you will set a cookie named AuthCookie. This cookie must be named AuthCookie or your assignment will receive a major point deduction. //After logging in, you will redirect the user to the /private route.

            // const now = new Date();
            // const expiresAt = new Date();
            // expiresAt.setHours(expiresAt.getHours() + 1);
            req.session.username = loginInfo.UserName;
            req.session.authenticate = true;
            res.redirect('../private');
        }
        else {
            //     If the user does not provide a valid login, you will render the login screen once again, and this time show an error message (along with an HTTP 401 status code) to the user explaining that they did not provide a valid username and/or password.
            res.status(401).render('login/login', { error: loginCheckInfo });
        }
    } catch (e) {
        res.status(401).render('login/login', { error: e });
    }

});

module.exports = router;