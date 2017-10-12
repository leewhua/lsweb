/**
 *
 * @author 
 *
 */
class End extends egret.Sprite{
   
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event: egret.Event) { 
        
        var ran= Math.floor(Math.random() * 4);
    
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x000000,0.7);
        bg.graphics.drawRect(0,0,640,1140);
      
        var paper = new Paper(Main.award.count.toString());
        paper.x = 320;
        paper.y = 1800;//720;
        
        
        var logo;
        
        if(Main.product_type == "tk") {
            logo= Main.createBitmapByRes(Main.product_type + "_json","logo-white2");
            logo.x = 306;
            logo.y = -26;
        } else if(Main.product_type == "bv") {
            logo = Main.createBitmapByRes(Main.product_type + "_json","logo-white2");
            logo.x = 306;
            logo.y = -26;
        }else{
            logo = Main.createBitmapByRes(Main.product_type + "_json","logo-white");
            logo.x = 306;
            logo.y = -6;
        }
        
       
        
        var guang: egret.MovieClip = Main.createMc('guang_json','guang_png','guang');
        guang.scaleX=640/200;
        guang.scaleY = 1040/250;
        guang.y = 0;
        
        guang.play(-1);
        var copyBar =new egret.Sprite();
        
        var show_but;
        var but = Main.createBitmapByRes('sc_json','to-qr');
        but.x = 130;
        but.y = 800;
        bg.alpha = 0;
        guang.alpha = 0;
        //paper.alpha = 0;
        copyBar.alpha = 0;
        but.alpha = 0;
        
        var but2 = Main.createBitmapByName("to-city_png");
        but2.x = 130;
        but2.y = 800;
        but2.alpha = 0;
        //to-city_png
        var copy;
        if(1 || Main.award.type == "jifen") {
            copy=Main.createBitmapByRes('sc_json',"jf-copy");
            copyBar.addChild(copy);
            copyBar.x = 120;
            copyBar.y = 640;
            show_but = but2;
        } else {
            copyBar.x = 80;
            copyBar.y = 640;
            copy =Main.createBitmapByRes('sc_json',"luck-copy");
            copyBar.addChild(copy);
            copyBar.addChild(logo);
            var n;
            var xx = 160;
            var ss = Main.award.count.toString().split("");
            if(ss.length)

                for(var i = 0;i < ss.length;i++) {
                    var s = ss[i];
                    if(s == ".") s = "10";
                    n = Main.createBitmapByRes("font_json",'s' + s);
                    n.x = xx;
                    if(s == "10") {
                        xx += 16;
                    } else {
                        xx += 34;
                    }
                    n.y = 62;
                    copyBar.addChild(n);
                }
                
            show_but = but;
        }
        
    
       
        
        this.addChild(bg);
        this.addChild(guang);
        this.addChild(paper);
        this.addChild(copyBar);
        this.addChild(show_but);
        Main.setBut(show_but);
        var tw = egret.Tween.get(bg);
        tw.to({ "alpha":1},600);
        
        var tw2 = egret.Tween.get(paper);
        tw2.wait(400);
        tw2.to({ y:720 },400);
        tw2.call(function() {
            paper.play();
        });
        var tw3 = egret.Tween.get(guang);
        tw3.wait(600);
        tw3.to({ "alpha": 0.6 },600);
        
        var tw4 = egret.Tween.get(copyBar);
        tw4.wait(1200);
        tw4.to({ "alpha": 1 },400);
        
        var tw5 = egret.Tween.get(show_but);
        tw5.wait(1400);
        tw5.to({ "alpha": 1 },400);
        
        var _this1=this;
        
        $('.wx').click(function(){
            $('.wx').hide();
        });
        but.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) { 
            $('.wx').show();
            console.log("$('.wx').show");
            },this);
        but2.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            window.location.href ="http://res.leasiondata.cn/lstatic/kzwyqs/jifen/playcity.html";
        },this);
        console.log("$but:" + but.touchEnabled);
    }
}
