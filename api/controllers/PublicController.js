/**
 * PublicController
 *
 * @description :: Server-side logic for managing publics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	listAll: function(req, res, next){

    Wine.find().sort('createdAt desc').exec( function(err, wine){
      if(err) return next(err);
      res.view('home/list', { wine: wine, currCategory: null, currClass: "current", locale: res.locals.getLocale() });
    })
  },
  listFollowCategory: function(req, res, next){

    Category.findOneByName(req.param("categoryName")).then( function(category){
      var listWine = Wine.find().where({categories: { contains: category.id }}).then( function(wine){
        return wine;
      });
      return [category, listWine];
    }).spread( function(category, listWine) {
      var price = listWine[ 'price_'+res.locals.getLocale() ];
      res.view('home/list', { wine: listWine, currClass: "current", currCategory: category, price: price });
    }).fail( function (err) {
      next(err);
    });
  },
  details: function(req, res, next){
    var wineName = req.param('wineName');

		Wine.findOneByLabel( wineName ).then(function(wine){
      var wineDescription = wine[ 'description_'+res.locals.getLocale() ],
          price = wine[ 'price_'+res.locals.getLocale() ],
          currCategory = Category.findOne( wine.categories[0] ).then( function(category){
            return category;
          });
      return [ wine, currCategory, wineDescription, price ];
		}).spread( function(wine, currCategory, wineDescription, price) {
      res.view('home/wine_details',{ wine: wine, currClass: "", currCategory: currCategory, wineDescription: wineDescription, price: price });
    }).fail( function(err){
      next(err);
    });	
	}
};

