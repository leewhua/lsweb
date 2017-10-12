class MainView extends egret.DisplayObjectContainer 
{
	public static instance:MainView;

	private shopContainer;

	private maskContainer;

	private container:egret.Shape;

	private txtName:egret.TextField;

	public constructor() 
	{
		super();
		MainView.instance = this;
		this.initView();

		console.log(this.__typeof__(this));

		console.log(typeof(this));


		// var qr = new QRCode("resource/assets/asyn/code.png");
		// qr.setPosition(300,300,100,100);
		// qr.showHtmlCode();
	}

	private __typeof__(objClass)
	{
		if ( objClass && objClass.constructor )
		{
			var strFun = objClass.constructor.toString();
			var className = strFun.substr(0, strFun.indexOf('('));
			className = className.replace('function', '');
			return className.replace(/(^\s*)|(\s*$)/ig, '');  
		}
		return typeof(objClass);
	}

	private loadHead():void
	{
		var img = new CustomImage(UserInfo.instance.url,true,function(){
			img.width = 100;
			img.height = 100;
		});
		img.x = 0;
		img.y = 20;
		this.addChild(img);

		var headBg = Global.createBitmapByName("head_bg_png");
		headBg.x = 0;
		headBg.y = 20;
		this.addChild(headBg);

		var maskBg:egret.Shape = new egret.Shape();
		maskBg.graphics.beginFill(0x0);
		maskBg.graphics.drawCircle(img.x + 54,img.y + 45,40);
		maskBg.graphics.drawCircle
		maskBg.graphics.endFill();
		this.addChild(maskBg);
		img.mask = maskBg;
	}

	private initView():void
	{
		var topBg = Global.createBitmapByName("head_png");
		topBg.x = 0;
		topBg.y = 0;
		this.addChild(topBg);

		this.txtName = new egret.TextField();
		this.txtName.textColor = 0x5A0A96;
		this.txtName.size = 20;
		this.txtName.text = UserInfo.instance.username;
		this.txtName.width = 400;
		this.txtName.x = 100;
		this.txtName.y = 28;
		this.txtName.text = "";
		this.addChild(this.txtName);

		this.shopContainer = new egret.DisplayObjectContainer();
		this.addChild(this.shopContainer);

		var outBg = Global.createBitmapByName("out_bg_png");
		outBg.x = 0;
		outBg.y = StageUtils.SH - outBg.height;
		this.addChild(outBg);

		this.initGuanZhu();


	}

	public showInfo():void
	{
		this.loadHead();
		this.txtName.text = UserInfo.instance.username + "";
	}

	public initSmallShop():void
	{
		var shop = new ShopItemView({shopid:3});
		
		shop.x = 520;//this.posX[inx];
		shop.y = 670;//this.posY[inx];
		shop.oy = shop.y;
		// shop.scaleX = shop.scaleY = 0.7;
		this.shopContainer.addChild(shop);
		// this.shopList[obj.shopid] = shop;
		Global.setBut(shop);
		shop.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			if(UserInfo.instance.isget)
			{
				PopManager.showPop("SmallShopPop1");
			}else
			{
				PopManager.showPop("SmallShopPop");
			}
		},this);
	}

	private initGuanZhu():void
	{
		var btnAdd = Global.createBitmapByName("btn_add_png");
		btnAdd.x = 480;
		btnAdd.y = 23;
		this.addChild(btnAdd);
		Global.setBut(btnAdd);
		btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>
		{
			PopManager.showPop("GuanZhuPop");
		},this);

		var btnActive = Global.createBitmapByName("btn_active_png");
		btnActive.x = 480;
		btnActive.y = 80;
		this.addChild(btnActive);
		Global.setBut(btnActive);
		btnActive.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>
		{
			PopManager.showPop("HelpPop");
		},this);
	}

	private addTouchHandler():void
	{
		
		// window.location.href = "http://weixin.qq.com/r/tjpcRG3ENTBKrSkn92_k";
	}

	private pingzi:egret.MovieClip;
	public showPingZi():void
	{
		this.pingzi = Global.createMc("pingzi_json","pingzi_png","");
		this.pingzi.frameRate = 12;
		this.pingzi.play(-1);
		this.addChild(this.pingzi);

		this.showPingZiEffect();
		
	}

	private showPingZiEffect():void
	{
		if(!this.pingzi)
		{
			return;
		}
		egret.Tween.get(this.pingzi,{loop:true}).wait(200).call(()=>{
			var tx = Math.floor(Math.random() * 100 - 50);
			var ty = Math.floor(Math.random() * 100 - 50);
			if(tx > 0)
			{
				if(this.pingzi.x + tx > StageUtils.SW - 180)
				{
					tx = 0;	
				}
			}else
			{
				if(this.pingzi.x + tx < 180)
				{
					tx = 0;
				}
			}

			if(ty > 0)
			{
				if(this.pingzi.y + ty > StageUtils.SH - 240)
				{
					tx = 0;
				}
			}else
			{
				if(this.pingzi.y + ty < 240)
				{
					tx = 0;
				}
			}
			
			tx += this.pingzi.x;
			ty += this.pingzi.y;

			if(tx < 180)
			{
				tx = 180;
			}else if(tx > StageUtils.SW - 180)
			{
				tx = StageUtils.SW - 180;
			}

			if(ty < 240)
			{
				ty = 240;
			}else if(ty > StageUtils.SH - 240)
			{
				ty = StageUtils.SH - 240;
			}
			
			egret.Tween.get(this.pingzi).to({x:tx,y:ty},200);
		});
	}

	private box1;
	private box2;
	private box3;
	public showBox():void
	{
		var box1 = Global.createBitmapByName("icon1_png");
		box1.x = 400;
		box1.y = 200;
		this.addChild(box1);
		Global.setBut(box1);
		box1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.boxClickHandler,this);

		var box2 = Global.createBitmapByName("icon1_png");
		box2.x = 50;
		box2.y = 500;
		this.addChild(box2);
		Global.setBut(box2);
		box2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.boxClickHandler,this);

		var box3 = Global.createBitmapByName("icon1_png");
		box3.x = 200;
		box3.y = 700;
		this.addChild(box3);
		Global.setBut(box3);
		box3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.boxClickHandler,this);
		this.box1 = box1;
		this.box2 = box2;
		this.box3 = box3;
	}

	private isFirst = true;
	private boxClickHandler(e:egret.TouchEvent):void
	{
		if(!this.isFirst)
		{
			return;
		}
		this.isFirst = false;
		var target = e.target;
		egret.Tween.removeTweens(this.pingzi);
		egret.Tween.get(this.pingzi).to({x:e.target.x,y:e.target.y + 100},500)
		.to({y:e.target.y + 150},100)
		.to({y:e.target.y + 100},100)
		.to({y:e.target.y + 150},100)
		.to({y:e.target.y + 100},100)
		.to({y:e.target.y + 150},100)
		.to({y:e.target.y + 100},100).call(()=>{
			
			egret.Tween.get(target)
			.to({x:target.x + 10},50)
			.to({x:target.x},50)
			.to({x:target.x + 10},50)
			.to({x:target.x},50)
			.to({x:target.x + 10},50)
			.to({x:target.x},50)
			.call(()=>
			{
				this.play();
			});
		});
	}

	public play():void
	{
		this.showPingZiEffect();
		if(this.box1)
		{
			this.removeChild(this.box1);
			this.box1 = null;
		}
		if(this.box2)
		{
			this.removeChild(this.box2);
			this.box2 = null;
		}
		if(this.box3)
		{
			this.removeChild(this.box3);
			this.box3 = null;
		}

		var self = this;
		var ticket = sessionStorage.getItem("ticket");
		console.log(ticket);
		if(ticket != undefined){
			$.ajax({
				url: MapManager.PLAY_API,
				data: {ticket:ticket},
				success: function(data)
				{
					console.log(data);
					if(data.result == "success")
					{
						if(data.prizes[0].type == "cash"){
							PopManager.showPop("RewardPop",{val:data.prizes[0].desc,ticket:data.prizes[0].ticket});
						}else{
							//卡卷
							window.location.href = data.prizes[0].value;
						}

						// if(data.more.result == "success")
						// {
						// 	if(data.more.desc == "sw")
						// 	{
						// 		PopManager.showPop("RewardPop",{val:1,ticket:data.more.ticket});
						// 	}else if(data.more.desc == "hb")
						// 	{
						// 		PopManager.showPop("RewardPop",{val:data.more.val,ticket:data.more.ticket});
						// 	}else
						// 	{
						// 		//卡卷
						// 		window.location.href = data.more.val;
						// 	}
						// }else
						// {
						// 	PopManager.showPop("ErrorPop",2);
						// }
					}else
					{
						PopManager.showPop("ErrorPop",2);
					}
				},
				error: function(err)
				{
					Message.show("error");
				},timeout: 8000,
				dataType: "json",async: true,type: "POST",
				complete: function(XMLHttpRequest,status)
				{
					if(status == 'timeout')
					{
						Message.show("timeout");
					}
				}
			});
		}
	}

	private hbClickHandler():void
	{
		var self = this;
		$.ajax({
			url: MapManager.PLAY_API,
			data: {ticket:MapManager.PLAY_TICKET},
			success: function(data)
			{
				if(data.result == "success")
				{
					// if(data.more.result == "success")
					// {
						PopManager.showPop("RewardPop",data.more);
					// }
					// else
					// {
					// 	PopManager.showPop("ErrorPop",2);
					// }
				}else
				{
					PopManager.showPop("ErrorPop",2);
				}
			},
			error: function()
			{
			},timeout: 8000,
			dataType: "json",async: true,type: "POST",
			complete: function(XMLHttpRequest,status)
			{
				if(status == 'timeout')
				{
				}
			}
		});
	}

	private posX = [280,530,130,150,520];
	private posY = [800,300,750,500,670];

	private shopList = {};

	/**
	 * lng
	 * lat
	 * name
	 * id
	 * type
	 * address
	 */
	public showShop(list):void
	{
		if(list)
		{
			var temp = 0;
			var len = list.length;
			for(var i = 0;i<len;i++)
			{
				var obj = list[i];
				if(obj)
				{
					obj.shopid = 4;
					var shop = new ShopItemView(obj);
					
					this.shopContainer.addChild(shop);
					this.shopList[obj.shopid] = shop;
					shop.touchEnabled = true;
					shop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shopClickHandler,this);
					Global.setBut(shop);

					shop.refreshPos();
					// if(obj.ticket)
					// {
					// 	this.filterList[obj.shopid] = shop;
					// 	temp ++;
					// }
				}
			}
		}
		if(this.container)
		{
			if(this.container.parent)
			{
				this.removeChild(this.container);
			}
		}
		this.container = null;
	}

	

	private shopClickHandler(e:egret.TouchEvent):void
	{
		// if(e.target.status)
		// {
		// 	if(e.target.type == 2)
		// 	{
		// 		PopManager.showPop("ShopPop",e.target.obj);
		// 	}else
		// 	{
		// 		this.play(e.target.obj);
		// 	}
		// }

		PopManager.showPop("ShopPop",e.target.obj);
	}

	public getReward(id,kq = 0):void
	{
		var self = this;
		var iswin = 1;
		if(id == 10)
		{
			id = 0;
			iswin = 0;
		}
		var dat;
		if(kq)
		{
			dat = {ticket:MapManager.USER_TICKET,isshared:MapManager.isShared,shopid:id,iswin:iswin,kq:1};
		}else
		{
			dat = {ticket:MapManager.USER_TICKET,isshared:MapManager.isShared,shopid:id,iswin:iswin};
		}
		$.ajax({
			url: MapManager.PLAY_API,
			data: dat,
			success: function(data)
			{
				if(data.result == 0 || data.result == "success")
				{
					// 					cashed：100；领取金额数
					// energy：0 领取能量值
					// coin:0  金币

					if(data.shopid == "0" || data.shopid == "10")
					{
						PopManager.showPop("LanternResultPop",data);
						
						// self.filterList[0] = null;
						// delete self.filterList[0];
					}else
					{
						if(data.kq && data.kq1)
						{
							PopManager.showPop("RewardPop",data);
						}else if(data.kq)
						{
							var addcard = eval("$.addCard");
							addcard(this,data.signs,function(){
								console.log("领取成功");
								self.getReward(1,1);
							},function(){
								console.log("领取失败");
							});
						}else
						{
							PopManager.showPop("RewardPop",data);
						}
						// MainView.instance.refreshInfo();

						// var shop = self.filterList[data.shopid];
						// if(shop)
						// {
						// 	// shop.filters = MainView.nullFilter;
						// 	self.filterList[data.shopid] = null;
						// 	delete self.filterList[data.shopid];
						// }
					}
				}else
				{
					// var shop = self.filterList[id];
					// if(shop)
					// {
					// 	// shop.filters = MainView.nullFilter;
					// 	self.filterList[id] = null;
					// 	delete self.filterList[id];
					// }
					if(data.result == 6)
					{
						Message.show("领取失败，请重新领取");
					}else if(data.result == 2)
					{
						Message.show("分享数量达到上限");
					}else if(data.result == 3)
					{
						Message.show("已经领取过");
					}
					else
					{
						Message.show("系统异常:"+data.result);
					}
				}
			},
			error: function()
			{
				//Main.showLost(2);
				
			},timeout: 8000,
			dataType: "json",async: true,type: "POST",
			complete: function(XMLHttpRequest,status)
			{
				if(status == 'timeout')
				{
					//Main.showLost(2);
				}
			}
		});
	}
}