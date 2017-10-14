/* globals __DEV__ */
import Phaser from 'phaser'

import config from '../config'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  preload () {
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.game.physics.p2.applyGravity = true
    this.game.physics.p2.gravity.y = 400

    this.player = new Player(this.game,this.game.world.centerX,this.game.world.centerY)
    this.game.add.existing(this.player)

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

    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update() {
    let stop = true
    if(this.cursors.up.isDown) {
      stop = false
      this.player.jump()
    }
    if (this.cursors.left.isDown) {
      stop = false
      this.player.walkLeft()
    } else if (this.cursors.right.isDown) {
      stop = false
      this.player.walkRight()
    }
    if(stop) this.player.stop()
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
