/**
 *
 * @author 
 *
 */
class ControlBar extends egret.Sprite{
  

    private point;
    private localX=0;
    public constructor() {
        super();
        this.scaleY = Main.scale;
        this.touchEnabled=true;
        var bg = Global.createBitmapByName('c_bg_png');
        this.point = new Middle(Global.createBitmapByName('c_m_png'));
        
        bg.x = bg.width/-2;
        bg.y=bg.height/-2;
        
        this.point.x = 0;
        this.point.y = 0;
        
        this.addChild(bg);
        this.addChild(this.point);
        this.x=180;
        this.y=525;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBeginHander,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMoveHander,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEndHander,this);   
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.touchEndHander,this);   
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEndHander,this);   
    }
    
    private touchBeginHander(e: egret.TouchEvent){
        this.localX = e.localX;
        this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
    }
    
    private loop(e) {
        if(this.localX < 0) {
            this.dispatchEvent(new EventObj('event','left',true));
            this.point.x=-18;
        } else if(this.localX >= 0) {
            this.dispatchEvent(new EventObj('event','right',true));
            this.point.x = 18;
        }
    }
    private touchMoveHander(e: egret.TouchEvent) {
        this.localX = e.localX;
    }
    private touchEndHander(e: egret.TouchEvent) {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.loop,this);
        this.point.x=0;
        this.dispatchEvent(new EventObj('event','control_end',true));
    }
    //c_m_png
    //c_bg_png
    
   
}
