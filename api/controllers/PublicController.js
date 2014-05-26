/**
 * PublicController
 *
 * @description :: Server-side logic for managing publics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	listAll: function(req, res, next){
		var currPage = req.param("page") || 1,
				limitWine = 12;

		Wine.count().then( function(totalWine) {
    	var listWine = Wine.find().paginate({page: currPage, limit: limitWine}).sort('createdAt desc').then( function(wine){
    		return wine;
    	})
    	return [ listWine, totalWine ];
		}).spread( function(listWine, totalWine) {
			var totalPage =  Math.ceil(totalWine/limitWine);
			if( currPage > totalPage ){
				return res.badRequest('Pagination exceeds','/');
			}
      res.view('home/list', { wine: listWine, currCategory: null, currClass: "current", locale: res.locals.getLocale(), currPage: currPage, totalPage: totalPage });
			
		}).fail(function(err) {
			res.serverError(err);
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

