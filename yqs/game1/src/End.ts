/**
 *
 * @author 
 *
 */
class End extends egret.Sprite{
   
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event: egret.Event) { 
        
        var over=new egret.Shape();
       
        var win = Main.createBitmapByName("w"+Main.win+"_png");
        //win.scaleY=Main.scale;
        over.graphics.beginFill(0x0,0.68);
        over.graphics.drawRect(0,0,640,1010);
        
        var but = Main.createBitmapByName("lingjiang_png");
        
        var close = Main.createBitmapByName("close_png");
            close.x=520;
            close.y=120;
        var guangSp=new egret.Sprite();
        var guang = Main.createBitmapByName("guang_png");
     
        var winSp = new egret.Sprite();
        
        guang.x = ( - guang.width)/2;
        guang.y = ( - guang.height) / 2;
        
        guangSp.addChild(guang);
       
        guangSp.x=320;
        guangSp.y=505;
        
        win.height = win.height*Main.scale;
        win.x = ( - win.width) / 2;
        win.y = win.height/-2;
        
        winSp.addChild(win);
        
        winSp.x=320;
        winSp.y=450;
        
        but.x = (640 - but.width) / 2;
        but.y = 450 - win.y+20;
        
        this.addChild(over);
        this.addChild(guangSp);
        this.addChild(winSp);
        if(Main.win>1){
            this.addChild(but);
        }else{
            this.addChild(close);
        }
        
        over.alpha=0;
        guangSp.alpha=0;
        winSp.alpha=0;
        winSp.scaleX = winSp.scaleY=0.6;
        but.alpha=0;
        
        var tw = egret.Tween.get(over);
        tw.to({ "alpha":1},300);
        var tw = egret.Tween.get(guangSp);
        tw.wait(100).to({ "alpha": 1},300);
        var tw = egret.Tween.get(winSp);
        tw.wait(200).to({ "alpha": 1,scaleX:1,scaleY:1},300,egret.Ease.backOut);
        var tw = egret.Tween.get(but);
        tw.wait(300).to({ "alpha": 1},300);
        
        guang.touchEnabled = true;
        
        Main.setBut(but);
        
        but.touchEnabled = true;
        but.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) { 
            var type=0;
            if(Main.win == 2 || Main.win==3){
                type=1;
            }else{
            
            }
            window.location.href = "../receive.html?token=" + Main.token + "&oid=" + Main.oid + "&type="+type;
            },this);
            
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            if(this.parent){
                this.parent.removeChild(this);
            }
        },this);
            
        setInterval(function(){
                guangSp.rotation+=2;
                },100);

    }
}
