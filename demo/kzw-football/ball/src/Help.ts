/**
 *
 * @author 
 *
 */
class Help extends egret.Sprite{
   
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event: egret.Event) { 
        var bg=new egret.Shape();
        bg.graphics.beginFill(0x000000,0.7);
        bg.graphics.drawRect(0,0,640,1015);
        var close = new Middle(Main.createBitmapByName('ok_png'));
        var sc = new Middle(Main.createBitmapByName('help_png'));
        sc.x=320;
        sc.y=1015/2;
        close.x=320;
        close.y=820;
        this.addChild(bg);
        this.addChild(sc);
        this.addChild(close);
        bg.touchEnabled=true;
        close.touchEnabled=true;
        Main.setBut(close);
        sc.alpha=0;
        close.alpha=0;
        Main.zoomIn(sc,0,400,0.6);
        Main.zoomIn(close,200,400,0.6);
        
        close.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            if(this.parent) this.parent.removeChild(this);
        },this);
    }
   
}
