const express = require('express');
const router = express.Router();

//DONT FORGET TO CHECK ALL INPUT TO MAKE SURE IT IS THERE, THAT IT IS VALID, AND PROPER TYPE
router.get('/', async (req, res) => {
    try {
        const allPeople = peopleData.getAllPeople();
        res.render('people/mainPage', { allPeople: allPeople });
    } catch (e) {
        res.status(404).render('error/error', { error: e });
    }
});

module.exports = router;