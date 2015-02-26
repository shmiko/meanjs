'use strict';

//Setting up route
angular.module('trips').config(['$stateProvider',
	function($stateProvider) {
		// Trips state routing
		$stateProvider.
		state('trips', {
			abstract: true,
			url: '/trips',
			template: '<ui-view/>'
		}).
		state('trips.list', {
			url: '',
			templateUrl: 'modules/trips/views/list-trips.client.view.html'
		}).
		state('trips.create', {
			url: '/create',
			templateUrl: 'modules/trips/views/create-trip.client.view.html'
		}).
		state('trips.view', {
			url: '/:tripId',
			templateUrl: 'modules/trips/views/view-trip.client.view.html'
		}).
		state('trips.edit', {
			url: '/:tripId/edit',
			templateUrl: 'modules/trips/views/edit-trip.client.view.html'
		});
	}
]);