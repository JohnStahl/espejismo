import Phaser from 'phaser'
import Character from './Character'

export default class extends Character {
  constructor(game,x,y) {
    super(game,x,y,'man','walk_right/0001')
    this.setState('stopped')
    this.moveVel = 200
    this.jumpMoveVel = 100
  }

  walkRight() {
    this.setState('walkRight',(s)=>{
      this.animations.play('walk_right',24,true)
    })
    if(this.isState('jump')) {
      this.body.moveRight(this.jumpMoveVel)
    } else {
      this.body.moveRight(this.moveVel)
    }
  }

  walkLeft() {
    this.setState('walkLeft',(s)=>{
      this.animations.play('walk_left',24,true)
    })
    if(this.isState('jump')) {
      this.body.moveLeft(this.jumpMoveVel)
    } else {
      this.body.moveLeft(this.moveVel)
    }
  }

  jump() {
    this.setState('jump',(s)=>{
      if(!this.canJump()) return false;
      this.animations.stop(null,true)
      this.body.moveUp(400)
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
      if(!this.isState('jump')) {
        this.body.setZeroVelocity()
      }
    })
  }
}
