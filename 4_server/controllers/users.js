var express = require('express'),
  model = require('../models')({name:"andso"}),
  Purdy = require('purdy'),
  beautify = require("json-beautify"),
  router = express.Router();

// at /api/v1/users
router.route('/')
  .get((req, res) => {
    console.log(model.user);
    model.user.retrieve(function (err, rep) {
      console.log(rep); 
      //res.send(Purdy.stringify(rep,{plain:true}));
      res.json(rep);
    });
  })
  .post((req, res) => {
    //console.log(model.paperModel.something());
    model.userModel.createUser(req.body, function(err, data) {
      res.send(Purdy.stringify(data,{plain:true}));
    });
  });

router.route('/:id')
  .get((req, res) => {
    console.log(req.params.id);
    //perform sanity checks here
    var _id = req.params.id;

    model.user.retrieveOne(_id, function (err, rep) {
      console.log(rep); 
      //res.send(beautify(rep, null, 2, 100));
      res.json(rep);
    });
  })
  .patch((req, res) => {
    //perform sanity checks here
    var _id   = req.params.id;
    var _data = req.body;

    model.user.update(_id, _data, function (err, rep) {
      console.log(rep); 
      //res.send(beautify(rep, null, 2, 100));
      res.json(rep);
    });
  })
  .delete((req, res) => {
    console.log(req.params.id);
    //perform sanity checks here
    var _id = req.params.id;

    model.user.remove(_id, function (err, rep) {
      console.log(rep); 
      //res.send(beautify(rep, null, 2, 100));
      res.json(rep);
    });
  })

module.exports = router;
