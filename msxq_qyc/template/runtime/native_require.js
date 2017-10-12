
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"polyfill/promise.js",
	"libs/jquery.js",
	"libs/ls.js",
	"bin-debug/map/marker/MarkerItemView.js",
	"bin-debug/pop/PopView.js",
	"bin-debug/map/marker/SelfMarkerView.js",
	"bin-debug/utils/ErrorCode.js",
	"bin-debug/map/marker/MapView.js",
	"bin-debug/comp/CustomCheckBox.js",
	"bin-debug/map/marker/OtherMarkerView.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/map/menu/MenuItemView.js",
	"bin-debug/map/menu/MenuView.js",
	"bin-debug/MapManager.js",
	"bin-debug/pop/PopManager.js",
	"bin-debug/Main.js",
	"bin-debug/tetris/item/ItemBox.js",
	"bin-debug/tetris/TetrisGame.js",
	"bin-debug/UIManager.js",
	"bin-debug/UserInfo.js",
	"bin-debug/utils/CountData.js",
	"bin-debug/utils/CustomImage.js",
	"bin-debug/utils/CustomScrollView.js",
	"bin-debug/view/TipsPop.js",
	"bin-debug/utils/GameDispatcher.js",
	"bin-debug/utils/Global.js",
	"bin-debug/utils/Message.js",
	"bin-debug/utils/QRCode.js",
	"bin-debug/utils/StageUtils.js",
	"bin-debug/view/ErrorPop.js",
	"bin-debug/view/GuanZhuPop.js",
	"bin-debug/view/HbPop.js",
	"bin-debug/view/HelpPop.js",
	"bin-debug/view/main/item/ShopItemView.js",
	"bin-debug/view/main/MainView.js",
	"bin-debug/view/ReceivedPop.js",
	"bin-debug/view/RewardPop.js",
	"bin-debug/view/ShareIntoPop.js",
	"bin-debug/view/SharePop.js",
	"bin-debug/view/ShopPop.js",
	"bin-debug/view/SmallShopPop.js",
	"bin-debug/view/SmallShopPop1.js",
	"bin-debug/comp/CustomTabbar.js",
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
		scaleMode: "exactFit",
		contentWidth: 640,
		contentHeight: 1030,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
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