// 渲染数据的函数
function showType(){
	let typeArr = JSON.parse(plus.storage.getItem("type"));
	let bijiArr = JSON.parse(plus.storage.getItem("biji"));
	let mainDom = $("main");
	for(let i=0;i<typeArr.length;i++){
		let leng = bijiArr.filter(function(item,j){
			return item.type === typeArr[i];
		}).length;
		mainDom.append(`
			<div class="contains">
				<div class="list">
					<div class="left">
						<div>
							<span>${i+1}、</span>
							<span class="type">${typeArr[i]}</span>
							<span class="number">（${leng}）</span>
						</div>
						<span class="mui-icon mui-icon-settings"></span>
					</div>
					<div class="right">
						<button class="edit">
							<span class="mui-icon mui-icon-compose"></span>
							<span>编辑</span>
						</button>
						<button class="delete">
							<span class="mui-icon mui-icon-trash"></span>
							<span>删除</span>
						</button>
					</div>
				</div>
			</div>
		`);
	}
}
// 封装一个左滑显示编辑删除按钮的函数
function showHide(dom){
	$(dom).find(".list").animate({left:"-10rem"},100);
}
// 封装一个关闭按钮的函数
function removeShow(dom){
	if($(dom).find(".list").css("left") === "0px"){
		let listDom = $("main .contains .list");
		listDom.animate({left:0},100);
		return true;
	}else{
		return false;
	}
}
