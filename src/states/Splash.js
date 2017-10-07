import Phaser from 'phaser'

import config from '../config'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  create () {
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    let title = this.addText("Press Space to Start", `42px ${config.font}`, '#820900')
  }

  addTextBelow(pos,content,font,color) {
    let text = this.addText(content,font,color)
    text.alignTo(pos, Phaser.BOTTOM_CENTER)
    return text;
  }

  addTextAbove(pos,content,font,color) {
    let text = this.addText(content,font,color)
    text.alignTo(pos, Phaser.TOP_CENTER)
    return text;
  }

  addText(content,font,color) {
    let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, content, {'font': font, fill: color} );
    text.padding.set(20,0)
    text.dirty = true
    centerGameObjects([text])
    return text;
  }

  update () {
    if (this.spaceKey.isDown){
      this.state.start('Game');
    }
  }
}
