window.local = false;
window.debug = false;
if (!debug) {
	window.alert = function(msg) {
		console.log(msg);
	};
}
define(["mvc/bulletin", "zepto","fastclick" ], function(bulletin, $,FastClick) {
	$(function() {
	    FastClick.attach(document.body);
	});
	bulletin.init();
});