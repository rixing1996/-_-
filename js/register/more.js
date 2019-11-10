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
// 封装一个验证的方法
function verify(code){
	let usernameType = false;//用户名验证
	let passwordType = false;//密码验证
	let emailType = false;//邮箱验证
	let codeType = false;//验证码验证
	let usernameDom = $("main .username");//用户输入框节点
	let passwordDom = $("main .password");//密码输入框节点
	let emailDom = $("main .email");//邮箱输入框节点
	let codeDom = $("main .code");//验证码输入框节点
	if(code){
		if(usernameDom.val().trim() === ""){
			mui.alert('用户名不能为空！','提示','确定',function (e) {},'div');
		}else if(passwordDom.val().length<6||passwordDom.val().length>18){
			mui.alert('密码长度为6-18位！','提示','确定',function (e) {},'div');
		}else if(codeDom.val() === ""){
			mui.alert('验证码不能为空！','提示','确定',function (e) {},'div');
		}else{
			if(code.data.code !== codeDom.val()||code.data.email !== emailDom.val()){
				mui.alert('验证码错误！','提示','确定',function (e) {},'div');
			}else if((Date.now()-code.data.time)/1000>300){
				mui.alert('验证码已过期！','提示','确定',function (e) {},'div');
			}else{
				usernameType = true;
				passwordType = true;
				emailType = true;
				codeType = true;
			}
		}
	}else{
		mui.alert('请先获取验证码！','提示','确定',function (e) {},'div');
	}
	if(usernameType&&passwordType&&emailType&&codeType){
		return true;
	}else{
		return false;
	}
}
// 封装一个验证注册是否成功的函数
function hasRegister(){
	let usernameDom = $("main .username");//用户输入框节点
	let passwordDom = $("main .password");//密码输入框节点
	let emailDom = $("main .email");//邮箱输入框节点
	return new Promise(function(resolve,reject){
		mui.ajax('http://192.168.42.205:1909/user/register',{
			data:{
				username:usernameDom.val(),
				password:passwordDom.val(),
				email:emailDom.val()
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

