'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Map = mongoose.model('Map'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Map
 */
exports.create = function(req, res) {
	var map = new Map(req.body);
	map.user = req.user;

	map.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(map);
		}
	});
};

/**
 * Show the current Map
 */
exports.read = function(req, res) {
	res.jsonp(req.map);
};

/**
 * Update a Map
 */
exports.update = function(req, res) {
	var map = req.map ;

	map = _.extend(map , req.body);

	map.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(map);
		}
	});
};

/**
 * Delete an Map
 */
exports.delete = function(req, res) {
	var map = req.map ;

	map.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(map);
		}
	});
};

/**
 * List of Maps
 */
exports.list = function(req, res) { Map.find().sort('-created').populate('user', 'displayName').exec(function(err, maps) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(maps);
		}
	});
};

/**
 * Map middleware
 */
exports.mapByID = function(req, res, next, id) { Map.findById(id).populate('user', 'displayName').exec(function(err, map) {
		if (err) return next(err);
		if (! map) return next(new Error('Failed to load Map ' + id));
		req.map = map ;
		next();
	});
};