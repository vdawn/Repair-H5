function setTitle() {
	window.location.href = "om_protocol://setTitle(选择机型)"
}
function setUserInfo(userInfo, token) {
	$.ajax({
		url: url+'business/queryserver?pid=101',
		type: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
			"token": token
		},
		success: function(data) {
			localStorage.setItem("pid", data.data.Businesslist[0].pid);
			$("#container").html(template("tpl1", {
					data: data.data.Businesslist
				}))
				//存储设备区分id
			localStorage.setItem("equipmentId", data.data.Businesslist[0].pid);
			$("#container>#father").click(function() {
				var serviceid = $(this).context.dataset.serviceid;
				const a = $(this).context.dataset;
				//存储机型及对应id
				localStorage.setItem("model", a.model);
				localStorage.setItem("serviceid", a.serviceid);
				window.location.href = "phonefaulth.html?" + "serviceid=" + serviceid;
			})
		}
	});
	showBackButton();
}
$(function() {
	LoadUserInfo();
	setTimeout("setTitle()", 100);

})