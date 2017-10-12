//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI1;

    private oldView:egret.DisplayObjectContainer;

    public static product_type:string = "yd";

    public static isTest:boolean = false;

    public static user_ticket:string;

    public static status_ticket:string;

    public static save_ticket: string;

    public static ROOT:string = "http://coeasion.cn/";
    // public static ROOT:string = "http://leasiondata.cn/";

	// public static USER_INFO_API:string = Main.ROOT + "info";

	// public static PLAY_API:string = Main.ROOT + "play";

    public static user:Object;

    public static award:any = {type:"cash",count:1};

    public static instance:Main;

    public static get USER_INFO_API()
	{
		return Main.ROOT + "info?"+Math.random();
	}

	public static get PLAY_API()
	{
		return Main.ROOT + "play?"+Math.random();
	}

    public constructor() {
        super();
        Main.instance = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event)
    {
        console.log(window.history.state);
        
        StageUtils.registStage(this.stage);
        if(this.getData())
        {
            this.loadConfig();
        }else{
            Main.showLost(21);
        }
    }

    public showLost(type:number) 
    {
        console.log("showLost",type);
        var lost: egret.Sprite = new egret.Sprite();
        lost.touchEnabled = true;
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x0,0.8);
        bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);
        bg.graphics.endFill();
        lost.addChild(bg);


        var error:egret.Bitmap = Global.createBitmapByName("error_png");
        StageUtils.centerInParent(error,0,-150);
        lost.addChild(error);
        
        
        var pic;
        var msg: egret.TextField = new egret.TextField();
        msg.background = false;
       
        msg.width=600;
        msg.textColor = 0xffffff;
        msg.textAlign = "center"; 
        msg.size = 36;
        if(type==0){
            pic = Global.createBitmapByName('lost_png');
            //
        } else if(type == 21) {
            msg.text = "错误的链接，请重新扫码...";
            lost.addChild(msg);
        } else if(type == 1) {
            pic = Global.createBitmapByName('lost_png');
            //msg.text = "已过期，请重新扫码...";
        } else if(type == 2) {
            pic = Global.createBitmapByName('lost_png');
            //msg.text = "网络异常，请重新扫码...";
        } else if(type == 3) {
            pic = Global.createBitmapByName('scanned_png');
            //msg.text = "码已经被抽过了...";
        } else if(type == 4) {
            pic = Global.createBitmapByName('lost_png');
            //msg.text = "网络超时，请稍后再扫...";
        } else if(type == 5) {
            pic = Global.createBitmapByName('lost_png');
            //msg.text = "网络异常，请稍后再扫...";
        } else if(type == 11) {
            pic = Global.createBitmapByName('max_png');
        } else if(type == 22) {
            
            pic = Global.createBitmapByName('max-lost_png');
            console.log("max-lost_pngmax-lost_pngmax-lost_png:" + pic);
            //msg.text = "网络异常，请稍后再扫...";
            
        } else if(type == 33) {
            msg.text = "码已经被抽过了...";
            lost.addChild(msg);
        } else if(type == 404) {
            window.location.href = 'http://res.leasiondata.cn/lstatic/lsruleupgrade.html';
        }else{
            msg.text = "网络异常，请稍后再扫...";
            lost.addChild(msg);
            //msg.text = "已过期，请重新扫码...";
        }
        msg.y = 600;
        msg.x = 20;
       
        if(pic){
            // pic=new Middle(pic);
            // pic.x=320;
            // pic.y=600;
            StageUtils.centerInParent(pic,0,150);
            lost.addChild(pic);
        }
       
        this.addChild(lost);
        
        lost.alpha=0;
        var tw = egret.Tween.get(lost);

        tw.to({ "alpha": 1 },400);
    
    }

    public static showLost(type)
    {
        Main.instance.showLost(type);
    }

    private showScanned()
    {
        var scanned = new Scanned();
        this.addChild(scanned);
    }


    private getData()
    {
        
        // var json = '{"amount":"1","id":"1","pooltype":"yanjishoukuai","poolid":"1","desc":"tshirt","ticket":"4a65306a867a45b6b3fb93e88a9c3ab8","value":"1","require":"ADDR","type":"inkind"}';
        // sessionStorage.setItem("yanjishoukuai",json);
        var url = window.location.href.split("#")[0].split("?")[1];
        var ut;
        console.log("loadUser");
        console.log("url: " + url);
        // Main.product_type = eval("$.product_type");

        // egret.localStorage.setItem("kzw_type","2")
        var type = egret.localStorage.getItem("kzw_type");
        if(type)
        {
            if(type == "1")
            {
                Main.product_type = "tk";
            }else if(type == "2")
            {
                Main.product_type = "yd";
            }else if(type == "3")
            {
                Main.product_type = "bv";
            }
        }
        
        // if(Main.isTest) 
        // {
        //     return true;  
        // } 
        //Main.api ="test.json";
        if(url && url.length>20)
        {
            ut = url.substr(0, 32);
            Main.user_ticket = ut;
            console.log(ut +" " + ut.length);
            // ut = url.split(",");
            // Main.user_ticket = ut[0];
            // Main.status_ticket = ut[1];
            // console.log(Main.user_ticket,Main.status_ticket);
            return true;
        }else{
            var prizes =sessionStorage.getItem("yanjishoukuai");
            console.log(prizes);
            if(prizes){
                // Main.showPop("EndView");
                return true;
            }else{
                return false;
            }
        }
    }

    private loadUser(): void 
    {
        console.log("loadUser");
        if(Main.isTest) {
            Main.user = { "nickname": "jeff","headimgurl": "http://wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0" };
            this.loadConfig();
            return;
        }
        var self=this;
        $.ajax({
            url: Main.USER_INFO_API,
            data: { ticket: Main.user_ticket,desc: "test",url4wxjssdk:window.location.href.split("#")[0]},  //url4wxjssdk:window.location.href.split("#")[0]
            success: function(data) 
            {
                if(data.result == "success")
                {
                    Main.user = data;
                    var obj;
                    var list = data.pools;
                    var len = list.length;
                    for(var i = 0;i<len;i++)
                        {
                            var item = list[i];
                            if(item)
                            {
                                if(item.type == "yanjishoukuai")
                                {
                                    obj = item;
                                    break;
                                }
                            }
                        }
                        if(obj && obj.ticket)
                        {
                            self.loadConfig();
                        }else
                        {
                            self.showScanned();
                        }
                    // if(data.more.result == "success")
                    // {
                    //     var obj;
                    //     var list = data.more.shoplist;
                    //     var len = list.length;
                    //     for(var i = 0;i<len;i++)
                    //     {
                    //         var item = list[i];
                    //         if(item)
                    //         {
                    //             if(item.shopid == 5)
                    //             {
                    //                 obj = item;
                    //                 break;
                    //             }
                    //         }
                    //     }
                    //     if(obj && obj.ticket)
                    //     {
                    //         self.loadConfig();
                    //     }else
                    //     {
                    //         self.showScanned();
                    //     }
                    // }else
                    // {
                    //     Main.showLost(21);
                    // }
                }else
                {
                    Main.showLost(21);
                }
            },
            error: function() {
                Main.showLost(2);
            },timeout: 8000,
            dataType: "json",async: true,type: "POST",
            complete: function(XMLHttpRequest,status) {
                if(status == 'timeout') {
                    Main.showLost(2);
                }
            }
        });

    }

    private loadConfig(): void
    {
        console.log("loadConfig");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void 
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void 
    {
        if(event.groupName == "preload")
        {
            if(Main.product_type == "yd")
            {
                RES.loadGroup("yd_logo");
            } else if(Main.product_type == "tk") 
            {
                RES.loadGroup("tk_logo");
            } else if(Main.product_type == "bv") 
            {
                RES.loadGroup("bv_logo");
            }
        }
        if(event.groupName == "yd_logo" || event.groupName == "tk_logo" || event.groupName == "bv_logo") 
        {
            this.loadingView = new LoadingUI1();
            this.addChild(this.loadingView);
            RES.loadGroup("main");
        }else if(event.groupName == "main")
        {
            this.loadingView.setLoadComp();
            // this.loadLuck();

            // GameView.rewardData = {type:"qmz"};
            // Main.showPop("SubmitView");
            var prizes =sessionStorage.getItem("yanjishoukuai");
            console.log(prizes);
            if(prizes){
                Main.showPop("EndView");
            }

            RES.loadGroup("music");
        }else if(event.groupName == "music")
        {
            SoundManager.getInstance().isLoad = true;
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "main") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private outOld(old)
    {
        var tw = egret.Tween.get(old);
        tw.to({ y: -1040 },600,egret.Ease.circIn);
        tw.call(function() 
        {
            if(old.parent) 
            {
                old.parent.removeChild(old);
            }
        });
    }

    public showLogin()
    {
        if(this.loadingView)
        {
            if(this.loadingView.checkComp())
            {
                var login = new LoginView();
                this.addChildAt(login,0);

                if(this.loadingView.parent) 
                {
                    this.loadingView.parent.removeChild(this.loadingView);
                }
                this.loadingView = null;
                this.oldView = login;
            }
        }
    }

    public showGame()
    {
        var game = new GameView();
        this.addChildAt(game,0);
        this.outOld(this.oldView);
        this.oldView = game;
    }

    private static list:any = {};
    public static showPop(popName:string,data:any = null):void
	{
        var pop = Main.list[popName];
        if(pop)
        {
            return;
        }
        var popClass:any = egret.getDefinitionByName(popName);
		var pop = new popClass();
        pop.setData(data);
		Main.instance.addChild(pop);
        Main.list[popName] = pop;
	}

    public static removePop(popName:string):void
    {
        var pop = Main.list[popName];
        if(pop)
        {
            if(pop.parent)
            {
                pop.out();
            }
            Main.list[popName] = null;
            delete Main.list[popName];
        }
    }
}


