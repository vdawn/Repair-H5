function setTitle() {
	window.location.href = "om_protocol://setTitle(选择机型)"
}
function setUserInfo(userInfo,token){
		$.ajax({
			url: url+'business/queryserver?pid=103',
			type: "POST",
			headers: {
			     "Content-Type":"application/json;charset=utf-8","token":token
		    },
			success: function(data) {
				localStorage.setItem("pid", data.data.Businesslist[0].pid);
				$("#container").html(template("tpl1", {
					data:data.data.Businesslist
				}));
				//存储设备区分id
					localStorage.setItem("equipmentId",data.data.Businesslist[0].pid);
				$("#container>#father").click(function() {
					var serviceid = $(this).context.dataset.serviceid
						//存储机型及对应id
					localStorage.setItem("model", $(this).context.dataset.model);
					localStorage.setItem("serviceid", $(this).context.dataset.serviceid);
					localStorage.setItem("colorid", null);
					location.href = "faulth.html?" + "serviceid=" + serviceid;

				})
			}
		});
		showBackButton();
}
$(function () {
		LoadUserInfo();
	setTimeout("setTitle()", 100);
})	 
