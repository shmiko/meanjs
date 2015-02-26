'use strict';

//Setting up route
angular.module('maps').config(['$stateProvider',
	function($stateProvider) {
		// Maps state routing
		$stateProvider.
		state('maps', {
			abstract: true,
			url: '/maps',
			template: '<ui-view/>'
		}).
		state('maps.list', {
			url: '',
			templateUrl: 'modules/maps/views/list-maps.client.view.html'
		}).
		state('maps.create', {
			url: '/create',
			templateUrl: 'modules/maps/views/create-map.client.view.html'
		}).
		state('maps.view', {
			url: '/:mapId',
			templateUrl: 'modules/maps/views/view-map.client.view.html'
		}).
		state('maps.edit', {
			url: '/:mapId/edit',
			templateUrl: 'modules/maps/views/edit-map.client.view.html'
		});
	}
]);