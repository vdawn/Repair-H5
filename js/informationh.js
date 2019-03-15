function setTitle() {
	window.location.href = "om_protocol://setTitle(一盟快修)"
}
function LoadUserInfo() {
	window.location.href = "om_protocol://getUserInfo"
}
//修改地址后，供ios回调
function setAddressInfo(info) {
	LoadUserInfo();
}
function setUserInfo(userInfo, token) {
	
	//添加地址
		$("#firstAdd").click(function() {
			if (token == "" || token == null || token == undefined) {
				login();
			} else {
				editAddressInfo();
			}
		});
	if (token != "" && token != null && token != undefined) {
		//	$("#aaa").html(userInfo)
		//地址修改
		$("#address").click(function() {
			editAddressInfo();
		});
		// 判断有无地址-地址显示
		if (JSON.parse(userInfo).address == null || JSON.parse(userInfo).address == "" || JSON.parse(userInfo).address == undefined) {
			$("#address").css('display', 'none');
			$("#firstAdd").css('display', 'block');
		} else {
			$("#address").css('display', 'block');
			$("#firstAdd").css('display', 'none');
		}
		//判断显示用户地址，信息
		if (JSON.parse(userInfo).ymAddress != null && JSON.parse(userInfo).ymAddress != "" && JSON.parse(userInfo).ymAddress != undefined) {
			var userAddress1 = JSON.parse(userInfo).ymAddress.city.parentCity.parentCity.name; //省
			var userAddress2 = JSON.parse(userInfo).ymAddress.city.parentCity.name; //市
			var userAddress3 = JSON.parse(userInfo).ymAddress.city.name; //区
			var userAddress4 = JSON.parse(userInfo).ymAddress.detailed; //详细
			if ((userAddress1 != null && userAddress1 != "" && userAddress1 != undefined) && (userAddress4 != null && userAddress4 != "" && userAddress4 != undefined)) {
				var userAddress = userAddress1 + userAddress2 + userAddress3 + userAddress4;
				$("#addInfo").html(userAddress);
			}
			var userName = JSON.parse(userInfo).ymAddress.name;
			var useSex = JSON.parse(userInfo).ymAddress.sex;
			if (userName != null && userName != "" && userName != undefined) {
				$("#userName").html(userName);
			}
			if (useSex != null && useSex != "" && useSex != undefined) {
				$("#sex").html(useSex);
			}
		}
		var equipmentId = localStorage.getItem('equipmentId'); //设备区分id
		var model = localStorage.getItem('model'); //设备机型
		var serviceid = localStorage.getItem('serviceid'); //设备机型对应id
		var moreFaultid = JSON.parse(localStorage.getItem('moreFaultid')); //故障id
		var priceAll = localStorage.getItem('priceAll'); //价格
		var color = JSON.parse(localStorage.getItem('color'));
		var colorid = JSON.parse(localStorage.getItem('colorid'));
		//确定下单
		$("#finish").click(function() {
			if (token == "" || token == null || token == undefined) {
				login();
			}
			if (JSON.parse(userInfo).ymAddress == null || JSON.parse(userInfo).ymAddress == "" || JSON.parse(userInfo).ymAddress == undefined) {
                $("#tipWin").css('display', 'block');
                $("#tips").text('请添加地址');
                setTimeout(function() {
                    $("#tipWin").css('display', 'none');
                }, 2000);
			} else {
                var userAddress1 = JSON.parse(userInfo).ymAddress.city.parentCity.parentCity.name; //省
                var userAddress2 = JSON.parse(userInfo).ymAddress.city.parentCity.name; //市
                var userAddress3 = JSON.parse(userInfo).ymAddress.city.name; //区
                var userAddress4 = JSON.parse(userInfo).ymAddress.detailed; //详细
                if ((userAddress1 != null && userAddress1 != "" && userAddress1 != undefined) && (userAddress4 != null && userAddress4 != "" && userAddress4 != undefined)) {
                    //$("#aaa").html(userAddress1 + userAddress2 + userAddress3 + userAddress4);
                    $.ajax({
                        url: url+'order/add',
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        contentType: "application/json",
                        data: JSON.stringify({
                            "order": {
                                "servicePid": equipmentId, //设备区分
                                "serviceId": serviceid, //设备id
                                "serviceColour": colorid, //颜色id
                                "address": userAddress1 + userAddress2 + userAddress3 + userAddress4,
                                "userId": JSON.parse(userInfo).id
                            },
                            "partsidArr": moreFaultid, //故障id
                            "source": "APP订单"
                        }),
                        success: function(data) {
                            if (data.message == "Ok") {
                                window.location.href = "finishh.html"
                                localStorage.setItem('colorid', JSON.stringify("待客服沟通确定"));
                            }
                        }
                    });
                }

			}
		})
		showBackButton();

	} else {
		//确定下单
		$("#finish").click(function() {
			login();
		});
	}

}

$(function() {
	LoadUserInfo();
	setTimeout("setTitle()", 100);
	var moreFault = JSON.parse(localStorage.getItem('moreFault')); //故障
    var moreFaultPrice = JSON.parse(localStorage.getItem('moreFaultPrice'));
	$("#modelText").html(localStorage.getItem('model'))
	$("#priceAll").html(localStorage.getItem('priceAll'))
	$("#moreFault").html(template("tpl1", {
		moreFault: moreFault
	}));
	$("#moreFaultPrice").html(template("tpl2", {
		moreFaultPrice: moreFaultPrice
	}));
	//勾选协议
	$(".checkbox").click(function() {
		if (this.checked) {
			$('#confirm').attr("disabled", false);
		} else {
			$('#confirm').attr("disabled", "disabled");
		}
	});

});