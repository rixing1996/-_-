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
		// 点击确定按钮执行的函数
		// 定义一个接收邮箱地址的变量
		let forgetEmail;
		mui("main").on("tap",".btn1",async function(){
			let isTrue = verify(code);
			if(isTrue){
				let isRegister = await hasRegister();
				if(isRegister.code === 0){
					mui.alert('此邮箱还没注册！','提示','确定',function (e) {},'div');
				}else{
					forgetEmail = $("main .email").val();
					$("main").html(`<input class="common password" type="password" placeholder="请输入修改密码">
						<butto class="btn btn2">确定</butto>`);
				}
			}
		})
		// 确认密码修改按钮
		mui("main").on("tap",".btn2",async function(){
			fgpwdOK(forgetEmail);
		})
	})
})