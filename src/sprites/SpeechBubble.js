import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor(game,character) {
    super(game,0,0,'speech_bubble')
    this.character = character
    this.visible = false
    this.text = this.game.add.text(0,0,"",{font: `16px ${config.font}`, fill: '#E7D39E'})
  }

  show(text,offsets={}) {
    this.bringToTop()
    this.text.bringToTop()
    this.x = this.character.body.x + 40
    this.y = this.character.top - 110
    this.text.x = this.x + 45
    if(offsets.x) this.text.x += offsets.x
    this.text.y = this.y + 55
    if(offsets.y) this.text.y += offsets.y
    this.text.text = text
    this.visible = true
    this.text.visible = true
  }

  hide() {
    this.visible = false
    this.text.visible = false
  }
}
