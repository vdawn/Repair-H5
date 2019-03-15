var fastName;
var fastPhone;
var fastCode;
var fastName;
var countdown = 60;
function setTitle() {
	window.location.href = "om_protocol://setTitle(首页)"
}
$(function() {
	// LoadUserInfo();
	setTimeout("setTitle()", 100);
})
$(function() {
	var lis = $('.problemline');
	lis.click(function() {
		$(this).children('p').css("display", "block");
		$(this).siblings().children('p').css("display", "none");
	})
	hideBackButton();
	$("#fastName").blur(function() {
		fastName = $("#fastName").val()
	})
	$("#fastPhone").blur(function() {
		fastPhone = $("#fastPhone").val()
	})
	$("#fastCode").blur(function() {
		fastCode = $("#fastCode").val()
	})
	$("#saveCode").click(function() {
			var obj = $("#saveCode");
			if (fastPhone == "" || fastPhone == undefined) {} else {
				settime(obj);
				$.ajax({
					url: url+'sms/out',
					type: "POST",
					xhrFields: {      
						withCredentials: true    
					},
					crossDomain: true,
					data: {
						Phone: fastPhone,
					},
					success: function(data) {
						console.log(data)
					}
				});
			}
		})
		//发送验证码倒计时
	function settime(obj) {
		if (countdown == 0) {
			obj.attr('disabled', false);
			//obj.removeattr("disabled"); 
			obj.val("获取验证码");
			countdown = 60;
			return;
		} else {
			obj.attr('disabled', true);
			obj.val("重新发送(" + countdown + ")");
			countdown--;
		}
		setTimeout(function() {
			settime(obj)
		}, 1000)
	}
})
		//确定下单
$("#confirm").click(function(){
		LoadUserInfo()
		
})
function setUserInfo(userInfo, token) {
		$("#aaa").html(token)
	if (token == "" || token == null || token == undefined) {
			login()
	}else{
		$("#bbb").html(token)
		if(fastName==""||fastName==null || fastName == undefined){
            $("#tipWin").css('display', 'block');
            $("#tips").text('请输入姓名');
            setTimeout(function() {
                $("#tipWin").css('display', 'none');
            }, 2000);
		}else{
			$("#ccc").html(token)
			$.ajax({
				url: url+'sms/Verification',
				xhrFields: {      
					withCredentials: true    
				},
				crossDomain: true,
				type: "POST",
				data: {
					phone: fastPhone,
					verification: fastCode,
				},
				success: function(data) {
					console.log(data)
					if (data.message == "Ok") {
						var dataConfirm={
							  source:"APP",
                              user:{
                                "phone":fastPhone,
                                "name": fastName
                              }
						}
						$.ajax({
							url: url+'order/Quick',
							type: "POST",
							headers: {
								"token": token
							},
							contentType: "application/json",
     						data: JSON.stringify(dataConfirm),
							success: function(data) {
								console.log(data)
									if (data.message == "Ok") {
									location.href = "finishh.html";
								}
							}
						});
					}
				}
			});
		}


			}

}

