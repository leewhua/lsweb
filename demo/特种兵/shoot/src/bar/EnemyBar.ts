/**
 *
 * @author 
 *
 */
class EnemyBar extends egret.Sprite{
    private maskShape;
    private sco = 1;
    private face;
    public constructor() {
        super(); 
        this.scaleY = Main.scale;
        this.maskShape = new egret.Shape();
        this.maskShape.graphics.beginFill(0,1);
        this.maskShape.graphics.drawRect(0,0,-298,28);
        var lineBg = Global.createBitmapByName('p_line_bg_png');
        var line = Global.createBitmapByName('p_line_png');
        this.face = new FaceBar();
        var nameTxt = new egret.TextField();
        nameTxt.size = 26;
        nameTxt.textAlign = "right";
        nameTxt.textColor = 0x0;
        nameTxt.width = 200;
        nameTxt.y = 10;
        nameTxt.x = -350;
        nameTxt.text="****";
        
        lineBg.x = -404;
        lineBg.y = 45;
        line.x = -397;
        
        this.maskShape.y=line.y = 52;
        this.maskShape.x = line.x+298;
        this.face.x=-136;
        this.addChild(lineBg);
        this.addChild(line);
        this.addChild(this.face);
        this.addChild(this.maskShape);
        this.addChild(nameTxt);
        line.mask = this.maskShape;
        this.x = 1180;
        this.y = 20;
        this.search();
    }
    public hit(k,g) {
        k=3-k;
        var damage = GameInfo.gunData[g].damage;
        console.log(g,GameInfo.gunData[g],damage[k] );
        this.sco -= damage[k] / 100;
        if(this.sco<=0){
            this.sco=0;
            
        }
        this.maskShape.scaleX = this.sco * 0.95 + 0.05;
        if(this.sco == 0 && GameInfo.hb == 0) {
            this.dispatchEvent(new EventObj('event','win',true));
        }
        
    }
    public search() {
        var ran = Math.floor(Math.random() * 60) + 1;
        //ran=0.8;
        //_this1.face.loadFace("http://wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0");
        this.face.loadFace("resource/face/" + ran + ".jpg");
        
        var _this1 = this;
        setTimeout(function() {
           
           
        },2000);
    }
}
