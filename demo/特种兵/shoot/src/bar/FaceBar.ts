/**
 *
 * @author 
 *
 */
class FaceBar extends egret.Sprite {
    
    public constructor() {
        super();
        var faceBg = Global.createBitmapByName('face_bg_png');
        this.addChild(faceBg);
    }
    public loadFace(url): void {
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        loader.load(request);
    }

    private onLoadComplete(event: egret.Event): void {
        var _this1 = this;
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        var texture: egret.Texture = <egret.Texture>loader.data;
        var face = new egret.Bitmap(texture);
        var faceMask=new egret.Shape();
        faceMask.graphics.beginFill(0x0,1);
        faceMask.graphics.drawCircle(60,60,60);
        
        face.x = 0;
        face.y = 0;
        face.width = face.height = 128;

        faceMask.x=4;
        faceMask.y=4;
        
        
        this.addChild(face);
        this.addChild(faceMask);
        face.mask = faceMask;
        face.alpha=0;
        Global.fadeIn(face);
        
    }

}
