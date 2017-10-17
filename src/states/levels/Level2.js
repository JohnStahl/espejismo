import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level3' }

  crossFade() {
    return [0.9,0.01]
  }

  groundLevel() {
    return this.game.world.height - 160
  }

  createGround() {}

  createObjects() {
    this.createObject(220,0,'bank_left')
    this.createObject(-220,0,'bank_right')
    this.createObjectWithPhysics(0, 0, 'bridge_left')
    this.createObjectWithPhysics(-100, 0, 'bridge_right')
  }

  levelStart() {
    this.speak("Wha? When did this happen?",()=>{
      this.wait(2000,()=>{
        this.speak("It's as if someone's trying to stop me...",()=>{
          this.wait(1000,()=>{
            this.speak("I'll just have to jump over to the other side")
          })
        })
      })
    })
  }

  levelUpdate() {
    this.handleJump()
    this.handleMovement()
  }
}
