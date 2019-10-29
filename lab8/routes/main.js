const express = require('express');
const router = express.Router();

//DONT FORGET TO CHECK ALL INPUT TO MAKE SURE IT IS THERE, THAT IT IS VALID, AND PROPER TYPE
router.get('/', async (req, res) => {
    try {
        // const allPeople = peopleData.getAllPeople();
        // res.render('', { allPeople: allPeople });
        res.render('people/mainPage', {
            linkHref: "/public/site.css"
        });
    } catch (e) {
        res.status(404).render('error/error', { error: e });
    }
});

module.exports = router;