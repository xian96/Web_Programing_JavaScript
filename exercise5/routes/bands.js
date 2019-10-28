const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;

//DONT FORGET TO CHECK ALL INPUT TO MAKE SURE IT IS THERE, THAT IT IS VALID, AND PROPER TYPE
router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const band = await bandData.getBandById(req.params.id);
    res.json(band);
  } catch (e) {
    res.status(404).json({ error: 'Band not found' });
  }
});

router.get('/genre/:genre', async (req, res) => {
  // console.log(req.params.genre);
  //1. call bandData.searchBandByGenre res.json the result.
  try {
    const bandList = await bandData.searchBandByGenre(req.params.genre);
    res.json(bandList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get('/', async (req, res) => {
  try {
    const bandList = await bandData.getAllBands();
    res.json(bandList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//2. : router.post to url '/search/bandmember'  get the req.body and then
//  1. Check the fields.  if req.body.name is present, then call bandDatasearchBandMember(req.body.name)
//  2. If the name field is not present then check if firstName and lastName are present in the body
//   req.body.firstName, req.body.LastName and If so, then call bandData.searchBandMemberFullName(req.body.firstName, req.bodylastName)
router.post('/search/bandmember', async (req, res) => {
  if (req.body.name) {
    try {
      const bandList = await bandData.bandDatasearchBandMember(req.body.name)
      res.json(bandList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
  else if (req.body.firstName && req.body.lastName) {
    // console.log(req.body.firstName + ' ' + req.body.lastName);
    try {
      const bandList = await bandData.searchBandMemberFullName(req.body.firstName, req.bodylastName);
      res.json(bandList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
  else
    throw `req.body.name:${req.body.name} is not exist OR req.body.firstName${req.body.firstName} req.body.lastName${req.bodylastName} is not exist`;
});

// 3. TODO: router.post to url '/search/bandName' to  get the req.body and then
router.post('/search/bandName', async (req, res) => {
  let bandName = req.body.bandName
  if (bandName) {
    try {
      const bandList = await bandData.searchBandByName(bandName);
      res.json(bandList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
  else
    throw `bandName:${bandName} is not exist`;
});

// 4. :
//     router.post to url '/search/year' you will use this route to search by year on any of the functions,
// 		your body should include a field named yearRange you like, the values can be "before", "onOrBefore", "after", "onOrAfter", "exact"
// 		then you use an if statement to check that field, and then call the appropriate function
// 		like so:

// 		and so on..
router.post('/search/year', async (req, res) => {
  let range = req.body.yearRange
  if (range) {
    if (range === "exact") {
      try {
        const bandList = await bandData.searchBandByYear(year);
        res.json(bandList);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    }
    else if (range === "after") {
      try {
        const bandList = await bandData.searchBandFormedAfter(year);
        res.json(bandList);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    }
    else if ("onOrAfter") {
      try {
        const bandList = await bandData.searchBandFormedOnOrAfter(year);
        res.json(bandList);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    }
    else if ("onOrBefore") {
      try {
        const bandList = await bandData.searchBandFormedOnOrBefore(year);
        res.json(bandList);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    }
    else if ("before") {
      try {
        const bandList = await bandData.searchBandFormedBefore(year);
        res.json(bandList);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    }
  }
  else
    throw `yearRange:${yearRange} is not exist`;
});


// 5. : router.post to url '/:id/bandmembers', get the req.body and then
router.post('/:id/bandmembers', async (req, res) => {
  if (req.body) {
    try {
      let bandId = req.params.id
      let firstName = req.body.firstName
      let lastName = req.body.lastName
      const bandMember = await bandData.addBandMember(bandId, firstName, lastName);
      res.json(bandMember);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
  else
    throw `req.body:${req.body} is not exist`;
});

// 6. : router.delete to url '/:id/bandmembers' 
//    get the req.body and then
router.delete('/:id/bandmembers', async (req, res) => {
  if (req.body) {
    try {
      let bandId = req.params.id
      let firstName = req.body.firstName
      let lastName = req.body.lastName
      const bandMember = await bandData.removeBandMember(bandId, firstName, lastName);
      res.json(bandMember);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
  else
    throw `req.body:${req.body} is not exist`;
});

router.delete('/:id', async (req, res) => {
  //7. call the remove  band data function
  if (req.params.id) {
    try {
      const bandMember = await bandData.removeBand(req.params.id);
      res.json(bandMember);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
  else
    throw `req.params.id:${req.params.id} is not exist`;
});

module.exports = router;