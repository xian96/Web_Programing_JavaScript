const express = require("express");
const router = express.Router();
// const app = express();
const data = require("../data");
const user = data.user;
// It creates a cookie for the browser that will be used to track the current session of the user
const session = require('express-session');

router.get("/", async (req, res) => {
    // 2.  If the user is not authenticaed, it will render a view with a login form
    //  for a username and password. 
    try {
        const authenticated = req.cookies.authenticated;
        if (authenticated) {
            res.redirect('../');
        }
        else {
            res.render("login/login", { error: "------------------FAKE ERROR TEST---------" + authenticated });
        }
    } catch (e) {
        res.render("login/login", { error: e });
    }
});

router.post("/", async (req, res) => {
    //This route is simple: making a POST to this route will attempt to log a user in with the credentials they provide in the login form.

    //If the user provides a successful username / password combination, you will set a cookie named AuthCookie. This cookie must be named AuthCookie or your assignment will receive a major point deduction.

    //  After logging in, you will redirect the user to the /private route.

    //     If the user does not provide a valid login, you will render the login screen once again, and this time show an error message (along with an HTTP 401 status code) to the user explaining that they did not provide a valid username and/or password.
    try {
        const loginInfo = req.body;
        // console.log(loginInfo);
        if (!loginInfo.UserName)
            throw `not provide UserName`;
        if (!loginInfo.Password)
            throw `not provide Password`;
        var loginSuccessful = await user.CheckLogin(loginInfo.UserName, loginInfo.Password);
        if (loginSuccessful) {
            // Use the session middleware
            app.use(session({
                name: 'AuthCookie',
                secret: 'what is your name?',
                resave: false,
                saveUninitialized: true
            }));
        }

        // const Person = await peopleData.getPeopleByName(req.body.personName);
        // var Found = false;
        // if (Person.length !== 0)
        //   Found = true;
        // res.render('people/search',
        //   {
        //     Found: Found,
        //     Person: Person,
        //     searchedName: req.body.personName,
        //     stylesheetLink: "/public/site.css",
        //     title: "People Finder"
        //   });
        // response.cookie('lastAccessed', now.toString(), { expires: expiresAt });
    } catch (e) {
        res.status(401).render('login/login', { error: e });
    }

});

module.exports = router;