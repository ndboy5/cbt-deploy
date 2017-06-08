var express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  controllers = require('./controllers'),
  morgan = require('morgan'),
  port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(morgan("short"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Init Cross origin resource management. 
 * Make the CORS work only for origins defined in allowedOrigins
 */
var originsWhitelist = [
  'http://localhost:4200',      //Front end localhost development
  'http://www.nexware.com.ng'   //Web Client end
];

var corsOptions = {
  origin: function(origin, callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials:true
}

app.use(cors(corsOptions));
app.use(controllers); 

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

