$(function(){
	mui.plusReady(function () {
		// 返回键
	    mui("header").on("tap",".mui-icon-back",function(){
			mui.back();
		})
		// 输入框聚焦的时候执行的方法
		$("main input").focus(function(){
			$(this).addClass("active");
		}).blur(function(){
			$(this).removeClass("active");
		});
		// 定义一个变量来接收验证码
		let code = null;
		// 点击获取验证码时执行的方法
		mui("main .dCode .change").on("tap",".willSend",async function(){
			code = await getCode();
		})
		// 点击注册执行的方法
		mui("main").on("tap",".btn",async function(){
			let isTrue = verify(code);
			// 当验证都通过后执行
			if(isTrue){
				let isRegister = await hasRegister();
				if(isRegister.code === 0){
					mui.alert('用户名/邮箱已被注册！','提示','确定',function (e) {},'div');
				}else{
					mui.back();
				}
			}
		})
	})
})