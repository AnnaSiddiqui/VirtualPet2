var dog, happyDog, database;
var foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var changeState, readState;
var bedroom, garden, washroom;



function preload()
{
 dog = loadImage("dogImg.png");
 happyDog = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(200, 200, 20, 20);
  //dog.addImage(dog);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState=database.ref('gameState');
  readState.on("value", function(data){
    gameState= data.val();
  });

  




}


function draw() {  
 background(46,139,87);

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});



fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + "AM", 350,30);
}



  drawSprites();
  text("Note: Press UP_ARROW Key To Feed Drago Milk", 200, 50);

}

function readStock(data){
  food = data.val();
}

function writeStock(x){
  
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foods
  })
}



