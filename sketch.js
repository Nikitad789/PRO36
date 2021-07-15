var dog,sadDog,happyDog;
var milkImg,foodObj;
var button, button1;
var Feedtime,lastFed
var Fedtime,foodS

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");

 
}

function setup() {
  createCanvas(1000,400);

  database=firebase.database()
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  button=createButton('feed the dog');
  button1=createButton('add food');

  button.position(300,200);
  button1.position(400,200);

  button.mousePressed(feedDog)
  button1.mousePressed(addFoods)

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
 //foodObj= new Food(200,200,70,70);
  foodObj= new Food();
}

function draw() {
  background(46,139,87);
  drawSprites();

  foodObj.display()

  Fedtime=database.ref('Feedtime')
  Fedtime.on("value",function(data){
    lastFed=data.val()

  })


  fill("black")
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30)
  }
  else if(lastFed==0){
    text("Last Feed :12AM",350,30)
  }
  else{
    text("Last Feed :"+ lastFed+"AM",350,30)
  }

}



//function to read food Stock
function readStock(data){
  foodS=data.val()
  foodObj.updateFoodStock(foodS)
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  Feedtime:hour()
})
  
}


//function to add food in stock
function addFoods(){
 foodS++
  // foodObj.updateFoodStock()
database.ref('/').update({
  Food:foodS

  
})
}
