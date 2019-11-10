// 验证码发送倒计时函数
function codeLater(){
	let minute = 59;//再次发送验证码的间隔时间
	let codeBox = $("main .dCode .change");
	let timer;//定义一个定时器
	codeBox.html(`<button class="isSend">已发送 <b>59</b></button>`);
	timer = setInterval(function(){
		minute--;
		if(minute === 0){
			clearInterval(timer);
			codeBox.html(`<button class="willSend">获取验证码</button>`);
		}
		codeBox.find("b").text(minute);
	},1000)
}
// 封装一个获取验证码的函数
function getCode(){
	let emailDom = $("main .email").val();
	let rxp = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	if(emailDom === ""){
		mui.alert('邮箱不能为空！','提示','确定',function (e) {},'div');
	}else if(!rxp.test(emailDom)){
		mui.alert('请输入正确的邮箱地址！','提示','确定',function (e) {},'div');
	}else{
		codeLater();
		return new Promise(function(resolve,reject){
			mui.ajax('http://192.168.42.205:1909/user/sendEmail',{
				data:{
					email:emailDom
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				headers:{'Content-Type':'application/json'},	              
				success:function(data){
					resolve(data);
				}
			});
		})
	}
}
// 封装一个验证验证码是否正确的函数
function verify(code){
	let emailDom = $("main .email");//邮箱输入框节点
	let codeDom = $("main .code");//验证码输入框节点
	let type = false;
	if(code){
		if(codeDom.val() === ""){
			mui.alert('验证码不能为空！','提示','确定',function (e) {},'div');
		}else if(codeDom.val() !== code.data.code||emailDom.val() !== code.data.email){
			mui.alert('验证码不正确！','提示','确定',function (e) {},'div');
		}else if((Date.now()-code.data.time)/1000>300){
			mui.alert('验证码已过期！','提示','确定',function (e) {},'div');
		}else{
			type = true;
		}
	}else{
		mui.alert('请获取验证码！','提示','确定',function (e) {},'div');
	}
	if(type){
		return true;
	}else{
		return false;
	}
}
// 封装一个判断邮箱是否注册过
function hasRegister(){
	let emailDom = $("main .email");//邮箱输入框节点
	return new Promise(function(resolve,reject){
		mui.ajax('http://192.168.42.205:1909/user/hasRegister',{
			data:{
				email:emailDom.val()
			},
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			success:function(data){
				resolve(data);
			}
		});
	})
}
// 密码修改确认函数
function fgpwdOK(email){
	let fgpwd = $("main .password");
	if(fgpwd.val().length<6||fgpwd.val().length>18){
		mui.alert('密码的长度为6-18位！','提示','确定',function (e) {},'div');
	}else{
		mui.ajax('http://192.168.42.205:1909/user/forget',{
			data:{
				email,
				password:fgpwd.val()
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			headers:{'Content-Type':'application/json'},	              
			success:function(data){
				mui.back();
			}
		});
	}
}