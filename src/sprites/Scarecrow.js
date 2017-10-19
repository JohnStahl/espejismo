import Phaser from 'phaser'
import Character from "./Character";
import Player from "./Player";

export default class extends Character {
  constructor(game,x,y,player) {
    super(game,x,y,'scarecrow','awaken/0001')
    this.body.static = true
    this.body.clearShapes()
    this.player = player
    this.hits = 0
    this.outOfBoundsKill = true

    this.addState('dead')

    this.addState('dying',s=>{
      this.animations.frameName = 'walk_left/0001'
      this.body.moveUp(600)
      this.body.moveRight(300)
      this.game.add.tween(this).to({angle: 90}).start()
      this.game.add.tween(this.body).to({angle: 90}).start()
      s.update = ()=>{
        if(this.angle === 90 && Math.round(this.body.velocity.y) === 0) {
          this.disablePhysics()
          this.setState('dead')
        }
      }
    })

    this.addState('awaken',s=>{
      this.animations.play('awaken',24)
    })

    this.addState('transition',s=>{
      this.animations.play('transition',60)
      s.update = ()=>{
        if(!this.isAnimating()) {
          this.awakened = true
          this.body.static = false
          this.setState('move/left')
        }
      }
    })

    this.addState('hit',s=>{
      this.animations.play('move/right',24)
      this.body.moveUp(600)
      this.body.moveRight(300)
      let hitTime = this.game.time.now + 1000
      s.update = ()=>{
        if (this.animations.frameName === 'walk_left/0024') {
          this.animations.currentAnim.frame = 12
        }
        if(hitTime < this.game.time.now && this.canJump()){
          this.setState('move/left')
        }
      }
    })

    this.addState('move/left',s=>{
      this.animations.play('walk_left',30)
      s.update = ()=>{
        this.body.moveLeft(350)
        if (this.animations.frameName === 'walk_left/0024') {
          this.animations.currentAnim.frame = 12
        }
        if(this.canHit()) {
          this.setState('attack')
        }
      }
    })

    this.addState('move/right',s=>{
      this.animations.play('walk_right',24)
      let backoffTime = this.game.time.now + 1000
      s.update = ()=>{
        this.body.moveRight(200)
        if (this.animations.frameName === 'walk_right/0024') {
          this.animations.currentAnim.frame = 12
        }
        if(this.game.time.now > backoffTime) {
          this.setState('move/left')
        }
      }
    })

    this.addState('attack',s=>{
      this.animations.play('attack',120)
      s.update = ()=>{
        if(this.animations.currentAnim.frame > 13) {
          if(this.canHit()) {
            this.player.kill()
          }
        }
        if(!this.isAnimating()) {
          this.setState('move/right')
        }
      }
    })
  }

  walk() {
    this.setState('move/left')
  }

  update() {
    super.update()
    if(this.body.x + 105 > this.game.world.width) {
      this.body.x = this.game.world.width - 100
    }
  }

  updatePhysics() {
    if(this.awakened) {
      super.updatePhysics()
    }
  }

  awaken() {
    this.setState('awaken')
  }

  transition() {
    this.setState('transition')
  }

  hit() {
    ++this.hits
    if(this.hits < 3) {
      this.setState('hit')
    } else {
      this.setState('dying')
    }
  }

  canHit() {
    return this.body.x - this.player.body.x < 120
  }
}
