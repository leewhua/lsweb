class Main extends egret.DisplayObjectContainer {

    public static isTest = false;
    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) 
    {
        StageUtils.registStage(this.stage);
        this.addChild(UIManager.instance);
        
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        UIManager.instance.mainUILayer.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // RES.loadConfig("resource/default.res.json", "resource/");

        if(Main.isTest)
        {
            UserInfo.instance.url = "http://wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0";
            UserInfo.instance.username = "有X的男人";
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/default.res.json", "resource/");
            return;
        }

        if(this.getData())
        {
            if(UserInfo.instance.isShare)
            {
                return;
            }
            //初始化Resource资源加载库
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/default.res.json", "resource/");
        }else
        {
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/default.res.json", "resource/");
        }
    }

    private getData()
    {
        // var url = window.location.href.split("?")[1];
        var url = window.location.href.split("#")[0].split("?")[1];
        var ut;
        console.log("loadUser");
        
        if(Main.isTest) 
        {
            return true;  
        } 
        if(url)
        {
            ut = url.split("$");
            var arr = ut[0].split("=")[0].split(",");
            MapManager.USER_TICKET = arr[0];
            MapManager.PLAY_TICKET = arr[1];
            if(arr[0] == "share")
            {
                UserInfo.instance.isShare = true;
                //"xxx/share,"+isGet+","+UserInfo.instance.username+","+UserInfo.instance.url,
                PopManager.showPop("ShareIntoPop",{isget:arr[1],username:arr[2],url:arr[3]});
            }
            return true;
        }else
        {
            return false;
        }
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("main");
    }

    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) 
    {
        if (event.groupName == "main") 
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            this.loadingView.loadComp();

            // this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) 
    {
        Message.show("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) 
    {
        //TODO
        Message.show("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) 
    {
        if (event.groupName == "main") 
        {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
}


