/**
 * WineController
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

var papercut = require('papercut'),
		path = require('path'),
		imageId = 0;

papercut.configure(function(){
	papercut.set('storage','file');
	papercut.set('directory', path.join(__dirname, '/../../assets/uploads'));
  papercut.set('url', path.join(__dirname, '/../../assets/uploads'));
  papercut.set('extension', 'png');
});

var Uploader = papercut.Schema(function(){
	this.version({
		name: "thumbnail",
		size: "400x400",
		process: "resize"
	});
	this.version({
    name: 'origin',
    process: 'copy'
	});
});

var imgArr = [];

module.exports = {
	new: function(req, res, next){
		var categories;
		Category.find(function(err, categories){
			if (err) next(err);
      Brand.find(function(err, brands) {
          if(err) next(err);
          res.view('admin/wine_new', {categories: categories, brands: brands, layout: 'layout_admin' });
      })
		});
	},
	create: function(req, res, next){

		var wineObj = {
      label: req.param('label'),
      alcohol: req.param('alcohol'),
      price_en: req.param('price_en'),
      price_vn: req.param('price_vn'),
      volume: req.param('volume'),
      origin: req.param('origin'),
      description_en: req.param('description-en'),
      description_vn: req.param('description-vn'),
      categories: [req.param('category_id')],
      brands: [req.param('brand_id')],
      images: imgArr
    };
    var category_id = req.param('category_id');

    Wine.create(wineObj, function(err, wine){
    	if (err) {
    		return res.redirect('admin/wine/new');
    	}
    	imgArr = [];

  		wine.save(function(err,wine){
  			if(err) return next(err);
        return res.redirect('admin/wine/new');
  		})
    })
	},
  
  edit: function(req,res,next) {
    Wine.findOne(req.param('id')).then( function(wine) {
      var categories = Category.find().then( function(categories) {
        return categories;
      });
      var brands = Brand.find().then( function(brands) {
        return brands;
      });

      return [ wine, categories, brands ];
    }).spread(function( wine, categories, brands ) {
        res.view(
          'admin/wine_edit',
          {
            categories: categories,
            brands: brands,
            wine: wine,
            layout: 'layout_admin'
          }
        );          
    }).fail( function(err) {
      next(err);
    });
    
  },

  update: function(req, res, next) {
    var wineObj = {
        label: req.param('label'),
        alcohol: req.param('alcohol'),
        price_en: req.param('price_en'),
        price_vn: req.param('price_vn'),
        volume: req.param('volume'),
        origin: req.param('origin'),
        description_en: req.param('description-en'),
        description_vn: req.param('description-vn'),
        categories: [req.param('category_id')],
        brands: [req.param('brand_id')]
    };

    Wine.update( req.param('id'), wineObj, function(err) {
      if(err) return res.send( err );

      res.redirect('admin/wine/' + req.param('id'));
    })
  },

	uploadImages: function(req, res, next){
		var timeStamp = (new Date()).getTime(),
				uploader = new Uploader(),
				imgName = req.files.file.name;

		imgName = imgName.substr(0, imgName.lastIndexOf("."));
		imgName =  timeStamp + "_" + imgName;
		uploader.process( imgName, req.files.file.path, function(err, images){
			imgArr.push(imgName);
			res.send(200);
		});
	}
  
};
