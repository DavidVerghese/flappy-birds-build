
let config = {
  renderer: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "",
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
},
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

let game = new Phaser.Game(config);
function preload ()
{
  this.load.image('background', 'assets/background.png');
  this.load.image('road', 'assets/road.png');
  this.load.image('column32By100', 'assets/column32x100.png');
  this.load.image('column32By200', 'assets/column32x200.png');
  this.load.image('column32By300', 'assets/column32x300.png');
  this.load.image('column32By400', 'assets/column32x400.png');
  this.load.image('column32By500', 'assets/column32x500.png');
  this.load.spritesheet('bird', 'assets/bird.png', { frameWidth: 64, frameHeight: 96 });
}

let roads;
let road;
let cursors;
let bird;
let hasLanded = false;
let hasBumped = false;
let button;
let isGameStarted = false;
function create ()
{
  const background = this.add.image(0, 0, 'background').setOrigin(0, 0);

  roads = this.physics.add.staticGroup();

  let topColumns = this.physics.add.staticGroup({
    key: 'column32By500',
    repeat: 1,
    setXY: { x: 200, y: 0, stepX: 300 }
  });
  

  let bottomColumns = this.physics.add.staticGroup({
    key: 'column32By500',
    repeat: 1,
    setXY: { x: 350, y: 400, stepX: 300 },
  });


  bird = this.physics.add.sprite(0, 50, 'bird').setScale(2);
  bird.setBounce(0.2);
  bird.setCollideWorldBounds(true);

  road = roads.create(400, 568, 'road').setScale(2).refreshBody();




  this.physics.add.overlap(bird, road, ()=>hasLanded=true, null, this);
  this.physics.add.overlap(bird, topColumns, ()=>hasBumped=true,null, this);
  this.physics.add.overlap(bird, bottomColumns, ()=>hasBumped=true,null, this);

  this.physics.add.collider(bird, road);
  this.physics.add.collider(bird, topColumns);
  this.physics.add.collider(bird, bottomColumns);
  
  const instructions = this.add.text(0, 0, `Instructions: Press the "^" button to stay upright\nAnd don't hit the columns`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "25px", color: "white", backgroundColor:"black" });
  Phaser.Display.Align.In.BottomCenter(instructions, background, 0, 75);

  const title = this.add.text(0, 0, `Flappy Birds`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "80px", color: "white", backgroundColor: "black" });
  Phaser.Display.Align.In.TopCenter(title, background);

  const startButton = this.add.text(0, 0, `START`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "80px", color: "white", backgroundColor: "darkred" });
  Phaser.Display.Align.In.Center(startButton, background, 0, 75);


  cursors = this.input.keyboard.createCursorKeys();
  


}

function update ()
{

  if (!isGameStarted) {
    bird.setVelocityY(-160);
  }
  if (!hasLanded && isGameStarted) {
    bird.body.velocity.x = 50;
  }
  if (hasLanded || hasBumped) {
    bird.body.velocity.x = 0;
  }
  if (cursors.up.isDown && !hasBumped && !hasLanded &&  isGameStarted)
  {
    bird.setVelocityY(-160);
  }

  
  
}
