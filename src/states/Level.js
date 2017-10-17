import Phaser from 'phaser'
import config from '../config'
import Player from '../sprites/Player'
import Background from '../sprites/Background'
import StaticObject from "../sprites/StaticObject";
import Game from "./Game";
import SpeechBubble from "../sprites/SpeechBubble";

export default class extends Game {
  nextLevel() { return null }

  groundLevel() { return this.game.world.height }

  crossFade() {
    return [1,0]
  }

  create() {
    [this.game.song1.volume, this.game.song2.volume] = this.crossFade()

    this.background = new Background(this.game)
    this.game.add.existing(this.background)

    this.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.applyGravity = true
    this.game.physics.p2.gravity.y = 3000

    this.playerCG = this.newCG()
    this.worldCG = this.newCG()
    this.enemiesCG = this.newCG()

    this.createGround()
    this.createObjects()

    this.player = new Player(this.game,10,this.groundLevel()-70)
    this.player.setCollisionGroup(this.playerCG)
    this.player.collides([this.worldCG,this.enemiesCG])
    this.game.add.existing(this.player)
    this.player.events.onKilled.add(()=>{
      this.reset()
    })

    this.speechBubble = new SpeechBubble(this.game,this.player)
    this.game.add.existing(this.speechBubble)

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
    this.cursors = this.game.input.keyboard.createCursorKeys()

    this.createFade()

    this.fadeIn(()=>{
      this.wait(500,()=>{
        this.hold = false
        this.levelStart()
      })
    })
  }

  createObjects() {}

  createGround() {
    this.addGround(0,this.game.world.width)
  }

  addGround(fromX,toX) {
    let body = new Phaser.Physics.P2.Body(this.game, null, fromX, this.groundLevel()+1)
    body.static = true
    body.addRectangle(toX-fromX,1,(toX-fromX)/2)
    body.addToWorld()
    body.setCollisionGroup(this.worldCG)
    body.collides([this.playerCG,this.enemiesCG])
    return body
  }

  reset() {
    this.isRetry = true
    this.state.restart()
  }

  levelStart() {

  }

  update() {
    if(this.hold) return
    if(this.backspace.isDown) {
      this.reset()
      return
    }
    if(this.player.left > this.game.world.width) {
      this.player.stop(true)
      this.fadeOut(()=>{
        this.isRetry = false
        this.state.start(this.nextLevel())
      })
      return
    }
    if(this.player.body.y > this.game.world.height) {
      this.player.kill()
      return
    }
    this.levelUpdate()
  }

  levelUpdate(){}

  handleMovement() {
    if (this.cursors.left.isDown) {
      stop = false
      this.player.moveLeft()
    } else if (this.cursors.right.isDown) {
      stop = false
      this.player.moveRight()
    } else {
      this.player.stopWalking()
    }
  }

  handleJump() {
    if (this.cursors.up.isDown) {
      this.player.jump()
    }
  }

  createObject(...args) {
    let obj = new StaticObject(this.game,...args)
    this.game.add.existing(obj)
    return obj
  }

  createObjectWithPhysics(...args) {
    let obj = this.createObject(...args)
    obj.body.clearShapes()
    obj.body.loadPolygon('objects',obj.key)
    obj.body.setCollisionGroup(this.worldCG)
    obj.body.collides([this.playerCG,this.enemiesCG])
    return obj
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

  wait(time,next) {
    this.hold = true
    if(this.isRetry) time = time/2
    this.time.events.add(time,()=>{
      this.hold = false
      if(next) next()
    })
  }

  speak(text,offsets={},next) {
    if(offsets instanceof Function) {
      next = offsets
      offsets = {}
    }
    this.hold = true
    this.speechBubble.show(text,offsets)
    let time = 4000
    if(this.isRetry) time = 1000
    this.time.events.add(time,()=>{
      this.speechBubble.hide()
      this.hold = false
      if(next) next()
    })
  }
}
