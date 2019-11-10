$(function(){
	mui.plusReady(function () {
		// 显示数据
		showData();
	    // 返回键
	    mui("header").on("tap",".mui-icon-back",function(){
	    	mui.back();
	    })
	    // 点击用户名执行的方法
	    mui("main").on("tap",".username",function(){
	    	$(".showUsername").show();
	    })
	    // 点击取消
	    mui(".showUsername").on("tap",".no",function(){
	    	usernameNo();
	    })
		// 点击确定
		mui(".showUsername").on("tap",".ok",function(){
			usernameOk();
		})
		// 点击性别执行的方法
		mui("main").on("tap",".gender",function(){
			$(".showGender").show();
		})
		// 点击取消
		mui(".showGender").on("tap",".no",function(){
			genderNo();
		})
		// 点击确定
		mui(".showGender").on("tap",".ok",function(){
			genderOk();
		})
		// 点击年龄执行的方法
		mui("main").on("tap",".age",function(){
			$(".showAge").show();
		})
		// 点击取消
		mui(".showAge").on("tap",".no",function(){
			ageNo();
		})
		// 点击确定
		mui(".showAge").on("tap",".ok",function(){
			ageOk();
		})
		// 点击地址执行的方法
		mui("main").on("tap",".address",function(){
			$(".showAddress").show();
		})
		// 点击取消
		mui(".showAddress").on("tap",".no",function(){
			addressNo();
		})
		// 点击确定
		mui(".showAddress").on("tap",".ok",function(){
			addressOk();
		})
		// 点击个性签名执行的方法
		mui("main").on("tap",".desc",function(){
			$(".showDesc").show();
		})
		// 点击取消
		mui(".showDesc").on("tap",".no",function(){
			descNo();
		})
		// 点击确定
		mui(".showDesc").on("tap",".ok",function(){
			descOk();
		})
		// 点击退出登录执行的方法
		mui("main .tuichu").on("tap","button",function(){
			if(confirm("您确定要退出登录？")){
				plus.storage.removeItem("user");
				mui.back();
			}
		})
	    // 提示框居中
	    let yiban = $(".showCommon").innerHeight()/2;
	    $(".showCommon").css("transform","translateY(-"+yiban+"px"+")");
		// 点击头像更换图片
		mui("main").on("tap",".touxiang",function(){
			changeTouxiang();
		})
	})
})