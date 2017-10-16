import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level4' }

  groundLevel() {
    return this.game.world.height - 18
  }

  createObjects() {
    this.createObject(500, 20, 'grass_1')
    this.createObject(512,0,'ground')
  }

  levelStart() {
    this.speak("What in the devil?",()=>{
      this.wait(1000,()=>{
        this.speak("Stay.. stay away from me!")
      })
    })
  }

  levelUpdate() {
    this.handleJump()
    this.handleMovement()
  }
}
