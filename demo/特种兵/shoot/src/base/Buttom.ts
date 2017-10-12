/**
 *
 * @author 
 *
 */
class Buttom extends egret.Sprite{
    //private lable:string
    public constructor(out,over=null,x=0,y=0) {
        super();
        this.addChild(out);
        this.x=x;
        this.y=y;
        Global.setBut(this);
    }
}
