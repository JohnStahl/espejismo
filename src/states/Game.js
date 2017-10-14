/* globals __DEV__ */
import Phaser from 'phaser'

import config from '../config'
import Player from '../sprites/Player'
import Background from '../sprites/Background'

export default class extends Phaser.State {
  init() {
    this.screens = 5
  }

  create () {
    this.background = new Background(this.game)
    this.game.add.existing(this.background)
    this.world.setBounds(0,0,this.camera.width*this.screens,this.camera.height)
    this.physics.startSystem(Phaser.Physics.P2JS);

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.game.physics.p2.applyGravity = true
    this.game.physics.p2.gravity.y = 400
    this.game.physics.p2.updateBoundsCollisionGroup();

    this.playerCG = this.newCG()
    this.worldCG = this.newCG()

    this.player = new Player(this.game,100,this.game.world.height-70)
    this.player.setCollisionGroup(this.playerCG)
    this.player.collides(this.worldCG)
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
    let stop = this.player.isState('walk')
    if(this.cursors.up.isDown) {
      stop = false
      this.player.jump()
    }
    if (this.cursors.left.isDown) {
      stop = false
      this.player.moveLeft()
    } else if (this.cursors.right.isDown) {
      stop = false
      this.player.moveRight()
    }
    if(stop) this.player.stop()
    this.setCamera()
  }

  setCamera() {
    this.camera.x =
      Math.floor(this.player.x / this.camera.width) * this.camera.width
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

  newCG() {
    return this.game.physics.p2.createCollisionGroup();
  }
}
