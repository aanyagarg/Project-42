var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana ,bananaImage;
var score=0;
var FoodGroup, obstacleGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  drawSprites();
  if(gameState===PLAY){
    if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach()
    score=score+2;
    player.scale += + 0.1
  }
  }
  if(obstacleGroup.isTouching(player)){
    gameState=END;
   
  }
  
else if(gameState===END){
  backgr.velocityX=0;
obstacleGroup.setVelocityXEach(0);
FoodGroup.setVelocityXEach(0);
FoodGroup.destroyEach();
textSize(40);
fill("red")
text("GAME OVER !!",100,200);
obstacleGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);    
  player.scale=0.1;
}



}
function food(){
  if(frameCount%80===0){
    banana=createSprite(500,100,20,20);
    banana.y=Math.round(random(220,300));
    banana.addImage(bananaImage);
    banana.velocityX=-5;
    banana.lifeTime=90;
    banana.scale = 0.1;
    FoodGroup.add(banana);
  }
  
}
  function obstacles(){
    if (frameCount % 300 === 0) {
    obstacle = createSprite(500,363, 10, 10);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.velocityX = -10
    obstacle.scale = 0.15;
    obstacle.lifetime=45;
   obstacle.depth=player.depth;
      obstacle.depth=obstacle.depth-1;
    obstacleGroup.add(obstacle);
  }
  } 
