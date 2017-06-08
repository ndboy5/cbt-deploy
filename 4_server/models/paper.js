/**
 * Perform basic crud on the paper.
 */
var shortID = require('shortid');

var paperModel = function(dbSettings, dbHandle) {
  
  /***************************************************************
   * Create the Paper and add to the db
   * Ensure that the paper phone_id is unique,
   * Use the phoneID as the _id for the db
   * @params {paperdata}   - the paperdate 
   * @params {function}   - the callback function
   **************************************************************/
  this.create  = function create(paperData, callback) {
    //Set the p_key for the paper 
    paperData.p_key = shortID.generate();

    dbHandle.insert(paperData, function (err, docs) {
      callback(err, docs);
    });
    return true;
  }

  /***************************************************************
   * Retrieve the Paper from the DB
   * @params {function}   - the callback function
   **************************************************************/
  this.retrieve  = function retrieve(callback) {
    // Find all documents in the collection
    dbHandle.find({},{p_key:1, exam_name:1, paper_name:1, paper_year:1}, function (err, docs) {
      callback(err, docs);
    });
    return true;
  }

  /**************************************************************
   * Retrieve the Paper from the DB; A single paper
   * @params {paperID}     - the paperID of paper to get
   * @params {function}   - the callback function
   **************************************************************/
  this.retrieveOne = function retrieveOne(paperID, callback) {
    // The same when you want to only find one document
    dbHandle.findOne({_id: paperID}, function (err, doc) {
      // doc is the document Mars
      // If no document is found, doc is null
      callback(err, doc);
    });
        return true;
  }

  /**************************************************************
   * Retrieve the Papers matching params
   * @params {object}     - {see schema below}
   *{
   *    "$schema": "http://json-schema.org/draft-04/schema#",
   *    "id": "search-params",
   *    "properties": {
   *        "exam_name": {
   *            "id": "search-params/exam_name",
   *            "type": "string"
   *        },
   *        "paper_code": {
   *            "id": "search-params/paper_code",
   *            "type": "string"
   *        },
   *        "paper_year": {
   *            "id": "search-params/paper_year",
   *            "type": "string"
   *        }
   *    },
   *    "type": "object"
   *}
   * @params {function}   - the callback function
   *************************************************************/
  this.retrieveBy = function retrieveBy(params, callback) {
    // The same when you want to only find one document
    var _ret = {exam_name: 1, paper_code: 1, paper_year : 1};
    dbHandle.find(params, _ret, function (err, doc) {
      // doc is the document Mars
      // If no document is found, doc is null
      callback(err, doc);
    });
        return true;
  }

 /***************************************************************
   * Create the Paper and add to the db
   * @params {paperID}     - the paper ID of paper to edit 
   * @params {paperdata}   - the paperdata 
   * @params {function}   - the callback function
   **************************************************************/
  this.update  = function update(paperID, paperData, callback) {
    // Replace a document by another
    dbHandle.update({_id: paperID}, paperData,
      function (err, numReplaced) {
        // numReplaced = 1
        callback(err, numReplaced);
        });
    dbHandle.persistence.compactDatafile();
    return true;
  }

  /**************************************************************
   * Delete the Paper 
   * @params {paperID}     - the paper ID to remove 
   * @params {function}   - the callback function
   **************************************************************/
  this.remove  = function remove(paperID, callback) {
    // Remove one document from the collection
    // options set to {} since the default for multi is false
    dbHandle.remove({_id: paperID}, {}, 
      function (err, numRemoved) {
      callback(err, numRemoved);
    });
    return true;
  }

  /**************************************************************
   * Counts the number of papers in the DB
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

module.exports = paperModel;
