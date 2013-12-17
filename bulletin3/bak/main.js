// Sets the require.js configuration for your application.
require
		.config({
			paths : {
				// Core Libraries
				"jquery" : "libs/jquery/jquery-1.8.3-ajax",
				"jquery.mobile" : "libs/jquerymobile/jquerymobile1.3.2/jquery.mobile-1.3.2",
				"amlond" : "libs/amlond/amlond",
				"underscore" : "libs/underscore/lodash",
				"backbone" : "libs/backbone/backbone-1.1.0",
				// js
				"jquery.mobile-config" : "js/pub/jquery.mobile-config",
				"global" : "js/pub/global",
				"token" : "js/pub/token",
				"bulletin" : "js/bulletin",
				"bulletinDetail" : "js/bulletinDetail",
				"app" : "js/app"
			},
			shim : {
				'jquery.mobile' : [ 'jquery', 'jquery.mobile-config' ],
				"backbone" : {
					"deps" : [ "underscore", "jquery" ],
					"exports" : "Backbone" // attaches "Backbone" to the window
				}
			}
//			,
//			urlArgs : "v=" + (new Date()).getTime()
		});
 require([ "app" ]);
// Includes File Dependencies
//require([ "jquery", "backbone", "mvc/routers/mobileRouter", "jquery.mobile" ],
//		function($, Backbone, Mobile) {
//			$.mobile.initializePage();
//			this.router = new Mobile();
//		});