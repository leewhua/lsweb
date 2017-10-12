/**
 *
 * @author 
 *
 */
class ShopPop extends PopView {
    private gun;
  

    private selectGun=-1;
    
    public constructor() {
        super();
        this.addEventListener('event',this.eventHandler,this);
    }
    private eventHandler(event: EventObj): void {
        console.log("eventHandler:" + event.name);
        switch(event.name) {
            case 'buy_sunccess':
                //this.gun.setType(data);
                this.activeOther();
                break;
            case 'select_gun':
            var data=event.data;
                this.gun.setType(data);
                //this.dispatchEvent(new EventObj('event','to_play',true,false));
                event.stopPropagation();
                break;
        }

        //play_mov
    }
    private listSp;
    private activeOther(){
        var listSp = this.listSp;
        var listBg = Global.createBitmapByName('buy_store_bg_png');
        listSp.addChild(listBg);
        var g;
        var gunList = GameInfo.gunsInshop;
        for(var i = 0;i < gunList.length;i++) {
            g = new GunMiniBar(gunList[i].type);
            if(gunList[i].has) {
                g.lock();
            }
            g.x = (i % 3) * 135 + 67.5;
            g.y = Math.floor(i / 3) * 120 + 60;
            listSp.addChild(g);
            if(this.selectGun == -1) {
                this.selectGun = gunList[i].type;
            }
        }

        this.gun = new GunBar(this.selectGun,true);

    }
    private showEnd() {
        var bg = Global.createBitmapByName('s_bg_png',-588,-180);
        var title = Global.createBitmapByName('buy_store_name_png',-345,-135);
        var listSp = new egret.Sprite();
        listSp.x = -496;
        listSp.y = -90;
        var listBg = Global.createBitmapByName('buy_store_bg_png');

        var toBuy = Global.createBitmapByName('to_buy2_png',56,163);
        var toBack = Global.createBitmapByName('to_back2_png',213,163);

        var gunList = GameInfo.gunsInshop;
        var g;
        this.listSp = listSp;
        listSp.addChild(listBg);
        for(var i = 0;i < gunList.length;i++) {
            g = new GunMiniBar(gunList[i].type);
            if(gunList[i].has) {
                g.lock();
            }
            g.x = (i % 3) * 135 + 67.5;
            g.y = Math.floor(i / 3) * 120 + 60;
            listSp.addChild(g);
            if(this.selectGun == -1) {
                this.selectGun = gunList[i].type;
            }
        }

        this.gun = new GunBar(this.selectGun,true);

        this.gun.x = 214;
        this.gun.y = 20;


        Global.setBut(toBuy);
        Global.setBut(toBack);
        this.view.addChild(bg);
        this.view.addChild(title);
        this.view.addChild(listSp);



        this.view.addChild(this.gun);
        this.view.addChild(toBuy);
        this.view.addChild(toBack);

        toBuy.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            var end = new BuyEndPop();
            this.addChild(end);
            end.startBuy(GameInfo.gunData[this.gun.type]);
            this.dispatchEvent(new EventObj('event','to_buy',true));
        },this);
        toBack.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            this.dispatchEvent(new EventObj('event','to_setting',true));
        },this);
        
        var tw = egret.Tween.get(this.view);
        tw.wait(500);
        tw.to({ alpha: 1,scaleX: 1,scaleY: Main.scale },500,egret.Ease.backOut);
    }

    private offs = [0,5,10,15,20,30,40,60,80,100];
    private loadListSuccess(data) {
        console.log('loadListSuccess');
        if(data.result == 'success') {
            //items
            var off = this.offs[GameInfo.level];
            for(var i = 0;i < data.items.length;i++){
                var id = data.items[i].id;
                var ii = data.items[i].value;
                
                GameInfo.gunData[ii].id=id;
                GameInfo.gunData[ii].sco = data.items[i].cost -off;
            }
            console.log('loadListSuccess2');
            this.showEnd();
        } else {
            this.dispatchEvent(new EventObj('event','msg_event',true,false,MsgPop.at_anomaly));
        }
    }

    public show(hasDelay) {
        super.show(hasDelay,true,false);
        //Api.load("load list",Api.buy_list_url,{ ticket: Api.user_ticket,type:0},this,this.loadListSuccess);
        var data={"result":"success","items":[{"id":"0","value":"1","cost":"0"}]};
        this.loadListSuccess(data);
    }

}
