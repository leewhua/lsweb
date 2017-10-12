/**
 *
 * @author 
 *
 */
class MineBar extends egret.Sprite {

    private maskShape;
    private sco=1;
    public constructor() {
        super();
        this.scaleY = Main.scale;
        this.maskShape = new egret.Shape();
        this.maskShape.graphics.beginFill(0,1);
        this.maskShape.graphics.drawRect(0,0,298,28);
        
        var nameTxt = new egret.TextField();
        nameTxt.size = 26;
        nameTxt.textAlign = "left";
        nameTxt.textColor = 0x0;
        nameTxt.width = 200;
        nameTxt.y = 10;
        nameTxt.x = 150;
        nameTxt.text = Api.user.nickname;
        
        var lineBg=Global.createBitmapByName('p_line_bg_png');
        var line = Global.createBitmapByName('p_line_png');
        var faceBg = new FaceBar();
        lineBg.scaleX=-1;
        lineBg.x=418;
        lineBg.y=45;
        this.maskShape.x=line.x=112;
        this.maskShape.y=line.y=52;
        this.addChild(lineBg);
        this.addChild(line);
        this.addChild(faceBg);
        this.addChild(this.maskShape);
        this.addChild(nameTxt);
        line.mask=this.maskShape;
        this.x=20;
        this.y=20;
        
        faceBg.loadFace(Api.user.headimgurl);
        
    }
    public hit(k,g){
        k = 3 - k;
        var damage = GameInfo.gunData[g].damage;
        console.log('2L',g,GameInfo.gunData[g],damage[k]);
        this.sco -= damage[k]/100;
        if(this.sco <= 0) {
            this.sco = 0;

        }
        this.maskShape.scaleX = this.sco*0.95+0.05;
        if(this.sco == 0) {
            this.dispatchEvent(new EventObj('event','lost',true));
        }
    }
}
