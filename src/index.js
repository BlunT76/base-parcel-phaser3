import Phaser from 'phaser'
import Level1 from './scenes/level1'

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y:0},
        }
    },
    scene: [Level1],
    scale: {
        zoom: 2,
    }

};


var game = new Phaser.Game(config);