function setTitle() {
	window.location.href = "om_protocol://setTitle(选择故障)"
}
function setUserInfo(userInfo,token){
	//通过url截取serviceid
var faultLoc = location.href;
var n3 = faultLoc.substr(faultLoc.indexOf('?') + 1);
var faultserviceid =parseInt(n3.substr(n3.indexOf('=') + 1));
localStorage.removeItem("moreFault");
		$.ajax({//获取故障
			url: url+'parts/queryserver?PartsService='+faultserviceid,
			type: "POST",
			headers: {
			     "Content-Type":"application/json;charset=utf-8","token":token
		    },
			success: function(data) {

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
				moreFault.push($(this).children('span').html());
				moreFaultPrice.push(prices);
				moreFaultid.push($(this).children('span').attr("data-partsId"))
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