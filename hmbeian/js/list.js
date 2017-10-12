$(function () {

    var ipt = $('#list_item').find('input');
    // console.log(ipt);
    $('#checkedAll').click(function () {
        if (ipt.prop("checked")){
            ipt.prop("checked", false);
        }else {
            ipt.prop("checked", true);
        }
    });

    $('#btnHelp').click(function () {
        // $('#mask').css("display", "block");
        $('#mask').show();
        $('#close').click(function () {
            $('#mask').hide();
            // $('#mask').css("display", "none");
        });
    });

//滚动列表
    $(window).resize(function () {
        resize();
    });
    function resize(){
        var head_H = $('#field').height();
        // var footer_H = $('#bottom').height();
        $('#list_item').css({
            "top": head_H
        });
    }
    resize();
});