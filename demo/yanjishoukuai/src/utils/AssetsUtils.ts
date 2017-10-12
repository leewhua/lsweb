class AssetsUtils {
	public constructor() {
	}
	/**
	 * 获得单张图片
	 */
    public static createBitmapByName(name: string,x=0,y=0): egret.Bitmap 
	{
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.x=x;
        result.y=y;
        return result;
    }
}