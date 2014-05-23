/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function(req, res, next){
		res.view('admin/category_new', { layout: 'layout_admin' });
	},
	create: function(req, res, next){
		var categoryObj = {
      name: req.param('name')
    }

    Category.create(categoryObj, function(err, category){
    	if (err) {
    		return res.redirect('admin/category/new');
    	}
    	category.save(function(err,category){
    		if(err) return next(err);
    		return res.redirect('admin/category/new');
    	});
    });
	},

  listAll: function(req, res, next){

    Wine.find().sort('createdAt desc').exec( function(err, wine){
      if(err) return next(err);
      res.view('home/list', { wine: wine, currCategory: null, currClass: "current", locale: res.locals.getLocale() });
    })
  },
  listFollowCategory: function(req, res, next){

    Category.findOneByName(req.param("categoryName")).then( function(category){
      var listWine = Wine.find().where({categories: {contains: category.id}}).sort("label asc").then( function(wine){
        return wine;
      });
      return [category, listWine];
    }).spread( function(category, listWine) {
      var price = wine[ 'price_'+res.locals.getLocale() ];

      res.view('home/list', { wine: listWine, currClass: "current", currCategory: category, price: price });
    }).fail( function (err) {
      next(err);
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

