
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];
var db = new Sequelize(config.database, config.username, config.password, config);
const Model = require('../models/job')(db, Sequelize);
module.exports = function(router, passport, isLoggedIn) {

    /* GET Models. */
    router.get('/job', isLoggedIn,function (req, res, next) {
        var code = 500;
        var message = 'Internal Server Error';
        var result = '';

        var page = req.query.page || 1;
        var limit = req.query.limit || 5;
        var offset = (page - 1) * limit;

        Model
            .findAndCountAll({
                offset: +offset,
                limit: +limit
            })
            .then(result => {
                code = 200;
                message = 'OK';

                res.json({
                    code: code,
                    message: message,
                    response: {
                        data: { models: result }
                    }
                });
            });
    });

    /* GET Model. */
    router.get('/job/:id', isLoggedIn,function (req, res, next) {
        var code = 500;
        var message = 'Internal Server Error';
        var result = '';

        var id = req.params.id | 0;

        Model
            .find({
                where: {
                    id: id
                }
            })
            .then(result => {
                code = 200;
                message = 'OK';

                res.json({
                    code: code,
                    message: message,
                    response: {
                        data: { model: result }
                    }
                });
            });
    });

    /* POST new Model. */
    router.post('/job/add', isLoggedIn,function (req, res, next) {
        var code = 500;
        var message = 'Internal Server Error';
        var response = '';

        var postData = {
            nameJob: req.body.nameJob,
            date : req.body.date,
            priority : req.body.priority
        };

        Model.create(postData)
            .then(function (model) {
                code = 200;
                message = 'OK';
                response = 'Record is successfully added.';

                res.json({
                    code: code,
                    message: message,
                    response: {
                        msg: response
                    }
                });
            })
            .catch(function (err) {
                code = 500;
                response = message;

                res.json({
                    code: code,
                    message: message,
                    response: {
                        msg: response
                    }
                });
            });
    });

    /* PUT old Model. */
    router.put('/job/update/:id', isLoggedIn,function (req, res, next) {
        var code = 500;
        var message = 'Internal Server Error';
        var response = '';

        var id = req.params.id;
        var putData = {
            nameJob: req.body.nameJob,
            date : req.body.date,
            priority : req.body.priority
        };

        Model.update(putData,
            {
                where: {
                    id: id
                }
            }
        )
            .then(function (model) {
                code = 200;
                message = 'OK';
                response = 'Record is successfully updated.';

                res.json({
                    code: code,
                    message: message,
                    response: {
                        msg: response
                    }
                });
            })
            .catch(function (err) {
                code = 500;
                response = message;

                res.json({
                    code: code,
                    message: message,
                    response: {
                        msg: response
                    }
                });
            });
    });

    /* DELETE Model. */
    router.delete('/job/delete/:id', isLoggedIn,function (req, res, next) {
        var code = 500;
        var message = 'Internal Server Error';
        var response = '';

        var id = req.params.id;

        Model.destroy(
            {
                where: {
                    id: id
                }
            }
        )
            .then(function (deletedRecord) {
                if (deletedRecord === 1) {
                    code = 200;
                    message = 'OK';
                    response = 'Record is successfully deleted.';
                } else {
                    code = 404;
                    message = 'OK';
                    response = 'Record not found.';
                }
                res.json({
                    code: code,
                    message: message,
                    response: {
                        msg: response
                    }
                });
            })
            .catch(function (err) {
                code = 500;
                response = message;

                res.json({
                    code: code,
                    message: message,
                    response: {
                        msg: response
                    }
                });
            });
    });

}