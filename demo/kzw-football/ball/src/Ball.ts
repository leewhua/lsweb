/**
 *
 * @author 
 *
 */
class Ball extends egret.Sprite{
    private ball: egret.Bitmap;
    private blurBall: egret.Bitmap;
    private flash: Middle;
    private _sx=0;
    private _sy=0;
    private oldX=0;
    private oldY= 0;
    public constructor() {
        super();
        this.ball=Main.createBitmapByName('ball_png');
        this.blurBall = Main.createBitmapByName('ball2_png');
        this.flash = new Middle(Main.createBitmapByName('ball-flash_png'));
        
        this.ball.x = this.ball.width/-2;
        this.ball.y = this.ball.height / -2;
        
        this.blurBall.x = this.blurBall.width / -2;
        this.blurBall.y = this.blurBall.height / -2;
        
        this.flash.x =0;
        this.flash.y = 0;
        
      
        this.addChild(this.ball);
        this.addChild(this.blurBall);
   
        this.blurBall.alpha=0;
    }
    public initXY(xx,yy){
        this.sx=xx;
        this.sy=yy;
        this.oldX = xx;
        this.oldY = yy;
        this.checkBlue();
        console.log('initXY');
    }
    get sx(): number {
          return this._sx;
      }

    set sx(xx: number) {
        this.oldX = this._sx;
        this._sx=xx;
        this.x=xx;
        this.checkBlue();
       
    }
    get sy(): number {
        return this._sy;
    }
    public boom(){
        this.addChildAt(this.flash,0);
        Main.zoomOut(this.flash,0,200,1.6);
        console.log("boom");
    }
    private checkBlue(){
        var ox=(this._sx-this.oldX);
        var oy = (this._sy - this.oldY);
        var c=ox*ox+oy*oy;
        c=c/10;
        c=Math.min(c,1);
        this.blurBall.alpha = c;
        //console.log("his.blurBall.alpha :" + this.blurBall.alpha + ":"+(ox * ox + oy * oy) );
    }
    set sy(yy: number) {
        this.oldY = this._sy;
        this._sy = yy;
        this.y = yy;
    }
}
