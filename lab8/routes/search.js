const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.peoples;

//DONT FORGET TO CHECK ALL INPUT TO MAKE SURE IT IS THERE, THAT IT IS VALID, AND PROPER TYPE

// router.get('/', async (req, res) => {
//   try {
//     res.render('people/search');
//   } catch (e) {
//     res.status(404).render('error/error', { error: e });
//   }
// });

router.post('/', async (req, res) => {
  try {
    if (!req.body.personName)
      throw `not provide name`;
    // console.log(req.body.personName);
    const Person = peopleData.getPeopleByName(req.body.personName);
    var Found = false;
    if (Person.length !== 0)
      Found = true;
    res.render('people/search',
      {
        Found: Found,
        Person: Person,
        searchedName: req.body.personName,
        linkHref: "/public/site.css"
      });
  } catch (e) {
    res.status(404).render('error/error', { error: e });
  }
});

module.exports = router;