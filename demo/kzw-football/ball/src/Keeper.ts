/**
 *
 * @author 
 *
 */
class Keeper extends egret.Sprite{
    private nowMov;
    public constructor() {
        super();
        this.wating();
    }
    private clearNow() {
        if(this.nowMov) {
            this.removeChild(this.nowMov);
        }
        this.nowMov = null;
    }
    
    public wating() {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-dengdai_json",Main.product_type + "-dengdai_png","dengdai");
        this.nowMov.x = -130;
        this.nowMov.y = -200;
        this.nowMov.play(-1);
        this.addChild(this.nowMov);
        console.log(Main.product_type + "-dengdai_json",Main.product_type + "-dengdai_png",'dengdai');
    }
    public left_top() {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-left_json",Main.product_type + "-left_png","left");
        this.nowMov.x = -258;
        this.nowMov.y = -360;
        this.nowMov.play(1);
        this.addChild(this.nowMov);
    }
    public left_bottom() {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-left-lost_json",Main.product_type + "-left-lost_png","left-lost");
        this.nowMov.x = -258;
        this.nowMov.y = -280;
        this.nowMov.play(1);
        this.addChild(this.nowMov);
    }
    public right_top() {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-right_json",Main.product_type + "-right_png","right");
        this.nowMov.x = -114;
        this.nowMov.y = -300;
        this.nowMov.play(1);
        this.addChild(this.nowMov);
    }
    public right_bottom() {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-right-lost_json",Main.product_type + "-right-lost_png","right-lost");
        this.nowMov.x = -114;
        this.nowMov.y = -280;
        this.nowMov.play(1);
        this.addChild(this.nowMov);
    }
}
