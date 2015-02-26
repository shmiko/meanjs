'use strict';

describe('Maps E2E Tests:', function() {
	describe('Test Maps page', function() {
		it('Should not include new Maps', function() {
			browser.get('http://localhost:3000/#!/maps');
			expect(element.all(by.repeater('map in maps')).count()).toEqual(0);
		});
	});
});
