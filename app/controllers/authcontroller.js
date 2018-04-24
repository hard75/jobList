var exports = module.exports = {}
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];
var db = new Sequelize(config.database, config.username, config.password, config);
const Job = require('../models/job')(db, Sequelize);

var oneJob = null;

exports.signup = function(req, res) {
 
    res.render('signup','');
 
}

exports.signin = function(req, res) {
 
    res.render('signin', '');
 
}

exports.findOne = function(req, res) {
    Job.find({
        where: {
            id: req.body.id
        }
    }).then(result => {
        oneJob = result;
        res.redirect('/dashboard');
    });  
}


exports.dashboard = function(req, res) {
    var today = new Date().toISOString().slice(0,10);
    var countJobs = 0;
    var showNotification = null;
    var showUpdate =  {display:'block'};
    /**
     * Notificará solo de las tareas pendientes hoy
     */
    Job.findAndCountAll({
        where: {
            user_id : req.session.passport.user,
            date : today
        }
     })
     .then(result => {
        if (result.count > 0) {
            showNotification = {display:'block'};
            countJobs = result.count;
        }
     });

    var jobUpdate = oneJob;
    if (oneJob) {
        oneJob = null;
    } else {
        showUpdate = null;
    }
    
    Job.findAll({
        where: {
            user_id : req.session.passport.user
        } 
    })
    .then(result => {
        res.render('dashboard', {
            jobs : result,
            job : jobUpdate,
            showUpdate : showUpdate,
            showNotification : showNotification,
            countJobs : countJobs
        });
    });
}
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}