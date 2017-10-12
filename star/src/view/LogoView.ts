class LogoView extends egret.DisplayObjectContainer {

	private img1:egret.Bitmap;
	private img2:egret.Bitmap;
	private img3:egret.Bitmap;
	private img4:egret.Bitmap;

	private maskBg:egret.Shape;

	private angle:number;
	public constructor() 
	{
		super();
		this.initView();
	}

	private initView():void
	{
		this.img1 = AssetsUtils.createBitmapByName("p2_yuan_png");
        StageUtils.centerInParent(this.img1);
        this.addChild(this.img1);

		this.maskBg = new egret.Shape();
		this.maskBg.graphics.beginFill(0x000000);
		this.maskBg.graphics.drawCircle(230,230,1);
		this.maskBg.graphics.endFill();
		this.maskBg.x = (StageUtils.stage.stageWidth - 460 >> 1);
		this.maskBg.y = (StageUtils.stage.stageHeight - 460 >> 1);
		this.addChild(this.maskBg);
		this.img1.mask = this.maskBg;

		this.img2 = AssetsUtils.createBitmapByName("logo_png");
        StageUtils.centerInParent(this.img2);
		this.img2.y -= 50;
        this.addChild(this.img2);

		this.img3 = AssetsUtils.createBitmapByName("ls_logo_png");
        StageUtils.centerInParent(this.img3);
		this.img3.y -= 140;
        this.addChild(this.img3);

		this.img4 = AssetsUtils.createBitmapByName("p2_en_png");
        StageUtils.centerInParent(this.img4);
		this.img4.y += 80;
        this.addChild(this.img4);

		this.showFlash();


	}

	private showFlash():void
	{
		this.img1.alpha = 0;
		egret.Tween.get(this.img1).to({alpha:1},500);

		this.img2.alpha = 0;
		egret.Tween.get(this.img2).wait(350).to({alpha:1},500);

		this.img3.alpha = 0;
		egret.Tween.get(this.img3).wait(550).to({alpha:1},500);

		this.img4.alpha = 0;
		egret.Tween.get(this.img4).wait(750).to({alpha:1},500);

		egret.Tween.get(this).wait(2000).to({alpha:0},800).call(this.onComplete,this);


		this.angle = 360;
		this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
	}

	private enterFrameHandler():void
	{
		this.angle -= 8;
		
		var tx = 230 * Math.cos(this.angle * Math.PI);
		var ty = 230 * Math.sin(this.angle * Math.PI);
		this.maskBg.graphics.clear();
		this.maskBg.graphics.beginFill(0xff0000);
		this.maskBg.graphics.moveTo(230, 230);//绘制点移动(r, r)点
		this.maskBg.graphics.lineTo(460, 230);//画线到弧的起始点
		this.maskBg.graphics.drawArc(230, 230, 230, 0, this.angle * Math.PI / 180, true);//从起始点顺时针画弧到终点
		this.maskBg.graphics.lineTo(230, 230);//从终点画线到圆形。到此扇形的封闭区域形成

		this.maskBg.graphics.lineTo(0, 230);//从终点画线到圆形。到此扇形的封闭区域形成
		this.maskBg.graphics.drawArc(230, 230, 230, (this.angle - 180) * Math.PI / 180, Math.PI, false);//从起始点顺时针画弧到终点
		this.maskBg.graphics.lineTo(230, 230);//从终点画线到圆形。到此扇形的封闭区域形成
		this.maskBg.graphics.endFill();

		
		if(this.angle < 180)
		{
			this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
		}
		console.log(this.angle);
	}

	private onComplete():void
	{
		console.log("onComplete");
		GameDispatcher.instance.dispatchEventWith(EventName.Logo_End);
	}
}