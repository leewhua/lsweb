/**
 *
 * @author 
 *
 */
class SelectRenBar extends egret.Sprite {
    private type;
    private over;
    private but;
    private inActive=false;
    public constructor(type) {
        super();
        this.type=type;
        var bg = Global.createBitmapByName('r_bg_png',-213.5,-214);
        this.over = Global.createBitmapByName('r_black_png',-165.5,-190);
        var ren = Global.createBitmapByName('r'+type+"_png",-165.5,-190);
        this.but = new Middle(Global.createBitmapByName('r_s_png'),0,190);
        this.addChild(bg);
        this.addChild(ren);
        this.addChild(this.over);
        this.but.alpha=1;
        
        Global.setBut(this.but);
        this.touchEnabled=true;
        
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            this.dispatchEvent(new EventObj('event','active_ren',true,false,this.type));
        },this);
        this.but.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
          
            this.dispatchEvent(new EventObj('event','select_ren',true,false,this.type));
        },this);
    }
    public active(b){
        if(this.inActive!=b){
            this.inActive=b;
            if(b){
                this.addChild(this.but);
                Global.fadeOut(this.over);
               
            }else{
                this.addChild(this.over);
                Global.fadeIn(this.over);
                if(this.but.parent) this.but.parent.removeChild(this.but);
            }
        }
    }
}
