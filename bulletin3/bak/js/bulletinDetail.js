define(
		[ "jquery"],
		function($) {
			var BulletinDetail = {
				init : function() {
					this.loadDetail();
				},
				loadDetail : function() {
					var bulletinId = localStorage.getItem("bulletinId");
					$
							.ajax({
								type : 'GET',
								url : "/ecp/bulletin/detail.json",
								data : {
									"token" : localStorage.getItem("token"),
									"bulletinId" : bulletinId
								},
								success : function(response) {
									$("#J_bulletinTitle").html(response.vtitle);
									var attchmentList = response.attchmentList;
									var html = response.vcontent + "<br>";
									if (attchmentList.length > 0) {
										html += "<div class='attch'><span>附件：</span><ul >";
										for ( var i = 0; i < attchmentList.length; i++) {
											var attch = attchmentList[i];
											html += "<li><a href='#' class='J-bulletin-download' path='"
													+ attch.path
													+ "' fileName='"
													+ attch.fileName
													+ "'>"
													+ attch.fileName
													+ "</a></li>";
										}
										html += "</ul></div>";
									}
									$("#J_bulletinContent").html(html);
									$(".J-bulletin-download")
											.on(
													'tap',
													function() {
														var node = $(this);
														var command = "/ecp/esfw/pub/downloadByRealPathAndFileName.json";
														var path = node
																.attr('path');
														var fileName = node
																.attr('fileName');
														var parameter = 'realPath='
																+ path
																+ '&fileName='
																+ fileName
																+ '&token='
																+ localStorage.getItem("token");
														var targetUrl = encodeURI(encodeURI(command
																+ '?'
																+ parameter));
														window.open(targetUrl);
													});
								}
							});
				}
			};

			$(document).on("pageinit", "#detailPage", function() {
				console.log("detailPage pageinit");
				BulletinDetail.init();
				localStorage.setItem("status", "loaded");
			});
			return BulletinDetail;
		});