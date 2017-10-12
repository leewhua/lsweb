var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PopManager = (function () {
    // private static _instance:PopManager;
    // public static get instance():PopManager
    // {
    // 	if(!PopManager._instance)
    // 	{
    // 		PopManager._instance = new PopManager();
    // 	}
    // 	return PopManager._instance;
    // }
    function PopManager() {
    }
    PopManager.showPop = function (pop, data) {
        if (data === void 0) { data = null; }
        var view = PopManager.popDic[pop];
        if (view) {
            view.setData(data);
        }
        else {
            view = eval("new " + pop + "()");
            if (view) {
                view.setData(data);
            }
            PopManager.popDic[pop] = view;
        }
        view.show();
    };
    PopManager.hidePop = function (pop) {
        var view = PopManager.popDic[pop];
        if (view) {
            view.hide();
            delete PopManager.popDic[pop];
        }
        else {
            console.log(pop + ":不存在");
        }
    };
    return PopManager;
}());
PopManager.popDic = {};
__reflect(PopManager.prototype, "PopManager");
//# sourceMappingURL=PopManager.js.map