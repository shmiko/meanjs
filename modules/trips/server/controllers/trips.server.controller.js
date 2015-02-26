'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Trip = mongoose.model('Trip'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Trip
 */
exports.create = function(req, res) {
	var trip = new Trip(req.body);
	trip.user = req.user;

	trip.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trip);
		}
	});
};

/**
 * Show the current Trip
 */
exports.read = function(req, res) {
	res.jsonp(req.trip);
};

/**
 * Update a Trip
 */
exports.update = function(req, res) {
	var trip = req.trip ;

	trip = _.extend(trip , req.body);

	trip.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trip);
		}
	});
};

/**
 * Delete an Trip
 */
exports.delete = function(req, res) {
	var trip = req.trip ;

	trip.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trip);
		}
	});
};

/**
 * List of Trips
 */
exports.list = function(req, res) { Trip.find().sort('-created').populate('user', 'displayName').exec(function(err, trips) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trips);
		}
	});
};

/**
 * Trip middleware
 */
exports.tripByID = function(req, res, next, id) { Trip.findById(id).populate('user', 'displayName').exec(function(err, trip) {
		if (err) return next(err);
		if (! trip) return next(new Error('Failed to load Trip ' + id));
		req.trip = trip ;
		next();
	});
};