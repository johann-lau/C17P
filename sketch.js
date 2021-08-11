var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG, redCG;
var END =0; var PLAY =1; var gameState = PLAY; var distance=0; var gameOver, restart, ended;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadImage("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadImage("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadImage("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadImage("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup() {
  ended = false;
  textAlign(CENTER);
  createCanvas(1200,300);
  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -(6 + 2*distance/150);

  //creating boy running
  mainCyclist  = createSprite(70,150);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addImage("SahilSecond",mainRacerImg2);
  mainCyclist.scale=0.07;
  //set collider for mainCyclist
  mainCyclist.setCollider("circle", 0, 0, 600)
    
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;  
    
  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group(); 
}

function reset() {
  ended = false;
  path.x = 100;
  path.y = 150;
  gameOver.visible = false;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  gameState = PLAY;
  distance=0;
}

function draw() {
  textSize(20);
  fill(255);
  background(0);
  drawSprites();
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY) {
    distance = distance + Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2*distance/150);
    mainCyclist.y = World.mouseY;
    mainCyclist.changeAnimation("SahilRunning");
  
    edges= createEdgeSprites();
    mainCyclist .collide(edges);
  
    //code to reset the background
    if(path.x < 0){
      path.x = 450;
    }

    //code to play cycle bell sound
    if(keyDown("space")) {
      cycleBell.play();
    }

    //creating continous opponent players
    var select_oppPlayer = Math.round(random(1,3));
    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        pinkCyclists();
      } else if (select_oppPlayer == 2) {
        yellowCyclists();
      } else {
        redCyclists();
      }
    }

    if(pinkCG.isTouching(mainCyclist)){
      gameState = END;
      player1.velocityY = 0;
      player1.changeImage("opponentPlayer1")

   }
      
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.changeImage("opponentPlayer2")

   }
      
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.changeImage("opponentPlayer3")

   }
  } else if (gameState === END) {
    if (path.velocityX < 0 && ended == false) {
      path.velocityX = path.velocityX+1.6;
      drawSprites();
    } else {
      ended = true
      path.velocityX = 0
      gameOver.visible = true;
      //Add code to show restart game instrution in text here
      text("Press UP to restart!", 650, 220);
      mainCyclist.velocityY = 0;
      mainCyclist.changeImage("SahilSecond");
    
      pinkCG.setVelocityXEach(0);
      pinkCG.setLifetimeEach(-1);
    
      yellowCG.setVelocityXEach(0);
      yellowCG.setLifetimeEach(-1);
    
      redCG.setVelocityXEach(0);
      redCG.setLifetimeEach(-1);

      //write condition for calling reset()
      if (keyDown("up")) {
        reset()
      }
    }
  }
}

function pinkCyclists(){
  player1 =createSprite(1100,Math.round(random(50, 250)));
  player1.scale =0.06;
  player1.velocityX = -(6 + 2*distance/150);
  player1.addAnimation("opponentPlayer1a",oppPink1Img);
  player1.addImage("opponentPlayer1",oppPink2Img);
  player1.setLifetime=170;
  pinkCG.add(player1);
}

function yellowCyclists(){
  player2 =createSprite(1100,Math.round(random(50, 250)));
  player2.scale =0.06;
  player2.velocityX = -(6 + 2*distance/150);
  player2.addAnimation("opponentPlayer2a",oppYellow1Img);
  player2.addImage("opponentPlayer2",oppYellow2Img);
  player2.setLifetime=170;
  yellowCG.add(player2);
}

function redCyclists(){
  player3 =createSprite(1100,Math.round(random(50, 250)));
  player3.scale =0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3ewviubaccvjew",oppRed1Img);
  player3.addImage("opponentPlayer3",oppRed2Img);
  player3.setLifetime=170;
  redCG.add(player3);
}