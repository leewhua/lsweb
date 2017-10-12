/**
 *
 * @author 
 *
 */
class Middle extends egret.Sprite{
    //private lable:string
    public view;
    public constructor(view,x=0,y=0,ox=0,oy=0) {
        super();
        view.x = view.width/-2+ox;
        view.y=view.height/-2+oy;
        this.x=x;
        this.y=y;
        this.view=view;
        this.addChild(view);
    }
}
