import Phaser from 'phaser'

import config from '../config'
import { centerGameObjects } from '../utils'
import Game from "./Game";

export default class extends Game {
  create () {
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    title = this.game.add.sprite(0,0,"title") 
    
    title.scale.x =  game.camera.width / title.width
    title.scale.y =  game.camera.height / title.height
    
    let title = this.addText("Press Space to Start", `42px ${config.font}`, '#820900')
    let controls = this.addTextBelow(title, "Movement: left/right arrow keys\nJump: up arrow\nPause: space", `25px ${config.font}`, '#820900')

    this.game.song1 = this.add.audio('song',1,true)
    this.game.song2 = this.add.audio('songAltered',0,true)
    this.game.song1.play()
    this.game.song2.play()
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
