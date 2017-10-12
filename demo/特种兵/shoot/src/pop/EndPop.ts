/**
 *
 * @author 
 *
 */
class EndPop extends PopView {
   
    public constructor() {
        super();
    }

    public show(hasDelay) {
        super.show(hasDelay);
        var tip = Global.createBitmapByName('win_tip_png',-199,-60);
        var title = Global.createBitmapByName('win_title_png',-64,-144);
        var toCity = Global.createBitmapByName('to_city_png',-107,46);
        Global.setBut(toCity);
        this.view.addChild(title);
        this.view.addChild(toCity);
        this.view.addChild(tip);
        toCity.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            this.dispatchEvent(new EventObj('event','to_city',true));
        },this);
    }

}
