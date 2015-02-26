'use strict';

module.exports = function(app) {
	var businesses = require('../controllers/businesses.server.controller');
	var businessesPolicy = require('../policies/businesses.server.policy');

	// Businesses Routes
	app.route('/api/businesses').all()
		.get(businesses.list).all(businessesPolicy.isAllowed)
		.post(businesses.create);

	app.route('/api/businesses/:businessId').all(businessesPolicy.isAllowed)
		.get(businesses.read)
		.put(businesses.update)
		.delete(businesses.delete);

	// Finish by binding the Business middleware
	app.param('businessId', businesses.businessByID);
};