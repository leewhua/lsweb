
class Main extends egret.DisplayObjectContainer {

      
    public static shopUrl = "";
    private loadingView: LoadingUI;

    private scene: Scene;
    
    private now: egret.DisplayObjectContainer;
    private old: egret.DisplayObjectContainer;

    private count: number = 0;
    private loaded: number = 0;
    
    public constructor() {
        super();
        Main._main=this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.addEventListener('event',this.eventHandler,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
       
    }
    private loop(): void { 
        this.count++;
        //console.log(this.count + "::" + this.loaded);
        if(this.count > 80 && this.loaded) { 
            this.removeEventListener(egret.Event.ENTER_FRAME,this.loop,this);
            this.showScene();
            var _this1 = this;
            var tw = egret.Tween.get(this.loadingView);
            tw.to({ y: -1040 },600,egret.Ease.circIn);
            tw.call(function(){
                if(_this1.loadingView){
                    _this1.removeChild(_this1.loadingView);
                    _this1.loadingView = null;
                }
            });
            
        }
    }
    private eventHandler(event: EventObj): void {
        switch(event.name) {
            case 'next':
               
                break;
            case 'to_shop':
               
                break;
            case 'clear_old':
               
                break;
        }
    }

    private onAddToStage(event: egret.Event) {
        var sx=window.innerWidth/640;
        var sy=window.innerHeight/1040;
        Main.scale=sx/sy;
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
     
       
        
        if(this.getData()){
            this.loadUser();
        }else{
            Main.showLost(0);
        }
        //this.loadLuck();
        
        //Main.trackEvent('loading_start');
      
    }
    
    private loadConfig(): void{
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
      
        if(Main.product_type == "yd") {
            RES.loadGroup("yd");
        } else if(Main.product_type == "tk") {
            RES.loadGroup("tk");
        } else if(Main.product_type == "bv") {
            RES.loadGroup("bv");
        }
        
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        console.log("onResourceLoadComplete:"+event.groupName);
        if(event.groupName == "d1") {
            RES.loadGroup("c");
        } else if(event.groupName == "d2") {
            RES.loadGroup("c");
        } else if(event.groupName == "c") {
            this.loaded = 1;
            Main.trackEvent('loading_ok');
           
        } else if(event.groupName == "yd" || event.groupName == "tk" || event.groupName == "bv") {
            this.loadingView = new LoadingUI();
            this.addChild(this.loadingView);
            RES.loadGroup("d1");
        } else {
            //RES.loadGroup("d1");
        }
    }
    
    
    public static createBitmapByRes(res: string,name:string): egret.Bitmap {
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
  
    /**
    * 资源组加载出错
    *  The resource group loading failed
    */
    private onResourceLoadError(event: RES.ResourceEvent): void {
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
    private onResourceProgress(event: RES.ResourceEvent): void {
      
    }

    static api: string = "http://lsid.me/luck/play";//"http://leasiondata.cn/luck/play1";//
    static user_ticket: string ="d82cf56540134d6f93fb88d3edf5dc50";
    static status_ticket: string ="136c4f5463e047deb8e797c5a94280dc";
    static product_type: string='tk';
    static user:Object=null;
    static _main:Main = null;
    static scale=1;
    
    public static isTest=true;
    
    static location: any = { country: null,province: null,city:null };
    
    static award: any = {uid:null,nickname:null,type:"cash",count:0.88};
    
    private getData(){
        var url = window.location.href.split("#")[0].split("?")[1];
        var ut;
         console.log("loadUser");
        Main.product_type = eval("$.product_type");
      
        if(Main.product_type=="tk"){
            Main.api = "http://leasiondata.cn/luck/play1";//"http://lsid.me/luck/play1";//
        } else if(Main.product_type == "yd") {
            Main.api = "http://leasiondata.cn/luck/play2";//"http://lsid.me/luck/play2";//
        } else if(Main.product_type == "bv") {
            Main.api = "http://leasiondata.cn/luck/play2";//"http://lsid.me/luck/play2";//
        }
        
        if(Main.isTest) {
            return true;  
        } 
        //Main.api ="test.json";
        if(url && url.length>20){
            ut = url.split(",");
            Main.user_ticket = ut[0];
            Main.status_ticket = ut[1];
            console.log(Main.user_ticket,Main.status_ticket);
            return true;
        }else{
            return false;
        }
    }
    
    private loadUser(): void {
        console.log("loadUser");
        if(Main.isTest) {
            this.loadConfig();
            return;
        } 
       
        //
        var _this1=this;
        $.ajax({
            url: Main.api,
            data: { ticket: Main.user_ticket,desc:"test"},
            success: function(data) {
                if(data.msg == 1) {
                    Main.user = data.data;
                   
                    _this1.loadConfig();
                } else if(data.data == "invalid ticket3") {
                    Main.showLost(1);
                } else {
                    setTimeout(function() {
                        _this1.loadUser();
                    },1000);
                  
                }
            },
            dataType: "json",async: true,type:"POST"
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
    
    public showLost(type:number) {
        console.log("showLost");
        var lost: egret.Sprite = new egret.Sprite();
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x0,0.8);
        bg.graphics.drawRect(0,0,640,1040);
        
        
        var msg: egret.TextField = new egret.TextField();
        msg.background = false;
       
        msg.width=600;
        msg.textColor = 0xffffff;
        msg.textAlign = "center"; 
        msg.size = 36;
      
        if(type==0){
            msg.text = "错误的链接，请重新扫码...";
        } else if(type == 1) {
            msg.text = "已过期，请重新扫码...";
        } else if(type == 2) {
            msg.text = "网络异常，请重新扫码...";
        }else{
            msg.text = "已过期，请重新扫码...";
        }
        
        msg.y = 500;
        msg.x = 20;
       
        lost.addChild(bg);
        lost.addChild(msg);
        this.addChild(lost);
        
        lost.alpha=0;
        var tw = egret.Tween.get(lost);

        tw.to({ "alpha": 1 },400);
    
    }
    
    public static showLost(type:number){
        Main._main.showLost(type);
        //Main._main=this;
    }

    public static track(str) {
        //eval("_hmt.push(['_trackEvent', 'click', '" + str + "', ''])");
    }
    public static trackEvent(str) {
        //eval("_hmt.push(['_trackEvent', 'event', '" + str + "', ''])");
    }
}


