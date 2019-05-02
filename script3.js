var Users =[];
var counter = 0;
var UserA =[];
UserA[0] = "a";
UserA[1] = "a";
Users[counter] = UserA;
counter++;


function adduser() {
    var newusers = [];

    newusers[0] = document.getElementById("username").value;
    newusers[1] = document.getElementById("psw").value;

    Users[counter] = newusers;
    counter++;
    alert("User added succefully");
    $("#register").hide();
    $("#Welcome").show();

}


function validate() {

    var usertocheck = document.getElementById("loguser").value;
    var passtocheck = document.getElementById("logpassword").value;
    var found = false;
    for (var i = 0; i < Users.length; i++) {
        if (Users[i][0] == usertocheck && Users[i][1] == passtocheck) {
            found = true;
            $("#login").hide();
            document.getElementById("seting").style.visibility = "visible";
        }
    }
    if (found == false) {
        alert("Inccorrect User or Password");
    }



}

