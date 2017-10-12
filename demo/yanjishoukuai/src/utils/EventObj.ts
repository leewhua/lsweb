/**
 *
 * @author 
 *
 */
class EventObj extends egret.Event{
    public name: string;
    public constructor(type: string, name:string,bubbles?: boolean, cancelable?: boolean, data?: any) {
        super(type, bubbles, cancelable, data);
        this.name = name;
    }
                
}
