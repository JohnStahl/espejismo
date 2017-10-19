import Phaser from 'phaser'
import config from '../config'
import Player from '../sprites/Player'
import Background from '../sprites/Background'
import StaticObject from "../sprites/StaticObject";
import Game from "./Game";
import SpeechBubble from "../sprites/SpeechBubble";
import HealthBar from "../sprites/HealthBar";

export default class extends Game {
  nextLevel() { return null }

  groundLevel() { return this.game.world.height }

  crossFade() {
    return [1,0]
  }

  playerStart() {
    return 10
  }

  backgroundImg() {
    return 'background'
  }

  create() {
    [this.game.song1.volume, this.game.song2.volume] = this.crossFade()

    this.background = new Background(this.game,this.backgroundImg())
    this.game.add.existing(this.background)

    this.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.useElapsedTime = true
    this.game.physics.p2.applyGravity = true
    this.game.physics.p2.gravity.y = 3000

    this.playerCG = this.newCG()
    this.worldCG = this.newCG()
    this.enemiesCG = this.newCG()

    this.createGround()
    this.createObjects()

    this.player = new Player(this.game,this.playerStart(),this.groundLevel()-80)
    this.player.setCollisionGroup(this.playerCG)
    this.player.collides([this.worldCG,this.enemiesCG])
    this.game.add.existing(this.player)
    this.player.events.onKilled.add(()=>{
      this.reset()
    })

    this.createAbove()

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
  createAbove() {}

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

  changeLevel(wait=null) {
    this.fadeOut(()=>{
      this.isRetry = false
      if(wait) {
        this.wait(wait,()=>{
          this.state.start(this.nextLevel())
        })
      } else {
        this.state.start(this.nextLevel())
      }
    })
  }

  update() {
    if(this.hold) return
    if(this.backspace.isDown) {
      this.reset()
      return
    }
    if(this.player.left > this.game.world.width) {
      this.player.stop(true)
      this.changeLevel()
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

  createPlayerHealthBar() {
    this.healthBar = new HealthBar(this.game,this.player)
    this.healthBar.x = 10
    this.healthBar.y = 15
    this.add.existing(this.healthBar)
  }

  createDaughter(x,y) {
    this.daughter = this.createObject(x,y,'daughter')
    this.daughterBubble = new SpeechBubble(this.game,this.daughter,'#344f82')
    this.add.existing(this.daughterBubble)
  }

  daughterSpeak(text,opts,f) {
    opts.bubble = this.daughterBubble
    this.speak(text,opts,f)
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

  forceWait(time,next) {
    this.hold = true
    this.time.events.add(time,()=>{
      this.hold = false
      if(next) next()
    })

  }

  wait(time,next) {
    this.hold = true
    if(this.isRetry) time = time/2
    this.time.events.add(time,()=>{
      this.hold = false
      if(next) next()
    })
  }

  speak(text,opts={},next) {
    if(opts instanceof Function) {
      next = opts
      opts = {}
    }
    this.hold = true
    let bubble = this.speechBubble
    if(opts.bubble) bubble = opts.bubble
    bubble.show(text,opts)
    let time = 4000
    if(this.isRetry) time = 1000
    this.time.events.add(time,()=>{
      bubble.hide()
      this.hold = false
      if(next) next()
    })
  }
}
