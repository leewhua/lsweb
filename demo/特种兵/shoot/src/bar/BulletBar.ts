/**
 *
 * @author 
 *
 */
class BulletBar extends egret.Sprite {
    
    private speed=20;
    private area = [{ x: -3.85,y: 509.2 },{ x: 113.3,y: 437.5 },{ x: 162.75,y: 432.45 },{ x: 241.6,y: 398.25 },{ x: 305.85,y: 432.45 },{ x: 978.65,y: 425.6 },{ x: 1040.95,y: 455.7 },{ x: 1200,y: 518.5 }];
    public constructor(t=1) {
        super();
       this.speed=this.speed*t;
        var g = Global.createBitmapByName('bullet0_png');
        g.scaleX=t;
        g.x = g.width/-2;
        g.y = g.height / -2;
        this.addChild(g);
        //this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
       
    }
    public checkOut(){
        this.x += this.speed;
        if(this.x<-50 || this.x>1250){
            return true;
        }else{
            for(var i = 1;i < this.area.length;i++){
                var x2 = this.area[i].x;
                if(this.x<x2){
                    var x1 = this.area[i-1].x;
                    var y1 = this.area[i - 1].y;
                    var y2 = this.area[i].y;
                    var a=(x2-x1)/(y2-y1);
                    var yy=(this.x-x1)/a+y1;
                   
                    if(this.y>=yy){
                        return true;
                    }else{
                        return false;
                    }
                 
                }
                //this.area[i].x;
            }
            return true;
        }
        //return false;
    }
    public kill(){
        if(this.parent){
            this.parent.removeChild(this);
        }
    }
    
}
