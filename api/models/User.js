/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');

module.exports = {
	schema: true,

  attributes: {
  	username: {
  		type: 'string',
  		required: true
  	},
  	fullname: {
  		type: 'string',
  		required: false
  	},
  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},
  	password: {
  		type: 'string',
  		required: true
  	},
  	online: {
  		type: 'boolean',
  		defaultsTo: false
  	},
  	role: {
  		type: 'string',
  		defaultsTo: 'user'
  	},
    checkValidPassword: function(user, password, done){
      bcrypt.compare(password, user.password, function (err, res){
        var returnUser;

        if (!res) return done(null, false, {
                    message: 'Invalid Password'
                  });
        returnUser = {
          username: user.username,
          role: user.role,
          id: user.id
        };
        return done(null, returnUser, {
                  message: 'Logged In Successfully'
              });
      });
    }
  },

  beforeCreate: function(user, next){
  	bcrypt.genSalt(10, function (err, salt){
  		bcrypt.hash(user.password, salt, function (err, hash){
  			if(err){
  				next(err);
  			} else {
  				user.password = hash;
  				next(null, user);
  			}
  		});
  	});
  },


};
