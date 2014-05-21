/**
 * AdminController
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

module.exports = {
	index: function(req, res, next){
    res.view({ layout: 'layout_admin' });
	},
  wineList: function(req, res, next) {
    Wine.find( function(err, wine) {
      if (err) { return next(err)};
      res.view('admin/wine_list', { layout: 'layout_admin', wine: wine});
    });
  },
  wine_details: function(req, res, next) {
    Wine.findOne( req.param('wineId'), function(err, wine){
      if (err){ return next(err)};
      Category.find( function(err, category) {
        if (err){ return next(err)};
        res.view( 'admin/wine_details', {layout: 'layout_admin', wine: wine, category: category} );
      });
    });
  },
  _config: {
  	blueprints: {
  		actions: false,
  		rest: false,
  		shortcuts: false
  	}
  }
};
