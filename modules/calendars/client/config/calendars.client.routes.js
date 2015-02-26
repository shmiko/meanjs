'use strict';

//Setting up route
angular.module('calendars').config(['$stateProvider',
	function($stateProvider) {
		// Calendars state routing
		$stateProvider.
		state('calendars', {
			abstract: true,
			url: '/calendars',
			template: '<ui-view/>'
		}).
		state('calendars.list', {
			url: '',
			templateUrl: 'modules/calendars/views/list-calendars.client.view.html'
		}).
		state('calendars.create', {
			url: '/create',
			templateUrl: 'modules/calendars/views/create-calendar.client.view.html'
		}).
		state('calendars.view', {
			url: '/:calendarId',
			templateUrl: 'modules/calendars/views/view-calendar.client.view.html'
		}).
		state('calendars.edit', {
			url: '/:calendarId/edit',
			templateUrl: 'modules/calendars/views/edit-calendar.client.view.html'
		});
	}
]);