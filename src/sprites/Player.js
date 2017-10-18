import Phaser from 'phaser'
import Character from './Character'

export default class extends Character {
  constructor(game,x,y) {
    super(game,x,y,'man','walk_right/0001')
    this.initialY = y
    this.setState('stopped')
    this.moveVel = 400
    this.jumpHorVel = 500
    this.jumpVel = 750
    this.dir = 'right'
    this.hold = false
    this.leftEdgePos = this.game.camera.x

    this.addState('stopped',()=>{
      this.stopAnimation()
      this.body.setZeroVelocity()
    })
    this.addState('walk/right',(s)=>{
      this.stopAnimation()
      this.animations.play('walk_right',24,true)
      s.update = ()=>{
        this.body.moveRight(this.moveVel)
      }
    })
    this.addState('walk/left',(s)=>{
      this.stopAnimation()
      this.animations.play('walk_left',24,true)
      s.update = ()=>{
        this.body.moveLeft(this.moveVel)
      }
    })
    this.addState('jump',(s)=>{
      if(!this.canJump()) return false;
      this.hold = true
      this.stopAnimation()
      this.body.setZeroVelocity()
      this.animations.play(`jump_${this.dir}`,30,false)
      this.onAnimationComplete(()=>{
        this.hold = false
      })
      let jumpTime = this.game.time.now + 1000
      s.isDone = ()=>{
        return !this.isAnimating() && this.game.time.now > jumpTime && this.canJump()
      }
      s.done = ()=> {
        this.animations.play(`land_${this.dir}`,30,false)
        this.hold = true
        this.onAnimationComplete(()=>{
          this.hold = false
        })
      }
      s.update = ()=>{
        if(this.isAnimating()) {
          if(this.animations.frameName.match(/0010/)) {
            if(this.canJump()) {
              this.animations.currentAnim.speed = 120
              this.body.moveUp(this.jumpVel)
              if (this.dir === 'right')
                this.body.moveRight(this.jumpHorVel)
              else
                this.body.moveLeft(this.jumpHorVel)
            } else {
              this.stopAnimation()
            }
          }
        }
        if(!this.isAnimating() && this.canJump()) {
          this.stop()
        }
      }
    })
  }

  moveRight() {
    if(this.hold) return
    this.setState('walk/right')
    this.dir = 'right'
  }

  moveLeft() {
    if(this.leftEdge(5)) return
    if(this.hold) return
    this.dir = 'left'
    this.setState('walk/left')
  }

  stopWalking() {
    if(this.hold) return
    if(this.isState('walk')) {
      this.stop()
    }
  }

  jump() {
    if(this.hold) return
    this.setState('jump')
  }

  stop(force = false) {
    this.setState('stopped',force)
  }

  update() {
    super.update()
    if(this.leftEdge()) {
      if (this.isState('walk/left')) {
        this.stop()
      }
      this.moveToEdge()
    }
    if(!this.isAnimating()) {
      if(this.isState('jump')) {
        if(this.dir === 'right') {
          this.animations.frameName = 'land_right/0001'
        } else {
          this.animations.frameName = 'land_left/0001'
        }
      } else {
        if(this.dir === 'right') {
          this.animations.frameName = 'walk_right/0001'
        } else {
          this.animations.frameName = 'walk_left/0001'
        }
      }
    }
  }

  moveToEdge() {
    this.body.x = this.leftEdgePos + 46
  }

  leftEdge(fudge = 0) {
    return this.body.x - (46+fudge) < this.leftEdgePos
  }

}
