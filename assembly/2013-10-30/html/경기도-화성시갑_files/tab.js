jQuery(function($){
	// Lined Tab Navigation
	var tab_line = $('div.tab.line');
	var tab_line_i = tab_line.find('>ul>li');
	var tab_line_ii = tab_line.find('>ul>li>div>ul>li');
	var tab_line_iiii = tab_line.find('>ul>li>div>ul>li[class=active]');
	tab_line.removeClass('jx');
	tab_line_i.find('div').hide();
	tab_line_i.find('>ul>li[class=active]').parents('li').attr('class','active');
	tab_line.find('ul>li[class=active]').find('>div').show();
	var tab_line_iii = tab_line_iiii.find('>div').outerHeight()+parseInt('17');
	var tab_line_aa = tab_line.find('>ul>li.active').find('>div').outerHeight();
	var tab_line_a = tab_line.find('>ul>li.active > a').outerHeight();
	var tab_line_aaa = tab_line_a+tab_line_aa;
	tab_line.css({height:tab_line_aaa})
	function lineTabMenuToggle(event){
		$(".wub_select1").css({display:'none'});
		var t = $(this);
		$(".sub_gnb_11").css({height:'17px'})
		tab_line_i.find('> div').hide();
		t.next('div').show();
		tab_line_i.removeClass('active');
		t.parent('li').addClass('active');
		tab_line_ii.removeClass('active');
		
		var tab_line_aa = $(this).parent(tab_line_i).find('> div').outerHeight();
		var tab_line_aaa = tab_line_a+tab_line_aa;
		tab_line.css({height:tab_line_aaa})
		return false;
	}
	function lineTabSubMenuActive(){
		var t = $(this);
		var tab_line_iii = $(this).parent(tab_line_ii).find('>div').outerHeight()+parseInt('17');
		var tab_line_aaaa = $(this).parent(tab_line_ii).find('>div').outerHeight();
		var tab_line_aa = ('54');
		$(".sub_gnb_11").css({height:tab_line_iii})
		var tab_line_aaa = tab_line_a+tab_line_aaaa+parseInt('54');
		tab_line_ii.find('> div').hide();
		t.next('div').show();
		tab_line_ii.removeClass('active');
		t.parent('li').addClass('active');
		tab_line.css({height:tab_line_aaa});
		return false;
	}; 
	tab_line_i.find('>a[href=#]').click(lineTabMenuToggle).focus(lineTabMenuToggle);
	tab_line_ii.find('>a[href=#]').click(lineTabSubMenuActive).focus(lineTabSubMenuActive);
});