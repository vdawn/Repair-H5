function setTitle() {
	window.location.href = "om_protocol://setTitle(选择机型)"
}
function setUserInfo(userInfo,token){
	var loc = location.href;
	var n1 = loc.substr(loc.indexOf('?') + 1);
	var n2 = n1.substr(n1.indexOf('=') + 1);
	if (n2 == "181") {
		$.ajax({
			url: url+'business/queryserver?pid=181',
			type: "POST",
			headers: {
			     "Content-Type":"application/json;charset=utf-8","token":token
		    },
			success: function(data) {
				localStorage.setItem("pid", data.data.Businesslist[0].pid);
				$("#all").html(template("tpl1", {
					data: data.data.Businesslist
				}));
				//存储设备区分id
					localStorage.setItem("equipmentId",data.data.Businesslist[0].pid);
				$("#androidPic").attr("src", data.data.Businesslist[0].img)
				$("#all>#father").click(function() {
					var serviceid = $(this).context.dataset.serviceid
						//存储机型及对应id
					localStorage.setItem("model", $(this).context.dataset.model);
					localStorage.setItem("serviceid", $(this).context.dataset.serviceid);
					localStorage.setItem("colorId", null);
					location.href = "faulth.html?" + "serviceid=" + serviceid;
				})
			}
		});
	}else if (n2 == "183") {
		$.ajax({
			url: url+'business/queryserver?pid=183',
			type: "POST",
			headers: {
			     "Content-Type":"application/json;charset=utf-8","token":token
		    },
			success: function(data) {
				// $("#result").val(data);
				localStorage.setItem("pid", data.data.Businesslist[0].pid);
				$("#all").html(template("tpl1", {
					data: data.data.Businesslist
				}));
				$("#androidPic").attr("src",data.data.Businesslist[0].img)
				$("#all>#father").click(function() {
					var serviceid= $(this).context.dataset.serviceid
						//存储机型及对应id
					localStorage.setItem("model", $(this).context.dataset.model);
					localStorage.setItem("serviceid", $(this).context.dataset.serviceid);
					localStorage.setItem("colorid", null);
					location.href = "faulth.html?" + "serviceid=" + serviceid;

				})
			}
		});
	}
	showBackButton();
}
$(function () {
	LoadUserInfo();
	setTimeout("setTitle()", 100);
})
