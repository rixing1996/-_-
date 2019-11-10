$(function(){
	mui.plusReady(function () {
	    // 返回键
		mui("header .left").on("tap",".mui-icon-back",function(){
			mui.back();
		})
		// 渲染数据
		showType();
		// 左滑显示编辑删除按钮
		// 定义一个变量来表示是否已经有编辑,删除按钮
		let hasShow = false;
		mui("main").on("swipeleft",".contains",function(){
			if(hasShow){
				let isTrue = removeShow(this);
				if(isTrue){
					hasShow = false;
				}
			}else{
				showHide(this);
				hasShow = true;
			}
		})
		// 点击main下的任意一个地方
		mui(".box").on("tap","main",function(){
			$("main .contains .list").animate({left:0},100);
			hasShow = false;
		})
		// 右滑关闭按钮
		mui("main").on("swiperight",".contains",function(){
			$("main .contains .list").animate({left:0},100);
			hasShow = false;
		})
	})
})