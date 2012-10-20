var controllers = require('../controllers')
  , home = controllers.Home;

module.exports = function( app ){
  //Home page
  app.get( '/', home.index );
  app.post('/csv-to-json', home.csvToJSON );
};