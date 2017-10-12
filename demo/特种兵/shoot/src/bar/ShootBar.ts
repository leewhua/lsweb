/**
 *
 * @author 
 *
 */
class ShootBar extends egret.Sprite {

    public constructor() {
        super();
        this.scaleY = Main.scale;
        this.touchEnabled = true;
        var g = Global.createBitmapByName('p_shoot_png');
        g.x = g.width / -2;
        g.y = g.height / -2;
        this.addChild(g);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBeginHander,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEndHander,this);   
        this.x=997;
        this.y=558;
    }
    private touchBeginHander(e: egret.TouchEvent) {
      this.alpha=0.6;
      this.dispatchEvent(new EventObj('event','shoot',true));
    }


    private touchEndHander(e: egret.TouchEvent) {
        this.alpha = 1;
    }
}
