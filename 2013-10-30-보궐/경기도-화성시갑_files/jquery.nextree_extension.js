/**
 * 서버에서 결과를 json전문양식으로 받을 경우 예외처리를 위해 
 * $.get(), $.getJSON(), $.post() 메서드를 확장함.
 * 
 * 
 * 의존성 
 * 1. jquery-1.3.x.js
 * 2. jquery.json.js
 *
 * 
 * 참고 - json 전문 약식
 * 
 * {
 * 		header : {
 * 			result : 'ok',		//result에 대한 내용은 kr.go.nec.fw.commonweb.json.JSONResult 참조
 * 			errorCode : '',
 * 			errorMessage : ''
 * 		},
 * 		body :{
 *  		//어떠한 객체 구조라도 수용가능
 * 		}
 * }
 * 
 */

(function($){
	var ajax_request_obj;
	
	$._treatException = function(/** json구조로 작성된 전문 객체*/ _response,
												/** 정상처리 콜백함수 */ _callback1,
												/** 공통처리 콜백함수 */ _callback2, 
												/** 비정상처리 콜백함수 */ _callback3){
													
		var header = _response.header;
		var body = _response.body;
		
		if(header.result == 'ok'){
			if(_callback1 && _callback1 instanceof Function) _callback1(body, status);
		} else {
			if (header.result == 'error'){
				alert('에러코드 : ' + header.errorCode + '\n' + header.errorMessage);
			} else if (header.result == 'authError'){
				alert('인증이 실패하였습니다.\n로그인을 해주십시오.');
			} else if (header.result == 'forbidden'){
				alert('접근이 금지되었습니다.')
			} else if (header.result == 'validationError'){
				alert('입력값이 잘못되었습니다.')
			}
			if(_callback3 && _callback3 instanceof Function) _callback3();
		}
		
		if(_callback2 && _callback2 instanceof Function) _callback2();
	};
	
	$._alertForException = function(){
		alert('서버와의 통신시 문제가 발생했습니다.\n네트워크가 정상적 연결되었는지 확인하시거나 \n서버가 동작중인지 관리자에게 문의하십시오.')
	};
	
	$.getTE = function(url, params, callback1, callback2, callback3){
		$.get(url, params, function(responseText, status){
			if(status == 'success'){
				var response = $.evalJSON(responseText);
				$._treatException(response, callback1, callback2, callback3);
			} else {
				$._alertForException();
			}
		});
	};
	
	
	$.getJSONTE = function(url, params, callback1, callback2, callback3){
		if(ajax_request_obj) ajax_request_obj.abort();
		
		ajax_request_obj = $.getJSON(url, params, function(response, status){
			if(status == 'success'){
				$._treatException(response, callback1, callback2, callback3);
			} else {
				$._alertForException();
			}
		});
	};
	
	$.postTE = function(url, params, callback1, callback2, callback3){
		$.post(url, params, function(responseText, status){
			if(status == 'success'){
				var response;
				try{
					response = $.evalJSON(responseText);
					$._treatException(response, callback1, callback2, callback3);
				} catch (e){
					alert('응답 데이터 수신중 에러가 발생했습니다. \n에러내용 : '+e);
				}
				
			} else {
				$._alertForException();
			}
		});
	}

})(jQuery);

