/**
 *
 * @author 
 *
 */
class MapScene extends egret.DisplayObjectContainer{
   
    private mapInfo = { level: 2,count: 14,now: 7,fly: 7,playCount:1,top:0};
    private flyCount=7;
    
    private face;
    
	public constructor() {
        super();
        if(Main.isTest){
            this.mapInfo.level = Math.floor(Math.random() * 3);
            this.mapInfo.count = 16 + Math.floor(Math.random() * 15);
            this.mapInfo.now =7 + Math.floor(Math.random() * 2);
            this.mapInfo.fly = this.mapInfo.now;
            this.mapInfo.fly =7;
            if(this.mapInfo.fly >= 7) {
                this.mapInfo.playCount = 1 + Math.floor(Math.random() * 2);
            } else {
                this.mapInfo.playCount = 0;
            }
        }else{
            var user: any = Main.user;
            user=user.more;
            var level;// = Math.floor(user.mytotal / this.flyCount);
           
            
            this.mapInfo.count = user.mytotal;
            this.mapInfo.now = user.todaytotal;
           
            this.mapInfo.playCount = user.c2times;
            if(this.mapInfo.playCount>0){
                this.mapInfo.fly =this.flyCount ;            
            }else{
                this.mapInfo.fly = user.mytotal%this.flyCount;
            }
            if(user.mysort==0){
                this.mapInfo.top =0;
            }else{
                this.mapInfo.top = Math.floor((user.total - user.mysort) / (user.total - 1) * 100);
            }
            
            if(this.mapInfo.top>=90) {
                level = 3;
            } else if(this.mapInfo.top >= 50) {
                level = 2;
            } else {
                level = 1;
            }
            this.mapInfo.level = level;
            Main.reSetShareUrl();
        }
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener('event',this.eventHandler,this);
    }
    private eventHandler(event: EventObj): void {
        switch(event.name) {
            case 'close_help':
                console.log("close_help");
                break;
            case 'play_end':
                console.log("play_end");
                break;
            case 'to_shop':
                break;
        }
        console.log(event.type + ":" + event.name);
    }

    private onAddToStage(event:egret.Event) {
        //初始化intro
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
       
        var roadSp=new egret.Sprite();
        var bg = Main.createBitmapByName("luck_bg_jpg");
        var bar,level;
        if(this.mapInfo.playCount>0){
            bar = Main.createBitmapByName('map-bg2_jpg');
        }else{
            bar = Main.createBitmapByName('map-bg_jpg');
        }
        
        console.log("bar::" + bar);

        if(this.mapInfo.level ==3) {
            level = Main.createBitmapByName('map-bian-j_png');
        } else if(this.mapInfo.level == 2){
            level = Main.createBitmapByName('map-bian-y_png');
        } else {
            level = Main.createBitmapByName('map-bian-t_png');
        }
       
        var line1 = Main.createBitmapByName('map-line-gary_png');
        var line2 = Main.createBitmapByName('map-line-red_png');
        
        var lineMask=new egret.Shape();
        
        var mapSp=new egret.Sprite();
        
        var road = Main.createBitmapByName('map_road_png');
        
        var face=new egret.Sprite();
       
        var shareBut = new Middle(Main.createBitmapByName('map-share_png'));
        var gameBut;
        
       
        
        var pro = Main.createBitmapByName('pro-mini_png');
        
        var flyone = Main.createBitmapByName('fly-mini_png');
       
        var copy1;
        
        var face = new egret.Sprite();
        
        
       // face.scaleY = Main.scale;
        
        var name = new egret.TextField();
        name.textAlign = "center";
        name.width=550;
        name.textColor=0x000000;
        name.size=24;
        
        var copy10 = new egret.TextField();
        copy10.textAlign = "right";
        copy10.width = 120;
        copy10.textColor = 0x000000;
        copy10.size = 16;
        copy10.text = "您已累计喝下";
        
        var copy11 = new egret.TextField();
        copy11.textAlign = "left";
        copy11.width = 50;
        copy11.textColor = 0x000000;
        copy11.size = 16;
        copy11.text="罐鲜啤";
        
        var copy20= new egret.TextField();
        copy20.textAlign = "right";
        copy20.width = 100;
        copy20.textColor = 0x000000;
        copy20.size = 16;
        copy20.text = "今天喝下第";
        
        var copy21 = new egret.TextField();
        copy21.textAlign = "left";
        copy21.width = 20;
        copy21.textColor = 0x000000;
        copy21.size = 16;
        copy21.text = "罐";
        
        var copy3 = new egret.TextField();
        copy3.textAlign = "center";
        copy3.width = 447;
        copy3.textColor = 0xed1b23;
        copy3.size = 24;
        copy3.text = "战胜全国"+this.mapInfo.top+"%的酒友";
        
        
        
        var copy40 = new egret.TextField();
        copy40.textAlign = "right";
        copy40.width = 50;
        copy40.textColor = 0x000000;
        copy40.size = 18;
        copy40.text = "还差";

        var copy41 = new egret.TextField();
        copy41.textAlign = "left";
        copy41.width = 200;
        copy41.textColor = 0x000000;
        copy41.size = 18;
        copy41.text = "罐就能挑战大红包咯";
        
        
        var nowCountTxt = new egret.BitmapText();
        nowCountTxt.font = RES.getRes("count_font_fnt");
        nowCountTxt.text = this.mapInfo.now.toString();
        nowCountTxt.scaleX = nowCountTxt.scaleY = 0.8;
        
        var fullCountTxt = new egret.BitmapText();
        fullCountTxt.font = RES.getRes("count_font_fnt");
        fullCountTxt.text = this.mapInfo.count.toString();
        
        var lostCountTxt = new egret.BitmapText();
        lostCountTxt.font = RES.getRes("count_font_fnt");
        lostCountTxt.text = (this.flyCount-this.mapInfo.fly).toString();
        
        var lostCopySp=new egret.Sprite();
        lostCopySp.addChild(copy40);
        lostCopySp.addChild(copy41);
        lostCopySp.addChild(lostCountTxt);
        
        var gameCopy = new egret.TextField();
        gameCopy.textAlign = "center";
        gameCopy.width = 447;
        gameCopy.textColor = 0x000000;
        gameCopy.size = 18;
     
        var butCopy = new egret.TextField();
        butCopy.textAlign = "center";
        butCopy.width = 256;
        butCopy.textColor = 0xffffff;
        butCopy.size = 33;
        butCopy.x=-128;
        butCopy.y=-18;
        
        if(this.mapInfo.playCount > 0) {
            gameBut = new Middle(Main.createBitmapByName('game-but_png'));
            butCopy.text = "挑战大红包X" + this.mapInfo.playCount;
            gameBut.addChild(butCopy);
        } else {
            gameBut = new Middle(Main.createBitmapByName('game-but2_png'));
            butCopy.textColor = 0xa9a9a9;
            butCopy.text = "挑战大红包X" + this.mapInfo.playCount;
            gameBut.addChild(butCopy);
        }
        
        var help = new Middle(Main.createBitmapByName('help_png'));
        
        var hb = new Middle(Main.createBitmapByName('map-hongbao_png'));
        var yz = new Middle(Main.createBitmapByName('map-yinzhang_png'));
        
        if(this.mapInfo.playCount > 0) {
            gameCopy.text = "马上挑战，赢现金红包！";
        } else {
            gameCopy.text = "7 天鲜啤 开罐扫码有奖\n累计7 罐 更有超大现金红包等你挑战！";
        }
        var user:any = Main.user;
        
        user.nickname = decodeURIComponent(user.nickname);
        name.text = user.nickname;
        
        name.y=72;
        copy10.x=260-copy10.width;
        fullCountTxt.x = copy10.x + copy10.width + 5;
        copy11.x = fullCountTxt.x+5+fullCountTxt.width;
        
        fullCountTxt.y=98;
        copy10.y=116;
        copy11.y = 116;

        copy3.x=50;
        copy3.y=136;
        
        lostCountTxt.y=-15;
        copy40.x = -140;
        lostCountTxt.x = copy40.x+5+copy40.width;
        copy41.x = lostCountTxt.x + 5 + lostCountTxt.width;
        
        copy21.x=546-38;
        nowCountTxt.x=copy21.x-5-nowCountTxt.width;
        copy20.x=nowCountTxt.x-5-copy20.width;
        
        nowCountTxt.y=20;
        copy20.y=34;
        copy21.y=34;
        
        shareBut.x=547/2;
        shareBut.y=190;
        
        gameCopy.x=50;
        gameCopy.y=230;
        

        mapSp.x=47;
        mapSp.y=62;
       
        pro.x = 450;
        pro.y = 717;
        flyone.x = 520;
        flyone.y = 800;

        
        level.x=-8;
        level.y=-54;
        
        face.x=224;
        face.y=-40;
        
        gameBut.x = 274;
        gameBut.y = 806;
        
        roadSp.x=90;
        roadSp.y=276;
        
        line1.x=-36;
        line1.y=42;
        line2.x = -36;
        line2.y = 42;
     
        lostCopySp.x = 274;
        lostCopySp.y = 860;
        
        roadSp.addChild(line1);
        roadSp.addChild(line2);
        roadSp.addChild(lineMask);
        roadSp.addChild(road);
        
        this.addChild(bg);
        
        this.addChild(mapSp);
        
        mapSp.addChild(bar);
        mapSp.addChild(level);
        mapSp.addChild(roadSp);
        mapSp.addChild(face);

        
        mapSp.addChild(flyone);
        mapSp.addChild(pro);
        

        
        mapSp.addChild(name);
    
        mapSp.addChild(copy10);
        mapSp.addChild(fullCountTxt);
        mapSp.addChild(copy11);
     
        mapSp.addChild(copy20);
        mapSp.addChild(nowCountTxt);
        mapSp.addChild(copy21);
        
        mapSp.addChild(copy3);
        
        mapSp.addChild(shareBut);
        
        mapSp.addChild(gameCopy);
        
        mapSp.addChild(gameBut);
        
        help.x = 320;
        help.y = 990;
        this.addChild(help);
        
        line2.mask = lineMask;
        
        this.face=face;
      
     
        this.loadFace(user.headimgurl);
   
      
        
        var point = [{ x: 186,y: 376 },{ x: 287,y: 352 },{ x: 376,y: 333 },
            { x: 429,y: 434 },{ x: 366,y: 508 },{ x: 328,y: 583 },{ x: 302,y: 678 }];
   
       
        var flys=[];
        var flylab = ["mini-fly1","mini-fly2","mini-fly3"];
        var pointXy = [{ x: 34,y: 46 },{ x: 22,y: 56 },{ x: 12,y: 39 }];
        
        hb.x = point[6].x;
        hb.y = point[6].y;
        yz.x = hb.x + 80;
        yz.y = hb.y + 40;
        
        hb.alpha=0;
        yz.alpha=0;
        gameBut.alpha=0;
        gameBut.visible=false;
        
        mapSp.addChild(hb);
        mapSp.addChild(yz);
        var r;
        var _this1=this;
        for(var i = 0;i < this.mapInfo.fly;i++) {
            r = Math.floor(Math.random()*flylab.length);
            var ff = Main.createMc(flylab[r] + "_json",flylab[r] + "_png",flylab[r]);
            console.log(flylab[r],r);
            flys.push(ff);
            console.log('r::' + r + ":" + i + ":" + pointXy[r] + ":" + point[i]);
            ff.x = point[i].x - pointXy[r].x;
            ff.y = point[i].y - pointXy[r].y;
            mapSp.addChild(ff);
           ff.visible = false;
            setTimeout(function(ti) {
                var ii = ti;
                if(ii == _this1.mapInfo.fly-1){
                 
                    if(ii == _this1.flyCount - 1) {
                        Main.zoomIn(hb,0,400,1.6);
                        setTimeout(function() {
                            flys[ii].visible = true;
                            flys[ii].play(1);
                            gameBut.visible = true;
                            Main.zoomIn(yz,300,400,1.6);
                            Main.zoomIn(gameBut,600,400,1.6);
                        },300);
                    }else{
                      
                        setTimeout(function() {
                            flys[ii].visible = true;
                            flys[ii].play(1);
                            gameBut.visible = true;
                            lostCopySp.alpha=0;
                             mapSp.addChild(lostCopySp);
                             Main.zoomIn(gameBut,400,400,1.6);
                             Main.zoomIn(lostCopySp,600,400,1.6);
                        },300);
                    }
                   
                }else{
                    flys[ii].visible = true;
                    flys[ii].play(1);
                }
                
            },300 * i + 800,[i]);
        }
        
        Main.setBut(shareBut);
        shareBut.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            Main._main.dispatchEvent(new EventObj('event','to_share'));
        },this);
        
        if(this.mapInfo.playCount > 0) {
            Main.setBut(gameBut);
            gameBut.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
                Main._main.dispatchEvent(new EventObj('event','to_game'));
            },this);
        }
        
        Main.setBut(help);
        help.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            Main._main.dispatchEvent(new EventObj('event','help'));
        },this);
        

    }
    private loadFace(url): void {
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadFaceComplete,this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        loader.load(request);
    }
    private onLoadFaceComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        var texture: egret.Texture = <egret.Texture>loader.data;
   
        var faceImg = new egret.Bitmap(texture);
   
        var tw = egret.Tween.get(faceImg);
        faceImg.alpha = 0;
        faceImg.width=98;
        faceImg.height = 98;
        tw.to({alpha: 1 },400);
        
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x0);
        mask.graphics.drawCircle(48,48,48);
        faceImg.mask = mask;
        
        this.face.addChild(faceImg);
        this.face.addChild(mask);
    }
}
   
