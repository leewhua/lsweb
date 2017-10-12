/**
 *
 * @author 
 *
 */
class Tips extends egret.Sprite{
    private nowMov;

    public constructor() {
        super();
        
    }
    private clearNow() {
        if(this.nowMov) {
            //this.removeChild(this.nowMov);
            Main.zoomOut(this.nowMov,0,400,1.2);
        }
       
        this.nowMov = null;
       
    }
    public hide() {
        this.clearNow();
    }
    public wating(d) {
        this.clearNow();
        this.nowMov = new Middle(Main.createBitmapByName("play-tip_png"));
        //this.nowMov.x = this.nowMov.width/-2;
        //this.nowMov.y = this.nowMov.height/-2;
        this.nowMov.alpha=0;
        Main.zoomIn(this.nowMov,d,400,0.6);
        this.addChild(this.nowMov);
    }
    public lost(d) {
        this.clearNow();
        this.nowMov = new Middle(Main.createBitmapByName("lost-copy_png"));
     
        this.nowMov.alpha = 0;
        Main.zoomIn(this.nowMov,d,400,0.6);
        this.addChild(this.nowMov);
    }
    public win(d) {
        this.clearNow();
        this.nowMov = new Middle(Main.createBitmapByName("win-copy_png"));
     
        this.nowMov.alpha = 0;
        Main.zoomIn(this.nowMov,d,400,0.6);
        this.addChild(this.nowMov);
    }
}
