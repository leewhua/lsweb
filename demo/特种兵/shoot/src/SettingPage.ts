/**
 *
 * @author 
 *
 */
class SettingPage extends egret.DisplayObjectContainer {
   
    private status = 0;
    private jfBar: JfBar;
    private scoTxt;
    private oldPop = null;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.addEventListener('event',this.eventHandler,this);
    }

    private eventHandler(event: EventObj): void {
        console.log("eventHandler:" + event.name);
        switch(event.name) {
            case 'buy_sunccess':
                //this.dispatchEvent(new EventObj('event','to_play',true,false));
                //event.stopPropagation();
                this.jfBar.reSetSco();
                break;
            case 'buy_sunccess_close':
                this.showPop('setting');
                break;
                //
            case 'buy_gun':
                
                event.stopPropagation();
                break;//buy_gun
            case 'to_shop':
                this.showPop('shop');
                event.stopPropagation();
                break;
            case 'to_select':
                this.showPop('select');
                event.stopPropagation();
                break;
            case 'to_setting':
                this.showPop('setting');
                event.stopPropagation();
                break;
            case 'reset_sco':
                this.jfBar.reSetSco();
                event.stopPropagation();
                break;
        }

        //play_mov
    }
    public out(){
        var tw = egret.Tween.get(this);
        tw.to({ y: -640 },400,egret.Ease.cubicIn);
        tw.call(function() {
            if(this.parent) {
                this.parent.removeChild(this);
            }
        });
    }
    public showPop(lab){
        var hasPop = this.closePop();
        
        if(lab =="select"){
            this.oldPop = new SelectPop();
        } else if(lab == "setting") {
            this.oldPop = new SelectGunPop();
        } else if(lab == "shop") {
            this.oldPop = new ShopPop();
        }
        this.addChildAt(this.oldPop,1);
        this.oldPop.show(hasPop);
    }
    private closePop() {
        var hasOld = false;
        var old = this.oldPop;
        if(old) {
            var tw = egret.Tween.get(old);
            tw.to({ y: -640},400,egret.Ease.cubicIn);
            tw.call(function() {
                if(old.parent) {
                    old.parent.removeChild(old);
                }
            });
            hasOld = true;
        }
        this.oldPop = null;
        return hasOld;

    }
    private onAddToStage(event: egret.Event) {
        //初始化intro

        var _this1 = this;

        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;

        var bg = Global.createBitmapByName('bg_jpg');
        var logo = Global.createBitmapByName('logo_png',20,20);
        var title = Global.createBitmapByName('title_png',420,26);
        this.jfBar = new JfBar();
        var faceSp=new egret.Sprite();
        faceSp.x=1180;
        faceSp.y=20;
        logo.scaleY = Main.scale;
        this.addChild(bg);
        this.addChild(logo);
        this.addChild(title);
        this.addChild(faceSp);
        this.addChild(this.jfBar);
    }

    

}
