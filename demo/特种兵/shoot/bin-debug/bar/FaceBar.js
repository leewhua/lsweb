var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var FaceBar = (function (_super) {
    __extends(FaceBar, _super);
    function FaceBar() {
        var _this = _super.call(this) || this;
        var faceBg = Global.createBitmapByName('face_bg_png');
        _this.addChild(faceBg);
        return _this;
    }
    FaceBar.prototype.loadFace = function (url) {
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        var request = new egret.URLRequest(url);
        loader.load(request);
    };
    FaceBar.prototype.onLoadComplete = function (event) {
        var _this1 = this;
        var loader = event.target;
        var texture = loader.data;
        var face = new egret.Bitmap(texture);
        var faceMask = new egret.Shape();
        faceMask.graphics.beginFill(0x0, 1);
        faceMask.graphics.drawCircle(60, 60, 60);
        face.x = 0;
        face.y = 0;
        face.width = face.height = 128;
        faceMask.x = 4;
        faceMask.y = 4;
        this.addChild(face);
        this.addChild(faceMask);
        face.mask = faceMask;
        face.alpha = 0;
        Global.fadeIn(face);
    };
    return FaceBar;
}(egret.Sprite));
__reflect(FaceBar.prototype, "FaceBar");
//# sourceMappingURL=FaceBar.js.map