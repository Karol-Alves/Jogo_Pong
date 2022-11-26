//Variables Ball
let X_Ball = 300;
let Y_Ball = 200;
let Diameter = 13;
let Goal = false;
let Ray = Diameter / 2;

//Variables Velocity
let Velocity_BallX = 6;
let Velocity_BallY = 6;
let Racket_Length = 10;
let Racket_Height = 90;

//Variables Racket
let X_Racket = 5;
let Y_Racket = 150;

//Racket Opponent
let X_Racket_Opponent = 585;
let Y_Racket_Opponent = 150;
let Velocity_OpponentY;

let Collided = false;
let ChancesOfError = 0;

//Scoreboard
let My_Points = 0;
let Points_Opponent = 0;

//Game Sounds
let Racked;
let Points;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  ShowBall();
  BallMovement();
  CheckColisionBall();
  ShowRacket(X_Racket, Y_Racket);
  MovementRacket();
  //CheckColisionRacket();
  CheckCollisionRackets(X_Racket_Opponent, Y_Racket_Opponent, X_Racket, Y_Racket);
  ShowRacket(X_Racket_Opponent, Y_Racket_Opponent, X_Racket, Y_Racket);
  MoveOpponentRacket();
  InclusionScore();
  ScorePoints();
}
function ShowBall() {
  circle(X_Ball, Y_Ball, Diameter);
}
function BallMovement() {
  X_Ball += Velocity_BallX
  Y_Ball += Velocity_BallY
}
function CheckColisionBall() {
  if (X_Ball + Ray > width || X_Ball - Ray < 0) {
    Velocity_BallX *= -1;
  }
  if (Y_Ball + Ray > height || Y_Ball - Ray < 0) {
    Velocity_BallY *= -1;
  }
}
function ShowRacket(x, y) {
  rect(x, y, Racket_Length, Racket_Height);
}
function MovementRacket() {
  if (keyIsDown(UP_ARROW)) {
    Y_Racket -= 10;
    if (Y_Racket < 10) {
      Y_Racket = 10;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    Y_Racket += 10;
    if (Y_Racket > 300) {
      Y_Racket = 300
    }
  }
}
function CheckColisionRacket() {
  if (
    X_Ball - Ray < X_Racket + Racket_Length &&
    Y_Ball - Ray < Y_Racket + Racket_Height &&
    Y_Racket + Ray > Y_Racket
  ) {
    Velocity_BallX *= -1;
    Racked.play();
  }
}
function CheckCollisionRackets(x1, y1, x2, y2) {
  Collided1 = collideRectCircle(
    x1,
    y1,
    Racket_Length,
    Racket_Height,
    X_Ball,
    Y_Ball,
    Ray
  );
  Collided2 = collideRectCircle(
    x2,
    y2,
    Racket_Length,
    Racket_Height,
    X_Ball,
    Y_Ball,
    Ray
  );
  if (Collided1) {
    Velocity_BallX *= -1;
  }
  if (Collided2) {
    Velocity_BallX *= -1;
  }
}
/*function MoveOpponentRacket(){
 if (keyIsDown(87)){
    Y_Racket_Opponent -= 10;
  }
 
  if (keyIsDown(83)){
    Y_Racket_Opponent += 10;
  }
 
}*/ //Multiplayer

function MoveOpponentRacket() { //Opponent Automatic
  Velocity_OpponentY = Y_Ball - Y_Racket_Opponent - Racket_Length / 2 - 30;
  Y_Racket_Opponent += Velocity_OpponentY + ChancesOfError
  if (Y_Racket_Opponent < 10) {
    Y_Racket_Opponent = 10;
  }
  if (Y_Racket_Opponent > 300) {
    Y_Racket_Opponent = 300;
  }
  CalculateChancesOfError();
}

function InclusionScore() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(My_Points, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  text(Points_Opponent, 470, 26);
}
function ScorePoints() {
  if (X_Ball > 585 && Goal == false) {
    My_Points += 1;
    Goal = true;
  }
  if (X_Ball < 15 && Goal == false) {
    Points_Opponent += 1;
    Goal = true;
  }
  if (X_Ball >= 15 && X_Ball <= 585) {
    Goal = false;
  }
}

function CalculateChancesOfError() {
  if (Points_Opponent >= My_Points) {
    ChancesOfError += 1
    if (ChancesOfError >= 39) {
      ChancesOfError = 40
    }
  } else {
    ChancesOfError -= 1
    if (ChancesOfError <= 35) {
      ChancesOfError = 35
    }
  }
}