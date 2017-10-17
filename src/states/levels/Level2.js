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
    this.speak("What happened\nto the bridge!?",{x:15},()=>{
      this.wait(2000,()=>{
        this.speak("It's as if\nsomeone is trying\nto stop me...",{x:15,y:-18},()=>{
          this.wait(1000,()=>{
            this.speak("I'll have to jump\nto the other side",{x:5,y:3})
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
