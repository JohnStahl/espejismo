import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level5' }

  createObjects() {
    this.createObject(300, -20, 'grass_2')
    this.createObject(600, -20, 'grass_1')
  }

  levelStart() {
    this.speak("Not giving up eh?",()=>{
      this.speak("Maybe a hit from my cane will change your mind!")
    })
  }

  levelUpdate() {
    this.handleJump()
    this.handleMovement()
  }
}
