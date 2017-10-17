import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level2' }

  groundLevel() {
    return this.game.world.height - 18
  }

  createObjects() {
    this.createObject(200, 20, 'grass_1')
    this.createObject(400, 12, 'grass_2')
    this.createObject(512,0,'ground')
  }

  levelStart() {
    this.speak("I have to get\nout of here!",{x:27,y:-10})
  }

  levelUpdate() {
    this.handleMovement()
  }
}
