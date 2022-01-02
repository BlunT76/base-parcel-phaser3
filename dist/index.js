var $klFNZ$phaser = require("phaser");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

class $6ed577483f033948$var$Level1 extends Phaser.Scene {
    constructor(){
        super({
            key: "Level1"
        });
    }
    preload() {
        this.load.aseprite('alco', '../assets/animations/StrongAlc.png', '../assets/animations/StrongAlc.json');
        this.load.aseprite('chef', '../assets/animations/alcochef.png', '../assets/animations/alcochef.json');
        this.load.image('tileset', '../assets/maps/tileset2.png');
        this.load.tilemapTiledJSON('level1', '../assets/maps/level1.json');
    }
    create() {
        // this.cameras.main.setBackgroundColor('#FFFFFF')
        // this.cameras.main.setZoom(1)
        this.cursors = this.input.keyboard.createCursorKeys();
        this.width = 800;
        this.height = 640;
        const map = this.make.tilemap({
            key: "level1",
            tileWidth: 32,
            tileHeight: 32
        });
        console.log(map);
        const tileset = map.addTilesetImage('tileset3', 'tileset');
        console.log(tileset);
        const layer = map.createLayer('groundlayer', tileset);
        console.log(layer);
        let playerPoints = 0;
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.anims.createFromAseprite('chef', [
            'idleburp',
            'standingattack',
            'jump',
            'run'
        ]);
        this.anims.createFromAseprite('alco');
        const alco = this.physics.add.sprite(this.width / 2, this.height / 2 - 50, 'alco');
        this.chef = this.physics.add.sprite(this.width / 50, this.height / 2.5, 'chef');
        alco.body.setAllowGravity(false);
        this.chef.body.setCollideWorldBounds(true);
        this.chef.sideFacing = 'right';
        this.chef.movingX = false;
        this.chef.onGround = false;
        function colliderAlco() {
            playerPoints++;
            console.log(playerPoints);
            alco.destroy();
        // alco.disableBody(true, true)
        }
        this.chef.play({
            key: 'idleburp',
            repeat: -1,
            ignoreIfPlaying: false
        });
        alco.play({
            key: 'rotatinglabel',
            repeat: -1
        });
        this.physics.add.overlap(this.chef, alco, colliderAlco, null, this);
    }
    update() {
        //Horizontal Movements
        if (this.keyD.isDown || this.cursors.right.isDown) {
            this.chef.body.setVelocityX(100);
            this.chef.play({
                key: 'run',
                repeat: 0,
                ignoreIfPlaying: true
            });
            this.chef.movingX = true;
            this.chef.flipX = false;
            if (this.chef.facing === 'left') return this.chef.facing === 'right';
        } else if (this.keyA.isDown || this.cursors.left.isDown) {
            this.chef.play({
                key: 'run',
                repeat: 0,
                ignoreIfPlaying: true
            });
            this.chef.movingX = true;
            this.chef.body.setVelocityX(-100);
            this.chef.flipX = true;
            if (this.chef.facing === 'right') return this.chef.facing === 'left';
        } else {
            this.chef.setVelocityX(0);
            this.chef.movingX = false;
        }
        //Vertical Movements
        $6ed577483f033948$var$groundedCheck(this.physics, this.chef);
        if (this.keyW.isDown || this.cursors.up.isDown) {
            this.chef.onGround = true;
            this.chef.play({
                key: 'jump',
                repeat: 0,
                ignoreIfPlaying: true
            });
            this.chef.movingY = true;
            this.chef.setVelocityY(-100);
            this.chef.setGravityY(200);
        }
        //Attacks
        if (this.keyF.isDown) {
            this.chef.play({
                key: 'standingattack',
                repeat: 0,
                ignoreIfPlaying: true
            });
            this.chef.attacking = true;
        }
        if (this.chef.attacking == false && this.chef.movingX == false && this.chef.movingY == false) this.chef.play({
            key: 'idleburp',
            repeat: 0,
            ignoreIfPlaying: true
        });
    // if (this.chef.body.velocity.x < 0.5 && this.chef.body.velocity.x > -0.5) {
    //     const idleStance = function(sprite) {
    //         sprite.anims.stop();
    //         return function(sprite) {
    //             sprite.play({key: 'idleburp', repeat: -1, ignoreIfPlaying: false})
    //         }
    //     }
    //     idleStance(this.chef)
    // }
    }
}
function $6ed577483f033948$var$destroySprite(sprite) {
    sprite.destroy();
}
function $6ed577483f033948$var$groundedCheck(physics, sprite, ground) {
    if (physics.add.collider(sprite, ground) == true) sprite.onGround = true;
    else sprite.onGround = false;
}
var $6ed577483f033948$export$2e2bcd8739ae039 = $6ed577483f033948$var$Level1;


var $4fa0c73a46e81912$var$config = {
    type: ($parcel$interopDefault($klFNZ$phaser)).AUTO,
    width: 800,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 0
            }
        }
    },
    scene: [
        $6ed577483f033948$export$2e2bcd8739ae039
    ],
    scale: {
        zoom: 2
    }
};
var $4fa0c73a46e81912$var$game = new ($parcel$interopDefault($klFNZ$phaser)).Game($4fa0c73a46e81912$var$config);


//# sourceMappingURL=index.js.map
