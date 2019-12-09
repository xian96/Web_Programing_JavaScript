const animalData = require("./animals");
const postData = require("./posts");
// const likeData = require("./likes");

const constructor = (app) => {
    app.use("/animals", animalData);
    app.use("/posts", postData);
    // app.use("/likes", likeData);
    
    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
}

module.exports = constructor