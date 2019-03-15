function setTitle() {
	window.location.href = "om_protocol://setTitle(通用机型)"
}
function setUserInfo(userInfo,token){
        localStorage.removeItem("moreFault");
		$.ajax({ //获取手机故障
		url: url+'parts/queryserver?PartsService=266',
		type: "POST",
		headers: {
			 "Content-Type":"application/json;charset=utf-8","token":token
		},
		success: function(data) {
			console.log(data)
			$("#chooseFault").html(template("tpl1", {
				data: data.data.YmPartslist
			}));
			$("#chooseFault>#selFault").click(function() {
				($(this).children('img').css("visibility") == "hidden") ? $(this).children('img').css('visibility', 'visible'): $(this).children('img').css('visibility', 'hidden');			    
			})
			$("#chooseFault>#selFault").eq(0).click();
		}
	});
$("#next").click(function() {	
		var moreFault = []; //故障数组
		var moreFaultPrice= [];
		var moreFaultid = [];
		var priceAll = 0; //总价
		$("#chooseFault>#selFault").each(function() {
			if ($(this).children('img').css("visibility") == "visible") {
				var prices = parseInt($(this).children('p').children('#price').html())
				priceAll += prices
				moreFault.push($(this).children('span').html())
				moreFaultPrice.push(prices);
				moreFaultid.push($(this).children('span').attr("data-partsId"))
				localStorage.setItem('model', "通用");
				localStorage.setItem("pid", "267");
				localStorage.setItem('serviceid', 266);
				localStorage.setItem('priceAll', priceAll);
				localStorage.setItem('moreFault', JSON.stringify(moreFault));
				localStorage.setItem('moreFaultPrice', JSON.stringify(moreFaultPrice));
				localStorage.setItem('moreFaultid', JSON.stringify(moreFaultid));
				localStorage.setItem('colorid', JSON.stringify(""));
			}
		});
    if(localStorage.getItem('moreFault')==null){
        $("#tipWin").css('display', 'block');
        $("#tips").text('请选择故障');
        setTimeout(function() {
            $("#tipWin").css('display', 'none');
        }, 2000);
    }else{
        location.href = "informationh.html";
    }
	})
showBackButton();
}
$(function () {
	LoadUserInfo();
	setTimeout("setTitle()", 100);
})	
