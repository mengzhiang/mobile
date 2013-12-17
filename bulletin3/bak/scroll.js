/*
option.useTransition = true;//控制着动画组织方式使用CSS3 Transition方式。默认关闭。
bounce : false,// 超出部分是否反弹，默认为ture
hScroll : false,// 是否允许水平滚动，默认为ture
useTransform : true,// 控制着元素定位使用CSS3 Transform 2d。默认开启
momentum:false //控制是否惯性滚动 默认开启
*/

var myScroll;
function loaded() {
	var option = {};
	option.checkDOMChanges=true;
	
	if(browser.versions.ios){
		option.useTransition = true;
		option.useTransform = true;
		 myScroll = new iScroll("J-content", option);
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);
	}else{
		option.bounce =false;
	}
	
}

loaded();
document.addEventListener('DOMContentLoaded', function() {
	setTimeout(loaded, 200);
}, false);