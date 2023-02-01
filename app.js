
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
  this.load.image('column', 'assets/column32x200.png');
}

let platforms;
function create ()
{
  this.add.image(0, 0, 'background').setOrigin(0, 0);

  platforms = this.physics.add.staticGroup();
  platforms.create(50, 0, 'column').setOrigin(0, 0);


  // for (let xPosition = 50; xPosition < 700; xPosition += 200){
  //   const diff = Math.random() * 0.7;
  //   if (Math.random() > 0.5) {
  //     platforms.create(xPosition, 500, 'column').setScale(1,[1+diff]);
  //     platforms.create(xPosition, 0, 'column').setScale(1,[1-diff]);
  //   } 
  //   else {
  //     platforms.create(xPosition, 500, 'column').setScale(1,[1+diff]);
  //     platforms.create(xPosition, 0, 'column').setScale(1,[1-diff]);
  //   }
  // }

  platforms.create(400, 568, 'road').setScale(2).refreshBody();
  
}

function update ()
{
}
