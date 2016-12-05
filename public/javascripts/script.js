$(document).ready(function(){
$('#form1').focus();
$( ".display-msg" ).scrollTop( 3000 );
validate();
});

function validate() {
var xmlhttp;
var url=window.location.href;
var temp1=url.split("show");
if (window.XMLHttpRequest) { // for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp = new XMLHttpRequest();
} else { // for IE6, IE5
xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState != 4 && xmlhttp.status == 200) {
alert("Validating..");
} else if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	$( ".display-msg" ).scrollTop( 3000 );

var arr=xmlhttp.responseText;
var s = JSON.parse(arr);
	$(".display-msg").text(" ");
for(var i=0;i<s.num;i++)
	$(".display-msg").append(s.row[i].name+":"+s.row[i].message+"<br>");
 $(".display-msg").css({'background': '#c4ffbf',
    'border': '1px solid #c4ffbf',
    'border-radius': '8px'});
 $(".display-msg").append("<br>");
} else {
}
}
xmlhttp.open("get", "/update"+temp1[1], false);
xmlhttp.send();
    setTimeout(arguments.callee,10);

}

