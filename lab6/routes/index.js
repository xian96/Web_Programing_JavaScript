const aboutRoutes = require("./about");
const storyRoutes = require("./story");
const educationRoutes = require("./education");

const constructor = (app) => {//arrow function expression: For only one argument, the parentheses are not required
    app.use("/about", aboutRoutes);
    app.use("/story", storyRoutes);
    app.use("/education", educationRoutes);
    //does sequence matter?
    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });

};

// const constructorMethod = app => {
//     app.use("*", (req, res) => {
//         res.status(404).json({ error: "constructorMethod" });
//     });
// };

// module.exports ={constructor}; //What's the differnece???
module.exports = constructor;

