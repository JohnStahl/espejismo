import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level4' }

  crossFade() {
    return [0.9,0.05]
  }

  groundLevel() {
    return this.game.world.height - 18
  }

  createObjects() {
    this.createObject(500, 20, 'grass_1')
    this.createObject(512,0,'ground')
  }

  levelStart() {
    this.speak("What in the devil?",{y:10},()=>{
      this.wait(1000,()=>{
        this.speak("Stay away from me!",{x:-5,y:10})
      })
    })
  }

  levelUpdate() {
    this.handleJump()
    this.handleMovement()
  }
}
