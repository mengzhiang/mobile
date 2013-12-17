define(function() {
	var token = "";
		var url = window.location.href;
		var param = url.split("?")[1];
		if(param){
			token = param.split("=")[1];
			token = token.split("#")[0];
		}
	return token;
});

