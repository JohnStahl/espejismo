import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level3' }

  createObjects() {
    this.createObject(100, -20, 'grass_2')
    this.createObject(700, -20, 'grass_1')
    this.createObject(800, -20, 'grass_2')
  }

  levelStart() {
    this.speak("Guess I'll have to jump for it...")
  }

  levelUpdate() {
    this.handleJump()
    this.handleMovement()
  }
}
