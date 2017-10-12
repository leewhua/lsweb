class StopJihuoPop extends PopView{
    public constructor(){
        super();
    }
    public setData(data): void{
        super.setData();
        var bg = new CustomImage("resource/assets/asyn/error/stop_jihuo.jpg", true, () => {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);

        var btnToInfo = Global.createBitmapByName("btnToInfo_png");
        btnToInfo.x = StageUtils.SW - btnToInfo.width >> 1;
        btnToInfo.y = 650;
        this.addChild(btnToInfo);
        Global.setBut(btnToInfo);

        btnToInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btntoinfoHandler,this);
    }

    private btntoinfoHandler():void{
        PopManager.hidePop("StopJihuoPop");
        PopManager.showPop("InfoPop");
    }
}