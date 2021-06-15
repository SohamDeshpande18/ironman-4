
var bg, backgroundImg,ironman,imImage,stoneImg,stonesGroup,diamondImage,diamondsGroup,score = 0,spikesGroup,spikeImg;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  imImage = loadImage("images/iron.png");
  stoneImg = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImg = loadImage("images/spikes.png");
 
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale = 2;

  ironman = createSprite(500,300,20,20);
  ironman.addImage(imImage);
  ironman.scale = 0.3;
  ironman.debug = true;
  ironman.setCollider("rectangle",100,0,200,400);

  stonesGroup = new Group();
  diamondsGroup = new Group();
  spikesGroup = new Group();
}

function draw() {
  
  if(keyDown("up")){
    ironman.velocityY = -10;
  }

  if(keyDown("left")){
    ironman.x = ironman.x -5;
  }

  if(keyDown("right")){
    ironman.x = ironman.x +5;
  }
 
  ironman.velocityY = ironman.velocityY + 0.5;

  spawnStone();
  for(var i=1;i<stonesGroup.length;i++){
    var temp = stonesGroup.get(i);
    ironman.collide(temp);
    
  }


  generateDiamonds();
  for(let i=1 ; i<diamondsGroup.length ; i++ ){
    let temp = diamondsGroup[i]
    if(ironman.isTouching(temp)){
      temp.destroy();
      score++
      temp=null;
    }
  }

  generateSpikes();
  for(let i=1 ; i<spikesGroup.length ; i++ ){
    let temp = spikesGroup[i]
    if(ironman.isTouching(temp)){
      temp.destroy();
      score = score - 5;
      temp=null;
    }
  }

  
    
    drawSprites();

    textSize(25);
    fill("white");
    text("SCORE: "+score,100,100);

    
   
}

function spawnStone(){
  if(frameCount%50==0){
    var stone = createSprite(random(100,900),-100);
    stone.addImage(stoneImg);
    stone.velocityY = 5;
    stonesGroup.add(stone);
  }
}

function generateDiamonds(){
  if( frameCount % 60 == 0 ){
    var diamond = createSprite(random(100,900),-100);
    diamond . addImage(diamondImage);
    diamond.velocityY = 5;
    diamondsGroup.add(diamond);
  }
}

function generateSpikes(){
  if( frameCount % 80 == 0 ){
    var spike = createSprite(random(100,900),-100);
    spike. addImage(spikeImg);
    spike.velocityY = 5;
    spikesGroup.add(spike);
  }
}