define([ "zepto", "token","moment","spin" ], function($, token,moment,Spinner) {
	var Bulletin = {
		init:function(){
			var spin = new Spinner({
						color:'rgb(66, 65, 65)',
						lines: 12
					}).spin();
			$("#loading div").append(spin.el);
			this.loadBulletin();
			this.loadCategory();
			this.bindEvent();
		},
		bindEvent:function(){
			var that = this;
			$("body").delegate("#more a","click",function(e){
				alert("tap more");
				e.preventDefault();
				that.currentPage +=1;
				that.loadBulletin();
			});
			$("body").delegate("#category","change",function(){
				var categoryid = "";
				$(this).children().each(function(i, val){
					if(val.selected){
						categoryid = val.value;
						return;
					}
				});
				that.loadBulletin(categoryid);
			});
			$("body").delegate(".bulletinItem","click",function(){
				window.lastScroll = document.body.scrollTop;
				window.currentBulletinId = $(this).attr("id");
				var title = $(this).find(".item_title").html();
				var date =  $(this).find(".item_date").html();
				var content =  $(this).find(".item_content").html();
				$("#detail_title").html(title);
				$("#detail_date").html(date);
				$("#detail_content").html(content);
				$("#detailPage").addClass("slide");
//				$("#listPage").toggleClass("hidden");
//				$("#detailPage").toggleClass("hidden");
				return false;
			});
			$("body").delegate(".back","click",function(){
//				$("#detailPage").toggleClass("hidden");
//				$("#listPage").toggleClass("hidden");
				document.body.scrollTop=window.lastScroll;
				alert("preventDefalult");
				return false;
			});
		},
		
		loadCategory : function() {
			var that = this;
			$.ajax({
						type : 'GET',
						url : window.local?"category.json":"/ecp/ecppub/getCodeName.json",
						cache:false,
						success : function(response) {
							if (response.responseText == "invalidToken") {
								window.location.href = "errorredirect://sessionoutdate";
								return;
							} 
							var category = $("#category");
							var html = "<option value=''>全部公告</option>";
							$.each(response.items,function(i, val) {
								html += '<option value="'+ val.code+ '">'+ val.name + '</option>';
									});
							category.html(html);
						},
						error:function(response){
							alert(JSON.stringify(arguments));
							if (response.responseText == "invalidToken") {
								window.location.href = "errorredirect://sessionoutdate";
								return;
							} 
							that.stopLoading();
						},
						dataType : 'json',
						data : {
							"token" : token,
							"key" : "CODENAME_BULLETIN_TYPE",
							"param" : ""
						}
					});
		},
		pageSize:10,
		currentPage:1,
		initMore:function(data){
			alert("initMore");
			$("#more").hide();
			var self = this;
			var records = data.records;
			if(data.total>this.pageSize && data.records.length == this.pageSize){
				$("#more").show();
			}
		},
		formatDate:function(data){
			var records = data.records;
			moment.lang("zh-cn");
			for(var i=0;i<records.length;i++){
				records[i].teffectivedate = moment(records[i].teffectivedate).format("YYYY-MM-DD hh:mm:ss");
				records[i].fromNow = moment(records[i].teffectivedate).fromNow();
			};
			data.records = records;
			return data;
		},
		loading:function(){
			$("#loading").show();
		},
		stopLoading:function(){
			$("#loading").hide();
		},
		loadBulletin : function(categoryid) {
			this.loading();
			alert("loadBulletin");
			var that = this;
			alert(that);
			$.ajax({
				type : 'POST',
				url : window.local?"bulletin.json":"/ecp/bulletin/validBulletin.json",
				cache:false,
				success : function(response) {
					alert("ajax success bulletin");
					if (response.responseText == "invalidToken") {
						window.location.href = "errorredirect://sessionoutdate";
						return;
					} 
					var list = $("#thelist");
					var html = "";
					if (response.records.length > 0) {
						response = that.formatDate(response);
						$.each(response.records, function(i, val) {
							html +='<li><a href="#" class="bulletinItem" id="'+val.cbulletinid +'">'+
								'<div class="item">'+
									'<div class="item_header">'+
										'<img src="asserts/images/icon.gif">'+
										'<h2 class="item_title">'+val.vtitle+'</h2>'+
									'</div>'+
									'<div class="ellipsis">'+
										'<p class="item_content">'+val.vcontent+'</p>'+
									'</div>'+
									'<div class="item_date">'+val.teffectivedate+'</div>'+
								'</div>'+
								'<div class="item_icon"></div> </a>'+
							'</li>';
						});
						if(categoryid){
							list.html(html);
						}else{
							list.append(html);
						}
						that.stopLoading();
						
						that.initMore(response);
						} else {
						}
				},
				error : function(response) {
					alert(123);
					if (response.responseText == "invalidToken") {
						window.location.href = "errorredirect://sessionoutdate";
						return;
					} 
				},
				dataType : 'json',
				data : {
					"token" : token,
					"newSearchId" : "1",
					"oldSearchId" : "",
					"pageInfo.curPageNo" : that.currentPage,
					"pageInfo.pageSize" : that.pageSize,
					"bulletinTypeId" : categoryid ||"",
					"ts":new Date().getTime()
				}
			});
		}
	};
	return Bulletin;
});
