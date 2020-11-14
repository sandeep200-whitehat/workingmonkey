
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,survivalTime;


function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600)
  
 monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10);
  ground.velocityx=-5;
  ground.x=ground.width/2;
  FoodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  background("white");
  if(keyDown("space")){
    monkey.velocityY= -12
  }
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
monkey.velocityY = monkey.velocityY + 0.7;
   monkey.collide(ground);
   spawnFood();
   spawnObstacle();
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityx = 0;
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
  }
  
   survivalTime = Math.ceil(frameCount/getFrameRate());
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time: "+ survivalTime, 100, 50);
  
  drawSprites();
}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.y = random(120,200);
    banana.velocityX = -5;
    banana.lifetime = 300;
    
    monkey.depth = banana.depth+1;
    
    FoodGroup.add(banana);
  }
}
function spawnObstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(800,320,10,40);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}
