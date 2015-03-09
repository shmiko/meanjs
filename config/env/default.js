'use strict';


module.exports = {
	app: {
		title: 'meanjs',
		description: 'Unravel Travel, from chore to more. Calendar,Mapping, Itineraries personalised the way you want it.',
		keywords: 'MongoDB, Express, AngularJS, Node.js and more',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
	},
	port: process.env.PORT || 4000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};


