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

	//04e47f40fbcd4b0d89ce15ec7adfa1fc
	//bb5d7321281c431a8e92e1287514cde4
	//851cf87d41a54e618fc673a33427b51a
	public static USER_TICKET:string = "03cb5224f3474f0eb7cfa64cfea4cf49";//"851cf87d41a54e618fc673a33427b51a";
	public static PLAY_TICKET:string = "";

	// public static ROOT:string = "http://leasiondata.cn/";
	// public static ROOT:string = "http://123.59.156.181:81/";
	public static ROOT:string = "http://coeasion.cn/";

	// public static USER_INFO_API:string = MapManager.ROOT + "info?"+Math.random();

	// public static PLAY_API:string = 

	public static USER_OTHER_API:string = MapManager.ROOT + "GameDemo/aroundperson";

	public static USER_COMPANY_API:string = MapManager.ROOT + "GameDemo/company";

	public static USER_VIR_COMP_API:string = MapManager.ROOT + "GameDemo/virComp";

	public static USER_THREE_API:string = MapManager.ROOT + "GameDemo/three";

	public mapView:MapView;

	public static AnswerList = [{title:"顶破天(打一字)",answer:"夫"},{title:"半耕半读(打一字)",answer:"讲"}];

	public static get USER_INFO_API()
	{
		return MapManager.ROOT + "info?"+Math.random();
		// return MapManager.ROOT;
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

	public initMap():void
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


	private share():void
	{
		var wxObj = eval("wx");
		if(wxObj && eval("$.wxIsReady"))
		{
			wxObj.onMenuShareTimeline(
			{
				title: "欢迎进入码上星球，猎时祝您元宵快乐，财到福到",
				link:MapManager.instance.code,
				imgUrl:"http://res.leasiondata.cn/msxq/share.jpg",
				success: function () {

				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			wxObj.onMenuShareAppMessage({
				title:"欢迎进入码上星球，猎时祝您元宵快乐，财到福到",
				desc: '点击进入',
				link:MapManager.instance.code,
				imgUrl:"http://res.leasiondata.cn/msxq/share.jpg",
				success: function () {

				},
				cancel: function () {

				}
			});
		}else
		{
			egret.setTimeout(this.share,this,500);
		}
	}
	
	public hb = 0;
	public kq = 0;
	public money = 0;
	public nl = 0;
	public egg = 0;

	public add_money = 0;
	public add_nl = 0;
	public add_egg = 0;

	public user_name;
	public head_url;

	private isLoadInfo:boolean = true;

	private code;

	// public shopList;

	public loadDate():void
	{
		this.mapView.refreshSelf();

		// MainView.instance.refreshInfo1();

		MainView.instance.showShop(UserInfo.instance.shopList);

		// MainView.instance.showShop([{shopid:1,ticket:111,type:1},{shopid:2,ticket:111,type:2},{shopid:3,ticket:0,type:1},{shopid:4,ticket:111,type:1},{shopid:5,ticket:111,type:3}]);


		// var x = this.lng;
		// var y = this.lat;
		// console.log("xy:"+x,y);
		// var self = this;
		// $.ajax({
		// 	url: MapManager.USER_INFO_API,
		// 	data: {type:"info",lng:x,lat:y,ticket:MapManager.USER_TICKET,isshared:MapManager.isShared},
		// 	success: function(data)
		// 	{
		// 		if(data.result == 0 || data.result == 3 || data.result == 2)
		// 		{
		// 			self.code = "http://lsid.me/"+data.code+"$isshared=1";

		// 			self.hb = data.hb;
		// 			self.kq = data.kq;

		// 			self.money = data.coin;
		// 			self.add_money = data.addcoin;

		// 			self.nl = data.energy;
		// 			self.add_nl = data.addenergy;

		// 			self.egg = data.eggs;
		// 			self.add_egg = data.addeggs;

		// 			self.user_name = data.name;
		// 			self.head_url = data.headurl;

		// 			self.serverLng = data.lng;
		// 			self.serverLat = data.lat;
		// 			self.mapView.refreshSelf();
		// 			MainView.instance.refreshInfo1();

		// 			if(self.isLoadInfo)
		// 			{
		// 				// if(self.add_money || self.add_nl || self.add_egg)
		// 				// {
		// 				// 	PopManager.showPop("FirstPop");
		// 				// }
		// 				self.isLoadInfo = false;

		// 				self.share();
		// 			}
		// 		}else
		// 		{
		// 			// PopManager.showPop("EndPop");
		// 			// self.refreshMap();
		// 			// self.mapView.refreshOther([{id:1000,lng:data.lng,lat:data.lat,name:"X男"},{id:1000,lng:data.lng,lat:data.lat,name:"X男"},{id:1000,lng:data.lng,lat:data.lat,name:"X男"}]);
		// 		}
		// 		// setTimeout(self.getLoct,5000);
		// 	},
		// 	error: function()
		// 	{
		// 		//Main.showLost(2);
		// 		setTimeout(self.getLoct,5000);
		// 	},timeout: 8000,
		// 	dataType: "json",async: true,type: "POST",
		// 	complete: function(XMLHttpRequest,status)
		// 	{
		// 		if(status == 'timeout')
		// 		{
		// 			//Main.showLost(2);
		// 			setTimeout(self.getLoct,5000);
		// 		}
		// 	}
		// });

		// $.ajax({
		// 	url: MapManager.USER_INFO_API,
		// 	data: { type:"shop",ticket:MapManager.USER_TICKET,isshared:MapManager.isShared},
		// 	success: function(data)
		// 	{
		// 		if(data.result == 0)
		// 		{
		// 			MainView.instance.showShop(data.shops);
		// 		}
		// 	},
		// 	error: function()
		// 	{
		// 		//Main.showLost(2);
		// 	},timeout: 8000,
		// 	dataType: "json",async: true,type: "POST",
		// 	complete: function(XMLHttpRequest,status)
		// 	{
		// 		if(status == 'timeout')
		// 		{
		// 			//Main.showLost(2);
		// 		}
		// 	}
		// });
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