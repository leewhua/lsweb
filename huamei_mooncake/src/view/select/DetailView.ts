class DetailView extends egret.DisplayObjectContainer
{
	private container:egret.DisplayObjectContainer;

	private txtZongJi:egret.TextField;

	private txtZongJia:egret.TextField;

	public constructor()
	{
		super();

		var title = Global.createBitmapByName("select_title_png");
		title.x = 0;
		title.y = 0;
		this.addChild(title);

		this.container = new egret.DisplayObjectContainer();

		var scroll:egret.ScrollView = new egret.ScrollView(this.container);
		scroll.width = 640;
		scroll.height = StageUtils.SH - 300 - 90;
		scroll.x = 0;
		scroll.y = 64;
		scroll.horizontalScrollPolicy = "off";
		this.addChild(scroll);

		var down = Global.createBitmapByName("select_down_png");
		down.x = 0;
		down.y = StageUtils.SH - down.height - 240;
		this.addChild(down);

		var zongji = new egret.TextField();
		zongji.x = 97;
		zongji.y = StageUtils.SH - 300;
		zongji.text = "总计：";
		this.addChild(zongji);

		var txtZongji = new egret.TextField();
		txtZongji.x = zongji.x + 90;
		txtZongji.y = StageUtils.SH - 300;
		txtZongji.textColor = 0xffb680;
		this.addChild(txtZongji);

		var zongjia = new egret.TextField();
		zongjia.x = 325;
		zongjia.y = StageUtils.SH - 300;
		zongjia.text = "总价：";
		this.addChild(zongjia);

		var txtZongJia = new egret.TextField();
		txtZongJia.x = zongjia.x + 90;
		txtZongJia.y = StageUtils.SH - 300;
		txtZongJia.textColor = 0xffb680;
		this.addChild(txtZongJia);

		txtZongji.text = "300盒";
		txtZongJia.text = "￥500000.00";

		this.txtZongJi = txtZongji;
		this.txtZongJia = txtZongJia;

		this.getData();
	}

	private getData():void
	{
		var self = this;
		$.ajax({
			url: Main.USER_INFO_API,
			data: {type:"querysum",ticket:Main.USER_TICKET},
			success: function(data)
			{
				if(data.result == 0)
				{
					self.txtZongJi.text = data.sumcnt+"盒";
					self.txtZongJia.text = "￥" + data.sumprice;
					(<SelectPop>(self.parent)).txtName.text = "【账户名：" + data.username + "】";
					self.setData(data.discount);
				}else
				{
					PopManager.showPop("ErrorPop",{url:"resource/assets/asyn/error/error_web.png"});
				}
			},
			error: function()
			{
				PopManager.showPop("ErrorPop",{url:"resource/assets/asyn/error/error_web.png"});
			},timeout: 8000,
			dataType: "json",async: true,type: "POST",
			complete: function(XMLHttpRequest,status)
			{
				if(status == 'timeout')
				{
					PopManager.showPop("ErrorPop",{url:"resource/assets/asyn/error/error_web.png"});
				}
			}
		});
	}

	public setData(data):void
	{
		if(data)
		{
			var index = 0;
			for(var str in data)
			{
				var item = new DetailItem();
				item.setData(str,data[str]);
				item.x = 0;
				item.y = index * 385;
				this.container.addChild(item);
				index ++;
			}
		}
		// var len = data.list.length;
		// for(var i = 0;i<len;i++)
		// {
		// 	var item = new DetailItem();
		// 	item.setData(data.list[i]);
		// 	item.x = 0;
		// 	item.y = i * 385;
		// 	this.container.addChild(item);
		// }
	}
}