'use strict';

module.exports = function(app) {
	var maps = require('../controllers/maps.server.controller');
	var mapsPolicy = require('../policies/maps.server.policy');

	// Maps Routes
	app.route('/api/maps').all()
		.get(maps.list).all(mapsPolicy.isAllowed)
		.post(maps.create);

	app.route('/api/maps/:mapId').all(mapsPolicy.isAllowed)
		.get(maps.read)
		.put(maps.update)
		.delete(maps.delete);

	// Finish by binding the Map middleware
	app.param('mapId', maps.mapByID);
};