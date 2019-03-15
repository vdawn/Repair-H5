function setTitle() {
	window.location.href = "om_protocol://setTitle(一盟快修)"
}
$(function() {
	showBackButton();
	setTimeout("setTitle()", 100);
	var faultLoc = location.href;
	var n3 = faultLoc.substr(faultLoc.indexOf('?') + 1);
	var sign = n3.substr(n3.indexOf('=') + 1);
	if (sign == "1") {
		$("#introduce").css("display", "block")
		$("#sign1").css("background-color", "red")
		$("#sign1>a").css("color", "#fff")
	} else if (sign == "2") {
		$("#join").css("display", "block")
		$("#sign2").css("background-color", "red")
		$("#sign2>a").css("color", "#fff")
	} else if (sign == "3") {
		$("#process").css("display", "block")
		$("#sign3").css("background-color", "red")
		$("#sign3>a").css("color", "#fff")
	}
	 history.pushState(null, null, 'indexh.html');
})