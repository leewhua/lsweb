class MapManager
{
	public lng:number;
	public lat:number;

	public serverLng:number;
	public serverLat:number;

	public serverPoint:any;

	private itemList:Array<MarkerItemView>;

	public Gmap:any;
	public curMapLevel:number;

	private isFirst:boolean = true;

	public static isShared = 0;

	public static USER_TICKET:string = "03cb5224f3474f0eb7cfa64cfea4cf49";
	public static PLAY_TICKET:string = "";

	// public static ROOT:string = "http://leasiondata.cn/";
	// public static ROOT:string = "http://123.59.156.181:81/";
	public static ROOT:string = "http://coeasion.cn/";

	public mapView:MapView;

	public static AnswerList = [{title:"顶破天(打一字)",answer:"夫"},{title:"半耕半读(打一字)",answer:"讲"}];

	public static get USER_INFO_API()
	{
		return MapManager.ROOT + "info?"+Math.random();
	}

	public static get PLAY_API()
	{
		return MapManager.ROOT + "play?"+Math.random();
	}

	public constructor()
	{
		setTimeout(function()
		{
			MapManager.instance.enterFrameHandler();
		}, 100);
		this.itemList = [];
		this.mapView = new MapView();
		UIManager.instance.mapLayer.addChild(this.mapView);
	}

	private enterFrameHandler():void
	{
		if(eval("$.scriptReady"))
		{
			this.getLoct();
		}else
		{
			setTimeout(function() {
				MapManager.instance.enterFrameHandler();
		}, 100);
		}
	}

	private initMap():void
	{
		this.Gmap = eval("new BMap.Map('GameMap',{enableHighResolution:true,enableMapClick:false});");

		this.curMapLevel = 17;
		//$Gmap.centerAndZoom(new BMap.Point(116.404, 39.915), 17);
		this.Gmap.centerAndZoom(eval("new BMap.Point("+this.lng+", "+this.lat+")"), this.curMapLevel);
		//$Gmap.setMinZoom(16);
		//$Gmap.setMaxZoom(17);

		this.Gmap.disableDragging();
		this.Gmap.disableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
		// $Gmap.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
		this.Gmap.disableDoubleClickZoom();  //禁用双击放大
		this.Gmap.disableKeyboard();
		this.Gmap.disableInertialDragging();
		console.log("地图初始化完毕");

		// this.Gmap.setMapStyle({
		// 	styleJson:
		// 		[
		// 			{
		// 				"featureType": "building",
		// 				"elementType": "all",
		// 				"stylers": 
		// 				{
		// 					"visibility": "off"
		// 				}
		// 			},
		// 			// {
		// 			//     "featureType": "land",
		// 			//     "elementType": "all",
		// 			//     "stylers": 
		// 			//     {
		// 			//         "color": "#ffffff"
		// 			//     }
		// 			// },
		// 			{
		// 				"featureType": "manmade",
		// 				"elementType": "all",
		// 				"stylers": 
		// 				{
		// 					"visibility": "off"
		// 				}
		// 			},
		// 			{
		// 				"featureType": "highway",
		// 				"elementType": "all",
		// 				"stylers": 
		// 				{
		// 						"visibility": "off"
		// 				}
		// 			},
		// 			{
		// 				"featureType": "railway",
		// 				"elementType": "all",
		// 				"stylers": 
		// 				{
		// 						"visibility": "off"
		// 				}
		// 			},
		// 			{
		// 				"featureType": "subway",
		// 				"elementType": "all",
		// 				"stylers": {
		// 						"visibility": "off"
		// 				}
		// 			},
		// 			{
		// 				"featureType": "poi",
		// 				"elementType": "all",
		// 				"stylers": 
		// 				{
		// 						"visibility": "off"
		// 				}
		// 			}
		// 			// {
		// 			//     "featureType": "administrative",
		// 			//     "elementType": "all",
		// 			//     "stylers": 
		// 			//     {
		// 			//             "visibility": "off"
		// 			//     }
		// 			// }

		// 		]


			
		// });
	}

	private getLoct():void
	{
		console.log("getLoct");
		var geolocation = eval("new BMap.Geolocation();");
		geolocation.getCurrentPosition(function(r)
		{
			if(geolocation.getStatus() == eval("BMAP_STATUS_SUCCESS"))
			{
				MapManager.instance.lng = r.point.lng;
				MapManager.instance.lat = r.point.lat;
				if(MapManager.instance.isFirst)
				{
					MapManager.instance.isFirst = false;
					MapManager.instance.initMap();
					MapManager.instance.Gmap.centerAndZoom(eval("new BMap.Point("+MapManager.instance.lng+", "+MapManager.instance.lat+")"), 17);
				}
				
				// alert('您的位置：'+r.point.lng+','+r.point.lat);
				MapManager.instance.loadDate();
			}
			else 
			{
				alert('failed'+geolocation.getStatus());
				MapManager.instance.loadDate();
			}        
		},{enableHighAccuracy: true});
	}

	// private getLoct() 
	// {
	// 	var self = this;
	// 	var wxObj = eval("wx");
	// 	if(wxObj)
	// 	{
	// 	   //每5秒获取一次地址经纬坐标
	// 	   //获取地理信息
	// 	   wxObj.getLocation({
	// 	       type: 'wgs84',
	// 	       success: function (res) 
	// 		   {

	// 			   MapManager.instance.lng = res.longitude; //经度
	// 			   MapManager.instance.lat = res.latitude;  //维度
	// 			   if(MapManager.instance.isFirst)
	// 			   {
	// 				  	MapManager.instance.isFirst = false;
	// 					MapManager.instance.initMap();
	// 					MapManager.instance.Gmap.centerAndZoom(eval("new BMap.Point("+MapManager.instance.lng+", "+MapManager.instance.lat+")"), 17);
	// 			   }
				
	// 			   // alert('您的位置：'+r.point.lng+','+r.point.lat);
	// 			   MapManager.instance.loadDate();
	// 	       },
	// 	       cancel: function (res) {
	// 	           alert('用户拒绝授权获取地理位置' + res);
	// 	           MapManager.instance.loadDate();
	// 	       },
	// 	       error:function(res)
	// 	       {
	// 	           alert("error:"+res);
	// 	           MapManager.instance.loadDate();
	// 	       }
	// 	   });
	// 	}else
	// 	{
	// 		MapManager.instance.loadDate();
	// 	}
	// }


	public share(isGet = 0):void
	{
		var wxObj = eval("wx");
		if(wxObj && eval("$.wxIsReady"))
		{
			wxObj.onMenuShareTimeline(
			{
				title: "你过来，有个惊喜要给你看",
				link:"http://res.leasiondata.cn/lstatic/c/v3/index.html?share,"+isGet+","+UserInfo.instance.username+","+UserInfo.instance.url,
				imgUrl:"http://res.leasiondata.cn/lstatic/c/share/share_icon.jpg",
				success: function () {

				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			wxObj.onMenuShareAppMessage({
				title:"你过来，有个惊喜要给你看",
				desc: '点击进入',
				link:"http://res.leasiondata.cn/lstatic/c/v3/index.html?share,"+isGet+","+UserInfo.instance.username+","+UserInfo.instance.url,
				imgUrl:"http://res.leasiondata.cn/lstatic/c/share/share_icon.jpg",
				success: function () {

				},
				cancel: function () {

				}
			});
		}else
		{
			egret.setTimeout(this.share,this,500,isGet);
		}
	}
	
	public type;
	public duiUserName = "有X的男人";

	private loadDate():void
	{
		// MainView.instance.showShop([{shopid:1,ticket:111,type:1},{shopid:2,ticket:111,type:2},{shopid:3,ticket:0,type:1},{shopid:4,ticket:111,type:1},{shopid:5,ticket:111,type:3}]);

		// MainView.instance.showPingZi();
		var data = {};
		var x = this.lng;
		var y = this.lat;
		if(x > 0 && y > 0){
			data = { type: "info", lng: x, lat: y, ticket: MapManager.USER_TICKET};
		}else{
			data = { type: "info", ticket: MapManager.USER_TICKET};
		}
		console.log("xy:"+x,y);
		var self = this;
		$.ajax({
			url: MapManager.USER_INFO_API,
			data: data,
			success: function(data)
			{
				if(data.result == "success")
				{
					UserInfo.instance.username = decodeURI(data.nickname);
					var url = data.headimgurl.substr(0,data.headimgurl.length -1);
					url += "132";
					UserInfo.instance.url = url;
					self.duiUserName = data.nickname;
					
					//sw 
						// self.type = data.more.type;

						// self.serverLng = data.more.lng;
						// self.serverLat = data.more.lat;
						self.mapView.refreshSelf();

						MainView.instance.showInfo();
						MainView.instance.showShop(UserInfo.instance.shopList);
						MainView.instance.showPingZi();
					if(data.pools.length != 0){
						UserInfo.instance.isget = false;
						PopManager.showPop("TipsPop");
						MainView.instance.showBox();
						// var ticket = JSON.stringify(data.pools[0].ticket);
						sessionStorage.setItem("ticket", data.pools[0].ticket);
					}else{
						UserInfo.instance.isget = true;
						PopManager.showPop("ReceivedPop");
						
					}
					MainView.instance.initSmallShop();

					self.share(0);

				// 	if(data.more.result == "success")
				// 	{
				// 		UserInfo.instance.username = decodeURI(data.nickname);
				// 		var url = data.headimgurl.substr(0,data.headimgurl.length -1);
				// 		url += "132";
				// 		UserInfo.instance.url = url;

				// 		self.duiUserName = data.more.nickname;

				// 		//sw 
				// 		self.type = data.more.type;

				// 		self.serverLng = data.more.lng;
				// 		self.serverLat = data.more.lat;
				// 		self.mapView.refreshSelf();

				// 		MainView.instance.showInfo();
				// 		// MainView.instance.showShop(UserInfo.instance.shopList);

				// 		// if(self.type == "sw")
				// 		// {
				// 		// 	PopManager.showPop("RewardPop",{desc:"sw",val:1});
				// 		// }
				// 		MainView.instance.showPingZi();
				// 		if(!data.c1ashed)
				// 		{
				// 			UserInfo.instance.isget = false;
				// 			PopManager.showPop("TipsPop");
				// 			MainView.instance.showBox();
				// 		}else
				// 		{
				// 			UserInfo.instance.isget = true;
				// 			PopManager.showPop("ReceivedPop");
				// 		}
				// 		MainView.instance.initSmallShop();

				// 		self.share(0);
				// 	}else
				// 	{
				// 		PopManager.showPop("ErrorPop",2);
				// 	}
				// }
				}else
				{
					PopManager.showPop("ErrorPop",2);
				}
			},
			error: function()
			{
				//Main.showLost(2);
				setTimeout(self.getLoct,5000);
			},timeout: 8000,
			dataType: "json",async: true,type: "POST",
			complete: function(XMLHttpRequest,status)
			{
				if(status == 'timeout')
				{
					//Main.showLost(2);
					setTimeout(self.getLoct,5000);
				}
			}
		});
	}

	public refreshMap():void
	{
		this.Gmap.centerAndZoom(eval("new BMap.Point("+this.serverLng+", "+this.serverLat+")"), this.curMapLevel);

		this.mapView.refreshMap();
		// var list = this.marketList;
		// if(list)
		// {
		// 	//{"name":"上海南站","lng":31.15952311239576,"lat":121.43577423051164}
		// 	var len = list.length;
		// 	for(var i = 0;i<len;i++)
		// 	{
        //         var obj = list[i];
        //         if(obj)
        //         {
        //             obj.id = i+1;
        //             var item = new MarkerItemView();
		// 		    item.setData(obj);
        //             UIManager.instance.mapLayer.addChild(item);
        //             this.itemList.push(item);
        //         }
		// 	}
		// }
	}

	private static _instance:MapManager;

	static get instance():MapManager 
	{ 
		if(!MapManager._instance)
		{
			MapManager._instance = new MapManager();
		}
		return MapManager._instance;
	}
}