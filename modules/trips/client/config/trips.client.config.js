'use strict';

// Configuring the Trips module
angular.module('trips').run(['Menus',
	function(Menus) {
		// Add the Trips dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Trips',
			state: 'trips',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'trips', {
			title: 'List Trips',
			state: 'trips.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'trips', {
			title: 'Create Trip',
			state: 'trips.create'
		});
	}
]);