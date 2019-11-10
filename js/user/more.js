// 获取数据显示
function showData(){
	let imgUrl = $(".touxiang .right>img");
	let username = $(".username .right .name");
	let gender = $(".gender .right .xingbie");
	let age = $(".age .right .nianling");
	let address = $(".address .right .dizhi");
	let desc = $(".desc>p");
	let storage = JSON.parse(plus.storage.getItem("user"));
	imgUrl.attr("src",storage.touxiang?storage.touxiang:"../static/default.jpg");
	username.text(storage.username);
	gender.text(storage.gender);
	age.text(storage.age);
	address.text(storage.address);
	desc.text(storage.miaoshu?storage.miaoshu:"这个人很懒，什么也没有...");
}
// 用户名弹窗
function usernameNo(){
	let box = $(".showUsername");
	box.children("input").val("");
	box.hide();
}
function usernameOk(){
	let dom = $(".username .right .name");//用户节点
	let box = $(".showUsername");//修改框
	let data = box.children("input").val();
	let storage = JSON.parse(plus.storage.getItem("user"));
	if(data !== ""){
		mui.ajax('http://192.168.42.205:1909/user/updateUser',{
			data:{
				email:storage.email,
				username:data
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			headers:{'Content-Type':'application/json'},	              
			success:function(res){
				if(res.code === 0){
					box.children("input").val("");
					box.hide();
					mui.alert('用户名已存在！','提示','确定',function (e) {},'div');
				}else{
					dom.text(data);
					storage.username = data;
					plus.storage.setItem("user",JSON.stringify(storage));
					box.children("input").val("");
					box.hide();
				}
			}
		});
	}
}
// 性别弹窗
function genderNo(){
	let box = $(".showGender");
	box.children("input").val("");
	box.hide();
}
function genderOk(){
	let dom = $(".gender .right .xingbie");//用户节点
	let box = $(".showGender");//修改框
	let data = box.children("input").val();
	let storage = JSON.parse(plus.storage.getItem("user"));
	if(data === "男" || data === "女"){
		mui.ajax('http://192.168.42.205:1909/user/updateUser',{
			data:{
				email:storage.email,
				gender:data
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			headers:{'Content-Type':'application/json'},	              
			success:function(res){
				dom.text(data);
				storage.gender = data;
				plus.storage.setItem("user",JSON.stringify(storage));
				box.children("input").val("");
				box.hide();
			}
		});
	}else{
		box.children("input").val("");
		box.hide();
		mui.alert('格式：男/女','提示','确定',function (e) {},'div');
	}
}
// 年龄弹窗
function ageNo(){
	let box = $(".showAge");
	box.children("input").val("");
	box.hide();
}
function ageOk(){
	let dom = $(".age .right .nianling");//用户节点
	let box = $(".showAge");//修改框
	let data = box.children("input").val();
	let storage = JSON.parse(plus.storage.getItem("user"));
	if(Number(data)>=1&&Number(data)<=200){
		let data2 = Math.ceil(Number(data));
		mui.ajax('http://192.168.42.205:1909/user/updateUser',{
			data:{
				email:storage.email,
				age:data2
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			headers:{'Content-Type':'application/json'},	              
			success:function(res){
				dom.text(data2);
				storage.age = data2;
				plus.storage.setItem("user",JSON.stringify(storage));
				box.children("input").val("");
				box.hide();
			}
		});
	}else{
		box.children("input").val("");
		box.hide();
		mui.alert('范围：1-200','提示','确定',function (e) {},'div');
	}
}
// 地址弹窗
function addressNo(){
	let box = $(".showAddress");
	box.children("input").val("");
	box.hide();
}
function addressOk(){
	let dom = $(".address .right .dizhi");//用户节点
	let box = $(".showAddress");//修改框
	let data = box.children("input").val();
	let storage = JSON.parse(plus.storage.getItem("user"));
	if(data.trim() === ""){
		box.children("input").val("");
		box.hide();
		mui.alert('地址不能为空！','提示','确定',function (e) {},'div');
	}else{
		mui.ajax('http://192.168.42.205:1909/user/updateUser',{
			data:{
				email:storage.email,
				address:data
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			headers:{'Content-Type':'application/json'},	              
			success:function(res){
				dom.text(data);
				storage.address = data;
				plus.storage.setItem("user",JSON.stringify(storage));
				box.children("input").val("");
				box.hide();
			}
		});
	}
}
// 个性弹窗
function descNo(){
	let box = $(".showDesc");
	box.children("input").val("");
	box.hide();
}
function descOk(){
	let dom = $(".desc>p");//用户节点
	let box = $(".showDesc");//修改框
	let data = box.children("input").val();
	let storage = JSON.parse(plus.storage.getItem("user"));
	mui.ajax('http://192.168.42.205:1909/user/updateUser',{
		data:{
			email:storage.email,
			miaoshu:data
		},
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		headers:{'Content-Type':'application/json'},	              
		success:function(res){
			dom.text(data);
			if(data === ""){dom.text("这个人很懒，什么也没有...")}
			storage.miaoshu = data;
			plus.storage.setItem("user",JSON.stringify(storage));
			box.children("input").val("");
			box.hide();
		}
	});
}
// 封装一个更换图片函数
function changeTouxiang(){
	let imgDom = $(".touxiang .right>img");
	let storage = JSON.parse(plus.storage.getItem("user"));
	plus.gallery.pick(function(path){
		imgDom.attr("src",path);
		let task = plus.uploader.createUpload("http://192.168.42.205:1909/user/touxiang",{
			method:"POST",
			blocksize:204800
		},function(data,status){
			if(status === 200){
				storage.touxiang = "http://192.168.42.205:1909/" + data.responseText;
				plus.storage.setItem("user",JSON.stringify(storage));
			}
		});
		task.addFile(path,{key:"touxiang"});
		task.addData("email",storage.email);
		task.addData("yuming","http://192.168.42.205:1909/");
		task.start();
	},function(){},{filter:"image"})
}