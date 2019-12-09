// const mainRoute = require("./main");
const loginRoute = require("./login");
const privateRoute = require("./private");
const logoutRoute = require("./logout");

function constructor(app) {
    // app.use("/", mainRoute);
    app.use("/", loginRoute);
    app.use("/login", loginRoute);
    app.use("/private", privateRoute);
    app.use("/logout", logoutRoute);

    app.use("*", (req, res) => {
        res.redirect("/");
    });
}

module.exports = constructor;