

    var context = canvas.getContext("2d");
    var shape = new Object();
    var mons1 = new Object();
    var mons2 = new Object();
    var mons3 = new Object();
    var coin = new Object();
    var heart = new Object();

    var board;
    var score=0;
    var pac_color;
    var start_time;
    var time_elapsed;
    var interval;
    var interval2;
    var interval3;
    var interval4;
    var audio2;
    
    var ismons1=true;
    var ismons2=true;
    var ismons3 = true;
    var games = 3;

    Start();



    function newGame() {
        games--;
        if (games < 1) {
            audio2.pause();
            context.clearRect(0, 0, canvas.width, canvas.height); //clean board
            clearInterval(interval);
            clearInterval(interval2);
            clearInterval(interval3);
            clearInterval(interval4);
            window.alert("Game Over");

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
        coin.i = 9;
        coin.j = 0;
        context.clearRect(0, 0, canvas.width, canvas.height); //clean board
        Start();
        }
    }


    function Start() {

        if (document.getElementById("numOfMonsters").value == 1) {
            ismons1 = true;
            ismons2 = false;
            ismons3 = false;

        }

        if (document.getElementById("numOfMonsters").value == 2) {
            ismons1 = true;
            ismons2 = true;
            ismons3 = false;

        } 

        board = new Array();
        pac_color = "yellow";
        var cnt = 100;
        var food_remain = 50;
        var pacman_remain = 1;
        start_time = new Date();
        for (var i = 0; i < 10; i++) {
        board[i] = new Array();
    //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
    for (var j = 0; j < 10; j++) {
                if ((i === 3 && j === 3) || (i==4 && j==3) || (i === 3 && j === 4)  || (i === 7 && j === 7) || (i === 7 && j === 8)) {
                 board[i][j] = 4;
    } else {
                    var randomNum = Math.random();
                    if (randomNum <= 1.0 * food_remain / cnt) {
        food_remain--;
    board[i][j] = 1;
                    }

                    else if (i<8 &&j<9 && i>1 && j>1 && randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                    } else {
                 board[i][j] = 0;
    }
                    cnt--;
                }
            }
        }
        while (food_remain > 0) {
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 1;
            food_remain--;
        }
        keysDown = {};
        addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
        addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
        interval = setInterval(UpdatePosition, 200);
        interval2 = setInterval(Updatemonsters, 800);
        interval3 = setInterval(updatecoin, 900);
        interval4 = setInterval(song, 4000);
        mons1.i = 0;
        mons1.j = 0;

        mons2.i = 9;
        mons2.j = 9;

        mons3.i = 0;
        mons3.j = 9;

        coin.i = 9;
        coin.j = 0;

        heart.i = 8;
        heart.j = 9;

    }


    function findRandomEmptyCell(board) {
        var i = Math.floor((Math.random() * 9) + 1);
        var j = Math.floor((Math.random() * 9) + 1);
        while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 9) + 1);
    j = Math.floor((Math.random() * 9) + 1);
        }
        return [i, j];
    }

    /**
     * @return {number}
    */
    function GetKeyPressed() {
        if (keysDown['ArrowUp']) {
            return 1;
        }
        if (keysDown['ArrowDown']) {
            return 2;
        }
        if (keysDown['ArrowLeft']) {
            return 3;
        }
        if (keysDown['ArrowRight']) {
            return 4;
        }
    }


        function song() {
             audio2 = new Audio('begin.wav');
             audio2.play();
            }



    function Draw(direct) {
        context.clearRect(0, 0, canvas.width, canvas.height); //clean board
        lblScore.value = score;
        life.value = games;
        lblTime.value = time_elapsed;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var center = new Object();
                center.x = i * 60 + 30;
                center.y = j * 60 + 30;


                 if (board[i][j] === 2) {
                    if (direct == 1) {
                        context.beginPath();
                        context.arc(center.x, center.y, 20,0.15 * Math.PI-1.45,1.85 * Math.PI-1.45); // half circle
                        context.lineTo(center.x, center.y);
                        context.fillStyle = pac_color; //color
                        context.fill();
                        context.beginPath();
                        context.arc(center.x -13, center.y , 3, 0, 2 * Math.PI); // circle
                        context.fillStyle = "black"; //color
                        context.fill();
                    }
                    if (direct == 2) {
                        context.beginPath();
                        context.arc(center.x, center.y, 20,1.45+ 0.15 * Math.PI, 1.45+1.85 * Math.PI); // half circle
                        context.lineTo(center.x, center.y);
                        context.fillStyle = pac_color; //color
                        context.fill();
                        context.beginPath();
                        context.arc(center.x + 13, center.y - 5, 3, 0, 2 * Math.PI); // circle
                        context.fillStyle = "black"; //color
                        context.fill();
                    }

                    if (direct == 3) {
                        context.beginPath();
                        context.arc(center.x, center.y, 20,2.9 +0.15 * Math.PI,2.9+ 1.85 * Math.PI); // half circle
                        context.lineTo(center.x, center.y);
                        context.fillStyle = pac_color; //color
                        context.fill();
                        context.beginPath();
                        context.arc(center.x + 5, center.y -15,3, 0, 2 * Math.PI); // circle
                        context.fillStyle = "black"; //color
                        context.fill();
                    }

                    if (direct == 4 || direct==undefined ) {
                        context.beginPath();
                        context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                        context.lineTo(center.x, center.y);
                        context.fillStyle = pac_color; //color
                        context.fill();
                        context.beginPath();
                        context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
                        context.fillStyle = "black"; //color
                        context.fill();

                    }

           

                } else if (board[i][j] === 1) {
        context.beginPath();
    context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
    context.fillStyle = "white"; //color
                    context.fill();
                } else if (board[i][j] === 4) {
                     context.beginPath();
                     context.rect(center.x - 30, center.y - 30, 60, 60);
                     context.fillStyle = "#483D8B"; //color
                    context.fill();
                }
            }
        }
        var sprite = new Image();
        sprite.src = "mons1.jpg";
        context.drawImage(sprite, mons1.i*60,mons1.j*60+10,60,60);


        var sprite2 = new Image();
        sprite2.src = "mons2.jpg";
        context.drawImage(sprite2, mons2.i * 60, mons2.j * 60 + 10, 60, 60);


        var sprite3 = new Image();
        sprite3.src = "mons3.jpg";
        context.drawImage(sprite3, mons3.i * 60, mons3.j * 60 + 10, 60, 60);

        var sprite4 = new Image();
        sprite4.src = "50.jpg";
        context.drawImage(sprite4, coin.i * 60, coin.j * 60 + 10, 60, 60);


        var sprite5 = new Image();
        sprite5.src = "heart.gif";
        context.drawImage(sprite5, heart.i * 60, heart.j * 60 + 10, 60, 60);



    }


function Updatemonsters() {
    var mindistance1 = Math.min(Math.abs(mons1.i + 1 - shape.i) + Math.abs(mons1.j - shape.j), Math.abs(mons1.i - 1 - shape.i) + Math.abs(mons1.j - shape.j), Math.abs(mons1.i - shape.i) + Math.abs(mons1.j + 1 - shape.j), Math.abs(mons1.i - shape.i) + Math.abs(mons1.j - 1 - shape.j));

    if (Math.abs(mons1.i + 1 - shape.i) + Math.abs(mons1.j - shape.j) == mindistance1) {

        if (board[mons1.i + 1][mons1.j] != 4 ) {
            mons1.i = mons1.i + 1;
            if (ismons2 == true && mons1.i==mons2.i && mons1.j == mons2.j){
                mons1.i--;
            }
            if (ismons3 == true && mons1.i==mons3.i && mons1.j == mons3.j){
                mons1.i--;
            }

        }

    }

    else if (Math.abs(mons1.i - 1 - shape.i) + Math.abs(mons1.j - shape.j) == mindistance1) {
        if (board[mons1.i - 1][mons1.j] != 4) {
            mons1.i = mons1.i - 1;

            if (ismons2 == true && mons1.i==mons2.i && mons1.j == mons2.j){
                mons1.i++;
            }
            if (ismons3 == true && mons1.i==mons3.i && mons1.j == mons3.j){
                mons1.i++;
            }



        }
    }
    else if (Math.abs(mons1.i - shape.i) + Math.abs(mons1.j + 1 - shape.j) == mindistance1) {
        if (board[mons1.i][mons1.j + 1] != 4) {
            mons1.j = mons1.j + 1;

            if (ismons2 == true && mons1.i==mons2.i && mons1.j == mons2.j){
                mons1.j--;
            }
            if (ismons3 == true && mons1.i==mons3.i && mons1.j == mons3.j){
                mons1.j--;
            }


        }
    }
    else {
        if (board[mons1.i][mons1.j - 1] != 4) {
            mons1.j = mons1.j - 1;

            if (ismons2 == true && mons1.i==mons2.i && mons1.j == mons2.j){
                mons1.j++;
            }
            if (ismons3 == true && mons1.i==mons3.i && mons1.j == mons3.j){
                mons1.j++;
            }


        }
    }



    var mindistance2 = Math.min(Math.abs(mons2.i + 1 - shape.i) + Math.abs(mons2.j - shape.j), Math.abs(mons2.i - 1 - shape.i) + Math.abs(mons2.j - shape.j), Math.abs(mons2.i - shape.i) + Math.abs(mons2.j + 1 - shape.j), Math.abs(mons2.i - shape.i) + Math.abs(mons2.j - 1 - shape.j));

    if (Math.abs(mons2.i + 1 - shape.i) + Math.abs(mons2.j - shape.j) == mindistance2) {

        if (board[mons2.i + 1][mons2.j] != 4) {
            mons2.i = mons2.i + 1;




            if (ismons1 == true && mons2.i==mons1.i && mons2.j == mons1.j){
                mons2.i--;
            }
            if (ismons3 == true && mons2.i==mons3.i && mons2.j == mons3.j){
                mons2.i--;
            }





        }

    }

    else if (Math.abs(mons2.i - 1 - shape.i) + Math.abs(mons2.j - shape.j) == mindistance2) {
        if (board[mons2.i - 1][mons2.j] != 4) {
            mons2.i = mons2.i - 1;

            if (ismons1 == true && mons2.i==mons1.i && mons2.j == mons1.j){
                mons2.i++;
            }
            if (ismons3 == true && mons2.i==mons3.i && mons2.j == mons3.j){
                mons2.i++;
            }



        }
    }
    else if (Math.abs(mons2.i - shape.i) + Math.abs(mons2.j + 1 - shape.j) == mindistance2) {
        if (board[mons2.i][mons2.j + 1] != 4) {
            mons2.j = mons2.j + 1;


            if (ismons1 == true && mons2.i==mons1.i && mons2.j == mons1.j){
                mons2.j--;
            }
            if (ismons3 == true && mons2.i==mons3.i && mons2.j == mons3.j){
                mons2.j--;
            }



        }
    }
    else {
        if (board[mons2.i][mons2.j - 1] != 4) {
            mons2.j = mons2.j - 1;

            if (ismons1 == true && mons2.i==mons1.i && mons2.j == mons1.j){
                mons2.j++;
            }
            if (ismons3 == true && mons2.i==mons3.i && mons2.j == mons3.j){
                mons2.j++;
            }



        }
    }


    var mindistance3 = Math.min(Math.abs(mons3.i + 1 - shape.i) + Math.abs(mons3.j - shape.j), Math.abs(mons3.i - 1 - shape.i) + Math.abs(mons3.j - shape.j), Math.abs(mons3.i - shape.i) + Math.abs(mons3.j + 1 - shape.j), Math.abs(mons3.i - shape.i) + Math.abs(mons3.j - 1 - shape.j));

    if (Math.abs(mons3.i + 1 - shape.i) + Math.abs(mons3.j - shape.j) == mindistance3) {

        if (board[mons3.i + 1][mons3.j] != 4) {
            mons3.i = mons3.i + 1;

            if (ismons2 == true && mons3.i==mons2.i && mons3.j == mons2.j){
                mons3.i--;
            }
            if (ismons1 == true && mons3.i==mons1.i && mons3.j == mons1.j){
                mons3.i--;
            }




        }

    }

    else if (Math.abs(mons3.i - 1 - shape.i) + Math.abs(mons3.j - shape.j) == mindistance3) {
        if (board[mons3.i - 1][mons3.j] != 4) {
            mons3.i = mons3.i - 1;


            if (ismons2 == true && mons3.i==mons2.i && mons3.j == mons2.j){
                mons3.i++;
            }
            if (ismons1 == true && mons3.i==mons1.i && mons3.j == mons1.j){
                mons3.i++;
            }


        }
    }
    else if (Math.abs(mons3.i - shape.i) + Math.abs(mons3.j + 1 - shape.j) == mindistance3) {
        if (board[mons3.i][mons3.j + 1] != 4) {
            mons3.j = mons3.j + 1;

            if (ismons2 == true && mons3.i==mons2.i && mons3.j == mons2.j){
                mons3.j--;
            }
            if (ismons1 == true && mons3.i==mons1.i && mons3.j == mons1.j){
                mons3.j--;
            }


        }
    }
    else {
        if (board[mons3.i][mons3.j - 1] != 4) {
            mons3.j = mons3.j - 1;

            if (ismons2 == true && mons3.i==mons2.i && mons3.j == mons2.j){
                mons3.j++;
            }
            if (ismons1 == true && mons3.i==mons1.i && mons3.j == mons1.j){
                mons3.j++;
            }


        }
    }



        Draw(4);


}


function updatecoin() {

    var x = Math.random();
    if (x <=0.25) {
        if (coin.j > 0 && board[coin.i][coin.j - 1] !== 4) {
            coin.j--;
        }
    }
    if (0.25<x && x<0.5) {
        if (coin.j < 9 && board[coin.i][coin.j + 1] !== 4) {
            coin.j++;
        }
    }
    if (0.5<x && x<0.75) {
        if (coin.i > 0 && board[coin.i - 1][coin.j] !== 4) {
            coin.i--;
        }
    }
    if (0.75<x && x<1) {
        if (coin.i < 9 && board[coin.i + 1][coin.j] !== 4) {
            coin.i++;
        }
    }

}

    function UpdatePosition() {

        if (shape.i == coin.i && shape.j == coin.j) {
            score = score + 50;
            clearInterval(interval3);
            coin.i =1000;
            coin.j = 1000;
        }
        if (shape.i == heart.i && shape.j == heart.j) {
            games++;
            heart.i = 1000;
            heart.j = 1000;
        }



        board[shape.i][shape.j] = 0;
        var x = GetKeyPressed();

        if (ismons1 == true && mons1.i == shape.i && mons1.j == shape.j) {
            newGame();
            return;

        }

        if (ismons2 == true && mons2.i == shape.i && mons2.j == shape.j) {
            newGame();
            return;

        }
        if (ismons3 == true && mons3.i == shape.i && mons3.j == shape.j) {
            newGame();
            return;

        }

        if (x === 1) {
            if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
                shape.j--;
                if (ismons1 == true && mons1.i == shape.i && mons1.j == shape.j) {
                    
                    shape.j++;

                }

                if (ismons2 == true && mons2.i == shape.i && mons2.j == shape.j) {


                    shape.j++;


                }
                if (ismons3 == true && mons3.i == shape.i && mons3.j == shape.j) {


                    shape.j++;

                }

         }
        }
        if (x === 2) {
            if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
                shape.j++;



                if (ismons1 == true && mons1.i == shape.i && mons1.j == shape.j) {
                    shape.j--;

                }

                if (ismons2 == true && mons2.i == shape.i && mons2.j == shape.j) {
                    shape.j--;

                }
                if (ismons3 == true && mons3.i == shape.i && mons3.j == shape.j) {
                    shape.j--;

                }


    }
        }
        if (x === 3) {
            if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
                shape.i--;


                if (ismons1 == true && mons1.i == shape.i && mons1.j == shape.j) {
                    shape.i++;



                }

                if (ismons2 == true && mons2.i == shape.i && mons2.j == shape.j) {
                    shape.i++;


                }
                if (ismons3 == true && mons3.i == shape.i && mons3.j == shape.j) {
                    shape.i++;

                }


    }
        }
        if (x === 4) {
            if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
                shape.i++;

                if (ismons1 == true && mons1.i == shape.i && mons1.j == shape.j) {
                    shape.i--;

                }

                if (ismons2 == true && mons2.i == shape.i && mons2.j == shape.j) {
                    shape.i--;

                }
                if (ismons3 == true && mons3.i == shape.i && mons3.j == shape.j) {
                    shape.i--;


                }


    }
        }
        if (board[shape.i][shape.j] === 1) {
        score++;
        }

        board[shape.i][shape.j] = 2;
        var currentTime = new Date();
        time_elapsed = (currentTime - start_time) / 1000;


        Draw(x);
    
    }
