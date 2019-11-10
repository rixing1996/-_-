$(function(){
	mui.plusReady(function () {
		// 给侧边栏菜单设定高度
		$("main aside").css("height",(document.documentElement.clientHeight-5.5*(Math.floor(document.documentElement.clientWidth/36)))+"px");
		// 点击头部图标触发的事件
		let caidanType = true;//定义一个变量，阻止多次点击
		mui("header").on("tap",".mui-icon",function(){
			let self = this;
			// 点击导航图标的时候
			if(this.classList.contains("mui-icon-bars")){
				if(caidanType){
					caidan1(self);
					caidanType = false;
					mui.later(function(){
						caidanType = true; 
					},200)
				}
			}else if(this.classList.contains("mui-icon-arrowright")){
				if(caidanType){
					caidan2(self);
					caidanType = false;
					mui.later(function(){
						caidanType = true; 
					},200)
				}
			}
			// 点击搜索的时候
			if(this.classList.contains("mui-icon-search")){
				suosou();
			}
		})
		// 点击遮罩层撤回菜单
		mui("main aside").on("tap",".right",function(){
			caidan2(mui("header .left .mui-icon")[0]);
		})
		// 点击用户信息的时候
		mui("main aside .left").on("tap",".user",function(){
			// 判断用户是否已登录
			if(plus.storage.getItem("user")){
				gotoUser();
			}else{
				// 未登录,跳转到登录页面
				gotoLogin();
			}
		})
		// 用户信息显示函数
		showUser();
		// 点击分类管理执行的函数
		mui("main aside .left").on("tap",".typeManage",function(){
			showTypeManage();
		})
		// 显示类型
		showType();
		// 监听自定义事件,刷新页面数据
		window.addEventListener('refresh',function(event){
			// 刷新用户信息
			showUser();
			// 刷新笔记类型
			showType();
		});
	})
})