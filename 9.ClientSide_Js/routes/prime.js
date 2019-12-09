const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
        res.render("primeChecker/prime");
});

// router.post("/", (req, res) => {
//     const number = req.body;
//     try {
//         /*
//         Get the value of the input text element
//         Determine whether or not the number is a prime number
//         Add a list item to the #attempts list of numbers you have checked.
//         This list item should have a class of is-prime if it is a prime number, or not-prime it is not.
//         */
//         if (!number) {
//             throw `number:${number} is not exist`;
//         }
//         if (!Number.isInteger(number)) {
//             throw `number:${number} is not Integer. please provide an integer to check`
//         }

//         res.render("primeChecker/prime");
//     } catch (e) {
//         res.status(404).render("error", { error: e });
//     }
// })

module.exports = router;