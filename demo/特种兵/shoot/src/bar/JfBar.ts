/**
 *
 * @author 
 *
 */
class JfBar extends egret.Sprite {


    private sco=1;
    private scoTxt;
    public constructor() {
        super();
        this.scaleY = Main.scale;
       
        
        this.scoTxt = new egret.TextField();
        var nameTxt = new egret.TextField();
        nameTxt.size = 26;
        nameTxt.textAlign = "right";
        nameTxt.textColor = 0xffffff;
        nameTxt.width = 200;
        nameTxt.y = 20;
        nameTxt.x = -310;

        this.scoTxt.size = 26;
        this.scoTxt.textAlign = "right";
        this.scoTxt.textColor = 0xffffff;
        this.scoTxt.width = 200;
        this.scoTxt.y = 52;
        this.scoTxt.x = -310;

        
        
        var faceBg = new FaceBar();
      
        this.addChild(faceBg);
        this.addChild(nameTxt);
        this.addChild(this.scoTxt);
      
        this.x=1180;
        this.y=20;
        
        faceBg.scaleX = faceBg.scaleY = 100 / 128;
        faceBg.x = -100;
        faceBg.loadFace(Api.user.headimgurl);
        nameTxt.text = Api.user.nickname;
        this.reSetSco();
    }
    
   public reSetSco(){
      // this.scoTxt.text=GameInfo.sco+'积分'
   }
}
