var exports = module.exports = {};
var Sequelize = require("sequelize");

//Configuración de base de datos 
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];
var db = new Sequelize(config.database, config.username, config.password, config);

// Obtiene modelo task en una variable para llamar a sus funciones.
const Task = require('../models/task')(db, Sequelize);

//Variable para saber cuando un tarea seleccionado y listo para mostrar en el update
var oneTask = null;


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
 *  Busca solo un task
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.findOne = function(req, res) {
    Task.find({
        where: {
            id: req.body.id
        }
    }).then(result => {
        oneTask = result;
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

    //Se usa para contar el número de tareas 
    var countTasks = 0;
    //Controla las si las notificaciones aparecen o no
    var showNotification = null;
    var showUpdate =  {display:'block'};

    /**
     * 
     * Notificará solo de las tareas pendientes hoy
     * cuenta el número de tareas vs el número de tareas actual,
     * así se entera si hay nuevos
     * 
     */
    Task.findAndCountAll({
        where: {
            user_id : req.session.passport.user,
            date : today
        }
     })
     .then(result => {
        if (result.count > 0) {
            showNotification = {display:'block'};
            countTasks = result.count;
        }
     });

    //Deja la variable one task vacia cuando tiene un trabajo seleccionado
    var taskUpdate = oneTask;
    if (oneTask) {
        oneTask = null;
    } else {
        showUpdate = null;
    }
    

    //Muestra todos los tareas y luego pasa a los parametros a la vista
    Task.findAll({
        where: {
            user_id : req.session.passport.user
        } 
    })
    .then(result => {
        res.render('dashboard', {
            tasks : result,
            task : taskUpdate,
            showUpdate : showUpdate,
            showNotification : showNotification,
            countTasks : countTasks
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