// Sets the require.js configuration for your application.
require
		.config({
//			baseUrl:"..",
			paths : {
				// Core Libraries
//				"amlond" : "libs/amlond/amlond",
//				"underscore" : "libs/underscore/lodash",
//				"backbone" : "libs/backbone/backbone-1.1.0",
//				"iscroll":"libs/iscroll/iscroll",
				"zepto" : "libs/zepto/zepto.min",
				"moment":"libs/moment/moment.min",
				"spin":"libs/spin/spin.min",
				"token" : "libs/pub/token",
				"fastclick":"libs/fastclick/fastclick.min",
				"app":"mvc/app"
			},
			shim : {
				 "zepto": {
          			exports: '$'
        		},
				'iscroll' : {
		             exports: 'iScroll'
		         },
		         'spin':{
		        	 exports: 'Spinner' 
		         },
		         'fastclick':{
		        	 exports:'FastClick'
		         },
				"backbone" : {
					"deps" : [ "underscore", "zepto" ],
					"exports" : "Backbone" // attaches "Backbone" to the window
				}
			}
			 ,
			 urlArgs : "v=" + (new Date()).getTime()
		});
require(["app"]);