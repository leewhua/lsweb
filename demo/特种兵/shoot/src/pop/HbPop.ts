/**
 *
 * @author 
 *
 */
class HbPop extends PopView {
   
    public constructor() {
        super();
    }

    public show(hasDelay) {
        super.show(hasDelay);
        var bg = Global.createBitmapByName('pop_bg_png',-254,-165);
        var title = Global.createBitmapByName('win_copy_png',-222,-144);
        var toCity = Global.createBitmapByName('to_city_png',-221,38);
        var toShare = Global.createBitmapByName('to_share_png',-110,38);
        Global.setBut(toCity);
        Global.setBut(toShare);
        this.view.addChild(bg);
        this.view.addChild(title);
        // this.view.addChild(toCity);
        this.view.addChild(toShare);

        toCity.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            this.dispatchEvent(new EventObj('event','to_city',true));
        },this);
        toShare.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            this.dispatchEvent(new EventObj('event','to_share',true));
        },this);
    }

}
