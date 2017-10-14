import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor(game) {
    super(game,0,0,'background')
    this.fixedToCamera = true
    this.scale.x =  game.camera.width / this.width
    this.scale.y =  game.camera.height / this.height
  }
}
