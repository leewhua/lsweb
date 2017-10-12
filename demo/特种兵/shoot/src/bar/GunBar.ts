/**
 *
 * @author 
 *
 */
class GunBar extends egret.Sprite {

    public type;
    private info;
    
    public constructor(type,info=false) {
        super();
        this.info=info;
        this.type=type;
        this.setType(type);
    }
    
    public setType(type){
        while(this.numChildren>0)this.removeChildAt(0);
        this.type = type;
        var g = Global.createBitmapByName('g' + type + '_png');
        g.x = g.width / -2;
        g.y = g.height / -2;
        this.addChild(g);
        
        if(this.info) {
            var jfTxt = new egret.TextField();
            jfTxt.size = 32;
            jfTxt.textAlign = "center";
            jfTxt.textColor = 0xffffff;
            jfTxt.width = 117;
            jfTxt.y = 20;
            jfTxt.x = 170;
            jfTxt.text = GameInfo.gunData[this.type].sco.toString();
            var jf = Global.createBitmapByName('buy_jf_png',170,0);
            var name=new Middle(Global.createBitmapByName('gun_name'+this.type+'_png'),0,-130);
            var star = GameInfo.gunData[this.type].star;
            this.addChild(jf);
            this.addChild(jfTxt);
            this.addChild(name);
            var s;
            for(var i=0;i<5;i++){
                if(star>i){
                    s = Global.createBitmapByName('buy_star1_png',-100+36*i,100);
                }else{
                    s = Global.createBitmapByName('buy_star2_png',-100 + 36 * i,100);
                }
                this.addChild(s);
            }
        }
    }
}
