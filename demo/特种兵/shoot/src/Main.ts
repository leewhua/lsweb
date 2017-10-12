
class Main extends egret.DisplayObjectContainer {


    public static isTest = true;
    static scale = 1;
    static _main: Main = null;
      
    private oldView:egret.DisplayObject;
    private oldPop: PopView;
    private count: number = 0;
    private loaded: number = 0;
    private played:string="wating";
    
    private playPage:PlayPage;
    private settingPage: SettingPage;
    
    private loading:LoadingUI;
    
    public constructor() {
        super();
        Main._main=this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.addEventListener('event',this.eventHandler,this);

    }
  
    private onAddToStage(event: egret.Event) {
        console.log('onAddToStage');
        var w = window.innerWidth;
        var h = window.innerHeight;
        var sx,sy;
        if(w>h){
            sx = window.innerWidth / 1200;
            sy = window.innerHeight / 640;
           
        }else{
            sx = window.innerHeight / 1200;
            sy = window.innerWidth / 640;
        }
        Main.scale = sx / sy;
       
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;

        if(Main.isTest || Api.getTicket()) {
            Action.toCookiePage();
            this.loadUser();
        } else {
            this.dispatchEvent(new EventObj('event','msg_event',true,false,MsgPop.err_link));
        }
        //this.loadLuck();
    }
   
    private eventHandler(event: EventObj): void {
        console.log("eventHandler:" + event.name);
        switch(event.name) {
            case 'to_play':
                if(Main.isTest){
                    if(Math.random()>0.5){
                        GameInfo.hb=0;
                    }else{
                        GameInfo.hb=1;
                    }
                    this.showPlayPage();
                }else
                    Api.load("play",Api.play_url,{ ticket: Api.status_ticket,isplay:1 },this,this.playLoad);
               //this.showPlayPage();
                break;
            case 'to_city':
                window.location.href = Api.city_url;
                break;
            case 'to_share':
                $('#share-pop').fadeIn();
                break;
            case 'msg_event':
                this.showMsg(event.data);
                break; 
        }
        event.stopPropagation();
        //play_mov
    }

    private playLoad(data){
        //this.showPlayPage();
        this.touchChildren=false;
        if(data.result == 'success') {
            if(data.more && data.more.result == 'success') {
                var more=data.more;
                Api.status_ticket = more.ticket;
                if(more.c1ashed){
                    GameInfo.hb = parseInt(more.c1ashed);
                }else{
                    GameInfo.hb=0;
                }
                this.showPlayPage();
                // 
            } else {
                this.dispatchEvent(new EventObj('event','msg_event',true,false,MsgPop.at_anomaly));
            }

        } else {
            this.dispatchEvent(new EventObj('event','msg_event',true,false,MsgPop.at_anomaly));
        }
    }
    
    private showSettingPage(lab ='select'){
        this.settingPage=new SettingPage();
        if(this.loading){
            this.addChildAt(this.settingPage,this.numChildren-1);
        }else{
            this.addChild(this.settingPage);
        }
        
        if(lab){
            this.settingPage.showPop(lab);
        }else{
            this.settingPage.showPop('select');
        }
    }
   
    private showPlayPage(): void {
        var _this1=this;
        if(this.playPage){
            this.playPage.showPop('help');
        }else{
            this.playPage = new PlayPage();
            this.addChildAt(this.playPage,0);
            this.playPage.showPop('help');
        }
        if(this.settingPage){
            this.settingPage.out();
        }
        this.settingPage=null;
        this.touchChildren = true;
    }

    

    private loadConfig(): void {
        console.log("loadConfig");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/shoot.json","resource/");
    }
    private onConfigComplete(event: RES.ResourceEvent): void {
        console.log("onConfigComplete");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("loading");
        
    }

    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        console.log("onResourceLoadComplete:"+event.groupName);
        if(event.groupName == "loading") {
            this.loaded=1;
            this.loading=new LoadingUI();
            this.addChild(this.loading);
            RES.loadGroup("game");
        } else if(event.groupName == "game") {
            this.loaded = 2;
            if(GameInfo.play_ren==-1){
                this.showSettingPage('select');
            }else{
                this.showSettingPage('setting');
                //this.showPlayPage();
            }
            this.loading.hide();
            this.loading = null;
            //this.showPlayPage();
            //this.addChild(this.loading);
        
        } else {

        }
    }
    
    private onResourceLoadError(event: RES.ResourceEvent): void {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }
    private onResourceProgress(event: RES.ResourceEvent): void { 
        //
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ",request.response);
    }
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("get error : " + event);
    }
    private onGetProgress(event: egret.ProgressEvent): void {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }
    

    private loadUser(): void {
        console.log("loadUser"); 
        if(Main.isTest) {
           // var logo = Global.createBitmapByName('logo_png',0,0);
            Api.user = { "nickname": "","headimgurl": "http://res.leasiondata.cn/lstatic/demo/logo.jpg" };
            var user: any = Api.user;
            Api.browser = "weixin";
            this.loadConfig();
            return;
        }
        Api.load("load user",Api.user_api_url,{ ticket: Api.user_ticket,desc: "info" },this,this.loadUserSuccess);
        //
    }
   
    private loadUserSuccess(data) {
        if(data.result == 'success') {
            data.nickname = decodeURIComponent(data.nickname);
            data.city = decodeURIComponent(data.city);
        
            Api.user = data;
            if(data.more && data.more.result == 'success'){
                GameInfo.play_ren = parseInt(data.more.role)-1;
                GameInfo.sco = parseInt(data.more.jf);
                GameInfo.level = parseInt(data.more.level)-1;
                
                var json:any = decodeURIComponent(data.more.weaponinuse);
                json = eval("(" + json+")");
                GameInfo.gun = parseInt(json.value);
               
                GameInfo.guns =[];
                json = decodeURIComponent(data.more.weaponlist);
                json = eval("(" + json + ")");
                for(var i = 0;i < json.length;i++){
                    var t = parseInt(json[i].value);
                    GameInfo.guns[i] = { type:t };
                    if(t==GameInfo.gun){
                        GameInfo.gunSelect=i;
                    }
                    for(var n = 0;n < GameInfo.gunsInshop.length;n++){
                        if(t == GameInfo.gunsInshop[n].type) {
                            GameInfo.gunsInshop[n].has=1;
                            break;
                        }     
                    }
                    //GameInfo.level
                }
                console.log("GameInfo",GameInfo.play_ren,GameInfo.sco,GameInfo.level,GameInfo.gun,GameInfo.guns,GameInfo.gunSelect);
            }else{
                this.dispatchEvent(new EventObj('event','msg_event',true,false,MsgPop.at_anomaly));
                return;
            }
            //”role”:”1”,
            //”jf”:”100”,
            //”level”:”1”,
            //”weaponinuse”:{ },
            //”weaponlist”:[{},{}],
            if(data.c1ashed == '') {
                this.loadConfig();
            } else {
                this.dispatchEvent(new EventObj('event','msg_event',true,false,MsgPop.at_used));
            }

        } else {
            this.dispatchEvent(new EventObj('event','msg_event',true,false,MsgPop.at_anomaly));
        }
    }
    
    

   private showMsg(msg){
        var msgPop=new MsgPop();
       
        this.addChild(msgPop);
        msgPop.show(msg);
   }


}
//share.html?f=wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0&n=2&a=1-1-2-3

