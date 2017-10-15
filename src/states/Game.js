/* globals __DEV__ */
import Phaser from 'phaser'

import config from '../config'
import Player from '../sprites/Player'
import Background from '../sprites/Background'
import StaticObject from "../sprites/StaticObject";

export default class extends Phaser.State {
  init() {
    this.screens = 5
  }

  createObjects() {
    // Stage 1
    this.createObject(0, 200, -20, 'grass_1')
    this.createObject(0, 400, -20, 'grass_2')

    // Stage 2
    this.createObject(1, 100, -20, 'grass_2')
    this.createObject(1, 700, -20, 'grass_1')
    this.createObject(1, 800, -20, 'grass_2')

    // Stage 3
    this.createObject(2, 500, -20, 'grass_1')

    // Stage 4
    this.createObject(3, 300, -20, 'grass_2')
    this.createObject(3, 600, -20, 'grass_1')

    // Stage 5
    this.createObject(4,-360, -120, 'tree')
  }

  createObject(...args) {
    let obj = new StaticObject(this.game,...args)
    this.game.add.existing(obj)
    return obj
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

    this.createObjects()

    this.player = new Player(this.game,100,this.game.world.height-70)
    this.player.setCollisionGroup(this.playerCG)
    this.player.collides(this.worldCG)
    this.game.add.existing(this.player)

    this.pauseText = this.game.add.text(
      this.camera.width/2, this.camera.height/2,
      "PAUSED", {font: `42px ${config.font}`, fill: '#820900'}
    )
    this.pauseText.fixedToCamera = true
    this.pauseText.anchor.setTo(0.5)
    this.pauseText.visible = false

    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(()=>{
      this.pause()
    })

    this.backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    this.backspace.onDown.add(()=>{
      this.reset()
    })

    this.song1 = this.add.audio('song',0.5)
    this.song1.play()
    this.song2 = this.add.audio('songAltered',0.5)
    this.song2.play()

    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update() {
    this.setStage()
    let stop = this.player.isState('walk')
    if(this.isStages(1,2,3)) {
      if (this.cursors.up.isDown) {
        stop = false
        this.player.jump()
      }
    }
    if(this.isStages(0,1,2,3)) {
      if (this.cursors.left.isDown) {
        stop = false
        this.player.moveLeft()
      } else if (this.cursors.right.isDown) {
        stop = false
        this.player.moveRight()
      }
      if(stop) this.player.stop()
    }
  }

  isStages(...stages) {
    for(let stage of stages) {
      if(stage === this.stageNum) return true
    }
    return false
  }

  setStage() {
    const stage = Math.floor(this.player.x / this.camera.width)
    if(stage !== this.stageNum) {
      this.camera.x = stage * this.camera.width
      this.player.setStage(stage)
      this.stageNum = stage
    }
  }

  reset() {
    this.player.reset()
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
