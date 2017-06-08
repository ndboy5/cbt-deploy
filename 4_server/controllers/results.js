var express = require('express'),
  model = require('../models')({name:"andso"}),
  Purdy = require('purdy'),
  beautify = require("json-beautify"),
  router = express.Router();

// at /api/v1/Results
/************************************************************************
 * Get all the results in the DB
 ***********************************************************************/
router.route('/')
  .get((req, res) => {
    console.log("got here ");
    model.result.retrieve(function (err, rep) {
      console.log(rep); 
      res.json(rep);
    });
  })
  /*********************************************************************
   * Add a Result to the Database via an Http Post
   *********************************************************************/
  .post((req, res) => {
    //console.log(model.resultModel.something());
    model.result.create(req.body, function(err, data) {
      res.send(Purdy.stringify(data,{plain:true}));
    });
  });

  /*********************************************************************
   * Perform operations on results given the unique ID for the result 
   *********************************************************************/
 router.route('/:id')
  /*********************************************************************
   * Get the data for a particular result given the result ID   
   *********************************************************************/
  .get((req, res) => {
    console.log(req.params.id);
    //perform sanity checks here
    var _id = req.params.id;
    console.log(_id);

    model.result.retrieveOne(_id, function (err, rep) {
      console.log(rep); 
      //res.send(beautify(rep, null, 2, 100));
      res.json(rep);
    });
  })
  /*********************************************************************
   * Update a result given the ID of the result
   *********************************************************************/
  .patch((req, res) => {
    //perform sanity checks here
    var _id   = req.params.id;
    var _data = req.body;

    model.result.update(_id, _data, function (err, rep) {
      console.log(rep); 
      //res.send(beautify(rep, null, 2, 100));
      res.json(rep);
    });
  })
  /*********************************************************************
   * Delete the details for a result, given the result ID
   *********************************************************************/
  .delete((req, res) => {
    console.log(req.params.id);
    //perform sanity checks here
    var _id = req.params.id;

    model.result.remove(_id, function (err, rep) {
      console.log(rep); 
      //res.send(beautify(rep, null, 2, 100));
      res.json(rep);
    });
  })

module.exports = router;
