const mainRoute = require("./main");
const loginRoute = require("./login");
const privateRoute = require("./private");

function constructor(app) {
    app.use("/", mainRoute);
    app.use("/login", loginRoute);
    app.use("/private", privateRoute);
    app.use("/private", privateRoute);

    app.use("*", (req,res)=>{
        res.redirect("/");
    })
}

module.exports = constructor;