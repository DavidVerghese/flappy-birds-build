
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
  this.load.image('column', 'assets/column.png');
}

let platforms;
function create ()
{
  const background = this.add.image(0, 0, 'background').setOrigin(0, 0);

  platforms = this.physics.add.staticGroup();
  
  for (let i = -100; i > -800; i -= 100){
    const resize = Math.round(Math.random() * 4)+1;
    console.log(resize, 6 - resize);
    const top = platforms.create(0, 0, 'column').setScale(1,[resize]);;
    const bottom = platforms.create(0, 0, 'column').setScale(1, [6 - resize]);
    // https://phaser.io/examples/v3/category/display/align
    // https://stackoverflow.com/questions/63978497/phaserjs-3-0-how-to-place-image-in-right-bottom-of-the-screen
    Phaser.Display.Align.In.TopLeft(top, background,i);
    Phaser.Display.Align.In.BottomLeft(bottom, background, i);
  }
  
  platforms.create(400, 568, 'road').setScale(2).refreshBody();
  
}

function update ()
{
}
