var track, track_moving
var car, carImage
var border1, border2
var obstaclesGroup
var byPasser
var vehicle, vehicle1, vehicle2, vehicle3, vehicle4, vehichle5
var pothole, potholeImage
var byPasser1, byPasser2, byPasser3, byPasser4, byPasser5, byPasser6
var coin, coinImage, dragon, dragonImage
var accelator, brake, accelatorImage, brakeImage, up, down, left, right, upImage, downImage, leftImage, rightImage, guide, guideImage, pause, pauseImage, play, playImage, invisible, invisibleImage
var gamestate = 'serve'
var speed = 4
var score = 0
var book1, book2,  bookImage
var ok, okImage, continue_, continue_Image
var restart, restartImage

function preload() {
  track_moving = loadImage("track.png")
  carImage = loadImage("car.jpg")

  byPasser1 = loadImage("byPasser1.jpg")
  byPasser2 = loadImage("byPasser2.jpg")
  byPasser3 = loadImage("byPasser3.jpg")
  byPasser4 = loadImage("byPasser4.jpg")
  byPasser5 = loadImage("byPasser5.jpg")
  byPasser6 = loadImage("byPasser6.jpg")

  accelatorImage = loadImage("accelator.jpg")
  brakeImage = loadImage("brake.jpg")

  upImage = loadImage("up.jpg")
  downImage = loadImage("down.jpg")
  leftImage = loadImage("left.jpg")
  rightImage = loadImage("right.jpg")

  guideImage = loadImage("guide.png")
  playImage = loadImage("play.jpg")
  pauseImage = loadImage("pause.jpg")

  vehicle1 = loadImage("blackvehicle.jpg")
  vehicle2 = loadImage("bluevehicle.png")
  vehicle3 = loadImage("redvehicle.jpg")
  vehicle4 = loadImage("yellowvehicle.jpg")
  vehicle5 = loadImage("whitevehicle.jpg")

  potholeImage = loadImage("potholes.jpg")

  coinImage = loadImage("coin.png")
  dragonImage = loadImage("dragon.jpg")
  
  bookImage = loadImage("book.jpg")
  
  okImage = loadImage("ok.jpg")
  continue_Image = loadImage("continue.jpg")
  
  invisibleImage = loadImage("white.png")
  restartImage = loadImage("restart.jpg")
}

function setup() {
  // background
  createCanvas(windowWidth, windowHeight);

  //track
  track = createSprite(width / 2, height / 2);
  track.addImage(track_moving)
  track.scale = 2.5
  track.y = track.height / 2

  //car
  car = createSprite(width / 2, height / 4 * 3)
  car.addImage(carImage);
  car.scale = 0.5

  //endlines of race track
  border1 = createSprite(width / 6, height / 2, width / 15, height)
  border1.visible = false

  border2 = createSprite(width / 6 * 5, height / 2, width / 15, height)
  border2.visible = false

  accelator = createSprite(width / 10 * 8, height / 10 * 8, width / 15, height / 15)
  accelator.addImage(accelatorImage)
  accelator.scale = 0.3

  brake = createSprite(width / 10 * 7, height / 10 * 8, width / 15, height / 15)
  brake.addImage(brakeImage)
  brake.scale = 0.3

  up = createSprite(width / 10 * 2.5, height / 10 * 7.5, width / 15, height / 15)
  up.addImage(upImage)
  up.scale = 0.2

  down = createSprite(width / 10 * 2.5, height / 10 * 8.5, width / 15, height / 15)
  down.addImage(downImage)
  down.scale = 0.2

  left = createSprite(width / 10 * 2, height / 10 * 8, width / 15, height / 15)
  left.addImage(leftImage)
  left.scale = 0.2

  right = createSprite(width / 10 * 3, height / 10 * 8, width / 15, height / 15)
  right.addImage(rightImage)
  right.scale = 0.2

  guide = createSprite(width / 2, height / 30, width / 15, height / 15)
  guide.addImage(guideImage)
  guide.scale = 0.2

  pause = createSprite(width / 3, height / 30, width / 15, height / 15)
  pause.addImage(pauseImage)
  pause.scale = 0.2

  play = createSprite(width / 3 * 2, height / 30, width / 15, height / 15)
  play.addImage(playImage)
  play.scale = 0.2
  
  invisible = createSprite(width/10*2.5,height/10*8,width/15,height/15)
  invisible.addImage(invisibleImage)
  invisible.scale = 0.1
  
  obstaclesGroup = new Group ()
  coinGroup = new Group()
}

function draw() {

 
  //background colour
  background("white");

  drawSprites();
  text(mouseX + "," + mouseY, mouseX, mouseY)
  textFont("Engravers MT")
  fill("black")



  if (gamestate == 'serve') {
    text("Press space to read instructions.", width / 4, height / 4)
    text("Press enter to start the game",width/3,height/3)
    
  }

  if(keyDown("enter")){
    gamestate = 'play'
  }
  
  if(keyDown("space")){
     gamestate = 'guide1'
     }
  if (gamestate == 'play') {
    //calling obstacles
    byPassers()
    vehicles()
    potholes()
    coins()
    dragons()
    
    if(keyDown('i')&&invisible.visible == true){
      left.visible=false
      right.visible=false
      up.visible=false
      down.visible=false
      brake.visible=false
      accelator.visible=false
      invisible.visible = false
    }
    
    fill('darkblue')
    text("Speed is : " + speed, width / 6 * 4, height / 10)
    fill('red')
    text("Score is : "+score,width / 6 , height / 10)
    score = score + Math.round(getFrameRate() / 60);
    
    if (mousePressedOver(guide)) {
      gamestate = 'guide1'
    }
    car.collide(border1)
    car.collide(border2)
    //endless moving ground
    track.velocityY = -5
    if (track.y < 0) {
      track.y = track.height / 2
    }

    if (keyDown(LEFT_ARROW) || mousePressedOver(left)||keyDown('a')) {
      car.x = car.x - speed
    }

    if (keyDown(RIGHT_ARROW) || mousePressedOver(right)||keyDown('d')) {
      car.x = car.x + speed
    }

    if (keyDown(UP_ARROW) || mousePressedOver(up)||keyDown('w')) {
      car.y = car.y - speed
    }
    if (keyDown(DOWN_ARROW) || mousePressedOver(down)||keyDown('s')) {
      car.y = car.y + speed
    }

    if (mousePressedOver(accelator)&& speed < 20||keyDown('z')&& speed < 20) {
      speed = speed + 2
    }

    if (mousePressedOver(brake)&& speed > 0||keyDown('y') && speed > 0) {
      speed = speed - 2
    }
    

  textFont("Gill Sans Ultra Bold")
  textSize(20)
  if (mousePressedOver(accelator) && speed == 20 || keyDown('z')&& speed == 20) {
    text("Maximum limit reached", width / 6 * 2, height / 6 * 3)
  }

  if (mousePressedOver(brake) && speed == 0 || keyDown('y')&& speed == 0&& speed == 0) {
    text("Minimum limit reached", width / 6 * 2, height / 6 * 3)
  }
    
       if(car.isTouching(obstaclesGroup)){
   gamestate = 'end'
 }

  }
  
  if(gamestate == 'end'){
    track.velocityY = 0
    obstaclesGroup.setVelocityEach(0,0)
    obstaclesGroup.setLifetimeEach(-1)
    text("Sorry but you lost the game",width/15*4,height/15*6)
    text("Better luck next time",width/15*4,height/15*8)
    restart = createSprite(width/15*7.5,height/15*2,width/15,height/15)
    restart.addImage(restartImage)
    restart.scale = 0.25
  }
  
  if(mousePressedOver(pause)){
gamestate = 'end'
  }
  
  
  if(car.isTouching(coinGroup)){
    coinGroup.destroyEach()
    score = score + 5
  }
  
  if(mousePressedOver(restart)){
    gamestate = 'serve'
    restart.addImage(invisibleImage)
    obstaclesGroup.destroyEach()
    score = 0  
  }
  if(gamestate == 'guide1'){
    book1 = createSprite(width/2,height/2,width,height)
    book1.addImage(bookImage)
    book1.scale = 2.5
    text("This is a fun endless runner game.", width/4,height/6)
    
    text("just like mario,subway surfers,temple run,etc.",width/4*0.75,height/6*1.5)
    
    text("but it's more interesting",width/4*1.5,height/6*2)
    
    text("There are 4 obstacles here : -",width/4*1.25,height/6*2.5)
    
    text("The bypassers",width/4,height/6*3)
    
    text("The vehicles",width/4,height/6*3.5)
    
    text("The potholes",width/4,height/6*4)
    
    text("The massive dragon",width/4,height/6*4.5)
    
    text("If you touch any of this you will die",width/4,height/6*5)
    
    var ob1, ob2, ob3, ob4, ob5, ob6
    ob1 = createSprite(width/4*2,height/6*3)
    ob1.scale = 0.2
    ob1.addImage(byPasser1)
    
    ob2 = createSprite(width/4*2.25,height/6*3)
    ob2.scale = 0.2
    ob2.addImage(byPasser2)
    
    ob3 = createSprite(width/4*2.5,height/6*3)
    ob3.scale = 0.2
    ob3.addImage(byPasser3)
    
    ob4 = createSprite(width/4*2.75,height/6*3)
    ob4.scale = 0.2
    ob4.addImage(byPasser4)
    
    ob5 = createSprite(width/4*3,height/6*3)
    ob5.scale = 0.2
    ob5.addImage(byPasser5)
    
    ob6 = createSprite(width/4*3.25,height/6*3)
    ob6.scale = 0.2
    ob6.addImage(byPasser6)
    
    var v1, v2, v3, v4, v5
    v1 = createSprite(width/4*2,height/6*3.5)
    v1.scale = 0.2
    v1.addImage(vehicle1)

    v2 = createSprite(width/4*2.25,height/6*3.5)
    v2.scale = 0.2
    v2.addImage(vehicle2)
    
    v3 = createSprite(width/4*2.5,height/6*3.5)
    v3.scale = 0.2
    v3.addImage(vehicle3)
    
    v4 = createSprite(width/4*2.75,height/6*3.5)
    v4.scale = 0.2
    v4.addImage(vehicle4)
    
    v5 = createSprite(width/4*3,height/6*3.5)
    v5.scale = 0.2
    v5.addImage(vehicle5)

    var p
    p = createSprite(width/4*2.5,height/6*4)
    p.scale = 0.2
    p.addImage(potholeImage)
    
    var d
    d = createSprite(width/4*2.5,height/6*4.5)
    d.scale = 0.2
    d.addImage(dragonImage)
    
    ok = createSprite(width/2,height/6*5.5)
    ok.scale = 0.25
    ok.addImage(okImage)
    
    if(mousePressedOver(ok)){
     gamestate = 'guide2'
    }
  }

  if(gamestate == 'guide2'){
    book2 = createSprite(width/2,height/2,width,height)
    book2.addImage(bookImage)
    book2.scale = 2.5
    
    continue_ = createSprite(width/2,height/6*0.5)
    continue_.scale = 0.5
    continue_.addImage(continue_Image)
    text("Shortcut keys are :- ",width/4,height/6)
    text("Press 'w' to move forwads",width/4,height/6*1.5)
    text("Press 'a' to move leftwards",width/4,height/6*2)
    text("Press 's' to move downwards",width/4,height/6*2.5)
    text("Press 'd' to move rightwards",width/4,height/6*3)
    text("Press 'z' to move faster",width/4,height/6*3.5)
    text("Press 'y' to move slower",width/4,height/6*4)
    text("Press 'i' to make the arrow and ",width/4,height/6*4.5)
    text("speed keys insible",width/4,height/6*4.75)
    
    if(mousePressedOver(continue_)){
      gamestate = 'serve'
      
//track
  track = createSprite(width / 2, height / 2);
  track.addImage(track_moving)
  track.scale = 2.5
  track.y = track.height / 2

  //car
  car = createSprite(width / 2, height / 4 * 3)
  car.addImage(carImage);
  car.scale = 0.5

  //endlines of race track
  border1 = createSprite(width / 6, height / 2, width / 15, height)
  border1.visible = false

  border2 = createSprite(width / 6 * 5, height / 2, width / 15, height)
  border2.visible = false

  accelator = createSprite(width / 10 * 8, height / 10 * 8, width / 15, height / 15)
  accelator.addImage(accelatorImage)
  accelator.scale = 0.3

  brake = createSprite(width / 10 * 7, height / 10 * 8, width / 15, height / 15)
  brake.addImage(brakeImage)
  brake.scale = 0.3

  up = createSprite(width / 10 * 2.5, height / 10 * 7.5, width / 15, height / 15)
  up.addImage(upImage)
  up.scale = 0.2

  down = createSprite(width / 10 * 2.5, height / 10 * 8.5, width / 15, height / 15)
  down.addImage(downImage)
  down.scale = 0.2

  left = createSprite(width / 10 * 2, height / 10 * 8, width / 15, height / 15)
  left.addImage(leftImage)
  left.scale = 0.2

  right = createSprite(width / 10 * 3, height / 10 * 8, width / 15, height / 15)
  right.addImage(rightImage)
  right.scale = 0.2

  guide = createSprite(width / 2, height / 30, width / 15, height / 15)
  guide.addImage(guideImage)
  guide.scale = 0.2

  pause = createSprite(width / 3, height / 30, width / 15, height / 15)
  pause.addImage(pauseImage)
  pause.scale = 0.2

  play = createSprite(width / 3 * 2, height / 30, width / 15, height / 15)
  play.addImage(playImage)
  play.scale = 0.2
  
  invisible = createSprite(width/10*2.5,height/10*8,width/15,height/15)
  invisible.addImage(invisibleImage)
  invisible.scale = 0.1


    }
  }


}


function byPassers() {

  var posB = round(random(1, 2))
  var r1 = round(random(1, 3))
  var r2 = round(random(1, 3))

  if (frameCount % 200 == 0) {
    if (posB == 1) {
      byPasser = createSprite(width / 10, height / 20)
      byPasser.scale = 0.4
      byPasser.y = random(150, 300)
      byPasser.lifetime = 200;
      obstaclesGroup.add(byPasser)
      switch (r1) {
        case 1:
          byPasser.addImage(byPasser1);
          byPasser.velocityX = 5
          break;
        case 2:
          byPasser.addImage(byPasser2);
          byPasser.velocityX = 5
          break;
        case 3:
          byPasser.addImage(byPasser3);
          byPasser.velocityX = 5
          break;
          
      }
    }

    if (posB == 2) {
      byPasser = createSprite(width / 9 * 10, height / 20)
      byPasser.scale = 0.4
      byPasser.y = random(height / 4, height / 2)
      byPasser.lifetime = 200;
      obstaclesGroup.add(byPasser)


      switch (r2) {
        case 1:
          byPasser.addImage(byPasser4);
          byPasser.velocityX = -5
          break;
        case 2:
          byPasser.addImage(byPasser5);
          byPasser.velocityX = -5
          break;
        case 3:
          byPasser.addImage(byPasser6);
          byPasser.velocityX = -5
          break;

      }
    }
    console.log("r1 is : " + r1)
    console.log("r2 is : " + r2)
  }
}

function vehicles() {
  if (frameCount % 300 == 0) {
    vehicle = createSprite(width / 2, height / 6)
    vehicle.x = random(width / 6, width / 6 * 5)
    vehicle.velocityY = 5
    vehicle.scale = 0.5
    obstaclesGroup.add(vehicle)

    var r3 = round(random(1, 5))
    if (r3 == 1) {
      vehicle.addImage(vehicle1)
    } else if (r3 == 2) {
      vehicle.addImage(vehicle2)
    } else if (r3 == 3) {
      vehicle.addImage(vehicle3)
    } else if (r3 == 4) {
      vehicle.addImage(vehicle4)
    } else if (r3 == 5) {
      vehicle.addImage(vehicle5)
    }
    vehicle.lifetime = 200
  }
}

function potholes() {
  if (frameCount % 400 == 0) {
    pothole = createSprite(width / 2, height / 2)
    pothole.x = random(width / 2, height / 6)
    pothole.velocityY = -5
    pothole.scale = 0.2
    pothole.addImage(potholeImage)
    obstaclesGroup.add(pothole)
  }
}

function coins() {
  if (frameCount % 50 == 0) {
    coin = createSprite(width / 2, height / 2)
    coin.x = random(width / 2, height / 6)
    coin.scale = 0.25
    coin.addImage(coinImage)
    coin.lifetime = 20
    coinGroup.add(coin)
  }
}

function dragons() {
  if (frameCount % 600 == 0) {
    dragon = createSprite(width / 2, height / 6)
    dragon.x = random(width / 6, height / 6 * 5)
    dragon.velocityY = 5
    dragon.addImage(dragonImage)
    dragon.lifetime = 200
    dragon.scale = 0.5
    obstaclesGroup.add(dragon)
  }
}