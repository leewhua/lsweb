class HttpService
{
	protected url:string;
	protected data:any;
	protected post:string;

	public constructor(data:any,post:string = egret.HttpMethod.GET)
	{
		this.data = data;
		this.post = post;
	}

	public exec():void
	{
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		if(this.post == egret.HttpMethod.GET)
		{
			request.open(this.url+"?"+this.data,this.post);
		}else
		{
			request.open(this.url,this.post);
		}
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
		if(this.post == egret.HttpMethod.GET)
		{
			request.send(this.data);
		}else
		{
			request.send();
		}
	}

	private onComplete(e:egret.Event):void
	{
		 var request = <egret.HttpRequest>e.currentTarget;
		 this.result(request.response);
	}

	protected onIOError():void
	{

	}

	protected result(result:string):void
	{

	}
}