import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level6' }

  fadeTime() {
    return 2000
  }

  crossFade() {
    return [0.5,0.3];
  }

  groundLevel() {
    return this.game.world.height - 20
  }

  createAbove() {
    this.player.swordMode = true
  }

  createObjects() {
    this.createObject(-220, -100, 'dragon')
    this.createObject(512,0,'ground')

    this.flashGraphic = this.game.add.graphics(0,0)
    this.flashGraphic.fixedToCamera = true
    this.flashGraphic.beginFill(0xFFFFFF)
    this.flashGraphic.drawRect(0,0,this.camera.width,this.camera.height)
    this.flashGraphic.alpha = 0
    this.flashTween = this.game.add.tween(this.flashGraphic).to({alpha: 1},100)
  }

  levelStart() {
    this.wait(2500,()=>{
      this.speak("I should have\nknown you were\nbehind this...",{x:18,y:-20},()=>{
        this.player.moveRight()
        this.forceWait(1000,()=>{
          this.player.stop()
          this.wait(1000,()=>{
            this.speak("This is the last\ntime you cross\nme old friend!",{x:22,y:-38,arrows:['up']})
          })
        })
      })
    })
  }

  levelUpdate() {
    if(!this.attacked) {
      this.handleJump()
      if(this.player.isState('jump')) {
        this.attacked = true

        this.hold = true
        this.flashTween.onComplete.addOnce(()=>{
          this.hold = false
          this.player.body.setZeroVelocity()
          this.player.stop()
          this.forceWait(1000,()=>{
            this.player.collapse()
            this.forceWait(2000,()=>{
              this.changeLevel(2000)
            })
          })
        })
        this.flashTween.yoyo(true)
        this.forceWait(500,()=>{
          this.sound.play('thunder',0.5)
          this.forceWait(100,()=>{
            this.flashTween.start()
          })
        })
      }
    }
  }
}
