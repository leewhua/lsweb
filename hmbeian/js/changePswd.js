$(function () {
	$('body').height($('body')[0].clientHeight);
	$('#changePswd').click(function () {
		
		$('#mask').css("display", "block");
		$('#popup1').css("display", "block");

		$('#close').click(function () {
			$('#mask').css("display", "none");
			$('#popup1').css("display", "none");
		});
	});
	$('#changeAcc').click(function () {

		$('#mask').css("display", "block");
		$('#popup2').css("display", "block");

		$('#close1').click(function () {
			$('#mask').css("display", "none");
			$('#popup2').css("display", "none");
		});
	});
});