$(function(){
	mui.plusReady(function () {
	    // 返回键
		mui("header").on("tap",".mui-icon-back",function(){
			plus.storage.setItem("title","陈日兴");
			mui.back();
		})
		// 输入框聚焦时的执行方法
		$("main .common").focus(function(){
			$(this).addClass("active");
		}).blur(function(){
			$(this).removeClass("active");
		});
		// 点击注册按钮跳转到注册页面
		mui("main .other").on("tap",".register",function(){
			mui.openWindow({
			    url:"./register.html",
			    id:"register",
			    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			    show:{
					autoShow:true,//页面loaded事件发生后自动显示，默认为true
					aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
					duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			    }
			})
		})
		// 点击忘记密码跳转到修改密码页面
		mui("main .other").on("tap",".forget",function(){
			mui.openWindow({
			    url:"./forget.html",
			    id:"forget",
			    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			    show:{
					autoShow:true,//页面loaded事件发生后自动显示，默认为true
					aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
					duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			    }
			})
		})
		// 点击登录执行的函数
		mui("main").on("tap",".btn",function(){
			let username = $("main .username").val();
			let password = $("main .password").val();
			if(username === ""){
				mui.alert('用户名不能为空！','提示','确定',function (e) {},'div');
			}else if(password.length<6||password.length>18){
				mui.alert('密码的长度为6-18位！','提示','确定',function (e) {},'div');
			}else{
				mui.ajax('http://192.168.42.205:1909/user/login',{
					data:{
						username,
						password
					},
					dataType:'json',//服务器返回json格式数据
					type:'get',//HTTP请求类型
					success:function(data){
						let result = data.data[0];
						if(result){
							plus.storage.setItem("user",JSON.stringify(result));
							mui.back();
						}else{
							mui.alert('密码错误！','提示','确定',function (e) {},'div');
						}
					}
				});
			}
		})
		// 监听自定义事件,刷新页面数据
		window.addEventListener('refresh',function(event){
			$("main .username").val("");
			$("main .password").val("");
		});
	})
	
})