const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.peoples;

//DONT FORGET TO CHECK ALL INPUT TO MAKE SURE IT IS THERE, THAT IT IS VALID, AND PROPER TYPE

router.get('/:id', async (req, res) => {
  try {
    if (!req.params.id)
      throw `no id provided`;
    console.log(req.params.id);
    const Person = peopleData.getPersonById(req.params.id);
    res.render('people/detail', {
      Person: Person,
      linkHref: "/public/site.css"
    });
  } catch (e) {
    res.status(404).render('error/error', { error: e });
  }
});

module.exports = router;