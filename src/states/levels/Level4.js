import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level5' }

  crossFade() {
    return [0.8,0.15]
  }

  groundLevel() {
    return this.game.world.height - 18
  }

  createObjects() {
    this.createObject(300, 16, 'grass_2')
    this.createObject(600, 20, 'grass_1')
    this.createObject(512,0,'ground')
  }

  levelStart() {
    this.speak("Not giving up eh?",{y:10},()=>{
      this.speak("Maybe my cane\nwill change\nyour mind!",{x: 20, y: -20})
    })
  }

  levelUpdate() {
    this.handleJump()
    this.handleMovement()
  }
}
