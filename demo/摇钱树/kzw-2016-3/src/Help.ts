/**
 *
 * @author 
 *
 */
class Help extends egret.Sprite{
   
    private sp;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event: egret.Event) { 
        this.sp=new egret.Sprite();
        var help= Main.createBitmapByRes("h321_json","icon");
        this.scaleY = Main.scale;
        help.x = help.width / -2;
        help.y = help.height/-2;
        this.sp.addChild(help);
        this.addChild(this.sp);
        this.sp.rotation = 20;
        this.play();
    }
    public play() { 
        var tw = egret.Tween.get(this.sp,{});
        tw.to({ "rotation": -20},200);
        tw.call(function() { 
            this.play2();
            
        },this);
    }
    public play2() {
        var tw = egret.Tween.get(this.sp,{});
        tw.to({ "rotation": 20 },200);
        tw.call(function() {
            this.play();

        },this);
    }
    
    
  
}
