/**
 *
 * @author 
 *
 */
class Player extends egret.Sprite{
    private nowMov;
    public constructor() {
        super();
        this.wating();
    }
    private clearNow(){
        if(this.nowMov){
            this.removeChild(this.nowMov);
        }
        this.nowMov=null;
    }
    public wating(){
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-shemen_json",Main.product_type + "-shemen_png","shemen");
      
        this.nowMov.gotoAndStop(1);
     
        this.nowMov.x =-320;
        this.nowMov.y = -500;
        this.addChild(this.nowMov);
    }
    public shoot() {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-shemen_json",Main.product_type + "-shemen_png","shemen");
        
        this.nowMov.play(1);
        this.nowMov.x = -320;
        this.nowMov.y = -500;
        this.addChild(this.nowMov);
    }
    public win() {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-huanhu_json",Main.product_type + "-huanhu_png","huanhu");
        this.nowMov.x = -180;
        this.nowMov.y = -500;
        this.nowMov.play(-1);
        this.addChild(this.nowMov);
    }
    public lost() {
        this.clearNow();
        this.nowMov = Main.createBitmapByName(Main.product_type + "-lost_png");
        this.nowMov.x = -130;
        this.nowMov.y = -370;
        this.addChild(this.nowMov);
    }
}
