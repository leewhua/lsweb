/**
 *
 * @author 
 *
 */
class FlyBar extends egret.Sprite {

    public constructor() {
        super();
        this.touchEnabled = true;
        var g = Global.createBitmapByName('p_thunder_png');
        g.x = g.width/-2;
        g.y = g.height / -2;
        this.addChild(g);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBeginHander,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEndHander,this);
        this.x = 1092;
        this.y = 518;
    }
    private touchBeginHander(e: egret.TouchEvent) {
        this.alpha = 0.6;
    }


    private touchEndHander(e: egret.TouchEvent) {
        this.alpha = 1;
    }
}
