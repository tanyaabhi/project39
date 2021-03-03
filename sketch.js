var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var survivalTime = 0;

function preload(){ 
  backImage=loadImage("backimage.png");
  monkey_running =loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400, 400);

  back = createSprite(200,200);
  back.addImage(backImage);
  back.scale=0.32
  back.velocityX=-0.5;
  //back.x=back.width/2;
  
  //creating monkey
  monkey=createSprite(80,350,20,20);
 // monkey.debug = true
  monkey.addAnimation("moving", monkey_running);
  monkey.velocityX=2;
  monkey.scale=0.1
  
  text("Survival Time: "+ survivalTime, monkey.x, 50);

  ground = createSprite(0,390,900,10);
  ground.visible=false

  bananaGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() { 
  background("lightblue");
  
  stroke("black");
  textSize(20);
  fill("black");
 
  if(gameState===PLAY){

    survivalTime = Math.ceil(frameCount/frameRate());
    camera.position.x=monkey.x;
    camera.position.y=height/2
    if(monkey.x>200) {
      ground.x=monkey.x;
    }
    if(keyDown("space") ) {
       monkey.velocityY = -8;
    }  
    monkey.velocityY = monkey.velocityY + 0.8;

    if(back.x<monkey.x){
      back.x=monkey.x+550
    }
  
    spawnBanana();
    spawnObstacles();

    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }  
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
    monkey.collide(ground); 

    drawSprites();  
  }
  else if(gameState===END){
    background(0)
    monkey.velocityX=0;
    textSize(25);
    fill("yellow");
    text("GAME OVER!!",monkey.x-90,200);
  }
}



function spawnBanana() {
  //write code here to spawn the Food
  if (frameCount % 150 === 0) {
    banana = createSprite(420+monkey.x,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -1;
    
    //assign lifetime to the variable
    banana.lifetime = 500;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
    banana.addImage(bananaImage);
    banana.scale=0.1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(420+monkey.x,365,10,40);
    obstacle.velocityX = -0.5;
    
    //obstacle.debug = true;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 500;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
