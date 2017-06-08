var express = require('express'),
  model = require('../models')({name:"andso"}),
  Purdy = require('purdy'),
  beautify = require("json-beautify"),
  router = express.Router();

// at /api/v1/Papers
/************************************************************************
 * Get all the papers in the DB
 ***********************************************************************/
router.route('/')
  .get((req, res) => {
    console.log("got here ");
    model.paper.retrieve(function (err, rep) {
      console.log(rep); 
      res.json(rep);
    });
  })
  /*********************************************************************
   * Add a Paper to the Database via an Http Post
   *********************************************************************/
  .post((req, res) => {
    //console.log(model.paperModel.something());
    model.paper.create(req.body, function(err, data) {
      res.send(Purdy.stringify(data,{plain:true}));
    });
  });

  /*********************************************************************
   * Perform operations on papers given the unique ID for the paper 
   *********************************************************************/
 router.route('/:id')
  /*********************************************************************
   * Get the data for a particular paper given the paper ID   
   *********************************************************************/
  .get((req, res) => {
    console.log(req.params.id);
    //perform sanity checks here
    var _id = req.params.id;
    console.log(_id);

    model.paper.retrieveOne(_id, function (err, rep) {
      console.log(rep); 
      //res.send(beautify(rep, null, 2, 100));
      res.json(rep);
    });
  })
  /*********************************************************************
   * Update a paper given the ID of the paper
   *********************************************************************/
  .patch((req, res) => {
    //perform sanity checks here
    var _id   = req.params.id;
    var _data = req.body;

    model.paper.update(_id, _data, function (err, rep) {
      console.log(rep); 
      //res.send(beautify(rep, null, 2, 100));
      res.json(rep);
    });
  })
  /*********************************************************************
   * Delete the details for a paper, given the paper ID
   *********************************************************************/
  .delete((req, res) => {
    console.log(req.params.id);
    //perform sanity checks here
    var _id = req.params.id;

    model.paper.remove(_id, function (err, rep) {
      console.log(rep); 
      //res.send(beautify(rep, null, 2, 100));
      res.json(rep);
    });
  })

module.exports = router;
