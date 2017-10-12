/**
 *
 * @author 
 *
 */
class SoundManager
{
    private static _instance:SoundManager;

    public isLoad:boolean;

    public static getInstance():SoundManager
    {
        if(!SoundManager._instance)
        {
            SoundManager._instance = new SoundManager();
        }
        return SoundManager._instance;
    }

    public constructor() 
    {
    }

    public play(res:string,startTime: number = 0, loops: number = 1):void
    {
        if(this.isLoad)
        {
            var sound:egret.Sound = RES.getRes(res);
            sound.play(startTime,loops);
        }
    }
}
