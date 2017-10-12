
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/jquery.js",
	"libs/iscroll.js",
	"bin-debug/base/PopView.js",
	"bin-debug/base/GameInfo.js",
	"bin-debug/bar/EnemyBar.js",
	"bin-debug/bar/FaceBar.js",
	"bin-debug/bar/FlyBar.js",
	"bin-debug/bar/GrenadeBar.js",
	"bin-debug/bar/GunBar.js",
	"bin-debug/bar/GunMiniBar.js",
	"bin-debug/bar/GunRenBar.js",
	"bin-debug/bar/JfBar.js",
	"bin-debug/bar/MineBar.js",
	"bin-debug/bar/PlayRenBar.js",
	"bin-debug/bar/SelectRenBar.js",
	"bin-debug/bar/ShootBar.js",
	"bin-debug/bar/TipBar.js",
	"bin-debug/base/Action.js",
	"bin-debug/base/Api.js",
	"bin-debug/base/Buttom.js",
	"bin-debug/base/EventObj.js",
	"bin-debug/bar/ControlBar.js",
	"bin-debug/base/Global.js",
	"bin-debug/base/Middle.js",
	"bin-debug/base/MsgPop.js",
	"bin-debug/bar/BulletBar.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/PlayPage.js",
	"bin-debug/pop/BuyEndPop.js",
	"bin-debug/pop/EndPop.js",
	"bin-debug/pop/HbPop.js",
	"bin-debug/pop/HelpPop.js",
	"bin-debug/pop/LostPop.js",
	"bin-debug/pop/P321Pop.js",
	"bin-debug/pop/SelectGunPop.js",
	"bin-debug/pop/SelectPop.js",
	"bin-debug/pop/ShopPop.js",
	"bin-debug/pop/WinPop.js",
	"bin-debug/SettingPage.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1200,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};