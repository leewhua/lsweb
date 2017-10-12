/**
 *
 * @author 
 *
 */
class HelpPop extends PopView {

    public constructor() {
        super();
    }

    public show(hasDelay) {
        super.show(hasDelay);
        var bg = Global.createBitmapByName('pop_bg_png',-254,-165);
        var title = Global.createBitmapByName('p_tip_png',-171,-144);
        var toPlay = Global.createBitmapByName('to_play_png',-146,38);
       
        Global.setBut(toPlay);
        this.view.addChild(bg);
        this.view.addChild(title);
        this.view.addChild(toPlay);
       
        toPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            this.dispatchEvent(new EventObj('event','start_321',true));
        },this);
       
       
    }
   
}
