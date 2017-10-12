
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"polyfill/promise.min.js",
	"libs/jquery.js",
	"libs/ls.js",
	"bin-debug/pop/PopView.js",
	"bin-debug/view/dealer/LoginPop.js",
	"bin-debug/view/dealer/SelectListPop.js",
	"bin-debug/comp/CustomTabbar.js",
	"bin-debug/comp/CustomTabButton.js",
	"bin-debug/comp/QRCode.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/pop/PopManager.js",
	"bin-debug/comp/CustomButton.js",
	"bin-debug/UIManager.js",
	"bin-debug/utils/AudioManager.js",
	"bin-debug/utils/CustomImage.js",
	"bin-debug/utils/ErrorCode.js",
	"bin-debug/utils/GameDispatcher.js",
	"bin-debug/utils/Global.js",
	"bin-debug/utils/Message.js",
	"bin-debug/utils/StageUtils.js",
	"bin-debug/view/dealer/ChangeIDPop.js",
	"bin-debug/view/dealer/ChangePWPop.js",
	"bin-debug/view/dealer/confimPay/ConfimPayItem.js",
	"bin-debug/view/dealer/confimPay/ConfimPayPop.js",
	"bin-debug/view/dealer/confimPay/PayDetailItem.js",
	"bin-debug/view/dealer/confimPay/PayDetailPop.js",
	"bin-debug/view/dealer/ListItem.js",
	"bin-debug/view/dealer/ListPop.js",
	"bin-debug/comp/CustomScrollView.js",
	"bin-debug/view/dealer/PayOKPop.js",
	"bin-debug/view/dealer/SelectListItem.js",
	"bin-debug/comp/CustomCheckBox.js",
	"bin-debug/view/ErrorPop.js",
	"bin-debug/view/GameView.js",
	"bin-debug/view/personal/AddressPop.js",
	"bin-debug/view/personal/BuySendOKPop.js",
	"bin-debug/view/personal/BuySendPop.js",
	"bin-debug/view/personal/ConfirmAddress.js",
	"bin-debug/view/personal/GetShareOKPop.js",
	"bin-debug/view/personal/HasGetBuyPop.js",
	"bin-debug/view/personal/HasGetInfoPop.js",
	"bin-debug/view/personal/HasGetPop.js",
	"bin-debug/view/personal/InfoPop.js",
	"bin-debug/view/personal/IntoSharePop.js",
	"bin-debug/view/personal/item/BuySendItem.js",
	"bin-debug/view/personal/item/InfoCardItem.js",
	"bin-debug/view/personal/item/InfoOrderItem.js",
	"bin-debug/view/personal/item/InfoShareItem.js",
	"bin-debug/view/personal/item/MailItem.js",
	"bin-debug/view/personal/MailSelectPop.js",
	"bin-debug/view/personal/OrderOKPop.js",
	"bin-debug/view/personal/PersonalPop.js",
	"bin-debug/view/personal/SharePop.js",
	"bin-debug/view/personal/StopJihuoPop.js",
	"bin-debug/view/select/DetailItem.js",
	"bin-debug/view/select/DetailSimpleItem.js",
	"bin-debug/view/select/DetailView.js",
	"bin-debug/view/select/DownView.js",
	"bin-debug/view/select/SelectLoginPop.js",
	"bin-debug/view/select/SelectPop.js",
	"bin-debug/view/TipsPop.js",
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
		frameRate: 60,
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