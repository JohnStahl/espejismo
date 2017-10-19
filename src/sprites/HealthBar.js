import Phaser from 'phaser'

export default class extends Phaser.Group {
  constructor(game,character) {
    super(game)

    this.character = character
    this.totalHearts = 5
    let offset = 0
    for(let i = 0; i< this.totalHearts; ++i) {
      let heart = game.make.sprite(i*32,0,'heart')
      heart.crop(new Phaser.Rectangle(0,0,0,heart.height))
      this.add(heart)
      offset = 5
    }
  }

  update() {
    super.update()
    let health = Math.round(
      (this.character.health / this.character.maxHealth) *
      30 * this.totalHearts
    )
    for(let heart of this.children) {
      let heartHealth = Math.min(health,30)
      heart.cropRect.width = heartHealth
      heart.updateCrop()
      health -= heartHealth
    }
  }
}
