/******************************************************************************
Description	: UbiReport 호출
Author		: 
Date		: 2012-2-21
******************************************************************************/
// UbiReport 호출
var rep_pop_win;
function go_Report(title)
{
	rep_pop_win = window.open("/common/ubiviewer.jsp?title=" + title, "rep_pop_win", "top=0,left=0,width=1152,height=768,resizable=no, scrollbars=no,menubars=no,status=no");
}
function viewReport(url, title) {
	//alert(document.all.tableWrapPostionA.innerHTML);
	
	rep_pop_win.UbiViewer.setJrfFileDir("http://" + url + "/common/");
	rep_pop_win.UbiViewer.setReportTitle(title);
	
	rep_pop_win.UbiViewer.LoadTemplet("report.jrf");
	rep_pop_win.UbiViewer.SetVariable("IsRuntimeHtml", "true");
	rep_pop_win.UbiViewer.SetVariable("HtmlCSS", "http://" + url + "/common/css/dw.css");
	rep_pop_win.UbiViewer.SetVariable("HtmlCode", document.all.tableWrapPostionA.innerHTML);
	rep_pop_win.UbiViewer.SetArgument("title", title);
	rep_pop_win.UbiViewer.RetrieveBind();
}