class LoadingUI extends egret.Sprite 
{
    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void 
    {
        var bg = new CustomImage("resource/assets/asyn/loading_bg.jpg",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = StageUtils.SW;
        this.textField.height = 100;
        this.textField.x = 0;
        this.textField.y = 0;//StageUtils.CH;
        this.textField.size = 20;
        this.textField.textAlign = "center";

    }

    public setProgress(current:number, total:number):void {
        this.textField.text = `Loading...${current}/${total}`;
    }
}
