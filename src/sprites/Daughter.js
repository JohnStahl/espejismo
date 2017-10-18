import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor(game,x,y) {
    super(game,x,y,'daughter')
    this.game.physics.p2.enable([this], false)
  }
}