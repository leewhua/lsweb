/**
 *
 * @author 
 *
 */
class GunRenBar extends egret.Sprite {

    private type;
    private gunSp;
    public constructor(type,g) {
        super();
        this.type = type;
        this.x = -660;
        this.y = -280;
        this.scaleX=this.scaleY=1.8;
        if(type == 0) { this.scaleX=-1.8;this.x=-680+300*1.8};
        if(type==1){
           
            var ren = Global.createBitmapByRes('r' + type + '_w_json','r1_stand');//'r1_gun'+g
            this.addChild(ren);
            this.x = -620;
        }else{
           
            var ren = Global.createBitmapByName("r" + this.type + "_stand_png");
         
            this.addChild(ren);
            
        }
        this.setGun(g);
    }
    public setGun(g){
        if(this.type == 1) {
            Global.remove(this.gunSp);
            this.gunSp = Global.createBitmapByRes('r1_w_json','r1_gun' + g);//
            this.addChildAt(this.gunSp,0);
        } else {
            Global.remove(this.gunSp);
            this.gunSp = Global.createMc("r_g" + g + "_json","r_g" + g + "_png","r_g" + g);
            this.gunSp.gotoAndStop(0);
            this.addChild(this.gunSp);
        }
    }
}
