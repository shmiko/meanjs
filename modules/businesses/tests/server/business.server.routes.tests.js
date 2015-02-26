'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Business = mongoose.model('Business'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, business;

/**
 * Business routes tests
 */
describe('Business CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Business
		user.save(function() {
			business = {
				name: 'Business Name'
			};

			done();
		});
	});

	it('should be able to save Business instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Business
				agent.post('/api/businesses')
					.send(business)
					.expect(200)
					.end(function(businessSaveErr, businessSaveRes) {
						// Handle Business save error
						if (businessSaveErr) done(businessSaveErr);

						// Get a list of Businesses
						agent.get('/api/businesses')
							.end(function(businessesGetErr, businessesGetRes) {
								// Handle Business save error
								if (businessesGetErr) done(businessesGetErr);

								// Get Businesses list
								var businesses = businessesGetRes.body;

								// Set assertions
								(businesses[0].user._id).should.equal(userId);
								(businesses[0].name).should.match('Business Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Business instance if not logged in', function(done) {
		agent.post('/api/businesses')
			.send(business)
			.expect(403)
			.end(function(businessSaveErr, businessSaveRes) {
				// Call the assertion callback
				done(businessSaveErr);
			});
	});

	it('should not be able to save Business instance if no name is provided', function(done) {
		// Invalidate name field
		business.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Business
				agent.post('/api/businesses')
					.send(business)
					.expect(400)
					.end(function(businessSaveErr, businessSaveRes) {
						// Set message assertion
						(businessSaveRes.body.message).should.match('Please fill Business name');
						
						// Handle Business save error
						done(businessSaveErr);
					});
			});
	});

	it('should be able to update Business instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Business
				agent.post('/api/businesses')
					.send(business)
					.expect(200)
					.end(function(businessSaveErr, businessSaveRes) {
						// Handle Business save error
						if (businessSaveErr) done(businessSaveErr);

						// Update Business name
						business.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Business
						agent.put('/api/businesses/' + businessSaveRes.body._id)
							.send(business)
							.expect(200)
							.end(function(businessUpdateErr, businessUpdateRes) {
								// Handle Business update error
								if (businessUpdateErr) done(businessUpdateErr);

								// Set assertions
								(businessUpdateRes.body._id).should.equal(businessSaveRes.body._id);
								(businessUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Businesses if not signed in', function(done) {
		// Create new Business model instance
		var businessObj = new Business(business);

		// Save the Business
		businessObj.save(function() {
			// Request Businesses
			request(app).get('/api/businesses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Business if not signed in', function(done) {
		// Create new Business model instance
		var businessObj = new Business(business);

		// Save the Business
		businessObj.save(function() {
			request(app).get('/api/businesses/' + businessObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', business.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Business instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Business
				agent.post('/api/businesses')
					.send(business)
					.expect(200)
					.end(function(businessSaveErr, businessSaveRes) {
						// Handle Business save error
						if (businessSaveErr) done(businessSaveErr);

						// Delete existing Business
						agent.delete('/api/businesses/' + businessSaveRes.body._id)
							.send(business)
							.expect(200)
							.end(function(businessDeleteErr, businessDeleteRes) {
								// Handle Business error error
								if (businessDeleteErr) done(businessDeleteErr);

								// Set assertions
								(businessDeleteRes.body._id).should.equal(businessSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Business instance if not signed in', function(done) {
		// Set Business user 
		business.user = user;

		// Create new Business model instance
		var businessObj = new Business(business);

		// Save the Business
		businessObj.save(function() {
			// Try deleting Business
			request(app).delete('/api/businesses/' + businessObj._id)
			.expect(403)
			.end(function(businessDeleteErr, businessDeleteRes) {
				// Set message assertion
				(businessDeleteRes.body.message).should.match('User is not authorized');

				// Handle Business error error
				done(businessDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Business.remove().exec(function(){
				done();
			});
		});
	});
});
