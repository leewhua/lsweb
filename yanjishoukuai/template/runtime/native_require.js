
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/jquery.js",
	"bin-debug/utils/PopUp.js",
	"bin-debug/game/GameTipView.js",
	"bin-debug/game/LastTimeView.js",
	"bin-debug/game/ManView.js",
	"bin-debug/game/PropItemView.js",
	"bin-debug/game/PropListView.js",
	"bin-debug/GameView.js",
	"bin-debug/HelpPop.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/LoadingUI1.js",
	"bin-debug/LoginView.js",
	"bin-debug/Main.js",
	"bin-debug/Scanned.js",
	"bin-debug/utils/StageUtils.js",
	"bin-debug/TipsView.js",
	"bin-debug/utils/AssetsUtils.js",
	"bin-debug/utils/CustomImage.js",
	"bin-debug/utils/EventName.js",
	"bin-debug/utils/EventObj.js",
	"bin-debug/utils/GameDispatcher.js",
	"bin-debug/utils/Global.js",
	"bin-debug/utils/HttpService.js",
	"bin-debug/utils/Message.js",
	"bin-debug/utils/Middle.js",
	"bin-debug/EndView.js",
	"bin-debug/utils/SoundManager.js",
	"bin-debug/SubmitView.js",
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
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
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
		scaleMode: "exactFit",
		contentWidth: 640,
		contentHeight: 1130,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 99,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};