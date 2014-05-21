/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, next) {
  var is_auth = req.isAuthenticated();

  if (is_auth) {
    return next();
  }
  return res.redirect("/");
  
};