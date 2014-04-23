function Handicap_ZoomIn(){
	var vsad = $('body').attr('class');
	var sc = eval(document.documentElement.scrollWidth);
	if(vsad=='zoom1'){
		$('body').removeClass(vsad).addClass('zoom2');
		$('body').css({'overflow-x':'scroll'});
		var scroolXSize = eval(document.documentElement.scrollWidth);
		window.scrollTo(eval(scroolXSize-sc)/2, 0);
	}else if(vsad=='zoom2'){
		$('body').removeClass(vsad).addClass('zoom3');
		var scroolXSize = eval(document.documentElement.scrollWidth);
		window.scrollTo(eval(scroolXSize-sc), 0);
	}else if(vsad=='zoom3'){
		$('body').removeClass(vsad).addClass('zoom4');
		var scroolXSize = eval(document.documentElement.scrollWidth);
		window.scrollTo(eval(scroolXSize-sc)*1.5, 0);
	}else if(vsad=='zoom4'){
		alert('최대의 사이즈입니다.');
	}

}

function Handicap_ZoomOut(){
	var vsad = $('body').attr('class');
	var sc = eval(document.documentElement.scrollWidth);
	if(vsad=='zoom1'){
		alert('최소의 사이즈입니다.');
		$('body').css({'overflow-x':'visible'});
	}else if(vsad=='zoom2'){
		$('body').removeClass(vsad).addClass('zoom1');
	}else if(vsad=='zoom3'){
		$('body').removeClass(vsad).addClass('zoom2');
		var scroolXSize = eval(document.documentElement.scrollWidth);
		window.scrollTo(eval(sc-scroolXSize)/2, 0);
	}else if(vsad=='zoom4'){
		$('body').removeClass(vsad).addClass('zoom3');
		var scroolXSize = eval(document.documentElement.scrollWidth);
		window.scrollTo(eval(sc-scroolXSize), 0);
	}
}


function clear(){
	var vsad = $('body').attr('class');
	$('body').css({'overflow-x':'visible'});
	$('body').removeClass(vsad).addClass('zoom1');
}
