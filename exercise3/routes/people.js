const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/", async (req, res) => {
    try {
        const people = await peopleData.getPeople();
        console.log("getPeople all!");
        res.json(people);
    } catch (e) {
        res.status(404).json({ message: "not found!" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const parseId = parseInt(req.params.id);
        const person = await peopleData.getPersonById(parseId);
        res.json(person);
    } catch (e) {
        res.status(404).json({ message: "not found!" });
    }
});

module.exports = router;