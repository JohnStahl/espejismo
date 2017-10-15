import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level2' }

  createObjects() {
    this.createObject(200, -20, 'grass_1')
    this.createObject(400, -20, 'grass_2')
  }

  levelStart() {
    this.speak("I have to get out of here!")
  }

  levelUpdate() {
    this.handleMovement()
  }
}
