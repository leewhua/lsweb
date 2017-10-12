/**
 *
 * @author 
 *
 */
class PlayRenBar extends egret.Sprite {
    private type=0;
    public view;
    private renSp;
   
    private gunSp;

    private speed=3;
    
    private nowLab=null;
    
    public lock=false;
    private gun;
    private a=true;
    private ren;
    private sc;
    
    public constructor(type,g,a=false) {
        super();
        this.gun=g;
        this.type=type;
        this.view=new egret.Sprite();
        this.renSp = new egret.Sprite();
       
       
        
        var sc=0.8;
        this.sc=sc;
        
        this.view.scaleX = this.view.scaleY = sc;
        this.a=a;
        if(a==true){
        }else{
            this.view.scaleX = -sc;
        }
        
        
        this.renSp.x =-150;
        this.renSp.y =  -300;
        
        this.addChild(this.view);
      
        
        if(type<3){
            this.gunSp = Global.createMc("r_g" + g + "_json","r_g" + g + "_png","r_g" + g);
            this.gunSp.x = -150;
            this.gunSp.y = -300;
            this.view.addChild(this.renSp);
            this.view.addChild(this.gunSp);

        }else{
            this.gunSp = Global.createMc("r3_json","r3_png",'r3_bag');
            this.ren= Global.createMc("r3_json","r3_png",'r3');
            this.gunSp.x = -150;
            this.gunSp.y = -300;
            this.ren.gotoAndStop(0);
            this.gunSp.gotoAndStop(0);
            this.renSp.addChild(this.ren);
            this.view.addChild(this.gunSp);
            this.view.addChild(this.renSp);
        }
        
        
        this.play("stand");
        
    }
    private removeAll(_mc){
        if(_mc.numChildren > 0) _mc.removeChildAt(0);
    }
    public play(lab){
      //  console.log("play::" + lab + ":" + this.nowLab);
        var _this1=this;
        var stand;
        if(this.lock)return;
        if(this.nowLab==lab)return;
            if(lab == "stand") {
                if(this.type < 3) {
                    stand= Global.createBitmapByName("r" + this.type + "_stand_png");
                    this.removeAll(this.renSp);
                    this.renSp.addChild(stand);
                    this.gunSp.gotoAndStop(0);
                }else{
                    this.ren.gotoAndStop(0);
                    if(this.gunSp)this.gunSp.gotoAndStop(0);
                }
            } else if(lab == "run") {
               console.log('run');
                if(this.type < 3) {
                    var run = Global.createMc("r" + this.type + "_mc_json","r" + this.type + "_mc_png",'r' + this.type);
                    run.gotoAndPlay(0,-1);
                    this.gunSp.gotoAndPlay(0,-1);
                    this.removeAll(this.renSp);
                    this.renSp.addChild(run);
                }else{
                    this.ren.gotoAndPlay(0,-1);
                    if(this.gunSp)this.gunSp.gotoAndPlay(0,-1);
                }
            
            } else if(lab == "shoot") {
                _this1.play('stand');
                this.lock = true;
               
                if(this.a){
                    this.dispatchEvent(new EventObj('event','right_shoot',true));
                }else{
                    this.dispatchEvent(new EventObj('event','left_shoot',true));
                }
                setTimeout(function() {
                    _this1.lock = false;
                    _this1.play('stand');
                },1000);
                
            } else if(lab == "boom") {
                if(this.a) {
                    this.dispatchEvent(new EventObj('event','right_boom',true));
                } else {
                    this.dispatchEvent(new EventObj('event','left_boom',true));
                }
                
                stand = Global.createBitmapByName("r" + this.type + "_stand_png");

                this.removeAll(this.renSp);
                this.renSp.addChild(stand);

                this.gunSp.gotoAndStop(0);
                

                this.lock=true;
                
                setTimeout(function(){
                    _this1.lock = false;
                    _this1.play('stand');
                    },2000);
           
            } else if(lab == "away") {
                this.aiStatus=4;
                this.gunSp.stop();
                this.ren.scaleX=-1;
                this.renSp.x=150;
                this.ren.play(-1);
                this.dispatchEvent(new EventObj('event','away',true,false,this.gunSp));
                this.gunSp=null;
             }
        this.nowLab = lab;
    }
    public check(b){
        var x=b.x-this.x;
        var y=b.y-this.y;
        //console.log(x,y);
        if(x>-40 && x<40 ){
            if(y > -220 && y < -180) {
                return 3;
            } else if(y > -180 && y < 100) {
                return 2;
            } else if(y > -100 && y < 0) {
                return 1;
            }
        }
        return 0;
    }
    public getBullet(){
        var b,x,y;
        if(this.a) {
            b = new BulletBar(-1);
            x = this.x + (57-150 ) * this.sc;
            y = this.y - (300 - 166) * this.sc;
        } else {
            b = new BulletBar();
            x = this.x + (150 - 57) * this.sc;
            y = this.y - (300 - 166) * this.sc;
        }
       
     
        b.x = x;
        b.y = y;
        return b;
    }
    static leftX = [30,216];
    static initY = [560,600];
    static rightX = [1150,987];

    private time=0;
    
    public move(m){
       
        if(this.lock)return;
        var s = this.speed;
       
        if(this.a){
            var a = (1150 - 987) / (600 - 473);
           
            var x = this.x;
            var y;
            if(m == -1) {
                x -= s;
            } else if(m == 1) {
                x += s;
            }
            if(x > PlayRenBar.rightX[0]) {
                if(this.aiStatus!=4)x = PlayRenBar.rightX[0];
            } else if(x < PlayRenBar.rightX[1]) {
                x = PlayRenBar.rightX[1];
            }
            y = (x - PlayRenBar.rightX[0]) / a + PlayRenBar.initY[1];

            this.x = x;
            this.y = y;
           
            this.play('run');
        }else{
            var a = 186 / -108;
          
            var x = this.x;
            var y;
            if(m == -1) {
                x -= s;
            } else if(m == 1) {
                x += s;
            }
            if(x < PlayRenBar.leftX[0]) {
                x = PlayRenBar.leftX[0];
            } else if(x > PlayRenBar.leftX[1]) {
                if(this.aiStatus != 4)x = PlayRenBar.leftX[1];
            }
            y = (x - PlayRenBar.leftX[0]) / a + PlayRenBar.initY[0];

            this.x = x;
            this.y = y;

            this.play('run');
        }
        
    }
    //////////
    private aiStatus=0;
    private toX=0;
    private aiSc=0;
    private getScX(sc){
       
        return (sc * (PlayRenBar.rightX[1] - PlayRenBar.rightX[0]) + PlayRenBar.rightX[0]);
    }
    public playAi(){
        this.time++;
        if(this.type ==3) {
            if(this.aiStatus!=4 && this.time>200){
                this.play("away");
                return;
            }
        }
        if(this.lock)return;
        if(this.aiStatus==0){
            if(this.aiSc>0.6){
                this.aiSc = Math.random() ;
            }else{
                this.aiSc = Math.random() * 0.6 + 0.4;
            }
            
            this.toX = this.getScX(this.aiSc);
            //console.log("this.toX",this.toX);
            this.aiStatus=1;
        } else if(this.aiStatus == 1){
            var xx = this.toX-this.x;
            if(Math.abs(xx) < this.speed){
                this.aiStatus=2;
            }else{
                if(xx>0){
                    this.move(1);
                }else{
                    this.move(-1);
                }
            }
        } else if(this.aiStatus ==2) {
            var r=Math.random();
            if(r>0.5){
                if(this.type < 3 && this.aiSc > 0.6) {
                    this.play("shoot");
                    if(Math.random() > 0.8) {
                        this.aiStatus = 0;
                    }
                } else {
                    if(Math.random() > 0.8) {
                        this.aiStatus = 0;
                    }
                }
            }else if(r>0.3){
               
                
            } else{
                this.aiStatus = 0;
            }
        } else if(this.aiStatus == 4) {
            this.move(1);
        }
    }
    
    
}
