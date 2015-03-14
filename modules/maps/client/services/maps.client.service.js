'use strict';

//Maps service used to communicate Maps REST endpoints
angular.module('ngMap').factory('ngMap', ['$resource',
	function($resource) {
		return $resource('api/maps/:mapId', { mapId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);