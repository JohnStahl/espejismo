import Phaser from 'phaser'
import Character from './Character'

export default class extends Character {
  constructor(game,x,y) {
    super(game,x,y,'man','walk_right/0001')
    this.setState('stopped')
    this.moveVel = 200
    this.jumpMoveVel = 100
  }

  moveRight() {
    this.setState('walk/right',(s)=>{
      this.animations.play('walk_right',24,true)
    })
    if(this.isState('jump')) {
      this.animations.frameName = 'walk_right/0001'
      this.body.thrustRight(this.jumpMoveVel)
    } else {
      this.body.moveRight(this.moveVel)
    }
  }

  moveLeft() {
    if(this.leftEdge(5)) return
    this.setState('walk/left',(s)=>{
      this.animations.play('walk_left',24,true)
    })
    if(this.isState('jump')) {
      this.animations.frameName = 'walk_left/0001'
      this.body.thrustLeft(this.jumpMoveVel)
    } else {
      this.body.moveLeft(this.moveVel)
    }
  }

  jump() {
    this.setState('jump',(s)=>{
      if(!this.canJump()) return false;
      this.animations.stop(null,true)
      this.body.moveUp(250)
      let jumpTime = this.game.time.now + 750
      s.done = ()=>{
        return this.game.time.now > jumpTime && this.canJump()
      }
      s.update = ()=>{
        if(this.canJump()) {
          this.stop()
        }
      }
    })
  }

  isZero(num) {
    return Math.abs(num) < 4.0;
  }

  stop() {
    this.setState('stopped',()=>{
      this.animations.stop(null, true)
      this.body.setZeroVelocity()
    })
  }

  update() {
    super.update()
    if(this.leftEdge()) {
      if (this.isState('walk/left')) {
        this.stop()
      }
      this.body.x = this.game.camera.x + 46
    }
  }

  leftEdge(fudge = 0) {
    return this.body.x - (46+fudge) < this.game.camera.x
  }
}
