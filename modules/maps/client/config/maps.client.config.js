'use strict';

// Configuring the Maps module
angular.module('maps').run(['Menus',
	function(Menus) {
		// Add the Maps dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Maps',
			state: 'maps',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'maps', {
			title: 'List Maps',
			state: 'maps.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'maps', {
			title: 'Create Map',
			state: 'maps.create'
		});
	}
]);