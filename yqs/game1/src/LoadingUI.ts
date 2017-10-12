
class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        //this.createView();
    }

    private textField: egret.TextField;

    private createView(): void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 500;
        this.textField.width = 600;
        this.textField.height = 100;
        this.textField.textColor = 0x666666;
        this.textField.textAlign = "center";
        this.textField.text = "Loading...";
    }

    public setProgress(current,total): void {
        //this.textField.text = "加载..." + current + "/" + total;
        //console.log(this.textField.text);
    }
}