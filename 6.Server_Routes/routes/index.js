const aboutRoutes = require("./about");
const storyRoutes = require("./story");
const educationRoutes = require("./education");

const constructor = (app) => {//arrow function expression: For only one argument, the parentheses are not required
    app.use("/about", aboutRoutes);
    app.use("/story", storyRoutes);
    app.use("/education", educationRoutes);
    //does sequence matter?Yes,other wise it go * one every time!
    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });

};

const constructorMethod = app => {
    app.use("*", (req, res) => {
        res.status(404).json({ error: "constructorMethod" });
    });
};

//module.exports = {constructor}; //What's the differnece?:So Here: constructor is an object, don't need to make it object again!
module.exports = constructor;

