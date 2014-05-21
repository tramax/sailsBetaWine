module.exports = function (req, res, next) {
	Category.find(function(err, category){
		res.locals.category = category;
		next();
	});
};