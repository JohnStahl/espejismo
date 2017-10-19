import Phaser from 'phaser'

import config from '../config'
import Game from "./Game";

export default class extends Game {
  create () {
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    title = this.game.add.sprite(0,0,"title") 
    
    title.scale.x =  game.camera.width / title.width
    title.scale.y =  game.camera.height / title.height
    
    let title = this.addText("Press Space to Start", `42px ${config.font}`, '#820900')

    this.createFade()
    this.fadeIn()
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
