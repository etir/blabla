$("#register").hide();
$("#login").hide();
$("#About").hide();
document.getElementById("game").style.visibility = "hidden";

$("#log2").click(function (event) {
    $("#Welcome").hide();
    $("#login").show();
    document.getElementById("seting").style.visibility = "hidden";
    document.getElementById("game").style.visibility = "hidden";

});

$("#reg2").click(function (event) {
    $("#register").show();
    $("#Welcome").hide();
    document.getElementById("seting").style.visibility = "hidden";
    document.getElementById("game").style.visibility = "hidden";

});

$("#log").click(function (event) {
    $("#register").hide();
    $("#Welcome").hide();
    $("#About").hide();
    $("#login").show();
    document.getElementById("seting").style.visibility = "hidden";
    document.getElementById("game").style.visibility = "hidden";

});

$("#reg").click(function (event) {
    $("#register").show();
    $("#login").hide();
    $("#Welcome").hide();
    $("#About").hide();
    document.getElementById("seting").style.visibility = "hidden";
    document.getElementById("game").style.visibility = "hidden";

});

$("#wel").click(function (event) {
    $("#Welcome").show();
    $("#login").hide();
    $("#register").hide();
    $("#About").hide();
    document.getElementById("seting").style.visibility = "hidden";
    document.getElementById("game").style.visibility = "hidden";

});

$("#ab").click(function (event) {
    $("#About").show();
    $("#login").hide();
    $("#Welcome").hide();
    $("#register").hide();
    document.getElementById("seting").style.visibility = "hidden";
    document.getElementById("game").style.visibility = "hidden";

});


$(function () {
    $("#datepicker").datepicker();


});
