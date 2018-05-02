/**
 * Modulos exportados
 */
var express = require('express')
var app = express()
var session    = require('express-session')
var bodyParser = require('body-parser')
var passport = require('passport')

var env = require('dotenv').load()

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.set('port', 4000);
app.set('view engine', 'jsx');
app.set('views', './app/views');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/', function(req, res) {
  res.render('index', '');
});

app.listen(app.get('port'), function() {
    console.log('Express server is up on port 4000');
});


//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);
 
 
//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);
 
 
//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});