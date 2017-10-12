/**
 *
 * @author 
 *
 */
class BuyEndPop extends PopView {

    public constructor() {
        super();
    }
    private showEnd(b){
        var bg = Global.createBitmapByName('pop_bg_png',-254,-165);
        var title;
        if(b){
            title = Global.createBitmapByName('buy_ok_png',-211,-144);
        }else{
            title = Global.createBitmapByName('buy_lost_png',-151,-144);
        }
        
        var toOk = Global.createBitmapByName('to_ok_png',-146,38);

        Global.setBut(toOk);
        this.view.addChild(bg);
        this.view.addChild(title);
        this.view.addChild(toOk);
        
        this.view.alpha=0;
        Global.zoomIn(this.view);
        
        toOk.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            if(b){
                this.dispatchEvent(new EventObj('event','buy_sunccess_close',true));
            }else{
                this.out();
            }
            
        },this);
    }
    public startBuy(obj){
        this.show(false);
        if(Main.isTest){
            this.showEnd(Math.random()>0.5?1:0);
            return;
        }
        var id = obj.id;
        this.buyObj=obj;
        console.log('GameInfo',GameInfo.sco , obj);
        if(0 && GameInfo.sco < obj.sco){
            this.showEnd(false);
        }else{
            Api.load("buy",Api.user_buy_url,{ itemid: id,ticket: Api.user_ticket,desc: "buy" },this,this.buySuccess);
        }
        //
    }

    private buyObj;
    
    private buySuccess(data) {
   
        if(data.result == 'success') {
            if(data.reason && data.reason == 'nojf') {
       
                this.showEnd(false);
                // 
            } else {
                var type = this.buyObj.type;
                GameInfo.guns.push({ type:type});
                //gunsInshop
                for(var i=0;i<GameInfo.gunsInshop.length;i++){
                    if(GameInfo.gunsInshop[i].type == type){
                        GameInfo.gunsInshop[i].has=1;
                    }
                }

                GameInfo.sco = data.restjf;
                this.dispatchEvent(new EventObj('event','buy_sunccess',true));
                this.showEnd(true);
            }

        } else {
            if(data.reason && data.reason == 'nojf') {
                this.showEnd(false);
                // 
            } else {
                this.dispatchEvent(new EventObj('event','msg_event',true,false,MsgPop.at_anomaly));
            }
            
            
        }
    }

    public show(hasDelay) {
        super.show(hasDelay,true,false);
    }
   
}
