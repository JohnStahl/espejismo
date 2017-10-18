import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor(game,image) {
    super(game,0,0,image)
    this.fixedToCamera = true
    this.scale.x =  game.camera.width / this.width
    this.scale.y =  game.camera.height / this.height
  }
}
