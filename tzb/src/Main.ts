class Main extends egret.DisplayObjectContainer 
{
    public static isTest = false;

    public static type = 2;

    public static isGet = false;

    public static step = "";

    // public judge = false;

    public static username;
    public static headurl;

    //public static content;

   public static content =  [
								{
									"nickname": "",
									"headimgurl": "",
									"content": "1",
									"type": "2"
								},
								{
									"nickname": "",
									"headimgurl": "",
									"content": "2",
									"type": "2"
								},
								{
									"nickname": "",
									"headimgurl": "",
									"content": "3",
									"type": "2"
								},
								{
									"nickname": "",
									"headimgurl": "",
									"content": "4",
									"type": "2"
								},
                                								{
									"nickname": "",
									"headimgurl": "",
									"content": "5",
									"type": "2"
								},
                                								{
									"nickname": "",
									"headimgurl": "",
									"content": "6",
									"type": "2"
								},								{
									"nickname": "",
									"headimgurl": "",
									"content": "7",
									"type": "2"
								},								{
									"nickname": "",
									"headimgurl": "",
									"content": "8",
									"type": "2"
								}
							];

    public static ROOT:string = "http://leasiondata.cn/";

	public static get USER_INFO_API()
	{
		return Main.ROOT + "info?"+Math.random();
	}

	public static get PLAY_API()
	{
		return Main.ROOT + "play?"+Math.random();
	}

    public static INFO_TICKET = "";
    public static PLAY_TICKET = "";

    public static IS_SHARE = false;

    /**
     * 加载进度界面
     */
    private loadingView: LoadingUI;

    public static instance:Main;

    // public static get _instance():Main
	// {
	// 	if(!Main.instance)
	// 	{
	// 		Main.instance = new Main();
	// 	}
	// 	return Main.instance;
	// }

    public constructor() 
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) 
    {
        Main.instance = this;
        StageUtils.registStage(this.stage);
        this.addChild(UIManager.instance);

        this.loadData();
    }

    private getData()
    {
        // var url = window.location.href.split("?")[1];

        var url = window.location.href.split("#")[0].split("?")[1];
        if (url.indexOf("$share")!=-1){
            Main.IS_SHARE = true;
            Main.type = parseInt(url.substr(url.indexOf("$share")+6));
            Main.username = decodeURI(url.substr(0,url.indexOf("$share")));
        } else {
            sessionStorage.setItem("interface","http://coeasion.cn/");
            sessionStorage.setItem("mainticket",url.substr(0,32));
        }
        return true;
        //var ut;
       // console.log("loadUser");
        /*
        if(Main.isTest) 
        {
            return true;  
        } 
        //Main.api ="test.json";
        if(url)
        {
            ut = url.split("$");
            
            var arr = ut[0].split("&")[0].split("=")[0].split(",");
            var t1 = arr[0];
            var t2 = arr[1];
            if(t1 == "share")
            {
                Main.IS_SHARE = true;
                Main.type = t2;
            }else
            {
                Main.INFO_TICKET = t1;
                Main.PLAY_TICKET = t2;    
            }
            if(ut[1])
            {
                var temp = ut[1].substring(0,10);
                // MapManager.isShared = temp.split("=")[1];
            }
            return true;
        }else{
            return false;
        }
        */
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void 
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    }

    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) 
    {
        console.log(event.groupName);
        
        if(event.groupName == "loading")
        {
            //设置加载进度界面
            this.loadingView = new LoadingUI();
            UIManager.instance.mainUILayer.addChild(this.loadingView);
            if(Main.IS_SHARE)
            {
                RES.loadGroup("share");
            }else
            {
                RES.loadGroup("danmu");
            }
        }else if(event.groupName == "danmu")
        {
            RES.loadGroup("game"+Main.type);
        }
        else if(event.groupName == "game1" || event.groupName == "game2" || event.groupName == "game3")
        {
            this.loadingView.loadComp();

            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        }else if(event.groupName == "share")
        {
            this.loadingView.loadComp();

            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        }
    }

    /**
     * 资源组加载出错
     */
    private onItemLoadError(event: RES.ResourceEvent) 
    {
        Message.show("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     */
    private onResourceLoadError(event: RES.ResourceEvent) 
    {
        Message.show("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event: RES.ResourceEvent) 
    {
        if (event.groupName == "danmu" || event.groupName == "game1" || event.groupName == "game2" || event.groupName == "game3" || event.groupName == "share") 
        {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private loadData():void
    {
        if(this.getData())
        {
            if(Main.IS_SHARE)
            {
                Main.share();
                //初始化Resource资源加载库
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
                RES.loadConfig("resource/default.res.json", "resource/");
            }else
            {
                var self = this;
                var isAward;
                // alert("first: " + sessionStorage.getItem("mainticket"));
                $.ajax({
                    url: sessionStorage.getItem("interface"),
                    data: {actiontype:"info",ticket:sessionStorage.getItem("mainticket")},
                    success: function(data)
                    {
                        // alert(JSON.stringify(data));
                        // alert("第一次调接口返回ticket：" + data.pools[0].ticket);
                        if(data.reason != undefined && data.reason.indexOf("limit") != -1){
                            PopManager.showPop("ErrorPop",4);
                            return;
                        }
                        if (data.result!="success"){
                            PopManager.showPop("ErrorPop",2);
                            return;
                        }
                        // if (data.pools.length==0&&data.prizes.length==0){
                        //     PopManager.showPop("ErrorPop",1);
                        //     return;
                        // }
                        Main.username = decodeURI(data.nickname);
                        Main.headurl = data.headimgurl;
                        
                        if(data.prizes.length > 0){
                            if(data.prizes[0].value == "66600" && data.prizes[0].require.indexOf("ADDR") == 0){
							    //step=cashed  没填信息
                                Main.step = "cashed";
                                sessionStorage.setItem("addr", "ADDR");
                                isAward = false;
                                sessionStorage.setItem("confirmticket0", data.prizes[0].ticket);
                                // PopManager.showPop("InfoPop");
                                // return;
                            }else{
                                //step=filled  填过信息
                                Main.step = "filled";
                                var addr = data.prizes[0].require.split("#")[0];
                                sessionStorage.setItem("addr", addr);
                                isAward = true;
                                sessionStorage.setItem("confirmticket2", data.prizes[0].ticket);
                                // PopManager.showPop("InputPop");
                                // return;
                            }
                        }
                        // if(data.prizes.length == 0 && data.pools.length == 1){
                        //     alert("data.pools.lengtth: " + data.pools.length);
                        //     PopManager.showPop("ErrorPop",1);
                        //     return;
                        // }
                        if (data.pools.length>0&&data.pools[0].type=="game"){
                            sessionStorage.setItem("gameticket",data.pools[0].ticket);
                            // alert("第二次调接口使用的ticket：" + sessionStorage.getItem("gameticket"));
                            $.ajax({
                                url: sessionStorage.getItem("interface"),
                                data: {actiontype:"info",ticket:sessionStorage.getItem("gameticket")},
                                success: function(data2)
                                {

                                     self.loadRes();
                                    
                                    if (data2.result!="success"){
                                        PopManager.showPop("ErrorPop",2);
                                        return;
                                    }
                                    
                                    if(data2.pools==undefined&&data2.prizes.length==1){
                                        if(isAward){
                                            PopManager.showPop("InputPop");
                                            return;
                                        }else{
                                        PopManager.showPop("ErrorPop",1);
                                        return;
                                        }
                                    }
                                    
                                    if (data2.prizes.length>1){
                                        for (var i = 0; i < data2.prizes.length;i++){
                                            if (data2.prizes[i].pooltype=="game"){
                                                if (data2.prizes[i].desc=="game0"){
                                                    Main.type=1;
                                                } else if (data2.prizes[i].desc=="game1"){
                                                    Main.type=2;
                                                } else {
                                                    Main.type=3;
                                                }
                                            } else {
                                                sessionStorage.setItem("confirmticket",data2.prizes[i].ticket);
                                                //step=filled  填过信息
                                                // Main.step = "filled";
                                            }
                                        }
                                    } else if (data2.pools!=undefined&&data2.pools.length>0||data2.prizes!=undefined&&data2.prizes.length>0){
                                        if (data2.prizes!=undefined&&data2.prizes.length>0){
                                            if (data2.prizes[0].desc=="game0"){
                                                Main.type=1;
                                            } else if (data2.prizes[0].desc=="game1"){
                                                Main.type=2;
                                            } else {
                                                Main.type=3;
                                                // alert(Main.type);
                                            }
                                        }
                                        if (data2.pools!=undefined&&data2.pools.length>0){
                                            sessionStorage.setItem("luckticket",data2.pools[0].ticket);
                                        } else {
                                            // alert("ErrorPop");
                                            // PopManager.showPop("ErrorPop",1);

                                            if(isAward){   //抽过奖并填过信息
                                                PopManager.showPop("InputPop");
                                            }else{
                                                PopManager.showPop("InfoPop");
                                            }
                                        }
                                    } else {
                                        
                                        PopManager.showPop("ErrorPop",1);
                                    }
                                  
                            }
                ,
                    error: function()
                    {
                    },timeout: 8000,
                    dataType: "json",async: true,type: "POST",
                    complete: function(XMLHttpRequest,status)
                    {
                        if(status == 'timeout')
                        {
                        }
                    }});
                }

                        
/*
                $.ajax({
                    url: Main.USER_INFO_API,
                    data: {actiontype:"info",ticket:Main.INFO_TICKET},
                    success: function(data)
                    {
                        if(data.result == "success")
                        {
                            if(data.more.result == "success")
                            {
                                //step=filled  填过信息
                                //step=cashed  没填信息
                                Main.step = data.more.step;
                                Main.type = data.more.gameid;
                                if(data.c1ashed)
                                {
                                    //领过
                                    Main.isGet = true;
                                }else
                                {
                                    //未领过
                                    Main.isGet = false;
                                }
                                Main.username = decodeURI(data.nickname);
                                Main.headurl = data.headimgurl;
                                Main.content = data.more.content;
                                
                                Main.share();

                                if(Main.isGet)
                                {
                                    PopManager.showPop("ErrorPop",1);
                                }else
                                {
                                    self.loadRes();
                                }
                            }else
                            {
                                PopManager.showPop("ErrorPop",2);
                            }
                        }else
                        {
                            PopManager.showPop("ErrorPop",2);
                        }
                    },
                    error: function()
                    {
                    },timeout: 8000,
                    dataType: "json",async: true,type: "POST",
                    complete: function(XMLHttpRequest,status)
                    {
                        if(status == 'timeout')
                        {
                        }
                    }
                });*/
                }
                ,
                    error: function()
                    {
                    },timeout: 8000,
                    dataType: "json",async: true,type: "POST",
                    complete: function(XMLHttpRequest,status)
                    {
                        if(status == 'timeout')
                        {
                        }
                    }
                });
            }
        }else
        {
            PopManager.showPop("ErrorPop",2);
        }
    }

    public loadRes():void
    {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    public static share(isEnd = false):void
    {
        var str1 = "码上有礼 新意加倍";
        var str2;
        if(isEnd)
        {
            if(Main.type == 1)
            {   
                str2 = Main.username + "亲吻屏幕赢得现金红包,快去看看！";
            }else if(Main.type == 2)
            {
                str2 = Main.username + "大笑三秒赢得现金红包，快去看看！";
            }else
            {
                str2 = Main.username + "砸开椰子赢得现金红包，快去看看！";
            }
        }else
        {
            if(Main.type == 1)
            {   
                str2 = "喝特种兵亲吻屏幕能赢红包，最高666元，快去看看";
            }else if(Main.type == 2)
            {
                str2 = "喝特种兵大笑三秒能赢红包，最高666元，快去看看";
            }else
            {
                str2 = "喝特种兵砸椰子能赢红包，最高666元，快去看看";;
            }
        }
        
        var url = window.location.href.split("#")[0].split("?")[0];
        url = "http://res.leasiondata.cn/lstatic/t1v2/index.html?test$share1";
       //alert("wxIsReady["+eval("$.wxIsReady")+"]");
		     if(eval("$.wxIsReady"))
		{
            var weixin = eval("wx;");
		   // alert("weixin["+weixin+"]");
		        if(weixin)
            {
               // alert("sharing["+url+"]");
		        weixin.onMenuShareTimeline({
                    title: "【"+str1+"】" + str2,
                    link:url,
                    imgUrl:"http://res.leasiondata.cn/lstatic/t1v2/share/share.jpg",
                    success: function () {
                      //  alert("sharesuccess");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                       // alert("sharefail");
                    }
                });
                weixin.onMenuShareAppMessage({
                    title:str1,
                    desc: str2,
                    link:url,
                    imgUrl:"http://res.leasiondata.cn/lstatic/t1v2/share/share.jpg",
                    success: function () {
                       // alert("sharesuccess2");
                    },
                    cancel: function () {
                           // alert("sharefail2");
                    }
                });
            }
		}else
		{
			setTimeout(()=> 
            {
				this.share();
		    }, 100);
		}
    }
}