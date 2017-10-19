import Phaser from 'phaser'
import Character from './Character'

export default class extends Character {
  constructor(game,x,y,health = 100) {
    super(game,x,y,'man','walk_right/0001')
    this.initialY = y
    this.setState('stopped')
    this.moveVel = 400
    this.jumpHorVel = 500
    this.jumpVel = 900
    this.dir = 'right'
    this.hold = false
    this.health = health
    this.maxHealth = 100
    this.checkEdge = true
    this.leftEdgePos = this.game.camera.x
    this.swordMode =false
    this.outOfBoundsKill = false

    this.addState('sword_mode',(s)=>{
      this.animations.play('cane_sword',24)
      this.hold = true
      s.isDone = ()=>{
        return !this.isAnimating()
      }

      s.update = ()=>{
        if(!this.isAnimating()) {
          this.swordMode = true
          this.hold = false
          this.animations.currentAnim = this.animations.getAnimation('sword_walk_right')
          this.setState('stopped')
        }
      }
    })

    this.addState('stopped',()=>{
      this.stopAnimation()
      this.body.setZeroVelocity()
    })
    this.addState('walk/right',(s)=>{
      this.stopAnimation()
      this.animations.play(this.walkAnim('right'),24,true)
      s.update = ()=>{
        this.body.moveRight(this.moveVel)
      }
    })
    this.addState('walk/left',(s)=>{
      this.stopAnimation()
      this.animations.play(this.walkAnim('left'),24,true)
      s.update = ()=>{
        this.body.moveLeft(this.moveVel)
      }
    })
    this.addState('jump',(s)=>{
      if(!this.canJump()) return false;
      this.hold = true
      this.stopAnimation()
      this.body.setZeroVelocity()
      this.animations.play(this.jumpAnim(),30,false)
      this.onAnimationComplete(()=>{
        this.hold = false
      })
      let jumpTime = this.game.time.now + 1000
      s.isDone = ()=>{
        return !this.isAnimating() && this.game.time.now > jumpTime && this.canJump()
      }
      s.done = ()=> {
        this.animations.play(this.landAnim(),30,false)
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
    this.addState('collapse',()=>{
      this.disablePhysics()
      this.animations.play('collapse',24)
    })

    this.addState('wake',(s)=>{
      this.disablePhysics()
      this.animations.play('wake',14)
      let turnTimer = this.game.time.now + 3000
      s.update = ()=>{
        if(this.game.time.now > turnTimer) {
          this.animations.frameName = 'walk_left/0001'
        }
      }
    })
  }

  walkAnim(dir = this.dir) {
    if(this.swordMode) {
      return `sword_walk_${dir}`
    } else {
      return `walk_${dir}`
    }
  }

  jumpAnim(dir = this.dir) {
    if(this.swordMode) {
      return `lunge_${dir}`
    } else {
      return `jump_${dir}`
    }
  }

  landAnim(dir = this.dir) {
    if(this.swordMode) {
      return `lunge_land_${dir}`
    } else {
      return `land_${dir}`
    }
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

  enableSwordMode() {
    this.setState('sword_mode')
  }

  stop(force = false) {
    this.setState('stopped',force)
  }

  collapse() {
    this.setState('collapse')
  }

  collapsed() {
    this.disablePhysics()
    this.animations.frameName = 'wake/0001'
  }

  wake() {
    this.setState('wake')
  }

  update() {
    super.update()
    if(this.checkEdge && this.leftEdge()) {
      if (this.isState('walk/left')) {
        this.stop()
      }
      this.moveToEdge()
    }
    if(!this.isAnimating() && !this.physicsDisabled) {
      if(this.isState('jump')) {
        this.animations.frameName = `${this.landAnim()}/0001`
      } else {
        this.animations.frameName = `${this.walkAnim()}/0001`
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
