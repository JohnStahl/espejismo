import Phaser from 'phaser'
import Character from "./Character";
import Player from "./Player";

export default class extends Character {
  constructor(game,x,y) {
    super(game,x.initial,y,'thistle_monster','walk_left/0001')
    this.xMin = x.min
    this.xMax = x.max
    this.body.static = true
    this.body.clearShapes()
    // let damageTimeout = 0
    this.body.onBeginContact.add((body)=>{
      if(body.sprite && body.sprite instanceof Player) {
        body.sprite.kill()
      }
    })
    //     if (this.game.time.now > damageTimeout) {
    //       body.sprite.damage(20)
    //       if(body.x < this.body.x) {
    //         body.moveLeft(400)
    //       } else {
    //         body.moveRight(400)
    //       }
    //       damageTimeout = this.game.time.now + 1000
    //     }
    //   }
    // })

    this.addState('stopped',s=>{
      this.body.setZeroVelocity()
    })

    this.addState('awaken',s=>{
      this.animations.frameName = 'walk_left/0013'
      this.body.static = false
      this.body.moveUp(1000)
      let awakenTime = this.game.time.now + 600
      s.update = ()=>{
        if(!this.awakened && awakenTime <= this.game.time.now) {
          this.animations.play('walk_left',24,false)
          this.animations.currentAnim.frame = 14
          this.awakened = true
          if(this.canJump()) {
            this.setState('stopped')
          }
        }
      }
      s.isDone = ()=>{
        return this.canJump()
      }
    })

    this.addState('move/left',s=>{
      this.animations.play('walk_left',24)
      s.update = ()=>{
        if(this.body.x > this.xMin) {
          this.body.moveLeft(400)
          if (this.animations.currentAnim.frame === 13) {
            this.animations.currentAnim.frame = 7
          }
        }
        if(!this.isAnimating()) {
          this.setState('move/right')
        }
      }
    })

    this.addState('move/right',s=>{
      this.animations.play('walk_right',24)
      s.update = ()=>{
        if(this.body.x < this.xMax) {
          this.body.moveRight(400)
          if (this.animations.currentAnim.frame === 30) {
            this.animations.currentAnim.frame = 7
          }
        }
        if(!this.isAnimating()) {
          this.setState('move/left')
        }
      }
    })
  }

  walk() {
    this.setState('move/left')
  }

  update() {
    super.update()
  }

  updatePhysics() {
    if(this.awakened) {
      super.updatePhysics()
    }
  }

  awaken() {
    this.setState('awaken')
  }
}
