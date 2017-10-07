/* globals __DEV__ */
import Phaser from 'phaser'

import config from '../config'

export default class extends Phaser.State {
  preload () {
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.pauseText = this.game.add.text(
      this.game.world.centerX, this.game.world.centerY-100,
      "PAUSED", {font: `42px ${config.font}`, fill: '#820900'}
    )
    this.pauseText.anchor.setTo(0.5)
    this.pauseText.visible = false

    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(()=>{
      this.pause()
    })

    this.song1 = this.add.audio('song',0.5)
    this.song1.play()
    this.song2 = this.add.audio('songAltered',0.5)
    this.song2.play()

    let left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    let right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

    left.onDown.add(() => {
      if(this.song1.volume > 0) {
        this.song1.fadeTo(1000,this.song1.volume - 0.1)
        this.song2.fadeTo(1000,this.song2.volume + 0.1)
      }
    })

    right.onDown.add(() => {
      if(this.song2.volume > 0) {
        this.song2.fadeTo(1000,this.song2.volume - 0.1)
        this.song1.fadeTo(1000,this.song1.volume + 0.1)
      }
    })
  }

  pause() {
    if(this.game.paused) {
      this.game.paused = false
      this.pauseText.visible = false
    } else {
      this.game.paused = true
      this.pauseText.visible = true
    }
  }
}
