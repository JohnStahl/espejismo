import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor(game,character,color='#E7D39E') {
    super(game,0,0,'speech_bubble')
    this.character = character
    this.visible = false
    this.text = this.game.add.text(0,0,"",{font: `16px ${config.font}`, fill: color})
  }

  show(text,opts={}) {
    this.bringToTop()
    this.text.bringToTop()
    this.x = this.character.body.x + 20
    this.y = this.character.top - 130
    this.text.x = this.x + 45
    if(opts.x) this.text.x += opts.x
    this.text.y = this.y + 55
    if(opts.y) this.text.y += opts.y
    if(opts.size) {
      this.text.fontSize = opts.size
    } else {
      this.text.fontSize = 16
    }
    this.text.text = text
    this.visible = true
    this.text.visible = true
  }

  hide() {
    this.visible = false
    this.text.visible = false
  }
}
