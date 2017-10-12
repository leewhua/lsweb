$(function () {
    $('#tab').find('li').click(function () {
       var index = $(this).index();
       $('#tab').find('li').removeClass('active').eq(index).addClass('active');
       $('.main').removeClass('on').eq(index).addClass('on');
       if(index == 1){
           $('#total').hide();
       }else {
           $('#total').show();
       }
    });
});