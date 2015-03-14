'use strict';

// Configuring the Maps module
angular.module('ngMap').run(['Menus',
	function(Menus) {
		// Add the Maps dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Maps',
			state: 'ngMap',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'ngMap', {
			title: 'List Maps',
			state: 'ngMap.list'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'ngMap', {
			title: 'Simple Maps',
			state: 'ngMap.simple-maps'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'ngMap', {
			title: 'Create Map',
			state: 'ngMap.create'
		});
	}
]);