define(
		[ 'jquery' ],
		function($) {
			var token = token;
			var Bulletin = {
				init : function() {
					if (localStorage.getItem("status") == "unload") {
						this.loadCategory();
						this.loadBulletin();
						this.bindPageEvent();
					}
				},
				reload : false,
				currentPage : 1,
				totalPage : 1,
				currentCategory : "",
				pageSize : 10,
				page : false,// 是否启用分页
				pullload : true,// 启用拖动刷新
				// 初始化分页组件
				initPageBar : function(data) {
					var that = this;
					that.totalPage = parseInt(data.total / that.pageSize) + 1;
					var select = $("#J-pagebar-select")
					select.html("");
					for ( var i = 1; i <= that.totalPage; i++) {
						select.append("<option value='" + i + "'>" + i + "/"
								+ that.totalPage + "</option>");
					}
					$("#J-pagebar-select").val(that.currentPage);
					$("#J-pagebar-select").selectmenu("refresh");
					$("#J-next").removeClass("ui-disabled");
					$("#J-prev").removeClass("ui-disabled");
					$("#J-controlgroup").hide();
					$("#J_loadMore").hide();
					if (that.totalPage > 1) {
						if (that.page) {
							$("#J-controlgroup").show();
						} else {
							$("#J_loadMore").show();
						}

					}
					if (that.totalPage == that.currentPage) {
						$("#J-next").addClass("ui-disabled");
					} else if (1 == that.currentPage) {
						$("#J-prev").addClass("ui-disabled");
					}
				},
				bindPageEvent : function() {
					var that = this;
					$("#J-next").on("tap", function() {
						that.currentPage = that.currentPage + 1;
						that.loadBulletin();
						return false;
					});
					$("#J-prev").on("tap", function() {
						that.currentPage = that.currentPage - 1;
						that.loadBulletin();
						return false;
					});
					$("#J-pagebar-select").on("change", function() {
						that.currentPage = $(this).val();
						that.loadBulletin();
					});
					$("#refresh").on("tap", function() {
						window.location.href = window.location.href;
						return false;
					});

					$("#J_loadMore").on("tap", function() {
						that.currentPage = that.currentPage + 1;
						that.loadBulletin();
						return false;
					});
					$(document).on("tap", ".J-categoryItem", function() {
						$("#J_bulletinTypeName").html($(this).html());
						that.currentCategory = $(this).attr("id");
						that.reload = true;
						that.currentPage = 1;
						that.loadBulletin();
						$("#mypanel").panel("close");
						return false;
					});
					$(document).on("tap", ".J-bulletinItem", function() {
						localStorage.setItem("bulletinId", $(this).attr("id"));
						var option = {};
						option.transition = "fade";
						// 解决切换页面闪的问题
						$.mobile.changePage("#detailPage", option);
						return false;
					});
				},
				loadBulletin : function() {
					var that = this;
					$("html").addClass("ui-loading");
					$.mobile.loading("show");
					/**
					 * load bulletin
					 */
					$
							.ajax({
								type : 'POST',
								url : "/ecp/bulletin/validBulletin.json",
								success : function(response) {
									$.mobile.loading("hide");
									var list = $("#J_bulletin_list");
									var html = "";
									if (response.records.length > 0) {
										$
												.each(
														response.records,
														function(i, val) {
															html += '<li><a href="#" class="J-bulletinItem" id="'
																	+ val.cbulletinid
																	+ '"><h2>'
																	+ val.vtitle
																	+ '</h2><p class="ui-li-aside"><strong>'
																	+ val._teffectivedate
																	+ '</strong></p> </a></li>';
														});
										if (that.page || that.reload) {
											list.html(html);
											that.reload = false;
										} else {
											list.append(html);
										}
										list.listview("refresh");
										list.trigger("updatelayout");
										that.initPageBar(response);
									} else {
										$("#J_noMore").popup("open");
										setTimeout(function() {
											$("#J_noMore").popup("close");
										}, 1000);
									}
								},
								dataType : 'json',
								data : {
									"newSearchId" : "1",
									"oldSearchId" : "",
									"pageInfo.curPageNo" : that.currentPage,
									"pageInfo.pageSize" : that.pageSize,
									"bulletinTypeId" : that.currentCategory
								}
							});
				},
				loadCategory : function() {
					var that = this;
					$
							.ajax({
								type : 'GET',
								url : "/ecp/ecppub/getCodeName.json",
								success : function(response) {
									var category = $("#J_bulletin_category");
									var html = "";
									$
											.each(
													response.items,
													function(i, val) {
														html += '<li><a href="bulletinDetail.html" class="J-categoryItem" id="'
																+ val.code
																+ '">'
																+ val.name
																+ '</a></li>';
													});
									category.append(html);
									category.listview("refresh");
									category.trigger("updatelayout");
								},
								dataType : 'json',
								data : {
									"token" : token,
									"key" : "CODENAME_BULLETIN_TYPE",
									"param" : ""
								}
							});
				}
			};
			$(document).on("pageinit", "#myPage", function() {
				console.log("myPage pageinit");
				localStorage.setItem("status", "unload");
				Bulletin.init();
			});
			$(document).on("pageshow", "#myPage", function() {
				console.log("myPage pageshow");
				if (localStorage.getItem("status") == "unload") {
					$.mobile.loading("show");
					localStorage.setItem("status", "loaded");
				}
			});
			return Bulletin;
		});