/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var passport = require('passport');

module.exports = {
	 
  create: function( req, res, next ){	
  	passport.authenticate('local', function (err, user, info){
      req.session.flash = {
        err: info
      }
      if (err) res.redirect('/login');
      if (!user) { 
        return res.redirect('/login'); 
      }
      req.logIn(user, function(err) {
        if (err) res.redirect('/login');

        if(user.role === 'administrator'){
          return res.redirect('/admin');
        } 
        return res.redirect('/');
      });
    })(req, res, next)
  },
  login: function(req, res, next){
    res.view("home/login", {layout: false});
  },

  logout: function (req, res){
  	req.logout();
  	res.redirect('/');
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionController)
   */
  _config: {}

  
};
