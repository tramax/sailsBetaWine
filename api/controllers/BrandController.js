/**
 * BrandController
 *
 * @description :: Server-side logic for managing Brands
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function(req, res, next){
		res.view('admin/brand_new', { layout: 'layout_admin' });
	},
	create: function(req, res, next){
		var brandObj = {
      name: req.param('name')
    }

    Brand.create(brandObj, function(err, brand){
    	if (err) {
    		return res.redirect('admin/brand/new');
    	}
    	brand.save(function(err,brand){
    		if(err) return next(err);
    		return res.redirect('admin/brand/new');
    	});
    });
	}
};

