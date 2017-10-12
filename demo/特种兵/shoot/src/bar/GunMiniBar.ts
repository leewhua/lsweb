/**
 *
 * @author 
 *
 */
class GunMiniBar extends egret.Sprite {
    private type;

    public constructor(type) {
        super();
        this.type = type;
        var s=new egret.Shape();
        s.graphics.beginFill(0x0,0);
        s.graphics.drawRect(-60,-60,120,120);
        var g = Global.createBitmapByName('g' + type + '_png');
        g.scaleX = g.scaleY = 0.2;
        g.x = g.width / -2*0.2;
        g.y = g.height / -2 * 0.2;
        this.addChild(s);
        this.addChild(g);
        Global.setBut(this);
        
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            this.dispatchEvent(new EventObj('event','select_gun',true,false,this.type));
        },this);
        
    }
    
    public lock(){
        this.touchEnabled=false;
        this.alpha=0.3;
    }

}
