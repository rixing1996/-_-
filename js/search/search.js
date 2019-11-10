$(function(){
	mui.plusReady(function () {
		// 点击返回上个页面
	    mui("header").on("tap",".mui-icon-back",function(){
	    	mui.back();
	    })
		// 进入页面自动触发事件(获取焦点,调用输入法)
		plus.key.showSoftKeybord();
		// 输入框的值变化时执行的方法
		$("header .content").on("input",function(){
			console.log($(this).val());
		})
		// 点击删除图标执行的方法
		mui("header").on("tap",".mui-icon-closeempty",function(){
			$("header .content").val("").focus().trigger("input");
		})
		// 点击语音图标执行的方法
		mui("header").on("tap",".mui-icon-mic",function(){
			plus.speech.startRecognize({
				engine:"iFly",
				punctuation:false
			},function(result){
				let target = $("header .content");
				target.val(target.val()+result).trigger("input");
				plus.key.showSoftKeybord();
			})
		})
	})
})