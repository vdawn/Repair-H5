function setTitle() {
	window.location.href = "om_protocol://setTitle(一盟快修)"
}
$(function() {
	setTimeout("setTitle()", 100);
	$("#confirm").click(function() {
        localStorage.setItem("model", "苹果电脑系统安装");
		localStorage.setItem("serviceid", "104");
		localStorage.setItem('priceAll', "180");
		localStorage.setItem('moreFault', JSON.stringify(""));
		localStorage.setItem('moreFaultid', '["35"]');
		location.href = "information.html";
	})
})