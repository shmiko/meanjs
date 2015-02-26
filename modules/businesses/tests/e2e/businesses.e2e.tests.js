'use strict';

describe('Businesses E2E Tests:', function() {
	describe('Test Businesses page', function() {
		it('Should not include new Businesses', function() {
			browser.get('http://localhost:3000/#!/businesses');
			expect(element.all(by.repeater('business in businesses')).count()).toEqual(0);
		});
	});
});
