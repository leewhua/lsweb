/**
 *
 * @author 
 *
 */
class Win extends egret.DisplayObjectContainer{
    private start: egret.Sprite;
    private help_btn: egret.Sprite;
    private home_title: egret.Sprite;
   
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener('event',this.eventHandler,this);
    }
    private eventHandler(event: EventObj): void {
        switch(event.name) {
            case 'close_help':
                console.log("close_help");
                //this.removeChild();
                break;
            case 'play_end':
                console.log("play_end");
            
                break;
            case 'to_shop':
                break;
        }
        console.log(event.type + ":" + event.name);
    }

    private onAddToStage(event:egret.Event) {
        //初始化intro
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
       
      
    }
    
}
