const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.peoples;

//DONT FORGET TO CHECK ALL INPUT TO MAKE SURE IT IS THERE, THAT IT IS VALID, AND PROPER TYPE
router.get('/', async (req, res) => {
  try {
    const allPeople = peopleData.getAllPeople();
    res.render('', {allPeople: allPeople});
  } catch (e) {
    res.status(404).render('', { error: e });
  }
});

router.get('/:id', async (req, res) => {
  // console.log(req.params.id);
  try {
    const Person = peopleData.getPeopleById(req.params.id);
    res.render('', {Person: Person});
  } catch (e) {
    res.status(404).render('', { error: e });
  }
});

module.exports = router;