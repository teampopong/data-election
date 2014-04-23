var parameters = {};
parameters.electionId;
parameters.electionCode;
parameters.electionName;
parameters.electionType;
parameters.cityCode;
parameters.sggCityCode;
parameters.townCode;
parameters.sggTownCode;

 
// 공통 옵션
var OPTION = {
	jejuOption : '<option value="4900">제주특별자치도</option>',
	allOption : '<option value="0">▷ 전 체</option>',
	notOption : '<option value="-1">▽ 선 택</option>',
	proportionalCityOption : '<option value="8">광역의원비례대표선거</option>',
	proportionalTownOption : '<option value="9">기초의원비례대표선거</option>',
	SGGOption : '<option value="3" >　 선거구별</option>',
	TPGOption : '<option value="5" >　 투표구별</option>'
};


var CityArray = {
	1100 : '서울',
	2600 : '부산'
};




// 지연 호출을 위한 타이머 객체
var submitTimer;

$(document).ready(function() {
	// 선거타입이 구시군장(4), 구시군의회의원(6), 기초의원비례대표(9)일 경우 제주도특별자치도 (code:4900) 을 제거
	//if ($('#electionCode').size() == 1 && $('#cityCode').size() == 1) {
	//	$('#electionCode').change(checkJejuOption);
	//}
	//checkJejuOption();

/*	
	$('#searchForm').submit(function(){
		$.blockUI({ 
		  message : '<img src="/common/images/loader.gif"/><br/>조회중입니다. 잠시만 기다리십시요.',
		  overlayCSS: {backgroundColor:'#ccc'}
		}); 
	});
*/	
	
	// ie를 제외한 나머지 브라우저에서 select를 아래위 키로 조작할 경우 event가 일어나지 않으므로,
	// keyCode를 판단하여 changeEvent를 발생시킴
	$('#searchForm select').keyup(function(e) {
		if (e.keyCode == 38 || e.keyCode == 40) {
			$(e.target).change();
		}
	});

	//테이블 늘리기 이벤트 바인딩
	$("#sizeupBtn").bind("click", function(caller) {
		fixedTableSizeUp('tableWrapPostionA', 'table01');
	});
	//테이블 줄이기 이벤트 바인딩
	$("#sizedownBtn").bind("click", function(caller) {
		fixedTableSizeDown('tableWrapPostionA');
	});

});

function appendOption(id){
	if($('#'+id+' option[value=0]').size() == 0) $('#'+id+' option[value=-1]').after($(allOption));
}

function afterOption(id, before, optionValue, option){
	if($('#'+id+' option[value='+optionValue+']').size() == 0){
		$('#'+id+' option[value='+before+']').after(option);
	}
}

function removeOption(id, optionValue){
	var el = $('#'+id+' option[value='+optionValue+']');
	if(el.size() > 0) el.remove();
}

//구시군장, 구시군의원, 비례대표 기초의원선거인 경우 제주도 옶션을 제거하고, 기타 선거인경우 제주도 옵션을 추가
function checkJejuOption() {
	var electionCode = $('#electionCode').val();
	//대선 국선은 제주도 옵션 체크 제외
	if(electionCode > 0 && (electionCode != 1 && electionCode != 2)){
		//구시군장, 구시군의원, 비례대표 구시군의원 일 경우 제주도 옵션 제외
		if (electionCode == 4 || electionCode == 6 || electionCode == 9) {
			if ($('#cityCode option[value=4900]').size() == 1) {
			//	$('#cityCode option[value=4900]').remove();
			}
		} else {
		//지방선거중에서 구시군장, 구시군의원, 비례대표 구시군의원을 제외한 나머지 선거일경우 제주도 옵션 추가	
			if ($('#cityCode option[value=4900]').size() == 0) {
			//	$('#cityCode').append($(OPTION.jejuOption));
			}
		}
	}
}

//광역의원비례대표와 기초의원비례대표 옵션을 추가
function appendProportionalOptions(){
	if($('#electionCode option[value=8]').size()==0){
		$('#electionCode option[value=6]').after($(OPTION.proportionalCityOption));
	} 
	if($('#electionCode option[value=9]').size()==0){
		$('#electionCode option[value=8]').after($(OPTION.proportionalTownOption));
	}
}
//비례대표 옵션을 삭제
function removeProportionalOptions(){
	if($('#electionCode option[value=8]').size()==1){
		$('#electionCode option[value=8]').remove();
	}
	if($('#electionCode option[value=9]').size()==1){
		$('#electionCode option[value=9]').remove();
	}
}



// 인자로 전달된 id의 select box에서 선택된 option의 text값을 []로 묶어 반환한다.
function retrieveSelectedName(id) {
	var selectedOption = $('#' + id + ' option:selected');
	if (selectedOption.val() > 0)
		return '[' + $.trim(selectedOption.html()) + ']';
	return '';
}

// 초기 페이지 로딩시 테이블의 크기를 최대화
function expandTableSize() {
	if (typeof(fixedTableSizeUp) != 'undefined'
			&& $('#tableWrapPostionA').size() == 1) {
		fixedTableSizeUp('tableWrapPostionA', 'table01');
	}
}

// 인자로 전달됨 id의 엘리먼트에 전체 선택 옵션을 추가함
function appendAllOption(id) {
	if ($('#' + id + ' option[value=0]').size() == 0)
		$('#' + id + ' option[value=-1]').after($(OPTION.allOption));
}

// 인자로 전달됨 id의 엘리먼트에서 전체 선택 옵션을 삭제함
function removeAllOption(id) {
	var el = $('#' + id + ' option[value=0]');
	if (el.size() > 0)
		el.remove();
}

// 시도코드로 선거구 리스트 호출시 시도 코드 중복체크
function checkPreviousCityCodeForSggCityCode(electionId, electionCode, cityCode) {
	if (previousCityCode != cityCode) {
		$('#sggCityCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionCode = electionCode;
		parameters.cityCode = cityCode;
		submitTimer = setTimeout(createSggCityCodes, 100);
	}
}

// 시도코드로 구시군 리스트 호출시 시도 코드 중복체크
function checkPreviousCityCodeForTownCode(electionId, cityCode) {
	if (previousCityCode != cityCode) {
		$('#townCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.cityCode = cityCode;
		submitTimer = setTimeout(createTownCodes, 100);
	}
}

// 구시군 코드로 선거구 리스트 호출시 구시군 코드 중복체크
function checkPreviousTownCodeForSggTownCode(electionId, electionCode, townCode) {
	if (previousTownCode != townCode) {
		$('#sggTownCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionCode = electionCode;
		parameters.townCode = townCode;
		submitTimer = setTimeout(createSggTownCodes, 100);
	}
}

//선거구 코드로 구시군 위원회 리스트 호출시 선거구 코드 중복 체크
function checkPreviousSggCityCodeForTownCodeFromSgg(electionId, electionCode, sggCityCode){
	if (previousSggCityCode != sggCityCode) {
		$('#townCodeFromSgg option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionCode = electionCode;
		parameters.sggCityCode = sggCityCode;
		submitTimer = setTimeout(createTownCodesFromSgg, 100);
	}
}


// 시도 > 위원회 리스트 가져오기
function createTownCodes() {
	var locationStr = '/bizcommon/selectbox/selectbox_townCodeJson.json';
	var params = {
		electionId : parameters.electionId,
		electionName : parameters.electionName,
		cityCode : parameters.cityCode
		
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var townCodeList = response;
				var townCodeEl = $('#townCode');
				// townCode 옵션 추가
				for (var i = 0; i < townCodeList.length; i++) {
					var option = $('<option>').attr('value',
							townCodeList[i].CODE).html(townCodeList[i].NAME);
					option.appendTo(townCodeEl);
				}

				previousCityCode = parameters.cityCode;
				settingYN();
			});
}

// 시도 선거구 가져오기
function createSggCityCodes() {
	var locationStr = '/bizcommon/selectbox/selectbox_getSggCityCodeJson.json';
	var params = {
		electionId : parameters.electionId,
		electionCode : parameters.electionCode,
		cityCode : parameters.cityCode
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var sggCityCodeList = response;
				var sggCityCodeEl = $('#sggCityCode');
				// sggCityCode 옵션 추가
				for (var i = 0; i < sggCityCodeList.length; i++) {
					var option = $('<option>').attr('value',
							sggCityCodeList[i].CODE)
							.html(sggCityCodeList[i].NAME);
					option.appendTo(sggCityCodeEl);
				}
				previousCityCode = parameters.cityCode;
				settingYN();
			});
}

// 구시군 선거구 가져오기
function createSggTownCodes() {
	var params = {
		electionId : parameters.electionId,
		electionCode : parameters.electionCode,
		townCode : parameters.townCode
	};

	var locationStr = '/bizcommon/selectbox/selectbox_getSggTownCodeJson.json';
	$.getJSONTE(locationStr, params, function(response, status) {
				var sggTownCodeList = response;
				var sggTownCodeEl = $('#sggTownCode');
				// sggTownCode 옵션 추가
				for (var i = 0; i < sggTownCodeList.length; i++) {
					var option = $('<option>').attr('value',
							sggTownCodeList[i].CODE)
							.html(sggTownCodeList[i].NAME);
					option.appendTo(sggTownCodeEl);
				}
				previousCityCode = parameters.cityCode;
				previousTownCode = parameters.townCode;
				settingYN();
			});
}


//선거구에 속한 구시군위원회 리스트 가져오기
function createTownCodesFromSgg(){
	var params = {
			electionId : parameters.electionId,
			electionCode : parameters.electionCode,
			sggCityCode : parameters.sggCityCode
		};
	
	var locationStr = '/bizcommon/selectbox/selectbox_townCodeFromSggJson.json';
	$.getJSONTE(locationStr, params, function(response, status) {
				var townCodeFromSggList = response;
				var townCodeFromSggEl = $('#townCodeFromSgg');
				// sggTownCode 옵션 추가
				for (var i = 0; i < townCodeFromSggList.length; i++) {
					var option = $('<option>').attr('value',
							townCodeFromSggList[i].CODE)
							.html(townCodeFromSggList[i].NAME);
					option.appendTo(townCodeFromSggEl);
				}
				previousCityCode = parameters.cityCode;
				previousSggCityCode = parameters.sggCityCode;
				settingYN();
			});
}


// (2011.5.9. YSY 추가) [선거별]선거코드로 시도리스트 호출시 시도 코드 중복체크
function checkPreviousCityCodeForSgCode(electionId, electionCode, cityCode) {
	//if (previousElectionCode != electionCode) {
		$('#cityCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionCode = electionCode;
		parameters.cityCode = cityCode;
		submitTimer = setTimeout(createCityCodesBySg, 100);
	//}
}

// (2011.5.9. YSY 추가) [선거별]시도코드로 구시군 리스트 호출시 시도 코드 중복체크
function checkPreviousCityCodeForTownCodeBySg(electionId, electionCode, cityCode) {
	if (previousCityCode != cityCode) {
		$('#townCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionCode = electionCode;
		parameters.cityCode = cityCode;
		submitTimer = setTimeout(createTownCodesBySg, 100);
	}
}

// (2011.5.9. YSY 추가) [선거별] 시도 리스트 가져오기
function createCityCodesBySg() {
	var locationStr = '/bizcommon/selectbox/selectbox_cityCodeBySgJson.json';
	var params = {
		electionId : parameters.electionId,
		electionCode : parameters.electionCode
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var cityCodeList = response;
				var cityCodeEl = $('#cityCode');
				// cityCode 옵션 추가
				for (var i = 0; i < cityCodeList.length; i++) {
					var option = $('<option>').attr('value',
							cityCodeList[i].CODE).html(cityCodeList[i].NAME);
					option.appendTo(cityCodeEl);
				}
				previousElectionCode = parameters.electionCode;
				$('#cityCode').val(parameters.cityCode);
				settingYN();

			});
}

// (2011.5.9. YSY 추가) [선거별] 시도 > 위원회 리스트 가져오기
function createTownCodesBySg() {
	var locationStr = '/bizcommon/selectbox/selectbox_townCodeBySgJson.json';
	var params = {
		electionId : parameters.electionId,
		electionCode : parameters.electionCode,
		cityCode : parameters.cityCode
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var townCodeList = response;
				var townCodeEl = $('#townCode');
				// townCode 옵션 추가
				for (var i = 0; i < townCodeList.length; i++) {
					var option = $('<option>').attr('value',
							townCodeList[i].CODE).html(townCodeList[i].NAME);
					option.appendTo(townCodeEl);
				}

				previousCityCode = parameters.cityCode;
				settingYN();
			});
}

//(2012.12.21. AMM 추가) [역대선거별]선거코드로 시도리스트 호출시 시도 코드 중복체크
function checkPreviousCityCodeForSgCode_Old(electionCode, cityCode, subElectionCode) {
	//if (previousElectionCode != electionCode) {
		$('#cityCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionCode = electionCode;
		if(subElectionCode != null){
			parameters.subElectionCode = subElectionCode;
		}else{
			parameters.subElectionCode = 0;
		}
		parameters.cityCode = cityCode;
		submitTimer = setTimeout(createCityCodesBySg_Old, 100);
	//}
}

//(2012.12.21. AMM 추가) [역대선거별] 시도 리스트 가져오기
function createCityCodesBySg_Old() {
	var locationStr = '/bizcommon/selectbox/selectbox_cityCodeBySgJson_Old.json';
	var params = {
			electionId : '0000000000',
			subElectionCode : parameters.subElectionCode,
			electionCode : parameters.electionCode
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var cityCodeList = response;
				var cityCodeEl = $('#cityCode');
				// cityCode 옵션 추가
				for (var i = 0; i < cityCodeList.length; i++) {
					var option = $('<option>').attr('value',
							cityCodeList[i].CODE).html(cityCodeList[i].NAME);
					option.appendTo(cityCodeEl);
				}
				previousElectionCode = parameters.electionCode;
				$('#cityCode').val(parameters.cityCode);
				settingYN();

			});
}

//(2012.12.25. PMY 추가) [구역대선거별] 선거코드로 시도리스트 호출시 시도 코드 중복체크
function checkPreviousCityCodeForSgCode_GuOld(electionName, cityCode) {
	$('#cityCode option').filter(function() {
				$value = $(this).val();
				if ($value > 0) return this;
			}).remove();

	clearTimeout(submitTimer);
	parameters.electionName = electionName;
	parameters.cityCode = cityCode;
	submitTimer = setTimeout(createCityCodesBySg_GuOld, 100);
}

//(2012.12.25. PMY 추가) [구역대선거별] 시도 리스트 가져오기
function createCityCodesBySg_GuOld() {
	var locationStr = '/bizcommon/selectbox/selectbox_cityCodeBySgJson_GuOld.json';
	var params = {
			electionId : '0000000000',
			electionCode : parameters.electionName
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var cityCodeList = response;
				var cityCodeEl = $('#cityCode');
				// cityCode 옵션 추가
				for (var i = 0; i < cityCodeList.length; i++) {
					var option = $('<option>').attr('value',
							cityCodeList[i].CODE).html(cityCodeList[i].NAME);
					option.appendTo(cityCodeEl);
				}
				previousElectionCode = parameters.electionCode;
				$('#cityCode').val(parameters.cityCode);
				settingYN();

			});
}

//(2012.01.04. AMM 추가) [역대선거] 선거코드로 하위선거타입 조회
function checkSubElectionTypeForSgCode_Old(electionCode, electionType, delProportion) {
	$('#electionCode option').filter(function() {
				$value = $(this).val();
				if ($value > 0) return this;
			}).remove();
	
	clearTimeout(submitTimer);
	parameters.electionCode = electionCode;
	parameters.electionType = electionType;
	parameters.delProportion = delProportion;
	submitTimer = setTimeout(createSubElectionTypeForSgCode_Old, 100);
}

//(2012.01.04. AMM 추가) [역대선거] 선거코드로 하위선거타입 조회
function createSubElectionTypeForSgCode_Old() {
	var locationStr = '/bizcommon/selectbox/selectbox_getSubElectionTypeJson.json';
	var params = {
			electionId : '0000000000',
			electionCode : parameters.electionCode,
			electionType : parameters.electionType
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var electionCodeList = response;
				var electionCodeEl = $('#electionCode');
				// electionCode 옵션 추가
				//alert(parameters.delProportion);
				for (var i = 0; i < electionCodeList.length; i++) {
					var option = $('<option>').attr('value',
							electionCodeList[i].CODE).html(electionCodeList[i].NAME);
					if(parameters.delProportion == "Y"){
						if(!(electionCodeList[i].CODE == "7" || electionCodeList[i].CODE == "8" || electionCodeList[i].CODE == "9")){
							option.appendTo(electionCodeEl);
						}
					}else if(parameters.delProportion == "7"){
						if(!(electionCodeList[i].CODE == parameters.delProportion)){
							option.appendTo(electionCodeEl);
						}
					}else if(parameters.delProportion != null && parameters.delProportion.length > 0){
						if(parameters.delProportion.indexOf(";" + electionCodeList[i].CODE + ";") < 0){
							option.appendTo(electionCodeEl);
						}
					}else{	
						option.appendTo(electionCodeEl);
					}
				}
				previousElectionCode = parameters.electionCode;
				$('#electionCode').val(parameters.electionCode);
				settingYN();

			});
}


//(2012.01.19. AMM 추가) [역대선거] 시도코드로 선거구 리스트 호출시 시도 코드 중복체크
function checkPreviousCityCodeForSggCityCode_Old(electionId, electionName, electionCode, cityCode) {
	if (previousCityCode != cityCode) {
		$('#sggCityCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionName = electionName;
		parameters.electionCode = electionCode;
		parameters.cityCode = cityCode;
		submitTimer = setTimeout(createSggCityCodes_Old, 100);
	}
}

//(2012.01.19. AMM 추가) [역대선거] 시도 선거구 가져오기
function createSggCityCodes_Old() {
	var locationStr = '/bizcommon/selectbox/selectbox_getSggCityCodeJson_Old.json';
	var params = {
		electionId : parameters.electionId,
		electionName : parameters.electionName,
		electionCode : parameters.electionCode,
		cityCode : parameters.cityCode
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var sggCityCodeList = response;
				var sggCityCodeEl = $('#sggCityCode');
				// sggCityCode 옵션 추가
				for (var i = 0; i < sggCityCodeList.length; i++) {
					var option = $('<option>').attr('value',
							sggCityCodeList[i].CODE)
							.html(sggCityCodeList[i].NAME);
					option.appendTo(sggCityCodeEl);
				}
				previousCityCode = parameters.cityCode;
				settingYN();
			});
}

//(2012.01.19. AMM 추가) [구역대선거] 시도코드로 선거구 리스트 호출시 시도 코드 중복체크
function checkPreviousCityCodeForSggCityCode_GuOld(electionId, electionName, electionCode, cityCode) {
	if (previousCityCode != cityCode) {
		$('#sggCityCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionName = electionName;
		parameters.electionCode = electionCode;
		parameters.cityCode = cityCode;
		submitTimer = setTimeout(createSggCityCodes_GuOld, 100);
	}
}

//(2012.01.19. AMM 추가) [구역대선거] 시도 선거구 가져오기
function createSggCityCodes_GuOld() {
	var locationStr = '/bizcommon/selectbox/selectbox_getSggCityCodeJson_GuOld.json';
	var params = {
		electionId : parameters.electionId,
		electionName : parameters.electionName,
		electionCode : parameters.electionCode,
		cityCode : parameters.cityCode
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var sggCityCodeList = response;
				var sggCityCodeEl = $('#sggCityCode');
				// sggCityCode 옵션 추가
				for (var i = 0; i < sggCityCodeList.length; i++) {
					var option = $('<option>').attr('value',
							sggCityCodeList[i].CODE)
							.html(sggCityCodeList[i].NAME);
					option.appendTo(sggCityCodeEl);
				}
				previousCityCode = parameters.cityCode;
				settingYN();
			});
}

//(2012.01.19. AMM 추가) [역대선거]  구시군 코드로 선거구 리스트 호출시 구시군 코드 중복체크
function checkPreviousTownCodeForSggTownCode_Old(electionId, electionName, electionCode, townCode) {
	//if (previousTownCode != townCode) {
		$('#sggTownCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionName = electionName;
		parameters.electionCode = electionCode;
		parameters.townCode = townCode;
		submitTimer = setTimeout(createSggTownCodes_Old, 100);
	//}
}

//(2012.01.19. AMM 추가) [역대선거] 구시군 선거구 가져오기
function createSggTownCodes_Old() {
	var params = {
		electionId : parameters.electionId,
		electionName : parameters.electionName,
		electionCode : parameters.electionCode,
		townCode : parameters.townCode
	};

	var locationStr = '/bizcommon/selectbox/selectbox_getSggTownCodeJson_Old.json';
	$.getJSONTE(locationStr, params, function(response, status) {
				var sggTownCodeList = response;
				var sggTownCodeEl = $('#sggTownCode');
				// sggTownCode 옵션 추가
				for (var i = 0; i < sggTownCodeList.length; i++) {
					var option = $('<option>').attr('value',
							sggTownCodeList[i].CODE)
							.html(sggTownCodeList[i].NAME);
					option.appendTo(sggTownCodeEl);
				}
				previousCityCode = parameters.cityCode;
				previousTownCode = parameters.townCode;
				settingYN();
			});
}

//(2012.01.19. AMM 추가) [구역대선거] 구시군 코드로 선거구 리스트 호출시 구시군 코드 중복체크
function checkPreviousTownCodeForSggTownCode_GuOld(electionId, electionName, electionCode, townCode) {
	//if (previousTownCode != townCode) {
		$('#sggTownCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionName = electionName;
		parameters.electionCode = electionCode;
		parameters.townCode = townCode;
		submitTimer = setTimeout(createSggTownCodes_GuOld, 100);
	//}
}

//(2012.01.19. AMM 추가) [구역대선거] 구시군 선거구 가져오기
function createSggTownCodes_GuOld() {
	var params = {
		electionId : parameters.electionId,
		electionName : parameters.electionName,
		electionCode : parameters.electionCode,
		townCode : parameters.townCode
	};

	var locationStr = '/bizcommon/selectbox/selectbox_getSggTownCodeJson_GuOld.json';
	$.getJSONTE(locationStr, params, function(response, status) {
				var sggTownCodeList = response;
				var sggTownCodeEl = $('#sggTownCode');
				// sggTownCode 옵션 추가
				for (var i = 0; i < sggTownCodeList.length; i++) {
					var option = $('<option>').attr('value',
							sggTownCodeList[i].CODE)
							.html(sggTownCodeList[i].NAME);
					option.appendTo(sggTownCodeEl);
				}
				previousCityCode = parameters.cityCode;
				previousTownCode = parameters.townCode;
				settingYN();
			});
}

//(2012.01.24. AMM 추가) [역대선거] 정당코드  중복체크
function checkPreviousElectionCodeForJdCode_Old(electionId, electionCode) {
	//if (previousTownCode != townCode) {
		$('#proportionalRepresentationCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionCode = electionCode;
		submitTimer = setTimeout(createJdCodeByElection_Old, 100);
	//}
}

//(2012.01.24. AMM 추가) [역대선거] 정당코드 가져오기
function createJdCodeByElection_Old() {
	var locationStr = '/bizcommon/selectbox/selectbox_getJdCodeJson_Old.json';
	var params = {
		electionId : parameters.electionId,
		electionCode : parameters.electionCode
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var tempCodeList = response;
				var tempCodeEl = $('#proportionalRepresentationCode');
				// townCode 옵션 추가
				for (var i = 0; i < tempCodeList.length; i++) {
					var option = $('<option>').attr('value',
							tempCodeList[i].CODE).html(tempCodeList[i].NAME);
					option.appendTo(tempCodeEl);
				}

				//previousCityCode = parameters.cityCode;
				settingYN();
			});
}

//(2012.01.24. AMM 추가) [역대선거] //선거구 코드로 구시군 위원회 리스트 호출시 선거구 코드 중복 체크
function checkPreviousSggCityCodeForTownCodeFromSgg_Old(electionId, electionName, electionCode, sggCityCode){
	if (previousSggCityCode != sggCityCode) {
		$('#townCodeFromSgg option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionName = electionName;
		parameters.electionCode = electionCode;
		parameters.sggCityCode = sggCityCode;
		submitTimer = setTimeout(createTownCodesFromSgg_Old, 100);
	}
}

//(2012.01.24. AMM 추가) [역대선거] //선거구에 속한 구시군위원회 리스트 가져오기
function createTownCodesFromSgg_Old(){
	var params = {
			electionId : parameters.electionId,
			electionName : parameters.electionName,
			electionCode : parameters.electionCode,
			sggCityCode : parameters.sggCityCode
		};
	
	var locationStr = '/bizcommon/selectbox/selectbox_townCodeFromSggJson_Old.json';
	$.getJSONTE(locationStr, params, function(response, status) {
				var townCodeFromSggList = response;
				var townCodeFromSggEl = $('#townCodeFromSgg');
				// sggTownCode 옵션 추가
				for (var i = 0; i < townCodeFromSggList.length; i++) {
					var option = $('<option>').attr('value',
							townCodeFromSggList[i].CODE)
							.html(townCodeFromSggList[i].NAME);
					option.appendTo(townCodeFromSggEl);
				}
				previousCityCode = parameters.cityCode;
				previousSggCityCode = parameters.sggCityCode;
				settingYN();
			});
}


//(2012.01.30. AMM 추가) [역대선거] [선거별]시도코드로 구시군 리스트 호출시 시도 코드 중복체크
function checkPreviousCityCodeForTownCodeBySg_Old(electionId, electionCode, cityCode, subElectionCode) {
	
	if (previousCityCode != cityCode) {
		$('#townCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionCode = electionCode;
		parameters.cityCode = cityCode;
		parameters.subElectionCode = subElectionCode;
		submitTimer = setTimeout(createTownCodesBySg_Old, 100);
	}
}

//(2012.01.30. AMM 추가) 시도 > 위원회 리스트 가져오기
function createTownCodesBySg_Old() {
	var locationStr = '/bizcommon/selectbox/selectbox_townCodeBySgJson_Old.json';
	var params = {
		electionId : parameters.electionId,
		electionCode : parameters.electionCode,
		cityCode : parameters.cityCode,
		subElectionCode : parameters.subElectionCode
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var townCodeList = response;
				var townCodeEl = $('#townCode');
				// townCode 옵션 추가
				for (var i = 0; i < townCodeList.length; i++) {
					var option = $('<option>').attr('value',
							townCodeList[i].CODE).html(townCodeList[i].NAME);
					option.appendTo(townCodeEl);
				}

				previousCityCode = parameters.cityCode;
				//settingYN();
			});
}


//(2012.01.30. AMM 추가) [구역대선거] [선거별]시도코드로 구시군 리스트 호출시 시도 코드 중복체크
function checkPreviousCityCodeForTownCodeBySg_GuOld(electionId, electionCode, cityCode, subElectionCode) {
	if (previousCityCode != cityCode) {
		$('#townCode option').filter(function() {
					$value = $(this).val();
					if ($value > 0) return this;
				}).remove();

		clearTimeout(submitTimer);
		parameters.electionId = electionId;
		parameters.electionCode = electionCode;
		parameters.cityCode = cityCode;
		parameters.subElectionCode = subElectionCode;
		submitTimer = setTimeout(createTownCodesBySg_GuOld, 100);
	}
}

//(2012.01.30. AMM 추가) 시도 > 위원회 리스트 가져오기
function createTownCodesBySg_GuOld() {
	var locationStr = '/bizcommon/selectbox/selectbox_townCodeBySgJson_GuOld.json';
	var params = {
		electionId : parameters.electionId,
		electionCode : parameters.electionCode,
		cityCode : parameters.cityCode,
		subElectionCode : parameters.subElectionCode
	};

	$.getJSONTE(locationStr, params, function(response, status) {
				var townCodeList = response;
				var townCodeEl = $('#townCode');
				
				// townCode 옵션 추가
				for (var i = 0; i < townCodeList.length; i++) {
					var option = $('<option>').attr('value',
							townCodeList[i].CODE).html(townCodeList[i].NAME);
					option.appendTo(townCodeEl);
				}

				previousCityCode = parameters.cityCode;
				//settingYN();
			});
}

