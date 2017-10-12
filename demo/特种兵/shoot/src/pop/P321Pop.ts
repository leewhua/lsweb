/**
 *
 * @author 
 *
 */
class P321Pop extends PopView {
   
    public constructor() {
        super();
    }

    public show(hasDelay) {
        super.show(false,false);
        var _this1=this;
        var t3 = new egret.TextField();
        var t2 = new egret.TextField();
        var t1 = new egret.TextField();
        t3.size = t2.size =t1.size = 120;
        t3.textAlign = t2.textAlign =t1.textAlign = "center";
        t3.textColor = t2.textColor = t1.textColor = 0xffffff;
        t3.text='3';
        t2.text = '2';
        t1.text = '1';
        var sp3=new Middle(t3);
        var sp2 = new Middle(t2);
        var sp1 = new Middle(t1);
        
        sp3.x = sp2.x =sp1.x=0;
        sp3.y = sp2.y = sp1.y = 0;
      
        _this1.view.addChild(sp3);
        var tw = egret.Tween.get(sp3);
        tw.to({ scaleX: 3,scaleY: 3,alpha: 0 },500);
        tw.call(function() {
            var tw = egret.Tween.get(sp2);
            tw.wait(500);
            _this1.view.addChild(sp2);
            tw.to({ scaleX: 3,scaleY: 3,alpha: 0 },500);
            tw.call(function() {
                var tw = egret.Tween.get(sp1);
                tw.wait(500);
                _this1.view.addChild(sp1);
                tw.to({ scaleX: 3,scaleY: 3,alpha: 0 },500);
                tw.call(function() {
                    this.dispatchEvent(new EventObj('event','play',true));
                });
            });
        });
        
    }

}
