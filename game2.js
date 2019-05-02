var context = canvas.getContext("2d");
var shape = new Object();
var monsters = new Array();
var heart = new Object();
var color1 = "white";
var color2 = "white";
var color3 = "white";
var coin = new Object();
var board;
var score = 0;
var start_time;
var time_elapsed;
var interval;
var interval2;
var interval3;
var interval4;
var audio2 = new Audio('begin.wav');
var games = 3;
var numofmonsters = 3;
var NumOfBalls = 90;
var TotalTime = 60;
var up = 'ArrowUp';
var down = 'ArrowDown';
var left = 'ArrowLeft';
var right = 'ArrowRight';
var life = 1;
var coinnum=1;
var isMonsterDead=false;
stop();
InitVariables(document.getElementById("numOfMonsters").value, document.getElementById("ballsColor2").value, document.getElementById("ballsColor1").value, document.getElementById("ballsColor3").value, document.getElementById("balls").value, parseInt(document.getElementById("Time").value), document.getElementById("kup").value, document.getElementById("kdown").value, document.getElementById("kleft").value, document.getElementById("kright").value);
Start();

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function song() {
    audio2.play();
}


function timer(){
    TotalTime--;
    lblTime.value = TotalTime;
    if(TotalTime==0){
        audio2.pause();
        context.clearRect(0, 0, canvas.width, canvas.height); //clean board
        clearInterval(interval);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);
        if(score<150){
            alert("you can do better"+" " +score);
        }
        else{
            stop();
            alert("we have a Winner"+" " +score);


        }
    }
}

function InitVariables(Monstersnum, CO1, CO2, CO3, ballsnum, time, UP, DOWN, LEFT, RIGHT) {
    numofmonsters=Monstersnum;
    for (var i = 0; i < Monstersnum; i++) {
        monsters[i] = new Object();
    }

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);

    color1 = CO1;
    color2 = CO2;
    color3 = CO3;
    NumOfBalls = ballsnum;
    TotalTime = time;
    board = new Array();
    start_time = new Date();
    InitBoard();
    up = UP;
    down = DOWN;
    left = LEFT;
    right = RIGHT;
}

function GetKeyPressed() {
    if (keysDown[up] || keysDown[up.substring(0,up.length-1)]) {
        return 1;
    }

    if (keysDown[down]|| keysDown[down.substring(0,down.length-1)]) {
        return 2;
    }

    if (keysDown[left]|| keysDown[left.substring(0,left.length-1)]) {
        return 3;
    }

    if (keysDown[right]|| keysDown[right.substring(0,right.length-1)]) {
        return 4;
    }

}

function InitBoard() {
    var cnt = 225;
    for (var i = 0; i < 15; i++) {
        board[i] = new Array();
        for (var j = 0; j < 15; j++) {
            if ((i === 2 && j === 2) || (i == 3 && j == 2) || (i === 2 && j === 3) || (i === 2 && j === 4) || (i === 11 && j === 2) || (i === 12 && j === 2) || (i === 12 && j === 4) || (i === 12 && j === 3) || (i === 6 && j === 6) || (i === 6 && j === 7) || (i === 7 && j === 6) || (i === 7 && j === 7) || (i === 2 && j === 11) || (i === 2 && j === 10) || (i === 2 && j === 12) || (i === 3 && j === 12) || (i === 12 && j === 10) || (i === 12 && j === 11) || (i === 11 && j === 12) || (i === 12 && j === 12)) {
                board[i][j] = 4;
            }
            else
                board[i][j] = 0;
        }
    }

    var row;
    var col;
    var totalballs = NumOfBalls;
    while (NumOfBalls != 0) {
        row = getRandomArbitrary(0, 14);
        col = getRandomArbitrary(0, 14);
        if (board[col][row] ==0 && isMonsterPosition(col, row)==false) {
            if (NumOfBalls >= 0.4 * totalballs) {
                board[col][row] = 1;
                NumOfBalls--;
            }

            else if (NumOfBalls < 0.4 * totalballs && NumOfBalls >= 0.1 * totalballs) {
                board[col][row] = 5;
                NumOfBalls--;
            }

            else{
                board[col][row] = 6;
                NumOfBalls--;
            }
        }

        else {
            continue;
        }

    }

}

function isMonsterPosition(i, j) {
    for (var k = 0; k < numofmonsters; k++) {
        if (monsters[k].i == i && monsters[k].j == j) {
            return true;
        }

    }
    return false;
}
function iscoinposition(i,j){
    if(coin.i==i &&coin.j==j){
        return true;
    }
    return false;
}

function Start() {
    if (numofmonsters == 3) {
        monsters[0].i = 0;
        monsters[0].j = 0;
        monsters[1].i = 14;
        monsters[1].j = 0;
        monsters[2].i = 0;
        monsters[2].j = 14;
    }

    if (numofmonsters == 2) {
        monsters[0].i = 0;
        monsters[0].j = 0;
        monsters[1].i = 14;
        monsters[1].j = 0;
    }

    if (numofmonsters == 1) {
        monsters[0].i = 0;
        monsters[0].j = 0;
    }
    var pac = 1;

    while (pac != 0) {
        row = getRandomArbitrary(0, 14);
        col = getRandomArbitrary(0, 14);
        if (board[col][row] == 0 && isMonsterPosition(col, row)==false) {
            board[col][row] = 2;
            pac--;
            shape.i=col;
            shape.j=row;

        }

    }

    while(coinnum!=0){
        coin.i = 14;
        coin.j = 14;
        coinnum--;
    }

    while (life != 0) {
        row = getRandomArbitrary(0, 14);
        col = getRandomArbitrary(0, 14);
        if (board[col][row] == 0 && isMonsterPosition(col, row)==false) {
            board[col][row] = 3;
            heart.i=col;
            heart.j=row;
            life--;
        }

    }



    interval = setInterval(UpdatePosition, 200);
    //UpdatePosition();
    interval2 = setInterval(Updatemonsters, 300);
    //Updatemonsters();
    song();
    interval3 = setInterval(timer, 1000);
    interval4 = setInterval(song, 3200);
}

function UpdatePosition() {

    for(var m=0;m<numofmonsters;m++) {
        if(monsters[m].i==shape.i && monsters[m].j==shape.j){
            newGame();
            return;
        }
    }

    if(gameover()){stop(); alert("We have a Winner!!!  score : " + score)}

    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4 && isMonsterPosition(shape.i, shape.j - 1)==false) {
            shape.j--;
        }

    }

    if (x === 2) {
        if (shape.j < 14 && board[shape.i][shape.j + 1] !== 4 && isMonsterPosition(shape.i, shape.j + 1)==false) {
            shape.j++;
        }

    }

    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4 && isMonsterPosition(shape.i - 1, shape.j)==false) {
            shape.i--;
        }

    }

    if (x === 4) {
        if (shape.i < 14 && board[shape.i + 1][shape.j] !== 4 && isMonsterPosition(shape.i + 1, shape.j)==false) {
            shape.i++;

        }

    }

    if (board[shape.i][shape.j] === 1) {
        score = score + 5;
    }

    if (board[shape.i][shape.j] === 5) {
        score = score + 15;
    }

    if (board[shape.i][shape.j] === 6) {
        score = score + 25;
    }

    if (shape.i == coin.i && shape.j == coin.j) {
        score = score + 50;
        coin.i=100000;
        coin.j=100000;
        coinnum++;
    }

    if (shape.i == heart.i && shape.j == heart.j) {
        games++;
        life++;
        board[heart.i][heart.j]=0;
        heart.i=1000000;
        heart.j=1000000;
        isMonsterDead=true;
        Draw(x,isMonsterDead);
        setTimeout(function() { isMonsterDead=false; },4000);
    }


    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;

    Draw(x,isMonsterDead);


}
function stop(){
    audio2.pause();
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    clearInterval(interval);
    clearInterval(interval2);
    clearInterval(interval3);
    clearInterval(interval4);
}
function newGame() {
    games--;
    if (games < 1) {
        audio2.pause();
        context.clearRect(0, 0, canvas.width, canvas.height); //clean board
        clearInterval(interval);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);
        window.alert("You Lost!");

    }

    else{
        clearInterval(interval);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);

        var audio = new Audio('death.wav');
        audio2.pause();
        audio.play();
        score = score - 10;
        // coin.i = 9;
        //coin.j = 0;
        board[shape.i][shape.j]=0;
        context.clearRect(0, 0, canvas.width, canvas.height); //clean board
        Start();
    }
}

function GetMin(arr) {
    //by given array of integer return the index of the min value in the array
    var min = arr[0];
    var index = 0;
    for (var k = 1; k < arr.length; k++) {
        if (arr[k] < min) {
            min = arr[k];
            index = k;
        }

    }

    return index;
}


function Updatemonsters() {

    for (var i = 0; i < numofmonsters; i++) {
        var array = new Array();
        var updated=false;
        array[0] = Math.abs(monsters[i].i + 1 - shape.i) + Math.abs(monsters[i].j - shape.j);
        array[1] = Math.abs(monsters[i].i - 1 - shape.i) + Math.abs(monsters[i].j - shape.j);
        array[2] = Math.abs(monsters[i].i - shape.i) + Math.abs(monsters[i].j + 1 - shape.j);
        array[3] = Math.abs(monsters[i].i - shape.i) + Math.abs(monsters[i].j - 1 - shape.j);

        while(updated==false){
            var index = GetMin(array);
            if (index == 0) {
                if (board[monsters[i].i + 1][monsters[i].j] != 4 && monsters[i].i < 14 && board[monsters[i].i + 1][monsters[i].j] != 3 && isMonsterPosition(monsters[i].i + 1,monsters[i].j)==false  &&iscoinposition(monsters[i].i + 1,monsters[i].j)==false) {
                    monsters[i].i = monsters[i].i + 1;
                    updated=true;
                }
                else
                    array[0]=1000000;
            }

            if (index == 1) {
                if (board[monsters[i].i - 1][monsters[i].j] != 4 && monsters[i].i > 0 && board[monsters[i].i - 1][monsters[i].j] != 3 && isMonsterPosition(monsters[i].i - 1,monsters[i].j)==false &&iscoinposition(monsters[i].i - 1,monsters[i].j)==false) {
                    monsters[i].i = monsters[i].i - 1;
                    updated=true;
                }
                else{
                    array[1]=1000000;
                }

            }

            if (index == 2) {
                if (board[monsters[i].i][monsters[i].j + 1] != 4 && monsters[i].j < 14 && board[monsters[i].i][monsters[i].j + 1] != 3&& isMonsterPosition(monsters[i].i ,monsters[i].j+1)==false &&iscoinposition(monsters[i].i,monsters[i].j+1)==false) {
                    monsters[i].j = monsters[i].j + 1;
                    updated=true;
                }
                else{  array[2]=1000000;}


            }

            if (index == 3) {
                if (board[monsters[i].i][monsters[i].j - 1] != 4 && monsters[i].j > 0 && board[monsters[i].i][monsters[i].j - 1] != 3&& isMonsterPosition(monsters[i].i,monsters[i].j-1)==false &&iscoinposition(monsters[i].i,monsters[i].j-1)==false) {
                    monsters[i].j = monsters[i].j - 1;
                    updated=true;
                }
                else{
                    array[3]=1000000;
                }

            }
        }
    }

    var moved=false;
    while(moved==false){
        var rand=getRandomArbitrary(0,3);
        if(rand==0){
            if(coin.i<14 && board[coin.i+1][coin.j]!=4 && board[coin.i+1][coin.j] != 3 && isMonsterPosition(coin.i+1,coin.j)==false){
                coin.i=coin.i+1;
                moved=true;
            }
        }
        if(rand==1){
            if(coin.i>0 && board[coin.i-1][coin.j]!=4 && board[coin.i-1][coin.j] != 3 && isMonsterPosition(coin.i-1,coin.j)==false){
                coin.i=coin.i-1;
                moved=true;
            }

        }
        if(rand==2){
            if(coin.j<14 && board[coin.i][coin.j+1]!=4 && board[coin.i][coin.j+1] != 3 && isMonsterPosition(coin.i,coin.j+1)==false){
                coin.j=coin.j+1;
                moved=true;
            }

        }
        if(rand==3){
            if(coin.j>0 && board[coin.i][coin.j-1]!=4 && board[coin.i][coin.j-1] != 3 && isMonsterPosition(coin.i,coin.j-1)==false){
                coin.j=coin.j-1;
                moved=true;
            }

        }

    }
    Draw(4,isMonsterDead);
}

function Draw(direct,isMonsterDead) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    lblScore.value = score;
    lbllife.value = games;
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            var center = new Object();
            center.x = i * 60 + 30 ;
            center.y = j * 60 + 30;
            if (board[i][j] === 2) {
                if (direct == 1) {
                    context.beginPath();
                    context.arc(center.x, center.y, 20, 0.15 * Math.PI - 1.45, 1.85 * Math.PI - 1.45);
                    context.lineTo(center.x, center.y);
                    context.fillStyle = "yellow";
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 13, center.y, 3, 0, 2 * Math.PI);
                    context.fillStyle = "black";
                    context.fill();
                }

                if (direct == 2) {
                    context.beginPath();
                    context.arc(center.x, center.y, 20, 1.45 + 0.15 * Math.PI, 1.45 + 1.85 * Math.PI);
                    context.lineTo(center.x, center.y);
                    context.fillStyle = "yellow";
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 13, center.y - 5, 3, 0, 2 * Math.PI);
                    context.fillStyle = "black";
                    context.fill();
                }

                if (direct == 3) {
                    context.beginPath();
                    context.arc(center.x, center.y, 20, 2.9 + 0.15 * Math.PI, 2.9 + 1.85 * Math.PI);
                    context.lineTo(center.x, center.y);
                    context.fillStyle = "yellow";
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI);
                    context.fillStyle = "black";
                    context.fill();
                }

                if (direct == 4 || direct == undefined) {
                    //alert(center.x+" " +i + " "+ center.y +" "+j);
                    context.beginPath();
                    context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI);
                    context.lineTo(center.x, center.y);
                    context.fillStyle = "yellow";
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI);
                    context.fillStyle = "black";
                    context.fill();
                }

            }

            else if (board[i][j] === 1) {
                context.beginPath();
                context.rect(center.x, center.y, 15, 15);
                context.fillStyle = color1;
                context.fill();
            }

            else if (board[i][j] === 5) {
                context.beginPath();
                context.rect(center.x, center.y, 15, 15);
                context.fillStyle = color2;
                context.fill();
            }

            else if (board[i][j] === 6) {
                context.beginPath();
                context.rect(center.x, center.y, 15, 15);
                context.fillStyle = color3;
                context.fill();
            }

            else if (board[i][j] == 3) {
                var sprite6 = new Image();
                sprite6.src = "life.jpg";
                context.drawImage(sprite6, i * 60, j * 60 + 10, 60, 60);
            }

        }
    }

    var wall1 = new Image();
    wall1.src = "wall2.jpg";
    context.drawImage(wall1, 2 * 60, 3* 60 + 10, 60, 60);
    context.drawImage(wall1, 3 * 60, 2* 60 + 10, 60, 60);
    context.drawImage(wall1, 2 * 60, 4* 60 + 10, 60, 60);
    context.drawImage(wall1, 2 * 60, 2* 60 + 10, 60, 60);

    context.drawImage(wall1, 11 * 60, 2* 60 + 10, 60, 60);
    context.drawImage(wall1, 12 * 60, 2* 60 + 10, 60, 60);
    context.drawImage(wall1, 12 * 60, 4* 60 + 10, 60, 60);
    context.drawImage(wall1, 12 * 60, 3* 60 + 10, 60, 60);

    context.drawImage(wall1, 6 * 60, 7* 60 + 10, 60, 60);
    context.drawImage(wall1, 7 * 60, 6* 60 + 10, 60, 60);
    context.drawImage(wall1, 7 * 60, 7* 60 + 10, 60, 60);
    context.drawImage(wall1, 6 * 60, 6* 60 + 10, 60, 60);

    context.drawImage(wall1, 2 * 60, 11* 60 + 10, 60, 60);
    context.drawImage(wall1, 2 * 60, 10* 60 + 10, 60, 60);
    context.drawImage(wall1, 2 * 60, 12* 60 + 10, 60, 60);
    context.drawImage(wall1, 3 * 60, 12* 60 + 10, 60, 60);

    context.drawImage(wall1, 12 * 60, 10* 60 + 10, 60, 60);
    context.drawImage(wall1, 11 * 60, 12* 60 + 10, 60, 60);
    context.drawImage(wall1, 12 * 60, 11* 60 + 10, 60, 60);
    context.drawImage(wall1, 12 * 60, 12* 60 + 10, 60, 60);
    if(isMonsterDead==true ){
        var sprite = new Image();
        sprite.src = "mons4.jpg";
        context.drawImage(sprite, monsters[0].i * 60, monsters[0].j * 60 + 10, 60, 60);

        if (numofmonsters > 1) {
            context.drawImage(sprite, monsters[1].i * 60, monsters[1].j * 60 + 10, 60, 60);
        }

        if (numofmonsters > 2) {
            context.drawImage(sprite, monsters[2].i * 60, monsters[2].j * 60 + 10, 60, 60);
        }
    }
    else{
        var sprite = new Image();
        sprite.src = "mons1.jpg";
        context.drawImage(sprite, monsters[0].i * 60, monsters[0].j * 60 + 10, 60, 60);

        if (numofmonsters > 1) {
            var sprite2 = new Image();
            sprite2.src = "mons2.jpg";
            context.drawImage(sprite2, monsters[1].i * 60, monsters[1].j * 60 + 10, 60, 60);
        }

        if (numofmonsters > 2) {
            var sprite3 = new Image();
            sprite3.src = "mons3.jpg";
            context.drawImage(sprite3, monsters[2].i * 60, monsters[2].j * 60 + 10, 60, 60);
        }
    }
    var sprite4 = new Image();
    sprite4.src = "50.jpg";
    context.drawImage(sprite4, coin.i * 60, coin.j * 60 + 10, 60, 60);
}



function gameover(){

    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if (board[i][j]==1 || board[i][j]==5||board[i][j]==6){
                return false;
            }
        }
    }

    return true;
}

