'use strict';

//Setting up route
angular.module('businesses').config(['$stateProvider',
	function($stateProvider) {
		// Businesses state routing
		$stateProvider.
		state('businesses', {
			abstract: true,
			url: '/businesses',
			template: '<ui-view/>'
		}).
		state('businesses.list', {
			url: '',
			templateUrl: 'modules/businesses/views/list-businesses.client.view.html'
		}).
		state('businesses.create', {
			url: '/create',
			templateUrl: 'modules/businesses/views/create-business.client.view.html'
		}).
		state('businesses.view', {
			url: '/:businessId',
			templateUrl: 'modules/businesses/views/view-business.client.view.html'
		}).
		state('businesses.edit', {
			url: '/:businessId/edit',
			templateUrl: 'modules/businesses/views/edit-business.client.view.html'
		});
	}
]);