//variabelen voor de speler en zijn beweging.
var player;
var cursor;
var speedX = 2;
var speedY = 2;
var playerSpeed = 4;


//variabelen voor de lagen
var layer;
var basislaag;
var basislaag2;
var decoratielaag;
var platformlaag;
var springlaag;
var voorgrondlaag;
var eindelaag;
var laagje;

//variabelen voor geluiden 
var geluidSter;
var muziekSpring;
var muziekSprong;
var achtergrondMuziek;
var music;
var winning;

//Varbialen voor de vleermuizen
var bat;
var bat2;
var bat3;
var bat4;
var bat5;
var bat6;
var bat7;
var bat8;
var bat9;
var bliksem;

//Variabelen voor de score en de sterren die je kan verzamelen.
var star;
var stars;
var score = 0;
var scoreText;

//Start spel, zodat er een scherm in beeld komt. Hier ook de afmetingen in zetten.
window.onload = function () {
  var game = new Phaser.Game(1024, 512, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update
  });


  //PRELOAD FUNCTIE
  function preload() {
    game.stage.backgroundColor = "85b5e1";
    spritesheetLaden();
    muziekLaden();
    afbeeldingenLaden();
  };



  //Functie om de alle spritesheets in te laden
  function spritesheetLaden() {
    //Deze spritesheets komen van: https://www.kenney.nl/assets/platformer-pack-redux
    game.load.spritesheet("pinkie", "assets/pinkie.png", 66, 92);
    game.load.spritesheet("bat", "assets/bat.png", 64, 88);
    game.load.spritesheet("bat2", "assets/bat2.png", 64, 88);
    game.load.spritesheet("bat3", "assets/bat3.png", 64, 88);
    game.load.spritesheet("bat4", "assets/bat4.png", 64, 88);
    game.load.spritesheet("bat5", "assets/bat5.png", 64, 88);
    game.load.spritesheet("bat6", "assets/bat6.png", 64, 88);
    game.load.spritesheet("bat7", "assets/bat7.png", 64, 88);
    game.load.spritesheet("bat8", "assets/bat8.png", 64, 88);
    game.load.spritesheet("bat9", "assets/bat9.png", 64, 88);
  };

  //Functie om de muziek te laden();
  function muziekLaden() {

    //Audio effecten komen van: https://www.kenney.nl/assets/digital-audio
    game.load.audio("muziekSter", "assets/muziekSter.ogg");
    game.load.audio("muziekSpring", "assets/muziekSpring.ogg");
    game.load.audio("muziekSprong", "assets/muziekSprong.ogg");

    //Achtergrond muziek van: https://freesound.org/people/Slaking_97/sounds/455109/
    game.load.audio("achtergrondMuziek", "assets/achtergrondMuziek.mp3");

    //Bliksem geluid komt van: https://www.youtube.com/audiolibrary/soundeffects?ar=3
    game.load.audio("bliksem", "assets/bliksem.mp3");

    //Geluid komt van:https://freesound.org/people/LittleRobotSoundFactory/sounds/270402/
    game.load.audio("winning", "assets/winning.mp3");
  };

  //Functie om de overige afbeeldingen te laden.
  function afbeeldingenLaden() {
    //Wolken komen van:https://www.kenney.nl/assets/background-elements
    game.load.image("wolken", "assets/wolken.png");

    //Candy komt van: https://www.kenney.nl/assets/platformer-art-candy
    game.load.image("candy", "assets/candy.png");

    //Ster komt van:https://www.kenney.nl/assets/puzzle-pack-2
    game.load.image("star", 'assets/star.png', 66, 92);
    game.load.tilemap(
      "map",
      "assets/tileset.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );
  };

  //CREATE FUNCTIE
  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    tileMapAanmaken();
    spelerCompleet();
    muziekMaken();
    vijandMaken();
    verzamelSter();
    scoreOptellen();
  };

  function tileMapAanmaken() {
    var map = game.add.tilemap("map", 70, 70, 16, 8);

    //hier lde afbeeldingen aanroepen
    map.addTilesetImage("candy");
    map.addTilesetImage("wolken");

    //Hier de lagen aanroepen
    laagje = map.createLayer('laagje');
    basislaag = map.createLayer('basislaag');
    basislaag2 = map.createLayer('basislaag2');
    decoratielaag = map.createLayer('decoratielaag');
    platformlaag = map.createLayer('platformlaag');
    springlaag = map.createLayer('springlaag');
    eindelaag = map.createLayer('eindelaag');
    platformlaag.resizeWorld();

    //hier de collisions aanzetten op de juiste lagen.
    map.setCollisionBetween(1, 97, true, "platformlaag");
    map.setCollisionBetween(1, 97, true, "springlaag");
    map.setCollisionBetween(1, 97, true, "eindelaag");
  };

  //Functie om de speler te laten functioneren
  function spelerCompleet() {
    player = game.add.sprite(6, 1950, 'pinkie', 18);
    game.camera.follow(player);
    player.enableBody = true;

    //Animaties voor de speler. Ook wordt er hier gezorgd dat de speler niet buiten de wereld kan en dat hij zwaartekracht heeft. 
    player.animations.add('left', [5, 6, 7], 10, true);
    player.animations.add('right', [1, 2, 3, 4], 10, true);
    player.animations.add('up', [8, 9], 10, true);
    player.animations.add('down', [8, 9], 10, true);
    player.animations.add('turn', [0], 20, false);
    cursor = game.input.keyboard.createCursorKeys();
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
  };

  //In deze functie wordt de muziek gecreeërd
  function muziekMaken() {
    muziekSter = game.add.audio('muziekSter');
    muziekSpring = game.add.audio('muziekSpring');
    muziekSprong = game.add.audio('muziekSprong');
    bliksem = game.add.audio('bliksem');
    music = game.add.audio('achtergrondMuziek', 1, true);
    winning = game.add.audio('winning');
    music.play();
  }

  //In deze functie worden de vijanden gecreeërd. Ook krijgen ze hun positie en animaties mee. En de physics worden hier ook aangezet.
  function vijandMaken() {
    bat = game.add.sprite(6, 350, 'bat', 18);
    bat.enableBody = true;
    bat.animations.add('batVlieg', [0, 1, 2, 3], 10, true);
    game.physics.enable(bat, Phaser.Physics.ARCADE);

    bat2 = game.add.sprite(200, 350, 'bat', 18);
    bat2.enableBody = true;
    bat2.animations.add('batVlieg', [0, 1, 2], 10, true);
    game.physics.enable(bat2, Phaser.Physics.ARCADE);

    bat3 = game.add.sprite(615, 850, 'bat', 18);
    bat3.enableBody = true;
    bat3.animations.add('batVlieg', [0, 1, 2], 10, true);
    game.physics.enable(bat3, Phaser.Physics.ARCADE);

    bat4 = game.add.sprite(100, 350, 'bat', 18);
    bat4.enableBody = true;
    bat4.animations.add('batVlieg', [0, 1, 2], 10, true);
    game.physics.enable(bat4, Phaser.Physics.ARCADE);

    bat5 = game.add.sprite(950, 850, 'bat', 18);
    bat5.enableBody = true;
    bat5.animations.add('batVlieg', [0, 1, 2], 10, true);
    game.physics.enable(bat5, Phaser.Physics.ARCADE);

    bat6 = game.add.sprite(1050, 1650, 'bat', 18);
    bat6.enableBody = true;
    bat6.animations.add('batVlieg', [0, 1, 2], 10, true);
    game.physics.enable(bat6, Phaser.Physics.ARCADE);

    bat7 = game.add.sprite(275, 1450, 'bat', 18);
    bat7.enableBody = true;
    bat7.animations.add('batVlieg', [0, 1, 2], 10, true);
    game.physics.enable(bat7, Phaser.Physics.ARCADE);

    bat8 = game.add.sprite(750, 1750, 'bat', 18);
    bat8.enableBody = true;
    bat8.animations.add('batVlieg', [0, 1, 2], 10, true);
    game.physics.enable(bat8, Phaser.Physics.ARCADE);

    bat9 = game.add.sprite(325, 1950, 'bat', 18);
    bat9.enableBody = true;
    bat9.animations.add('batVlieg', [0, 1, 2], 10, true);
    game.physics.enable(bat9, Phaser.Physics.ARCADE);
  }

  //Deze functie zorgt ervoor dat de sterren in een groep komen, de loop creeërt de sterren vervolgens en zorgt dat ze van boven naar beneden vallen
  //met een kleine bounce
  function verzamelSter() {
    star = game.add.group()
    star.enableBody = true;
    for (var i = 0; i < 350; i++) {
      var stars = star.create(i * 70, 0, 'star')
      stars.body.gravity.y = 150;
      stars.body.bounce.y = 0.3 + Math.random() * 0.2
    }
  }

  function scoreOptellen() {
    scoreText = game.add.text(16, 35, '', {
      fontSize: '32px',
      fill: '#262829'
    });
    scoreText.fixedToCamera = true;
  }

  //Deze functie bevat alle elementen die colliden. In de update functie wordt deze aangeroepen. 
  function itemsCollide() {
    game.physics.arcade.collide(player, platformlaag);
    game.physics.arcade.collide(star, platformlaag);
    game.physics.arcade.collide(player, springlaag, omhoog);
    game.physics.arcade.collide(star, springlaag);
    game.physics.arcade.collide(player, eindelaag, winner);
    game.physics.arcade.collide(star, eindelaag);
  };


  //UPDATE FUNCTIE
  function update() {
    scoreText.text = "Verzamelde sterren " + score;
    itemsCollide();
    game.physics.arcade.overlap(player, star, pakStar, null, this);
    game.physics.arcade.overlap(player, bat, botsing, null, this);
    game.physics.arcade.overlap(player, bat2, botsing, null, this);
    game.physics.arcade.overlap(player, bat3, botsing, null, this);
    game.physics.arcade.overlap(player, bat4, botsing, null, this);
    game.physics.arcade.overlap(player, bat5, botsing, null, this);
    game.physics.arcade.overlap(player, bat6, botsing, null, this);
    game.physics.arcade.overlap(player, bat7, botsing, null, this);
    game.physics.arcade.overlap(player, bat8, botsing, null, this);
    game.physics.arcade.overlap(player, bat9, botsing, null, this);
    movePlayer();
    batVliegen();
  }

}

//Deze functie zorgt met behulp van de zwaartekracht dat de speler kan bewegen en dat er animaties aangeroepen worden. 
function movePlayer() {
  player.body.velocity.x = 0;

  if (cursor.left.isDown) {
    player.body.velocity.x = -400;
  }
  if (cursor.right.isDown) {
    player.body.velocity.x = 400;
  }
  if (cursor.up.isDown && player.body.onFloor()) {
    player.body.velocity.y = -550;
    muziekSprong.play();
  }
  if (cursor.down.isDown) {
    player.body.velocity.y = 400;
  }

  if (player.body.velocity.x > 0) {
    player.play("right");
  } else if (player.body.velocity.x < 0) {
    player.play("left");
  } else if (player.body.velocity.y > 0) {
    player.play("down");

  } else if (player.body.velocity.y < 0) {
    player.play("up");
  } else {
    player.play("turn");
  }
};


//Deze functie zorgt ervoor dat wanneer de speler in aanraking komt met de eindelaag, er een muziekje wordt afgespeeld
//De zwaartekracht aangepast zodat de speler omhoog gaat en dat er een alert komt die zegt dat dit het einde van het spel is.
function winner(player, eindelaag) {
  winning.play();
  player.body.velocity.y = -400;
  window.alert("You win. Dit is ook het einde van het spel");
}

//Deze functie zorgt ervoor dat de ster wordt verwijderdt op het moment dat deze met de ster in aanraking komt. Ook word er hier een muziekje aangeroepen
//En wordt er een punt bij de score opgeteld.
function pakStar(player, star) {
  // Verwijdert de ster van het scherm
  star.kill();
  muziekSter.play();

  //Telt +1 bij de score op
  score += 1
  scoreText.text = 'Levens: ' + score;
};

//Deze functie zorgt ervoor dat de zwaartekracht van de speler wordt aangepast zodat hij hoger springt. Ook word er hier een muziekje aangeroepen. 
function omhoog(player, springlaag) {
  player.body.velocity.y = -900;
  muziekSpring.play();
};

//Deze functie zorgt ervoor dat de vleermuis vliegt doordat de animaties hier worden aangesproken.
function batVliegen() {
  bat.play('batVlieg');
  bat2.play('batVlieg');
  bat3.play('batVlieg');
  bat4.play('batVlieg');
  bat5.play('batVlieg');
  bat6.play('batVlieg');
  bat7.play('batVlieg');
  bat8.play('batVlieg');
  bat9.play('batVlieg');
};

//Deze functie zorgt ervoor dat de vleermuist weg gaat , dat er een flits komt en het scherm gaat trillen, dat er een audio effect wordt afgespeeld
//En dat er  twee punten van de score afgaat.
function botsing(player, bat) {
  bat.kill();
  score -= 2
  scoreText.text = 'Levens: ' + score;
  bliksem.play();
  this.camera.flash(0x000000, 500, false);
  this.camera.shake(0.05, 500);
};
