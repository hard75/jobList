var Sequelize = require("sequelize");
//Configuración de base de datos
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];
var db = new Sequelize(config.database, config.username, config.password, config);
//Obtener modelo de Job
const Model = require('../models/job')(db, Sequelize);

/**
 * Exporta todas las rutas referentes a Job
 * 
 * @param {*} router 
 * @param {*} passport 
 * @param {middleware} isLoggedIn 
 */
module.exports = function(router, passport, isLoggedIn) {
    //ADD
    router.post('/job/add', isLoggedIn,function (req, res, next) {
        var userId = req.session.passport.user;
        var postData = {
            name: req.body.name,
            date : req.body.date,
            priority : req.body.priority,
            user_id : userId
        };

        Model.create(postData)
            .then(function (model) {
                
                res.redirect('/dashboard');
            })
            .catch(function (err) {
            });
    });

    //UPDATE
    router.post('/job/update', isLoggedIn,function (req, res, next) {
        var id = req.body.id;
        var putData = {
            name: req.body.name,
            date : req.body.date,
            priority : req.body.priority,
            user_id : req.session.passport.user
        };

        Model.update(putData,
            {
                where: {
                    id: id
                }
            }
        )
            .then(function (model) {
                res.redirect('/dashboard');
            })
            .catch(function (err) {
                console-log(err);
            });
    });

    //DELETE
    router.post('/job/delete', isLoggedIn,function (req, res, next) {

        var id = req.body.id;

        Model.destroy(
            {
                where: {
                    id: id
                }
            }
        )
            .then(function (deletedRecord) {
                res.redirect('/dashboard');
            })
            .catch(function (err) {
                console.log(err);
            });
    });

}