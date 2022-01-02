import tileset2 from '../assets/maps/tileset2.png';
import level1 from '../assets/maps/level1.json';
import alcoJson from '../assets/animations/StrongAlc.json';
import chefJson from '../assets/animations/alcochef.json';
import alcoPng from '../assets/animations/StrongAlc.png';
import chefPng from '../assets/animations/alcochef.png';

class Level1 extends Phaser.Scene
{
    constructor() {
        super({key: "Level1" });
  }
    preload () {
        
        
        this.load.aseprite('alco', alcoPng, alcoJson);
        this.load.aseprite('chef', chefPng, chefJson);

        this.load.image('tileset2', tileset2);
        this.load.tilemapTiledJSON('level1', level1);
        

    }

    create () {

        this.cameras.main.setBackgroundColor('#FFFFFF')

        // this.cameras.main.setZoom(1)

        this.cursors = this.input.keyboard.createCursorKeys();
        this.width = 800;
        this.height = 640;

        const map = this.make.tilemap({ key: "level1", tileWidth: 32, tileHeight: 32 });
        const tileset = map.addTilesetImage('tileset2', 'tileset2');
        const layer = map.createLayer('groundlayer', tileset);
        let playerPoints = 0;

        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);


        this.anims.createFromAseprite('chef', [ 'idleburp', 'standingattack', 'jump', 'run' ]);
        this.anims.createFromAseprite('alco');

        const alco = this.physics.add.sprite(this.width/2, (this.height /2) -50, 'alco');
        this.chef = this.physics.add.sprite(this.width/50, this.height/2.5, 'chef');

        alco.body.setAllowGravity(false);

        this.chef.body.setCollideWorldBounds(true)

        this.chef.sideFacing = 'right'
        this.chef.movingX = false;
        this.chef.onGround = false;

        function colliderAlco() {
            playerPoints ++
            console.log(playerPoints)
            alco.destroy();
            // alco.disableBody(true, true)
        }
        


        this.chef.play({key: 'idleburp', repeat: -1, ignoreIfPlaying: false})
        alco.play({key: 'rotatinglabel', repeat: -1})

        this.physics.add.overlap(this.chef, alco, colliderAlco, null, this)
     
    }

    update() {

        //Horizontal Movements
        if(this.keyD.isDown || this.cursors.right.isDown) {
            this.chef.body.setVelocityX(100);
            this.chef.play({key: 'run', repeat: 0, ignoreIfPlaying: true})
            this.chef.movingX = true
            this.chef.flipX = false

            if(this.chef.facing === 'left') {
                return this.chef.facing === 'right'
            }

        } else if(this.keyA.isDown || this.cursors.left.isDown) {
            this.chef.play({key: 'run', repeat: 0, ignoreIfPlaying: true})
            this.chef.movingX = true
            this.chef.body.setVelocityX(-100);
            this.chef.flipX = true

            if(this.chef.facing === 'right') {
                return this.chef.facing === 'left'
            }
        } else {
            this.chef.setVelocityX(0)
            this.chef.movingX = false
        }

        //Vertical Movements

        groundedCheck(this.physics, this.chef)
        if(this.keyW.isDown || this.cursors.up.isDown) {

            if(this.chef.onGround = true) {
                this.chef.play({key: 'jump', repeat: 0,  ignoreIfPlaying: true})
                this.chef.movingY = true
                this.chef.setVelocityY(-100)
                this.chef.setGravityY(200)
            } 

        }
        
        //Attacks
        if(this.keyF.isDown) { 
            this.chef.play({key: 'standingattack', repeat: 0, ignoreIfPlaying: true})
            this.chef.attacking = true
        }

        if(this.chef.attacking == false && this.chef.movingX == false && this.chef.movingY == false) {
            this.chef.play({key: 'idleburp', repeat: 0, ignoreIfPlaying: true})


        }

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

function destroySprite(sprite) {

    sprite.destroy();

}

function groundedCheck(physics, sprite, ground) {
    if(physics.add.collider(sprite, ground) == true) {
        sprite.onGround = true
    } else {
        sprite.onGround = false
    }
}

export default Level1;