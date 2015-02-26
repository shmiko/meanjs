'use strict';

describe('Trips E2E Tests:', function() {
	describe('Test Trips page', function() {
		it('Should not include new Trips', function() {
			browser.get('http://localhost:3000/#!/trips');
			expect(element.all(by.repeater('trip in trips')).count()).toEqual(0);
		});
	});
});
