'use strict';

// Configuring the Businesses module
angular.module('businesses').run(['Menus',
	function(Menus) {
		// Add the Businesses dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Businesses',
			state: 'businesses',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'businesses', {
			title: 'List Businesses',
			state: 'businesses.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'businesses', {
			title: 'Create Business',
			state: 'businesses.create'
		});
	}
]);