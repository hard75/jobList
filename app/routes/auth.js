var authController = require('../controllers/authcontroller.js');
/**
 * Manejo de todas las rutas del sistema con middleware de logueo
 */
module.exports = function(app, passport) {  
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/dashboard',authController.dashboard);
    app.get('/logout',authController.logout);
    app.post('/task/one', authController.findOne);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup'
        }
    ));
    app.get('/dashboard',isLoggedIn, authController.dashboard);
    
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/signin'
        }
    )); 
    //Inserta todas las rutas referentes a manejo de tasks
    require('./routesTask.js')(app,passport, isLoggedIn)
}