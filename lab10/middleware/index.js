const middlewareCommon = require("./middlewareCommon");
// const middlewareLogin = require("./middlewareLogin");
const middlewarePrivate = require("./middlewarePrivate");

function constructor(app) {
    app.use(middlewareCommon);
    app.use("/private", middlewarePrivate);
}

module.exports = constructor;