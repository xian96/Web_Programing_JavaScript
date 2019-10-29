const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.peoples;

//DONT FORGET TO CHECK ALL INPUT TO MAKE SURE IT IS THERE, THAT IT IS VALID, AND PROPER TYPE
router.get('/', async (req, res) => {
  try {
    res.render('people/search');
  } catch (e) {
    res.status(404).render('error/error', { error: e });
  }
});

router.post('/search', async (req, res) => {
  try {
    const Person = peopleData.(req.params.id);
    res.render('', {Person: Person});
  } catch (e) {
    res.status(404).render('error/error', { error: e });
  }
});)

module.exports = router;