const express = require('express');
const router = express.Router();

//DONT FORGET TO CHECK ALL INPUT TO MAKE SURE IT IS THERE, THAT IT IS VALID, AND PROPER TYPE
router.get('/', async (req, res) => {
    try {
        // const allPeople = peopleData.getAllPeople();
        // res.render('', { allPeople: allPeople });
        res.render('people/mainPage', {
            stylesheetLink: "/public/site.css",
            title: "People Finder"
        });
    } catch (e) {
        res.status(404).render('error/error', { error: e ,stylesheetLink: "/public/site.css"});
    }
});

module.exports = router;