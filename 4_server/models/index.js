/**
 * Get a handle to the db here and give to the models while creating
 */
var nedb = require('nedb');
var db = {};

db.users   = new nedb({filename : './data/users.db', autoload : true});
db.papers  = new nedb({filename : './data/papers.db', autoload : true});
db.results = new nedb({filename : './data/results.db', autoload : true});


function modelIndex(dbSettings) {


  /*****************************************************************************
   * Clear the database of all keys, 
   ****************************************************************************/
  this.flush   = function(callback) {
    //redisClient.flushdb(callback);
  }

  var db_userSample = {
  };

  var db_paperSample = {
  }

  var db_resultSample = {
  }

  //add input validation here   
  var userModel   = require('./user.js')(db_userSample, db.users)
    , paperModel  = require('./paper.js')(db_paperSample, db.papers)
    , resultModel = require('./result.js')(db_resultSample, db.results);

  return {
    flush   : this.flush,
    user    : userModel,
    paper   : paperModel,
    result  : resultModel
  };
};

module.exports = modelIndex;



