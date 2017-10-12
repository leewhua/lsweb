class MapView extends egret.DisplayObjectContainer 
{
    private markerLayer:egret.DisplayObjectContainer;

    private selfLayer:egret.DisplayObjectContainer;

	private timer:egret.Timer;

	private itemList:Array<MarkerItemView>;

    private itemDic:any;

    private otherDic:any;

    private companyDic:any;

    private virCompDic:any;

    private threeDic:any;

    private self:SelfMarkerView;

	public constructor()
	{
		super();

        this.markerLayer = new egret.DisplayObjectContainer();
        this.addChild(this.markerLayer);

        this.selfLayer = new egret.DisplayObjectContainer();
        this.addChild(this.selfLayer);

		// this.timer = new egret.Timer(10000,1);
		// this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
		// this.timer.start();

		this.itemList = [];
        this.itemDic = {};

        this.otherDic = {};
        this.companyDic = {};
        this.virCompDic = {};
        this.threeDic = {};


        
        // this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
        
	}

    public refreshSelf():void
    {
        if(this.self)
        {
            this.self.refreshPos();
        }else
        {
            this.self = new SelfMarkerView();
            this.self.setData();
            this.selfLayer.addChild(this.self);
            // this.itemDic[data.id] = this.self;
        }
    }

    public refreshOther(list):void
    {
        if(list)
        {
            var len = list.length;
            for(var i = 0;i<len;i++)
            {
                var data = list[i];
                if(data)
                {
                    var item = this.findMarkerByID(data.id,this.otherDic);
                    if(item)
                    {
                        item.refreshPos();
                    }else
                    {
                        item = new OtherMarkerView();
                        item.setData(data);
                        this.selfLayer.addChild(item);
                        this.otherDic[data.id] = item;
                    }
                }
            }
        }
    }

    public refreshCompany(list):void
    {
        if(list)
        {
            var len = list.length;
            for(var i = 0;i<len;i++)
            {
                var data = list[i];
                if(data)
                {
                    var item = this.findMarkerByID(data.id,this.companyDic);
                    if(item)
                    {
                        item.refreshPos();
                    }else
                    {
                        item = new MarkerItemView();
                        item.setData(data);
                        this.selfLayer.addChild(item);
                        this.companyDic[data.id] = item;
                    }
                }
            }
        }
    }

    public refreshVIRComp(list):void
    {
        if(list)
        {
            var len = list.length;
            for(var i = 0;i<len;i++)
            {
                var data = list[i];
                if(data)
                {
                    var item = this.findMarkerByID(data.id,this.virCompDic);
                    if(item)
                    {
                        item.refreshPos();
                    }else
                    {
                        item = new MarkerItemView();
                        item.setData(data);
                        this.selfLayer.addChild(item);
                        this.virCompDic[data.id] = item;
                    }
                }
            }
        }
    }

    public refreshThree(list):void
    {
        if(list)
        {
            var len = list.length;
            for(var i = 0;i<len;i++)
            {
                var data = list[i];
                if(data)
                {
                    var item = this.findMarkerByID(data.id,this.threeDic);
                    if(item)
                    {
                        item.refreshPos();
                    }else
                    {
                        item = new MarkerItemView();
                        item.setData(data);
                        this.selfLayer.addChild(item);
                        this.threeDic[data.id] = item;
                    }
                }
            }
        }
    }

    public refreshMap():void
    {
        if(this.self)
        {
            this.self.refreshPos();
        }
        for(var str in this.otherDic)
        {
            var item = this.otherDic[str];
            if(item)
            {
                item.refreshPos();
            }
        }
        for(var str in this.companyDic)
        {
            var item = this.companyDic[str];
            if(item)
            {
                item.refreshPos();
            }
        }

        for(var str in this.virCompDic)
        {
            var item = this.virCompDic[str];
            if(item)
            {
                item.refreshPos();
            }
        }

        for(var str in this.threeDic)
        {
            var item = this.threeDic[str];
            if(item)
            {
                item.refreshPos();
            }
        }
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

        //             var target = this.findMarker(obj);
        //             if(target)
        //             {
        //                 target.refreshPos();
        //             }else
        //             {
        //                 var item = new MarkerItemView();
        //                 item.setData(obj);
        //                 this.markerLayer.addChild(item);
        //                 this.itemList.push(item);
        //             }
        //         }
		// 	}
		// }
    }

    private findMarkerByID(id,target):MarkerItemView
    {
        for(var str in target)
        {
            if(str == id)
            {
                return target[str];
            }
        }
        return null;
    }

    private findMarker(target):MarkerItemView
    {
        var len = this.itemList.length;
        for(var i = 0;i<len;i++)
        {
            var item = this.itemList[i];
            if(item)
            {
                if(item.data.id == target.id)
                {
                    return item;
                }
            }
        }
        return null;
    }

    // private enterFrameHandler():void
    // {
    //     var map = eval("$Gmap");
    //     if(map)
    //     {
    //         var self = this;
    //         map.addEventListener("moving", function(evt){    
    //             self.mapMove();
    //         });

    //         map.addEventListener("zoomend", function(evt){    
    //             self.mapMove();
    //         });

    //         // map.addEventListener("resize", function(evt){    
    //         //     self.mapMove();
    //         // });

            
    //         this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
    //     }
    // }

    // public mapMove():void
    // {
    //     var len = this.itemList.length;
    //     for(var i = 0;i<len;i++)
    //     {
    //         var item = this.itemList[i];
    //         if(item)
    //         {
    //             item.refreshPos();
    //         }
    //     }
    // }

	// private timerHandler():void
	// {
	// 	var list = eval("$marketList");
	// 	if(list)
	// 	{
	// 		//{"name":"上海南站","lng":31.15952311239576,"lat":121.43577423051164}
    // //             var obj = $marketList[i];
    // //             if(obj)
    // //             {
    // //                 var point = new BMap.Point(obj.lng,obj.lat);
    // //                 addIcomMarker(getImgUrl(obj.lng,obj.lat),point,i,false,obj.name,60,40);


    // //                 //addLabelMarker(point,i,obj.name);
    // //             }

	// 		var len = list.length;
	// 		for(var i = 0;i<len;i++)
	// 		{
    //             var obj = list[i];
    //             if(obj)
    //             {
    //                 obj.id = i+1;
    //                 var item = new MarkerItemView();
	// 			    item.setData(obj);
    //                 this.addChild(item);
    //                 this.itemList.push(item);
    //             }
	// 		}
	// 	}
	// }

	// $refreshMap = function()
    // {
    //     if ($WxGpsLoct == null || $NowLoct == null || $LastLoct == null || $Gmap == null) {
    //         setTimeout($refreshMap, 500);
    //     }else
    //     {
    //         var arr = $Gmap.getOverlays();
    //         console.log(arr.length);

    //         var len = $markerShowList.length;
    //         for(var i = 0;i<len;i++)
    //         {
    //             $Gmap.removeOverlay($markerShowList[i]);
    //         }

    //         $markerShowList.length = 0;

    //         //$Gmap.clearOverlays();

    //         var len =  $marketList.length;
    //         for(var i = 0;i<len;i++)
    //         {
    //             //{"name":"上海南站","lng":31.15952311239576,"lat":121.43577423051164}
    //             var obj = $marketList[i];
    //             if(obj)
    //             {
    //                 var point = new BMap.Point(obj.lng,obj.lat);
    //                 addIcomMarker(getImgUrl(obj.lng,obj.lat),point,i,false,obj.name,60,40);


    //                 //addLabelMarker(point,i,obj.name);
    //             }
    //         }
    //     }
    // }
}