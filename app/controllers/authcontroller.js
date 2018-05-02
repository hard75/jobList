var exports = module.exports = {};
var Sequelize = require("sequelize");

//Configuración de base de datos 
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];
var db = new Sequelize(config.database, config.username, config.password, config);

// Obtiene modelo job en una variable para llamar a sus funciones.
const Job = require('../models/job')(db, Sequelize);

//Variable para saber cuando un trabajo seleccionado y listo para mostrar en el update
var oneJob = null;


/**
 * Ruta para ingresar usuario al sistema
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.signup = function(req, res) {
    res.render('signup','');
}

/**
 * Ruta para logueo de usuarios
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.signin = function(req, res) {
    res.render('signin', '');
}

/**
 *  Busca solo un Job
 * 
 * @param {*} req 
 * @param {*} res 
 */
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


/**
 * Ruta en la cual se accede solo si el usuario esta logueado
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.dashboard = function(req, res) {
    var today = new Date().toISOString().slice(0,10);

    //Se usa para contar el número de trabajos 
    var countJobs = 0;
    //Controla las si las notificaciones aparecen o no
    var showNotification = null;
    var showUpdate =  {display:'block'};

    /**
     * 
     * Notificará solo de las tareas pendientes hoy
     * cuenta el número de trabajos vs el número de trabajos actual,
     * así se entera si hay nuevos
     * 
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

    //Deja la variable one Job vacia cuando tiene un trabajo seleccionado
    var jobUpdate = oneJob;
    if (oneJob) {
        oneJob = null;
    } else {
        showUpdate = null;
    }
    

    //Muestra todos los trabajos y luego pasa a los parametros a la vista
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

/**
 * Ruta que se usa para eliminar la session del usuario
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}