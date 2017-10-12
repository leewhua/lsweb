
class Main extends egret.DisplayObjectContainer {


    public static shopUrl = "";
    public static win = 0;
    public static oid = "";
    private loadingView: LoadingUI;
    
    private scene: Scene;

    private now: egret.DisplayObjectContainer;
    private old: egret.DisplayObjectContainer;

    private count: number = 0;
    private loaded: number = 0;

    public constructor() {
        super();
        Main._main = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    
   public static isTest=false;
   
    private onAddToStage(event: egret.Event) {
        var sx = window.innerWidth / 640;
        var sy = window.innerHeight / 1030;
        Main.scale = sx / sy;
        console.log(Main.scale);
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;

        if(Main.isTest || this.getData()) {
            this.loadUser();
            var _this1=this;
            // setInterval(function(){
            //     _this1.loadUser();
            //     },30000);
        } else {
            Main.showLost('没有用户信息，请返回。');
        }
      
    }
    public static  getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) 
            return decodeURIComponent(r[2]); 
        return null;
    }
    private loadConfig(): void {
        console.log("loadConfig");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/config.json","resource/");
    }

    private showScene(): void {
        console.log("showScene");
        this.scene = new Scene();
        this.stage.addChildAt(this.scene,0);

    }

    private clearOld() {
        if(this.old && this.old.parent) this.removeChild(this.old);
        this.old = null;
    }


    private onConfigComplete(event: RES.ResourceEvent): void {
        console.log("onConfigComplete");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);

        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.loadGroup("sc");

    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        console.log("onResourceLoadComplete:" + event.groupName); 
        this.scene =Scene.instance;
        this.stage.addChildAt(Scene._scene,0);
        this.stage.removeChild(this.loadingView);
        // RES.loadGroup("music");
    }


    public static createBitmapByRes(res: string,name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var spriteSheet: egret.SpriteSheet = RES.getRes(res);
        console.log("name::" + name + "::" + res);
        result.texture = spriteSheet.getTexture(name);
        return result;
    }
    public static createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public static tweenTo(m,d,t,ox,oy,sc,ease) {
        var tw = egret.Tween.get(m);
        var xx = m.x;
        var yy = m.y;
        var w = m.width;
        var h = m.height;
        m.scaleX = m.scaleY = sc;
        m.x = xx + ox + (1 - sc) / 2 * w;
        m.y = yy + oy + (1 - sc) / 2 * h;
        tw.wait(d);

        tw.to({ "alpha": 1,scaleX: 1,scaleY: 1,x: xx,y: yy },t,ease);
    }



    public static createMc(json: string,png: string,lab: string): egret.MovieClip {
        var data = RES.getRes(json);//JSON  
        var texture: egret.Texture = RES.getRes(png);//Texture  
        var md: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        var result: egret.MovieClip = new egret.MovieClip(md.generateMovieClipData(lab));
        return result;
    }


    public static setBut(sp: egret.DisplayObject): void {
        if(sp) {
            sp.touchEnabled = true;
            sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() { sp.alpha = 0.68; },sp);
            sp.addEventListener(egret.TouchEvent.TOUCH_END,function() { sp.alpha = 1; },sp);
            sp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,function() { sp.alpha = 1; },sp);
        }
    }
  
    /*
    *资源组加载出错
    *The resource group loading failed
    */
    
    private onResourceLoadError(event: RES.ResourceEvent): void {
        this.onResourceLoadComplete(event);
    }


    private onResourceProgress(event: RES.ResourceEvent): void {
        this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
    }
    public static userApi = "http://play.leasiondata.cn/lsplaycity/user_info";
    // public static api: string = "http://play.leasiondata.cn/lsplaycity/luck";     //"http://lsid.me/luck/play";//"http://leasiondata.cn/luck/play1";//http://coeasion.cn/
    public static api: string = "http://coeasion.cn/";
    public static ticket: string = "d82cf56540134d6f93fb88d3edf5dc50";
    public static product_type: string = 'tk';
    public static user: any = {};
    public static _main: Main = null;
    public static scale = 1;
    public static luck:any={};

    static location: any = { country: null,province: null,city: null };

    static award: any = { uid: null,nickname: null,type: "cash",count: 0.88 };

    private getData() {
        var url = window.location.href.split("#")[0].split("?")[1].substring(0, 32);  //
        var ut;
        console.log("loadUser");
        console.log(url);
        Main.ticket = url;
        if(Main.isTest || Main.ticket != "") {
            return true;
        } else {
            return false;
        }
    }

    private loadUser(): void {
        var self = this;
        console.log("loadUser",Main.userApi);
        if(Main.isTest){
            Main.user.name ="test";
            Main.user.uid = "100";
            Main.user.profile = "";
            Main.user.point = 100;
            this.loadConfig();
            return;
        }
        //
        var _this1 = this;
        $.post(Main.api,{ ticket: Main.ticket },function(result) {
            var data = eval("(" + result + ")");
            if(data.error) {
                console.log(data.error_code,data.error);
                _this1.showLost("错误的用户信息。");
            }if(data.result == "fail"){
                _this1.showLost(data.result);
            }else {
                Main.user.name = data.nickname;
                if(data.prizes.length != 0){
                    var dataPrizes = data.prizes[0];
                    sessionStorage.setItem("prizes", JSON.stringify(dataPrizes));
                    Main.oid = data.prizes[0].ticket;
                    Main.win = data.prizes[0].id;
                    // Scene.instance.showPrizes();
                    // var end = new End();
                    // _this1.addChild(end);
                    console.log(Main.user.uid);
                }else if(data.pools.length != 0){
                    Main.user.uid = data.pools[0].ticket;
                    console.log(Main.user.uid);
                }else if(data.prizes.length == 0 && data.pools.length == 0){
                    _this1.showLost("该二维码已参与抽奖！");
                    return;
                }
                // Main.user.profile = data.profile_image_url;
                // Main.user.point=data.point;
                _this1.loadConfig();
            }
        });

    }

    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ",request.response);
    }

    private onGetIOError(event: egret.IOErrorEvent): void {
        //console.log("get error : " + event);
    }
    private onGetProgress(event: egret.ProgressEvent): void {
        //console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }

    public showLost(str) {
        console.log("showLost");
        var lost: egret.Sprite = new egret.Sprite();
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x0,0.8);
        bg.graphics.drawRect(0,0,640,1040);


        var msg: egret.TextField = new egret.TextField();
        msg.background = false;

        msg.width = 600;
        msg.textColor = 0xffffff;
        msg.textAlign = "center";
        msg.size = 36;

        msg.text = str;

        msg.y = 500;
        msg.x = 20;

        lost.addChild(bg);
        lost.addChild(msg);
        this.addChild(lost);

        lost.alpha = 0;
        var tw = egret.Tween.get(lost);
        tw.to({ "alpha": 1 },400);
        // setTimeout(function(){
        //     window.location.href = "http://0k6.cn/a/gotoplaycity";
        //     },2000);
        
    }

    public static showLost(str) {
        Main._main.showLost(str);
        //Main._main=this;
    }

    public static track(str) {
        //eval("_hmt.push(['_trackEvent', 'click', '" + str + "', ''])");
    }
    public static trackEvent(str) {
        //eval("_hmt.push(['_trackEvent', 'event', '" + str + "', ''])");
    }
}


