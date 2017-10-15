import Phaser from 'phaser'

import config from '../config'
import { centerGameObjects } from '../utils'
import Game from "./Game";

export default class extends Game {
  create () {
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    this.game.add.sprite(0,0,"title") //not scaled properly
    //this.game.scale.x =  game.camera.width / this.width
    //this.game.scale.y =  game.camera.height / this.height
    
    let title = this.addText("Press Space to Start", `42px ${config.font}`, '#820900')
    let controls = this.addText("movement: left/right arrow keys jump: up arrow", `30px ${config.font}`, '#820900') //just places text over title
    
    this.song1 = this.add.audio('song',0.5,true)
    this.song1.play()
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
    if(this.hold) return
    if (this.spaceKey.isDown){
      this.fadeOut(()=>{
        this.state.start('Level1');
      })
    }
  }
}
