import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor(game,x,y,key) {
    super(game,0,0,key)
    if(x < 0) x = game.camera.width + x
    y = game.world.height - this.height/2 - y
    this.game.physics.p2.enable([this], false)
    this.body.static = true
    this.body.x = x
    this.body.y = y
  }
}
