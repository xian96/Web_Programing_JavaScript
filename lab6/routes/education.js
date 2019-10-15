const express = require("express");
const router = express.Router();
const educationData = [
    {
        "schoolName": "Vulcan Science Academy",
        "degree": "First School Degree",
        "favoriteClass": "quantum mechanics",
        "favoriteMemory": "The Vulcan Science Academy (abbreviated as VSA) was an educational institute located on Vulcan. As late as the 2250s of the alternate reality, no Vulcan had ever declined admission"
    },
    {
        "schoolName": "Musk Junior High School",
        "degree": "Second School Degree",
        "favoriteClass": "New Eden",
        "favoriteMemory": "Musk Junior High School was a school located on Earth in the 23rd century. Its motto was vivere est cogitare (to live is to think). The school produced an annual yearbook."
    },
    {
        "schoolName": "Klingon training academy",
        "degree": "Third School Degree",
        "favoriteClass": "Age of Ascension",
        "favoriteMemory": "The Age of Ascension was a rite of passage in several cultures. It generally signified one's entrance into adulthood."
    }
]

router.get("/", (req, res) => {
    try {
        res.json(educationData);
    } catch (e) {
        res.status(404).json({ message: "not found educationData!" });
    }
})

module.exports = router;