'use strict';

module.exports = function(app) {
	var trips = require('../controllers/trips.server.controller');
	var tripsPolicy = require('../policies/trips.server.policy');

	// Trips Routes
	app.route('/api/trips').all()
		.get(trips.list).all(tripsPolicy.isAllowed)
		.post(trips.create);

	app.route('/api/trips/:tripId').all(tripsPolicy.isAllowed)
		.get(trips.read)
		.put(trips.update)
		.delete(trips.delete);

	// Finish by binding the Trip middleware
	app.param('tripId', trips.tripByID);
};