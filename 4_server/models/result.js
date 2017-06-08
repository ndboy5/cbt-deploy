/**
 * Perform basic crud on the result.
 */
var shortID = require('shortid');

var resultModel = function(dbSettings, dbHandle) {
  
  /***************************************************************
   * Create the Result and add to the db
   * Ensure that the result phone_id is unique,
   * Use the phoneID as the _id for the db
   * @params {resultdata}   - the resultdate 
   * @params {function}   - the callback function
   **************************************************************/
  this.create  = function create(resultData, callback) {
    console.log('got to create result ');
    dbHandle.insert(resultData, function (err, docs) {
      callback(err, docs);
    });
    return true;
  }

  /***************************************************************
   * Retrieve the Result from the DB
   * @params {function}   - the callback function
   **************************************************************/
  this.retrieve  = function retrieve(callback) {
    // Find all documents in the collection
    dbHandle.find({}, function (err, docs) {
      callback(err, docs);
    });
    return true;
  }

  /**************************************************************
   * Retrieve the Result from the DB; A single result
   * @params {resultID}     - the resultID of result to get
   * @params {function}   - the callback function
   **************************************************************/
  this.retrieveOne = function retrieveOne(resultID, callback) {
    // The same when you want to only find one document
    dbHandle.findOne({_id: resultID}, function (err, doc) {
      // doc is the document Mars
      // If no document is found, doc is null
      callback(err, doc);
    });
        return true;
  }

  /**************************************************************
   * Retrieve the Results matching params
   * @params {object}     - {see schema below}
   *{
   *    "$schema": "http://json-schema.org/draft-04/schema#",
   *    "id": "search-params",
   *    "properties": {
   *        "exam_name": {
   *            "id": "search-params/exam_name",
   *            "type": "string"
   *        },
   *        "result_code": {
   *            "id": "search-params/result_code",
   *            "type": "string"
   *        },
   *        "result_year": {
   *            "id": "search-params/result_year",
   *            "type": "string"
   *        }
   *    },
   *    "type": "object"
   *}
   * @params {function}   - the callback function
   *************************************************************/
  this.retrieveBy = function retrieveBy(params, callback) {
    // The same when you want to only find one document
    var _ret = {
      user_id: 1,
      paper_id: 1,
      time_stamp: 1,
      exam_name: 1,
      paper_code : 1,
      paper_name : 1,
      paper_year : 1    
    };
    dbHandle.find(params, _ret, function (err, doc) {
      // doc is the document Mars
      // If no document is found, doc is null
      callback(err, doc);
    });
        return true;
  }

 /***************************************************************
   * Create the Result and add to the db
   * @params {resultID}     - the result ID of result to edit 
   * @params {resultdata}   - the resultdata 
   * @params {function}   - the callback function
   **************************************************************/
  this.update  = function update(resultID, resultData, callback) {
    // Replace a document by another
    dbHandle.update({_id: resultID}, resultData,
      function (err, numReplaced) {
        // numReplaced = 1
        callback(err, numReplaced);
        });
    dbHandle.persistence.compactDatafile();
    return true;
  }

  /**************************************************************
   * Delete the Result 
   * @params {resultID}     - the result ID to remove 
   * @params {function}   - the callback function
   **************************************************************/
  this.remove  = function remove(resultID, callback) {
    // Remove one document from the collection
    // options set to {} since the default for multi is false
    dbHandle.remove({_id: resultID}, {}, 
      function (err, numRemoved) {
      callback(err, numRemoved);
    });
    return true;
  }

  /**************************************************************
   * Counts the number of results in the DB
   **************************************************************/
  this.count  = function count(callback) {
    dbHandle.count({}, function (err, count) {
      callback(err, count);
    });
    return true;
  }

  return {
    create      : this.create,
    retrieve    : this.retrieve, 
    retrieveOne : this.retrieveOne, 
    retrieveBy  : this.retrieveBy,
    update      : this.update,
    remove      : this.remove,
    count       : this.count
  }
  
}


module.exports = resultModel;
