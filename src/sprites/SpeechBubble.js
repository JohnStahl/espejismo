import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor(game,character,color='#E7D39E') {
    super(game,0,0,'speech_bubble')
    this.character = character
    this.visible = false
    this.text = this.game.add.text(0,0,"",{font: `16px ${config.font}`, fill: color})
    this.arrows = { }
    this.arrows.up = this.game.add.image(0,0,'arrow_up')
    this.arrows.up.visible = false
    this.arrows.down = this.game.add.image(0,0,'arrow_down')
    this.arrows.down.visible = false
    this.arrows.left = this.game.add.image(0,0,'arrow_left')
    this.arrows.left.visible = false
    this.arrows.right = this.game.add.image(0,0,'arrow_right')
    this.arrows.right.visible = false
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
    if(opts.arrows) {
      let x = this.x + (115 - (40 * opts.arrows.length) / 2)
      let y = this.y + 87
      for(let arrowName of opts.arrows) {
        let arrow = this.arrows[arrowName]
        arrow.x = x
        arrow.y = y
        arrow.visible = true
        arrow.bringToTop()
        x += 40
      }
    }
  }

  hide() {
    this.visible = false
    this.text.visible = false
    for(let arrow in this.arrows) {
      this.arrows[arrow].visible = false
    }
  }
}
