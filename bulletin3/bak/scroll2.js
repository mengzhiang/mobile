var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;

function pullDownAction() {
	setTimeout(function() { // <-- Simulate network congestion, remove
		// setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');
		Bulletin.loadBulletin();
		myScroll.refresh(); // Remember to refresh when contents are loaded (ie:
		// on ajax completion)
	}, 1000); // <-- Simulate network congestion, remove setTimeout from
	// production!
}

function pullUpAction() {
	setTimeout(function() { // <-- Simulate network congestion, remove
		// setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');
		myScroll.refresh(); // Remember to refresh when contents are loaded (ie:
	}, 1000); // <-- Simulate network congestion, remove setTimeout from
	// production!
}
function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll("J-content", {
		 //useTransition : true,//控制着动画组织方式使用CSS3 Transition方式。默认关闭。
		bounce : false,// 超出部分是否反弹，默认为ture
		hScroll : false,// 是否允许水平滚动，默认为ture
		//useTransform : true,// 控制着元素定位使用CSS3 Transform 2d。默认开启
	// momentum:false //控制是否动力滚动
	// topOffset : pullDownOffset,
	// onRefresh : function() {
	// console.log("onRefresh");
	// if (pullDownEl.className.match('loading')) {
	// pullDownEl.className = '';
	// pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉可以刷新';
	// } else if (pullUpEl.className.match('loading')) {
	// pullUpEl.className = '';
	// pullUpEl.querySelector('.pullUpLabel').innerHTML =
	// '上拉加载更多';
	// }
	// },
	// onScrollMove : function() {
	// console.log("onScrollMove");
	// if (this.y > 5 && !pullDownEl.className.match('flip')) {
	// pullDownEl.className = 'flip';
	// pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开可以刷新';
	// this.minScrollY = 0;
	// } else if (this.y < 5 && pullDownEl.className.match('flip')) {
	// pullDownEl.className = '';
	// pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉可以刷新';
	// this.minScrollY = -pullDownOffset;
	// } else if (this.y < (this.maxScrollY - 5)
	// && !pullUpEl.className.match('flip')) {
	// // pullUpEl.className = 'flip';
	// // pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开可以刷新';
	// // this.maxScrollY = this.maxScrollY;
	// } else if (this.y > (this.maxScrollY + 5)
	// && pullUpEl.className.match('flip')) {
	// // pullUpEl.className = '';
	// // pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
	// // this.maxScrollY = pullUpOffset;
	// }
	// },
	// onScrollEnd : function() {
	// console.log("scrollEnd");
	// if (pullDownEl.className.match('flip')) {
	// pullDownEl.className = 'loading';
	// pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中';
	// pullDownAction(); // Execute custom function (ajax
	// // call?)
	// } else if (pullUpEl.className.match('flip')) {
	// // pullUpEl.className = 'loading';
	// // pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中';
	// // pullUpAction(); // Execute custom function (ajax call?)
	// }
	// },
	});
}
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
loaded();
document.addEventListener('DOMContentLoaded', function() {
	setTimeout(loaded, 200);
}, false);