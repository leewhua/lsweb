/**
 *
 * @author 
 *
 */
class Action {
    
    static linkTo(page,save=false){
        if(save)Api.cookie('page',page,{ expires: 1});
        window.location.href=page;
    }
    
    static toCookiePage(){
        var ticket = Api.cookie('ticket');
        var page = Api.cookie('page');
        if(Api.user_ticket == ticket && page == "exchange") {
            Action.linkTo(page);
        }
        Api.cookie('ticket',Api.user_ticket,{ expires: 1 });
    }
   
	public constructor() {
	}
}
