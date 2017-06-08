/**
 * Perform basic crud on the user.
 */
var shortID = require('shortid');

var userModel = function(dbSettings, dbHandle) {
  
  /***************************************************************
   * Create the User and add to the db
   * Ensure that the user phone_id is unique,
   * Use the phoneID as the _id for the db
   * @params {userdata}   - the userdata
   * @params {function}   - the callback function
   **************************************************************/
  this.create  = function create(userData, callback) {
    var _phoneID = userData["phone_id"];
    dbHandle.findOne({phone_id: _phoneID}, function (err, doc) {
      // If no document is found, doc is null
      if (doc === null) {
        //add the user to the database
        userData["_id"] = _phoneID;
        dbHandle.insert(userData, function (err, docs) {
          callback(err, docs);
        });
      } else {
        callback({err_msg:"Phone of user already registered"}, doc);
      }
    });
    
    return true;
  }

  /***************************************************************
   * Retrieve all the Users from the DB
   * @params {function}   - the callback function
   **************************************************************/
  this.retrieve  = function retrieve(callback) {
    // Find all documents in the collection
    dbHandle.find({}, function (err, docs) {
      callback(err, docs);
    });
    return true;
  }

  /***************************************************************
   * Retrieve the User from the DB; A single user
   * @params {userID}     - the userID of user to get
   * @params {function}   - the callback function
   **************************************************************/
  this.retrieveOne = function retrieveOne(userID, callback) {
    // The same when you want to only find one document
    dbHandle.findOne({phone_id: userID}, function (err, doc) {
      // doc is the document Mars
      // If no document is found, doc is null
      callback(err, doc);
    });
        return true;
  }

 /***************************************************************
   * Create the User and add to the db
   * @params {userID}     - the user ID of user to edit 
   * @params {userdata}   - the userdata 
   * @params {function}   - the callback function
   **************************************************************/
  this.update  = function update(userID, userData, callback) {
    // Replace a document by another
    dbHandle.update({phone_id: userID}, userData,
      function (err, numReplaced) {
        // numReplaced = 1
        callback(err, numReplaced);
        });
    //make nedb to refresh flat file. 
    dbHandle.persistence.compactDatafile();
    return true;
  }

  /***************************************************************
   * Delete the User 
   * @params {userID}     - the user ID to remove 
   * @params {function}   - the callback function
   **************************************************************/
  this.remove  = function remove(userID, callback) {
    // Remove one document from the collection
    // options set to {} since the default for multi is false
    dbHandle.remove({phone_id: userID}, {}, 
      function (err, numRemoved) {
      callback(err, numRemoved);
    });
    return true;
  }

  return {
    create      : this.create,
    retrieve    : this.retrieve, 
    retrieveOne : this.retrieveOne, 
    update      : this.update,
    remove      : this.remove
  }
  
}

module.exports = userModel;
