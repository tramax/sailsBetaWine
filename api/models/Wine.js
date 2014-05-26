/**
 * WineDetails
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	schema: true,
  attributes: {
  	label: {
  		type: 'STRING',
  		required: true
  	},
    alcohol: {
      type: 'FLOAT',
      required: false
    },
  	volume: {
  		type: 'STRING',
  		required: false
  	},
    origin: {
      type: 'STRING',
      required: false,
    },
  	price_en: {
  		type: 'FLOAT',
  		required: false
  	},
    price_vn: {
      type: 'FLOAT',
      required: false
    },
    description_en: {
      type: 'TEXT',
      required: false
    },
    description_vn: {
      type: 'TEXT',
      required: false
    },
    images: {
      type: 'ARRAY',
      required: false
    },
    categories: {
      type: 'ARRAY',
      required: true
    },
    brands: {
      type: 'ARRAY',
      required: true
    }
  }
};
