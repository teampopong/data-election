/******************************************************************************
Description	: 화면확대
Author		: 
Date		: 2009-5-11
******************************************************************************/
var zoomRate = 10;
var maxRate = 200;
var minRate = 80;
var curRate = 100;

function zoomInOut(contentid, how)
{
  if (((how == "in")&&(curRate >= maxRate))||((how == "out") && (curRate <= minRate))) {
    return;   /* 범위 초과시 리턴한다 */
  }
  
  if (how == "in") {
    curRate = (-(-(curRate))) + (-(-(zoomRate)));
  }
  else if (how == "out") {
    curRate = (-(-(curRate))) - (-(-(zoomRate)));
  }
  else
  {
  	curRate = 100
  }
 	document.body.style.zoom = curRate + '%';	/* 화면 변경 */
  tts_setCookie("zoomVal",curRate, 1);
}

function tts_setCookie(key, value, term){
  var expire = new Date();
  expire.setDate( expire.getDate() + term );
  document.cookie = key + "=" + escape( value ) + "; path=/; expires=" + expire.toGMTString() + ";";
}

function Bookmark_OnChange(obj_name){
   obj = document.getElementById(obj_name)
   if(obj.selectedIndex != -1){
	    var sel = obj.options[obj.selectedIndex];
	
	    if(sel.value != ''){
	    	var strKey = sel.getAttribute("key");
	    	window.open(sel.value, strKey);
	    }
   	}
}




function clickedTopMenu(depth2MenuId) {
	var depth2Menu = document.getElementById("depth2Menu");
	var depth2MenuA = depth2Menu.getElementsByTagName("a");
	necCommon.setClass(depth2MenuId, "active");
	for(var i=0;i<depth2MenuA.length;  i++) {
		if(depth2MenuId != depth2MenuA[i].getAttribute("id")) {
			necCommon.removeClass(depth2MenuA[i].getAttribute("id"));
		}
	}
	depth3MenuActive(depth2MenuId);
}

// depth3 메뉴 활성 
function depth3MenuActive(parentMenuId){
	var depth3MenuId = "depth3Menu"+parentMenuId;
	var topMenuDiv = document.getElementById("childMenus");
	var childrenMenus = topMenuDiv.getElementsByTagName("ul");

	for (var i=0; i<childrenMenus.length; i++) {
		if (childrenMenus[i].getAttribute("id") != "depth2Menu") {
			if (depth3MenuId != childrenMenus[i].getAttribute("id")) {
				childrenMenus[i].style.display = "none";
			} else {
				childrenMenus[i].style.display = "";
			}
		}
	}
}

//검색
function iptSearchInput(value){		
	var searchKeyword = document.getElementById("searchKeyword");
	if(value == 'y'){
		searchKeyword.value = "" ;
	}else{
		if(searchKeyword.value == ""){
			searchKeyword.value = "검색하실 내용을 입력하세요!" ;				
		}			
	}		
}

//검색
function searchKey(electionId){
	var searchKeyword = document.getElementById("searchKeyword");
	var nameCheck = /[A-Za-z0-9]/;
	if(searchKeyword.value == "" || searchKeyword.value == "검색하실 내용을 입력하세요!"){
		alert("검색하실 내용을 입력해주세요.");
		searchKeyword.focus();
		return ;
	}
	if(nameCheck.test(searchKeyword.value)){
		alert("한글만 입력하세요.");
		searchKeyword.focus();
		return ;
	}
	if(searchKeyword.value.search("<")!=-1 || searchKeyword.value.search(">")!=-1){
		alert("특수문자는 사용하실수 없습니다");
		return;
	}
	document.location.href ="main_searchMenu.xhtml?electionId=" + electionId + "&searchKeyword="+encodeURIComponent(searchKeyword.value);		
}

$(document).ready(function(){

	$("#sub_gnb > li").eq(0).find(" > ul").css({left:'5px'});
	$("#sub_gnb > li").eq(1).find(" > ul").css({left:'125px'});
	$("#sub_gnb > li").eq(2).find(" > ul").css({left:'225px'});
	$("#sub_gnb > li").eq(3).find(" > ul").css({left:'354px'});
	$("#sub_gnb > li").eq(4).find(" > ul").css({left:'479px'});
	$("#sub_gnb > li").eq(5).find(" > ul").css({left:'561px'});
	$("#sub_gnb > li").eq(6).find(" > ul").css({left:'565px'});

	$("#sub_gnb > li").eq(0).find(" > ul > li:first").css({'background-image':'none'});
	$("#sub_gnb > li").eq(1).find(" > ul > li:first").css({'background-image':'none'});
	$("#sub_gnb > li").eq(2).find(" > ul > li:first").css({'background-image':'none'});
	$("#sub_gnb > li").eq(3).find(" > ul > li:first").css({'background-image':'none'});
	$("#sub_gnb > li").eq(4).find(" > ul > li:first").css({'background-image':'none'});
	$("#sub_gnb > li").eq(5).find(" > ul > li:first").css({'background-image':'none'});
	$("#sub_gnb > li").eq(6).find(" > ul > li:first").css({'background-image':'none'});
	$('div.tab.line').css({display:'block'});
	$("#sub_gnb_1 > li:first").css({'border-left':'none'});
	$("#sub_gnb_1 > li > a").click(function(){
		var hre = $(this).attr("href");
		var sMapa = hre.replace("#","");
		//alert(sMapa);
		$("#sub_gnb_1 > li > div").css({display:'none'});
		$("#"+sMapa).css({display:'block'});
		$("#sub_gnb_1 > li").removeClass('on').addClass('');
		$(this).parent().removeClass('').addClass('on');
    });

});

document.getElementsByClassName = function(clsName)
{
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++)
    {
        if(elements[i].className.indexOf(" ") >= 0)
        {
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++)
            {
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}


function wordBreak(elements)
{
    //alert(elements.inspect());
    for(var i=0;i<elements.length;i++)
    {
        var el = elements[i];
        el.innerHTML = el.innerHTML.split('').join('<wbr />');
    }
}

function initTest()
{
    wordBreak(document.getElementsByClassName('testClass'));
}

window.onload = initTest;