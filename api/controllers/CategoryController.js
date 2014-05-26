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
    	req.session.flash = {
        err: err
      }
      if (err) return res.redirect('admin/category/new');

    	category.save(function(err,category){
    		if(err) return next(err);
    		return res.redirect('admin/category/new');
    	});
    });
	}
};

