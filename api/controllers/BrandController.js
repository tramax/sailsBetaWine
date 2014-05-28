/**
 * BrandController
 *
 * @description :: Server-side logic for managing Brands
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function(req, res, next){
    Category.find( function( err, category) {
      if(err) return res.serverError();
      res.view('admin/brand_new', { layout: 'layout_admin', category: category });
    })
	},
	create: function(req, res, next){
		var brandObj = {
      name: req.param('name'),
      categories: req.param('categories')
    };

    Brand.create(brandObj, function(err, brand){
    	if (err) {
            req.session.flash = {
                err: err
            }
    		return res.redirect('admin/brand/new');
    	}
    	brand.save(function(err,brand){
    		if(err) {
                req.session.flash = {
                    err: err
                }
            } else {
                req.session.flash = {
                  success: "Create Successfully"
                }
            }
    		return res.redirect('admin/brand/new');
    	});
    });
  }
};

