module.exports = function (req, res, next) {
	res.locals.language = res.locals.getLocale();	
	next();
};