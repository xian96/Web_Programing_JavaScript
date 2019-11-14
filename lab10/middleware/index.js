// const middlewareCommon = require("./middlewareCommon");
const middlewareLogin = require("./middlewareLogin");

function constructor(app) {
    // app.use("/login", middlewareCommon);
    app.use("/login", middlewareLogin);
}

module.exports = constructor;