/**
 *
 * @author 
 *
 */
class Help extends egret.Sprite{
   
    public constructor() {
        super();
        this.initView();
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private initView() { 
        
        var over=new egret.Shape();
   
        over.graphics.beginFill(0x0,0.68);
        over.graphics.drawRect(0,0,640,1010);
        
        var but = Main.createBitmapByName("close-help_png");
        var copy = Main.createBitmapByName("help-copy_png");
     
        copy.x=68;
        copy.y=220;
        but.x=236
        but.y=645;
        
        this.addChild(over);
        this.addChild(copy);
        this.addChild(but);
     
        
        Main.setBut(but);
        var _this1=this;
       this.touchEnabled = true;
       this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) { 
            if(_this1.parent) _this1.parent.removeChild(_this1);
            },this);
    }
}
