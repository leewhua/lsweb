class AnswerPop extends PopView
{
	public constructor() 
	{
		super();
	}

	private index;

	private answerList = [{ok:3,list:["秦国","赵国","魏国","楚国"]},{ok:3,list:["吃粽子","赛龙舟","饮雄黄酒","登高采菊"]}];

	private curObj;

	private result = -1;

	private select;

	public setData(data:any = null):void
	{
		this.data = data;

		this.index = Math.floor(Math.random() * 2);
		console.log(this.index);

		this.curObj = this.answerList[this.index];

		var img = new CustomImage("resource/assets/asyn/answer_bg.png",true,function(){
			img.x = StageUtils.SW - img.width >> 1;
			img.y = StageUtils.SH - img.height >> 1;
		});
		this.addChild(img);

		var bg = new CustomImage("resource/assets/asyn/answer"+(this.index+1)+"_bg.png",true,function(){
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = 400 - bg.height;
		});
		this.addChild(bg);

		var ti = Global.createBitmapByName("answer_"+(this.index+1)+"_png");
		ti.x = StageUtils.SW - ti.width >> 1;
		ti.y = 400;
		this.addChild(ti);

		var list = this.curObj.list;
		var len = list.length;
		for(var i = 0;i<len;i++)
		{
			var cbx:CustomCheckBox = new CustomCheckBox(1,list[i]);
			cbx.index = i;
			cbx.x = 150;
			cbx.y = 470 + i * 60;
			this.addChild(cbx);
			cbx.addEventListener(egret.Event.CHANGE,this.cbxChangeHandler,this);
		}

		var btnSubmit:egret.Bitmap = Global.createBitmapByName("btn_submit_png");
		btnSubmit.x = StageUtils.SW - btnSubmit.width >> 1;
		btnSubmit.y = StageUtils.SH - 300;
		this.addChild(btnSubmit);

		btnSubmit.touchEnabled = true;
		Global.setBut(btnSubmit);
		btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submitClickHandler,this);

		var btnClose:egret.Bitmap = Global.createBitmapByName("close_png");
		btnClose.x = StageUtils.SW - btnClose.width - 90;
		btnClose.y = 185;
		this.addChild(btnClose);

		btnClose.touchEnabled = true;
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClickHandler,this);

		MainView.instance.people.visible = false;
	}

	private closeClickHandler():void
	{
		MainView.instance.people.visible = true;
		PopManager.hidePop("AnswerPop");
	}

	private cbxChangeHandler(e:egret.Event):void
	{
		var cbx:CustomCheckBox = e.target;
		this.result = cbx.index;

		if(this.select)
		{
			this.select.change();
		}
		this.select = cbx;
	}

	private submitClickHandler():void
	{
		if(this.result != -1 && this.curObj)
		{
			if(this.result == this.curObj.ok)
			{
				//正确
				PopManager.showPop("ResultPop",1);
			}else
			{
				//错误
				PopManager.showPop("ResultPop",0);
			}
			PopManager.hidePop("AnswerPop");

			MainView.instance.removeZongZi();
		}
	}
}