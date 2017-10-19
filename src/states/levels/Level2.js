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
    this.speak("What's happened\nto the bridge?!",{x:12},()=>{
      this.wait(2000,()=>{
        this.speak("Someone is trying\nto stop me...",{x:5},()=>{
          this.wait(1000,()=>{
            this.speak("I'll have to jump\nto the other side",{x:20,y:-25,arrows:['up']})
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
