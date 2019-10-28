const mainRoutes = require('./main');
const searchRoutes = require('./search');
const detailsRoutes = require('./details');

const constructorMethod = (app) => {
  app.use('/', mainRoutes);
  app.use('/search', searchRoutes);
  app.use('/details', detailsRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;