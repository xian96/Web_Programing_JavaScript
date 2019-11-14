const primeRoute = require("./prime");

function constructor(app) {
    app.use("/",primeRoute);

    app.use("*", (req, res) => {
        res.redirect("/");
    });
}

module.exports = constructor;
