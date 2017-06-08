var express = require('express'),
  router = express.Router(),
  users  = require('./users.js');
  papers = require('./papers.js');
  results = require('./results.js');


//Add other logging middle-ware here

//Define the routes of the users, paper and exams
router.use('/api/v1/user', users);
router.use('/api/v1/paper', papers);
router.use('/api/v1/result', results);

//Add Pug Template for landing page 
router.get('/', (req, res) => {
 // res.send(_ret);
  res.render('index', {title: 'Xamjack First Pass', message:"Welcome to the API Server version 0.0.1 Xamjack. "});
  
});

router.use((req, res) => {
  res.status(404).json({ message: 'Resource not Found'});
});

module.exports = router;

