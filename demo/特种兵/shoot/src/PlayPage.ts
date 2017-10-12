/**
 *
 * @author 
 *
 */
class PlayPage extends egret.DisplayObjectContainer{
    

    private played=0;
    private status=0;
    
    private oldPop=null;
    private leftRen;
    private rightRen;
    
    private controlBar;
    
    private shootBar;
    private grenadeBar;
    
    private mineBar:MineBar;
    private enemyBar:EnemyBar;
    
    private leftBullets=[];
    private rightBullets = [];

    private gameSp;
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener('event',this.eventHandler,this);
    }

    private eventHandler(event: EventObj): void {
        console.log("eventHandler:" + event.name);
        switch(event.name) {
           
            case 'show_game_help':
                this.showPop('help');
                event.stopPropagation();
                break;
            case 'start_321':
                this.showPop('321');
                event.stopPropagation();
                break;
            case 'play':
                this.play();
                event.stopPropagation();
                break;
            case 'win':
             this.toStop('win');
               
                event.stopPropagation();
                break;
            case 'lost':
               this.toStop('lost');
                event.stopPropagation();
                break;
            case 'hb':
                this.toStop('hb');
                event.stopPropagation();
                break;
            case 'end':
                this.showPop('end');
                event.stopPropagation();
                break;
            case 'start_play':
                this.status=1;
                event.stopPropagation();
                break;
            case 'close_pop':
                this.closePop();
                event.stopPropagation();
                break;
            case 'left':
                this.move(-1);
                event.stopPropagation();
                break;
            case 'right':
                this.move(1);
                event.stopPropagation();
                break;
            case 'control_end':
                this.leftRen.play('stand');
                event.stopPropagation();
                break;
            case 'shoot': 
                this.leftRen.play('shoot');
                event.stopPropagation();
                break;
            case 'left_shoot':
                this.leftShoot();
                //this.rightShoot();
                event.stopPropagation();
                break;
            case 'right_shoot':
                this.rightShoot();
                event.stopPropagation();
                break; 
            case 'away':
                var bag=event.data;
                bag.x = bag.x * 0.8+this.rightRen.x;
                bag.y = bag.y * 0.8+this.rightRen.y;
                bag.scaleX = bag.scaleY = 0.8;
               
                this.addChildAt(bag,this.getChildIndex(this.rightRen)-1);
                
                var tw = egret.Tween.get(bag);
              var _this1=this;
              tw.to({ x: 450,y: 170,scaleX: 1,scaleY:1 },2000,egret.Ease.cubicOut);
                tw.call(function(){
                    _this1.dispatchEvent(new EventObj('event','hb',true));
                    });
                event.stopPropagation();
                break;
            case 'boom':

                this.leftRen.play('boom');
                event.stopPropagation();
                break;
        }
        
        //play_mov
    }
    private play(){
        this.gameSp.touchChildren=true;
        this.status=1;
    }
    
    private toStop(lab){
        this.gameSp.touchChildren = false;
        this.status=2;
        if(lab=="win"){
            this.showPop('win');
          //  Api.load("play",Api.play_url,{ ticket: Api.status_ticket,gameres: 1,desc:"赢得积分100" },this);
        }else if(lab=="lost"){
            this.showPop('lost');
           // Api.load("play",Api.play_url,{ ticket: Api.status_ticket,gameres: 0,desc: "赢得积分50"},this);
        } else if(lab == "hb") {
            this.showPop('hb');
            //Api.load("play",Api.play_url,{ ticket: Api.status_ticket,gameres: 1,desc: "赢得红包"},this);
        }
    }
    
    private onAddToStage(event:egret.Event) {
        //初始化intro
       
        var _this1=this;
        
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
       
        var bg = Global.createBitmapByName('p_bg_jpg');
        var road = Global.createBitmapByName('p_road_png');
        
        var r1=GameInfo.play_ren;
        var g1 = GameInfo.gun;
        var r2;
        var g2;
        if(GameInfo.hb>0){
            r2 = 3;
            g2 = 0;
        }else{
            r2 = Math.floor(Math.random() * 3);
            g2 = Math.floor(Math.random() * 5);
        }
        GameInfo.enemy_gun=g2;
        this.gameSp=new egret.Sprite();
            
        this.leftRen=new PlayRenBar(r1,g1);
        this.rightRen = new PlayRenBar(r2,g2,true);
        this.leftRen.x = PlayRenBar.leftX[0];
        this.leftRen.y = PlayRenBar.initY[0];
        this.rightRen.x = PlayRenBar.rightX[0];
        this.rightRen.y = PlayRenBar.initY[1];
        
        this.rightRen.play('stand');
        this.leftRen.play('stand');
        
        this.controlBar=new ControlBar();
        this.shootBar=new ShootBar();
        this.grenadeBar=new GrenadeBar();
        
        
        this.mineBar=new MineBar();
        this.enemyBar=new EnemyBar();
        
        
        var _this1=this;
  
        road.y=397;
        
        this.gameSp.touchChildren=false;
        
        this.addChild(bg);
        this.addChild(this.leftRen);
        this.addChild(this.rightRen);
        this.addChild(road);
        this.addChild(this.gameSp);
        this.gameSp.addChild(this.controlBar);
        this.gameSp.addChild(this.shootBar);
        //this.gameSp.addChild(this.grenadeBar);
        this.addChild(this.mineBar);
        this.addChild(this.enemyBar);
        
        this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
       
       
    }
    
  
    private move(m){
        //30 560
        //216 452
        this.leftRen.move(m);
        
    }
    private rightShoot(){
        var b = this.rightRen.getBullet();

        this.addChild(b);
        this.rightBullets.push(b);
    }
    private leftShoot(){
        var b=this.leftRen.getBullet();
       
        this.addChild(b);
        this.leftBullets.push(b);
    }
    
    private checkHit(){
        var i;
        var tem=[];
        var b;
        var out;
        for(i=0;i<this.leftBullets.length;i++){
            out = false;
            b = this.leftBullets[i];
            if(b.checkOut()){
                out=true;
            } else {
                var k = this.rightRen.check(b);
                if(k) {
                    this.hit(1,k);
                    out = true;
                }
            }
            if(!out) {
                tem.push(b);
            } else {
                b.kill();
            }
        }
        this.leftBullets=tem;
        tem = [];
       
        for(i = 0;i < this.rightBullets.length;i++) {
            out = false;
            b = this.rightBullets[i];
            if(b.checkOut()) {
                out = true;
            } else {
                var k = this.leftRen.check(b);
                if(k) {
                    this.hit(0,k);
                    out = true;
                }
            }
            if(!out) {
                tem.push(b);
            }else{
                b.kill();
            }
        }
        this.rightBullets = tem;
    }
    private hit(t,k){
        if(t==0){
            this.mineBar.hit(k,GameInfo.enemy_gun);
        }else{
            this.enemyBar.hit(k,GameInfo.gun);
        }
    }
    private loop(e){
        
        if(this.status==0){
          
        } else if(this.status==1){
            this.rightRen.playAi();
           this.checkHit();
        } else if(this.status == 2) {
          
            
        }
        
       
    }
    private closePop() {
        var hasOld = false;
        var old = this.oldPop;
        if(old) {
            old.out();
           
            hasOld = true;
        }
        this.oldPop = null;
        return hasOld;
    }
    
    public showPop(lab){
        console.log('showpop:'+lab);
        var hasOld=this.closePop();
        if(lab=="help"){
            this.oldPop=new HelpPop();
        } else if(lab == "321") {
            this.oldPop = new P321Pop();
        } else if(lab == "win") {
            this.oldPop = new WinPop();
        } else if(lab == "lost") {
            this.oldPop = new LostPop();
        } else if(lab == "hb") {
            this.oldPop = new HbPop();
        } else if(lab == "end") {
            this.oldPop = new EndPop();
        }
        this.addChild(this.oldPop);
        this.oldPop.show(hasOld);
    }
}
