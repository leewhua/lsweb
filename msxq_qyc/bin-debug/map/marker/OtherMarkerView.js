var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OtherMarkerView = (function (_super) {
    __extends(OtherMarkerView, _super);
    function OtherMarkerView() {
        return _super.call(this) || this;
    }
    OtherMarkerView.prototype.touchClickHandler = function (e) {
        if (this.showMenu) {
            MenuView.instance.showMenu(this);
        }
        else {
            MenuView.instance.showMenu(this, MenuView.OTHER_MENU);
        }
        this.showMenu = !this.showMenu;
    };
    return OtherMarkerView;
}(SelfMarkerView));
__reflect(OtherMarkerView.prototype, "OtherMarkerView");
//# sourceMappingURL=OtherMarkerView.js.map