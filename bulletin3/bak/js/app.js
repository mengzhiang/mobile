define([ "token", "bulletin", "bulletinDetail", "jquery", "jquery.mobile" ],
		function(Bulletin, BulletinDetail, token, $, Mobile) {
			console.log("begin app");
			$("body").show();
			$.mobile.initializePage();
			console.log("end app");
		});