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
        req.session.flash = {
          err: err
        }
        return res.redirect('admin/category/new');
      }
    	category.save(function(err,category){
    		if(err){
          req.session.flash = {
            err: err
          }
          return res.redirect('admin/category/new');
        } 
    		
        return res.redirect('admin/category/new');
    	});
    });
	},
  edit: function(req, res, next) {
    Category.findOne( req.param("id") ).then( function(category) {
      var brandList = Brand.find().where({ category: {contains: category.id} }).then( function(brand) {
        return brand;
      });
      return [ category, brandList ];
    }).spread( function(category, brand ){
      res.view('admin/category_edit', { layout: 'layout_admin', category: category, brand: brand });
    }).fail(function(err) {
      res.serverError();
    });
  },
  update: function(req, res, next) {
    var categoryObj = {
      name: req.param('name')
    }
    Category.update( req.param('id'), categoryObj, function(err) {
      if(err) {
        req.session.flash = {
          err: err
        }
      } else {
        req.session.flash = {
          success: "Update Successfully"
        }
      }
      res.redirect('admin/category/' + req.param('id'));
    })
  }
};

