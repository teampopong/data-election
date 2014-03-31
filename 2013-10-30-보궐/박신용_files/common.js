/**
 * 공통 스크립트 정의
 * 
 */
 

//key_Press : 엔터키 처리.
function key_Press(pevEvent)
{
	var evCode = null;
	if (pevEvent != null) evCode = (window.netscape) ? pevEvent.which : pevEvent.keyCode;
	
	if ( (evCode == 13) || (evCode == null) )	{
		return true;
	}
	return false;
}


 /* =================================  팝업관련 Lib Start================================== */
/**
 * 팝업창띄우기
 * @param {uri} 팝업창띄울 URL정보
 * @param {winname} 팝업창 이름
 * @param {w} width
 * @param {h} height
 * @param {s} scroll여부 (0-no:noscroll, 1-yes:scroll)
 * @param {r} resize여부 (0-no:noresize, 1-yes:resize)
 * @author 김동완
 */
function winPopup(uri,winname,w,h,s,r){
	var newwin = window.open('about:blank',winname,'width='+w+',height='+h+',top=0,left=0,status=yes,scrollbars='+s+',resizable='+r);
	if (newwin == null){
		alert("팝업 차단기능 혹은 팝업차단 프로그램이 동작중입니다. 팝업 차단 기능을 해제한 후 다시 시도하세요.");
	}else{
		newwin = window.open(uri,winname,'width='+w+',height='+h+',top=0,left=0,status=no,scrollbars='+s+',resizable='+r);
		return newwin;
		newwin.focus();
	}
}



/**
 * 모달 팝업창띄우기 (IE전용)
 * @param {uri} 팝업창띄울 URL정보
 * @param {name} 팝업창 이름
 * @param {width} width
 * @param {height} height
 * @author 김동완
 */
function modalPopup(url, name, width, height) {
	if  (window.showModalDialog) {
		window.showModalDialog(url, name,  'dialogWidth:'+width+'px;dialogHeight:'+height+'px; status:no; resizable:no; help:no; center:yes; scroll:no');
	} else {
		var win = window.open(url, name,  'height='+height+',width='+width+',toolbar=no,directories=no,status=no,linemenubar=no,scrollbars=no,resizable=no,modal=yes,dependent=yes');
	}
}

/**
 * 반환값이 있는 모달 팝업 호출
 * <ul>
 * <li>argProperty[0] : 팝업창 width</li>
 * <li>argProperty[1] : 팝업창 height</li>
 * <li>argProperty[2] : 스크롤여부 no/auto/yes</li>
 * <li>argParam[0] : 호출할 주소 </li>
 * <li>argParam[1] : 팝업창 title </li>
 * </ul>
 * @param {array} argParam 부모창에서 모달창에 보낼 배열값
 * @param {array} argProperty 모달창 옵션값
 */
function returnModalPopup(argParam,argProperty){
	 var sURL   = argParam[0];
	 var sPos   = "dialogWidth:"+argProperty[0]+"px;dialogHeight:"+argProperty[1]+"px;resizable:0;scroll:"+argProperty[2]+";status:0;help:0;center:1;dialogHide:1;";
	 var retVal = window.showModalDialog(sURL,argParam,sPos);
	 return retVal;
}



/**
 * 팝업창으로 alert창 띄우기 (IE전용)
 * @param {msg} alert메세지
 * @author 김동완
 */
function popAlert(msg) {
	var foxHeight = 60;
	var ieHeight = 60;
	var ie7Height = 80;
	var widthStr = 350;
	var heightStr = 180;

    if(isIE){
        if(isIE6) {
            heightStr = heightStr+ieHeight;
        }else if(isIE7){
            heightStr = heightStr+ie7Height;
        }
    }else {
        heightStr = heightStr+foxHeight;
    }

	var errArray = [];
	errArray["alertMessage"] = msg;
	if(window.showModalDialog && document.all){
		window.showModalDialog("popAlert.jsp", errArray, "dialogWidth:"+widthStr+"px; dialogHeight:"+heightStr+"px; status:no; resizable:no; help:no; center:yes; scroll:no");
	}else {
		msg = msg.replaceAll("<br/>","\n").replaceAll("<br />","\n");
		var removeTagTxt = msg.stripTags();
		alert(removeTagTxt);
	}
}


/**
 * 팝업창으로 confirm 띄우기 (IE전용)
 * @param {msg} alert메세지
 * @param {titleImg} 타이틀이미지
 * @return {true/false}
 * @author 김동완
 */
function popConfirm(msg,titleImg) {
	var errArray = [];
	errArray["confirmMessage"] = msg;
	errArray["titleImage"] = titleImg;
	if(window.showModalDialog && document.all){
	    // dialogHeight 조정 : 150->180px 2008.10.18 by kyyoon
		var rtnVal = window.showModalDialog("popConfirm.jsp", errArray, "dialogWidth:410px; dialogHeight:180px; status:no; resizable:no; help:no; center:yes; scroll:no");
		return rtnVal;
	}else {
		var removeTagTxt = msg.stripTags();
		if(!confirm(removeTagTxt)){
			return false;
		}else {
			return true;
		}
	}

}

/* =================================  문자열 관련 Lib Start================================== */
/**
 * 문자열의 공백을 제거한다.
 * @param {objVal} 문자열
 * @return {String} 공백을 제거한 문자열을 반환한다.
 * @author 김동완
 */
function trim(objVal){
    return objVal.replace(new RegExp("(^\\s*)|(\\s*$)", "g"), "");
}

/**
 * yyyy-MM-dd 형식의 날짜 패턴
 */
var dashedDateRegexp = /(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/;

/**
 * 입력한 날짜가 yyyy-MM-dd형식에 맞는지 점검
 * 맞으면 true, 틀리면 false
 */
function checkDashedDateFormat(inputVal){
	return inputVal.match(dashedDateRegexp) == null? false : true;
}
/**
 * @fileoverview 기본 Util파일 정의
 * @author 김동완
 * @version 0.1
 * @since 2008.05.08
 */


/* =================================  문자열 관련 Lib Start================================== */

/**
 * 숫자만 입력하기 FF에서는 한글도 입력되므로 onkeyup에서 validation check를 해야 함
 * 사용법 : onkeypress = "IsNumber(event)"; style="ime-mode:disabled";
 * @param {event} evt 이벤트
 * @return {boolean} event.returnValue;
 * @author 김동완
 * @since 2008.07.10 코드값(0-FF에서 ESC값,8,9,46,144,110,190) 추가 및 imeModeCheck
 */
function IsNumber(evt){
	var tObj = (evt.srcElement) ? evt.srcElement : evt.target;
	if(tObj.style.imeMode =="" || tObj.style.imeMode !="disabled") tObj.style.imeMode = "disabled" ;
	var evCode = ( window.netscape ) ? evt.which : evt.keyCode ;
	var sChar = String.fromCharCode( evCode);
	if(evCode == 8) tObj.select();
	if( sChar.match( /[^0-9]/gi ) ||
		!(evCode == 0 || evCode==9 || evCode==13
			|| evCode==144 || evCode==110
			|| evCode==190 ||( evCode>=48 && evCode<=57 )) ){
		if ( window.netscape ){
			evt.preventDefault() ;
		} else {
			event.keyCode = 0;
			event.returnValue=false;
		}
	}
}

/**
 * 숫자인지 아닌지 체크하여 값을 반환
 * @param {string} s 문자열
 * @return {boolean}
 */
function isNumeric(s){
     var isNum = /\d/;
     if( !isNum.test(s) ) { return false; }
     else { return true; }
}


/**
 * 반복된 문자열(숫자) 체크
 * @param {string} str 문자열
 * @return {boolean} true/false
 */
function isValidIterateNumber(str){
    var temp = "";
    var temp2 = str.substring(0,1);
    var con=1;

    for(i = 1; i < str.length; i++){
        temp = str.substring(i,i+1);
        if(temp2 == temp){
            if(isNumeric(temp)){
                con++;
                if(con>=3){
                    return false;
                    break;
                }
            }
        }else{
            con = 1;
        }
        if(isNumeric(temp)){
            temp2 = temp;
        }
    }
    if(con>=3){
        return false;
    }else{
        return true;
    }
}

/**
 * 이메일 정합성 체크
 * @param {string} e_mail
 * @return {boolean} 잘못된 이메일(true) or 정상적인 이메일(false)
 */
function isErrorEmailRet(e_mail) {
    var state = 0;

    var beforeChar = "";
    var currentChar = "";

    if(e_mail.value == "") {
        alert("E_mail을 입력하여 주십시요");
        return true;
    }

    if(isErrorDomainRet(getEmailDomain(e_mail))) {
        alert("이메일 주소가 잘못되었습니다. 확인하시기 바랍니다.");
        return true;
    }

    for(var i=0; i<e_mail.length; i++) {
        currentChar = e_mail.charAt(i);
        if(state == 0) {
            if(currentChar == "." || currentChar == "@" || currentChar == " ") {
            	alert("이메일 주소가 잘못되었습니다. 확인하시기 바랍니다.");
            	return true;
            } else {
            	state = 1;
            }
            continue;
        }

        if(state == 1) {
            if(currentChar == " ") {
            	alert("이메일 주소가 잘못되었습니다. 확인하시기 바랍니다.");
            	return true;
            } else if(currentChar == "@") {
            	state = 2;
            }
            continue;
        }

        if(state == 2) {
            if(currentChar == "." || currentChar == "@" || currentChar == " ") {
            	alert("받는 사람/보내는 사람 이메일 주소가 잘못되었습니다. 확인하시기 바랍니다.");
            	return true;
            } else {
            	state = 3;
            }
            continue;
        }

        if(state == 3) {
            if(currentChar == " " || currentChar == "@") {
            	alert("이메일 주소가 잘못되었습니다. 확인하시기 바랍니다.");
            	return true;
            }

            if(beforeChar == "." && currentChar == ".") {
            	alert("이메일 주소가 잘못되었습니다. 확인하시기 바랍니다.");
            	return true;
            } else {
            	beforeChar = currentChar;
            }
            continue;
        }
    }

    if(state != 3) {
        alert("domain이 완전하지 않습니다11.\n\n 다시 입력하여 주십시요");
        return true;
    } else if(state == 3 && currentChar == " ") {
        alert("domain이 완전하지 않습니다22.\n\n 다시 입력하여 주십시요");
        return true;
    } else if(state == 3 && currentChar == ".") {
        alert("domain이 완전하지 않습니다33.\n\n 다시 입력하여 주십시요");
        return true;
    }
    return false;
}

/**
 * 정확한 도메인 정보인지 체크
 * @param {string} 도메인문자열
 * @return {boolean} 잘못된 도메인(true) or 정상적인 도메인(false)
 */
function isErrorDomainRet(domain) {

	if(domain.charAt(0) == "."
		|| domain.charAt(0) == "-"
		|| domain.charAt(domain.length-1) == "."
		|| domain.indexOf(".") == -1)
		return true;

	for(var i=0; i<domain.length; i++) {
		var ch = domain.charAt(i);

		if((ch >= "0" && ch <= "9") || (ch >= "a" && ch <="z")
			|| (ch >= "A" && ch <= "Z") || (ch == ".") || (ch == "-")) {

		} else {
			return true;
		}
	}

	return false;
}

/**
 * 이메일 부분에서 도메인부분만 가져오기
 * @param {string} 이메일 문자열
 */
function getEmailDomain(e_mail) {
    var index = e_mail.indexOf("@");
    if(index == -1) return e_mail;
    return e_mail.substring(index+1, e_mail.length);
}


/**
 * 특수문자 아예 안먹게처리 :<br/>
 * 사용법 : <textarea onKeyPress="noSpecialChar(event)"></textarea>
 * @param {event} 이벤트
 */
function noSpecialChar(evt){
    var evCode = ( window.netscape ) ? evt.which : evt.keyCode ;
	var sChar = String.fromCharCode( evCode );

	if( sChar.match(/<[^가-힣a-z0-9s\b]/gi)){
		if ( window.netscape ){
			evt.preventDefault() ;
		} else {
			event.cancelBubble = true;
			event.returnValue=false;
		}
	}
}

/**
 * 특수문자(.,-%~?*@#() 제외) 아예 안먹게처리 :<br/>
 * 사용법 : <textarea onKeyPress="noSpecialChar(event)"></textarea>
 * @param {event} 이벤트
 */
function noMemoSpecialChar(evt){
    var evCode = ( window.netscape ) ? evt.which : evt.keyCode ;
	var sChar = String.fromCharCode( evCode );

	if( !(sChar.match(/[^.,~?!*@#()가-힣a-z0-9s\-\%\b]/gi) ==null || sChar.match(/[^.,~?!*@#()가-힣a-z0-9s\-\%\b]/gi) ==" " || evCode==13) ){
		if ( window.netscape ){
			evt.preventDefault() ;
		} else {
			event.cancelBubble = true;
			event.returnValue=false;
		}
	}
}

/**
 * 문자열에서 숫자만 표기
 */
String.prototype.num = function() {return this.replace(/[^0-9]/g, "");}

/**
 * 숫자인지 아닌지 여부를 출력
 * @param {str} 텍스트
 * @return {true/false}
 */
function isInt(str) {
	var num = str.num();

	if (num.length == str.length) {
		return true; // 숫자로만 이루어져 있음
	} else {
		return false; // 숫자로만 이루어져 있지 않음
	}
}

/**
 * 모든 HTML테그 없애기
 * @param {allowed_tags} 허용할 태그
 */
String.prototype.stripAllTags = function () {
   var str = this;
   var pos1 = str.indexOf('<');

   if (pos1 == -1) return str;
   else {
       var pos2 = str.indexOf('>', pos1);
       if (pos2 == -1) return str;
       return (str.substr(0, pos1) + str.substr(pos2+1)).stripAllTags();
   }
}

/**
 * 정수형으로 변환
 */
String.prototype.int = function() {
	if(!isNaN(this))
		return parseInt(this);
	else
		return null;
}


/**
 * HTML테그 없애기
 * @param {allowed_tags} 허용할 태그
 */
String.prototype.stripTags = function(allowed_tags){
	var key = '';
	var tag = '';
	var matches = allowed_array = [];
	var allowed_keys = {};
	var bindThis = this;

	if (allowed_tags) {
		allowed_tags  = allowed_tags.replace(/[\<\> ]+/g, '');;
		allowed_array = allowed_tags.split(',');

		for (key in allowed_array) {
			tag = allowed_array[key];
			allowed_keys['<' + tag + '>']   = true;
			allowed_keys['<' + tag + ' />'] = true;
			allowed_keys['</' + tag + '>']  = true;
		}
	}
	matches = bindThis.match(/(<\/?[^>]+>)/gi);

	for (key in matches) {
		tag = matches[key].toString();
		if (!allowed_keys[tag]) {
			bindThis =  bindThis.replace(/<\S[^><]*>/g, '');
		}
	}

	return bindThis;

}

/**
 * 글자 바이트 가져오기
 * @param {s} 문자열
 * @return {len} 글자수
 */
function getByteLength(s){
	var len = 0;
	if (s == null) return 0;

	for(var i = 0; i < s.length; i++){
		var c = escape(s.charAt(i));
		if (c.length == 1) len++;
		else if (c.indexOf("%u") != -1) len += 2;
		else if (c.indexOf("%") != -1) len += c.length / 3;
	}
	return len;
}


/**
 * 댓글시 바이트 비교 400바이트 이상글자 못쓰게 막기<br>
 * 사용법 :<br/>
 * onkeydown="return textLimitByByte(this,400,document.getElementById('cmtStrNum'));" onkeyup="return textLimitByByte(this,400,document.getElementById('cmtStrNum'));"<br/>
 * onkeydown="return textLimitByByte(this,400);" onkeyup="return textLimitByByte(this,400);"
 * @param {field} 댓글인풋박스 객체
 * @param {maxlimit} 최대 글자수
 * @param {countfield} 바이트표시될 객체 (생략가능)
 */
function textLimitByByte(field, maxlimit, countfield){
	if(getByteLength(field.value)>maxlimit){
		alert("최대 " + maxlimit + "byte("+parseInt(maxlimit/2)+"자)를 넘길 수 없습니다.");
		field.value = field.value.cut(maxlimit);
	}
	if(countfield != null){
        countfield.innerHTML = getByteLength(field.value);
	}
}

/**
 * 바이트 비교 
 */
function validateTextLimitByByte(value, maxlimit){
	if(getByteLength(value)>maxlimit){
		alert("최대 " + maxlimit + "byte("+parseInt(maxlimit/2)+"자)를 넘길 수 없습니다.");
		return false;
	} 
}

/** 
 * string String::cut(int len)
 * 글자를 앞에서부터 원하는 바이트만큼 잘라 리턴합니다.
 * 한글의 경우 2바이트로 계산하며, 글자 중간에서 잘리지 않습니다.
 */
 String.prototype.cut = function(len) {
  var str = this;
  var l = 0;
  for (var i=0; i < str.length; i++) {
   l += (str.charCodeAt(i) > 128) ? 2 : 1;
   if (l > len) return str.substring(0,i);
  }
  
  return str;
 }


/**
 * 공통스크립트(클래스명 삭제,추가)
 * @author 정경화
 */
var necCommon = {
	$ : function(targetId) {
			var target = document.getElementById(targetId);
			return target;
	},
	setClass : function(targetId, className) {
		var target = this.$(targetId);
		target.setAttribute("className", className);
		target.setAttribute("class", className);
	},
	removeClass : function(targetId) {
		var target = this.$(targetId);
		target.removeAttribute("className");
		target.removeAttribute("class");
	}
}

/**
 * 테이블 늘리기,줄이기
 * @author 정경화
 */

function tableSizeUp(obj) {
	var fullW = document.body.clientWidth; //전체화면 width;
	var wrapperW = 970; //content width;
	var sideW = 244; // side width
	var afterW = 0;
	//alert(fullW);
	if(wrapperW > fullW) { // 전체w가 contentW보다 작으면 
		afterW = wrapperW + 500;
	}else {
		afterW = fullW - sideW;
	}

	necCommon.$(obj).style.width = afterW + "px";
	necCommon.$("contentWrapper").style.width = (afterW+sideW) + "px";
	necCommon.$("content").style.width = (afterW) + "px";
}

function tableSizeDown(obj) { 
	necCommon.$(obj).style.width = 740 + "px";
	necCommon.$("contentWrapper").style.width = 970 + "px";
	necCommon.$("content").style.width = 740 + "px";
}

function fixedTableSizeUp(obj, tableId) {
	var sideW = 244; // side width
	var afterW = 0;

	var tableObj = getBoundsObject(tableId);
	
	afterW = tableObj.width;
	necCommon.$(obj).style.overflow_x = "";
	necCommon.$(obj).style.width = afterW + "px";
	necCommon.$("contentWrapper").style.width = (afterW+sideW) + "px";
	necCommon.$("content").style.width = (afterW) + "px";
}

function fixedTableSizeDown(obj) {
	necCommon.$(obj).style.overflow_x = "scroll";
	necCommon.$(obj).style.width = 730 + "px";
	necCommon.$("contentWrapper").style.width = 970 + "px";
	necCommon.$("content").style.width = 740 + "px";
}


function getBoundsObject(objId){
    var techbug = new Object();
    var tag = document.getElementById(objId);
	
    if(tag !=null && tag != undefined ){
        if(tag.getBoundingClientRect){ //IE, FF3 
            var rect = tag.getBoundingClientRect();
            techbug.left = rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft);
            techbug.top = rect.top + (document.documentElement.scrollTop || document.body.scrollTop);
            techbug.width = rect.right - rect.left;
            techbug.height = rect.bottom - rect.top +1; // +1 = Moz와 맞춤
        } else  if (document.getBoxObjectFor) { // gecko 엔진 기반 FF3제외
			/*var box = document.getBoxObjectFor(tag);
			techbug.left = box.x;
            techbug.top = box.y;
            techbug.width = box.width;
            techbug.height = box.height;*/
        }else {
            techbug.left = tag.offsetLeft;
            techbug.top = tag.offsetTop;
            techbug.width = tag.offsetWidth;
            techbug.height = tag.offsetHeight  + 3;  // +1 = Moz와 맞춤
            var parent = tag.offsetParent;
            if (parent != tag) {
                while (parent) {
                    techbug.left += parent.offsetLeft;
                    techbug.top += parent.offsetTop;
                    parent = parent.offsetParent;
                }
            }
            // 오페라와 사파리의 'absolute' postion의 경우 body의 offsetTop을 잘못 계산 보정
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('opera') != -1 || ( ua.indexOf('safari') != -1 && getStyle(tag, 'position') == 'absolute' )) {
                techbug.top -= document.body.offsetTop;
            }

        }
        return techbug;
    }
}

//var isNS = (navigator.appName == "Netscape") ? 1 : 0;
//var EnableRightClick = 0;
//if(isNS) 
//document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);
//
//function mischandler(){
//  if(EnableRightClick==1){ return true; }
//  else {return false; }
//}
//
//function mousehandler(e){
//  if(EnableRightClick==1){ return true; }
//  var myevent = (isNS) ? e : event;
//  var eventbutton = (isNS) ? myevent.which : myevent.button;
//  if((eventbutton==2)||(eventbutton==3)) return false;
//}
//
//function keyhandler(e) {
//  var myevent = (isNS) ? e : window.event;
//  if (myevent.keyCode==96)
//    EnableRightClick = 1;
//  return;
//}
//
//document.oncontextmenu = mischandler;
//document.onkeypress = keyhandler;
//document.onmousedown = mousehandler;
//document.onmouseup = mousehandler;

/*
var isie=0;
if(window.navigator.appName=="Microsoft Internet Explorer"&&window.navigator.appVersion.substring(window.navigator.appVersion.indexOf("MSIE")+5,window.navigator.appVersion.indexOf("MSIE")+8)>=5.5) {
isie=1;
}
else {
isie=0;
}
if(isie) {
var html="";
html+='<TABLE STYLE="border:1pt solid #808080" BGCOLOR="#CCCCCC" WIDTH="140" HEIGHT="220" CELLPADDING="0" CELLSPACING="1">';
html+='<ST'+'YLE TYPE="text/css">\n';
html+='a:link {text-decoration:none;font-family:돋움;font-size:8pt;}\n';
html+='a:visited {text-decoration:none;font-family:돋움;font-size:8pt;}\n';
html+='td {font-size:8pt;}\n';
html+='</ST'+'YLE>\n';
html+='<SC'+'RIPT LANGUAGE="JavaScript">\n';
html+='\n<'+'!--\n';
html+='window.onerror=null;\n';
html+='/'+' -'+'->\n';
html+='</'+'SCRIPT>\n';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC" ID="i0" ONMOUSEOVER="document.all.i0.style.background=\'#CFD6E8\';document.all.i0.style.border=\'1pt solid #737B92\';" ONMOUSEOUT="document.all.i0.style.background=\'#CCCCCC\';document.all.i0.style.border=\'1pt solid #CCCCCC\';" ONCLICK="window.history.go(-1);">&nbsp;<IMG SRC="menuback.gif" WIDTH="12" HEIGHT="12" BORDER="0" HSPACE="0" VSPACE="0" ALIGN="absmiddle">&nbsp;Back</TD></TR>';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC" ID="i1" ONMOUSEOVER="document.all.i1.style.background=\'#CFD6E8\';document.all.i1.style.border=\'1pt solid #737B92\';" ONMOUSEOUT="document.all.i1.style.background=\'#CCCCCC\';document.all.i1.style.border=\'1pt solid #CCCCCC\';" ONCLICK="window.history.go(1);">&nbsp;<IMG SRC="menuforward.gif" WIDTH="12" HEIGHT="12" BORDER="0" HSPACE="0" VSPACE="0" ALIGN="absmiddle">&nbsp;Forward</TD></TR>';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC"><IMG SRC="pixel.gif" WIDTH="130" HEIGHT="1"></TD></TR>';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC" ID="i4" ONMOUSEOVER="document.all.i4.style.background=\'#CFD6E8\';document.all.i4.style.border=\'1pt solid #737B92\';" ONMOUSEOUT="document.all.i4.style.background=\'#CCCCCC\';document.all.i4.style.border=\'1pt solid #CCCCCC\';" ONCLICK="window.parent.external.AddFavorite(window.top.location.href,window.top.document.title);">&nbsp;<IMG SRC="menufavorite.gif" WIDTH="12" HEIGHT="12" BORDER="0" HSPACE="0" VSPACE="0" ALIGN="absmiddle">&nbsp;Add to Favorites...</TD></TR>';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC" ID="i5" ONMOUSEOVER="document.all.i5.style.background=\'#CFD6E8\';document.all.i5.style.border=\'1pt solid #737B92\';" ONMOUSEOUT="document.all.i5.style.background=\'#CCCCCC\';document.all.i5.style.border=\'1pt solid #CCCCCC\';" ONCLICK="window.parent.location=\'view-source:\'+window.parent.location.href;">&nbsp;<IMG SRC="menusource.gif" WIDTH="12" HEIGHT="12" BORDER="0" HSPACE="0" VSPACE="0" ALIGN="absmiddle">&nbsp;View Source</TD></TR>';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC"><IMG SRC="pixel.gif" WIDTH="130" HEIGHT="1"></TD></TR>';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC" ID="i6" ONMOUSEOVER="document.all.i6.style.background=\'#CFD6E8\';document.all.i6.style.border=\'1pt solid #737B92\';" ONMOUSEOUT="document.all.i6.style.background=\'#CCCCCC\';document.all.i6.style.border=\'1pt solid #CCCCCC\';" ONCLICK="window.print();">&nbsp;<IMG SRC="menuprint.gif" WIDTH="12" HEIGHT="12" BORDER="0" HSPACE="0" VSPACE="0" ALIGN="absmiddle">&nbsp;Print</TD></TR>';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC" ID="i7" ONMOUSEOVER="document.all.i7.style.background=\'#CFD6E8\';document.all.i7.style.border=\'1pt solid #737B92\';" ONMOUSEOUT="document.all.i7.style.background=\'#CCCCCC\';document.all.i7.style.border=\'1pt solid #CCCCCC\';" ONCLICK="window.parent.location.href=window.parent.location.href;">&nbsp;<IMG SRC="menurefresh.gif" WIDTH="12" HEIGHT="12" BORDER="0" HSPACE="0" VSPACE="0" ALIGN="absmiddle">&nbsp;Refresh</TD></TR>';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC"><IMG SRC="pixel.gif" WIDTH="130" HEIGHT="1"></TD></TR>';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC" ID="i8" ONMOUSEOVER="document.all.i8.style.background=\'#CFD6E8\';document.all.i8.style.border=\'1pt solid #737B92\';" ONMOUSEOUT="document.all.i8.style.background=\'#CCCCCC\';document.all.i8.style.border=\'1pt solid #CCCCCC\';" ONCLICK="if(window.parent.document.body.style.zoom!=0) window.parent.document.body.style.zoom*=1.6; else window.parent.document.body.style.zoom=1.6;">&nbsp;<IMG SRC="menuzoom.gif" WIDTH="12" HEIGHT="12" BORDER="0" HSPACE="0" VSPACE="0" ALIGN="absmiddle">&nbsp;Zoom In</TD></TR>';
html+='<TR><TD STYLE="border:1pt solid #CCCCCC" ID="i9" ONMOUSEOVER="document.all.i9.style.background=\'#CFD6E8\';document.all.i9.style.border=\'1pt solid #737B92\';" ONMOUSEOUT="document.all.i9.style.background=\'#CCCCCC\';document.all.i9.style.border=\'1pt solid #CCCCCC\';" ONCLICK="if(window.parent.document.body.style.zoom!=0) window.parent.document.body.style.zoom*=0.625; else window.parent.document.body.style.zoom=0.625;">&nbsp;<IMG SRC="menuzoom.gif" WIDTH="12" HEIGHT="12" BORDER="0" HSPACE="0" VSPACE="0" ALIGN="absmiddle">&nbsp;Zoom Out</TD></TR>';
html+='</TABLE>';

var oPopup = window.createPopup();

}

function dopopup(x,y) {
if(isie) {
var oPopupBody = oPopup.document.body;
oPopupBody.innerHTML = html;
oPopup.show(x, y, 140, 220, document.body);
}
}

function click(e) {
if(isie) {
if(document.all) {
if(event.button==2||event.button==3) {
dopopup(event.x-1,event.y-1);
}
}
}
}

if(isie) {
document.oncontextmenu = function() { dopopup(event.x,event.y);return false; }
document.onmousedown = click;
}
// --> */

