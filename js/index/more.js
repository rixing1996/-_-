// 为了减少index文件的代码量
// 点击菜单图标的代码
function caidan1(select){
	select.classList.add("active");
	select.classList.remove("mui-icon-bars");
	select.classList.add("mui-icon-arrowright");
	select.classList.add("rotate");
	$("main aside").css("display","block").children(".left").animate({left:"0"},200);
	mui.later(function(){
		select.classList.remove("active");
	},500)
}
function caidan2(select){
	select.classList.add("active");
	select.classList.remove("mui-icon-arrowright");
	select.classList.add("mui-icon-bars");
	select.classList.add("rotateBack");
	$("main aside .left").animate({left:"-69%"},200);
	mui.later(function(){
		$("main aside").css("display","none");
	},200)
	mui.later(function(){
		select.classList.remove("active");
		select.classList.remove("rotate");
		select.classList.remove("rotateBack");
	},500)
}
// 点击搜索图标跳转函数
function suosou(){
	mui.openWindow({
	    url:"./pages/search.html",
	    id:"search",
	    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	    show:{
			autoShow:true,//页面loaded事件发生后自动显示，默认为true
			aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
			duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
	    }
	})
}
// 跳转到登录页面
function gotoLogin(){
	mui.openWindow({
	    url:"./pages/login.html",
	    id:"login",
	    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	    show:{
			autoShow:true,//页面loaded事件发生后自动显示，默认为true
			aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
			duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
	    }
	})
}
// 跳转到用户中心页面
function gotoUser(){
	mui.openWindow({
	    url:"./pages/user.html",
	    id:"user",
	    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	    show:{
			autoShow:true,//页面loaded事件发生后自动显示，默认为true
			aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
			duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
	    }
	})
}
// 刷新用户信息的函数
function showUser(){
	let imgUrl = $("main aside .left .user>img");
	let username = $("main aside .left .user .username");
	let desc = $("main aside .left .user .desc");
	let storageUser = JSON.parse(plus.storage.getItem("user"));
	if(storageUser){
		imgUrl.attr("src",storageUser.touxiang?storageUser.touxiang:"static/default.jpg");
		username.text(storageUser.username);
		desc.text(storageUser.miaoshu?storageUser.miaoshu:"这个人很懒，什么也没有...");
	}else{
		imgUrl.attr("src","static/default.jpg");
		username.text("私人笔记");
		desc.text("记录你的美好时光");
	}
}
// 跳转到分类管理页面
function showTypeManage(){
	mui.openWindow({
	    url:"./pages/typeManage.html",
	    id:"typeManage",
	    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	    show:{
			autoShow:true,//页面loaded事件发生后自动显示，默认为true
			aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
			duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
	    }
	})
}
// 显示类型
function showType(){
	let typeDom = $("main aside .left .type");
	if(!plus.storage.getItem("type")){plus.storage.setItem("type",JSON.stringify(["默认笔记"]))};
	if(plus.storage.getItem("biji")){
		let typeArr = JSON.parse(plus.storage.getItem("type"));
		let bijiArr = JSON.parse(plus.storage.getItem("biji"));
		typeDom.html(`
			<div>
				<span class="typeName">全部笔记 </span><span>(${bijiArr.length})</span>
			</div>
		`);
		for(let i=0;i<typeArr.length;i++){
			let leng = bijiArr.filter(function(item,j){
				return item.type === typeArr[i];
			}).length;
			typeDom.append(`
				<div>
					<span class="typeName">${typeArr[i]} </span><span>(${leng})</span>
				</div>
			`)
		}
	}else{
		typeDom.html(`
			<div>
				<span class="typeName">全部笔记 </span><span>(0)</span>
			</div>
		`);
		let typeArr = JSON.parse(plus.storage.getItem("type"));
		for(let i=0;i<typeArr.length;i++){
			typeDom.append(`
				<div>
					<span class="typeName">${typeArr[i]} </span><span>(0)</span>
				</div>
			`)
		}
	}
}