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
    this.speak("Guess I'll have to jump for it...")
  }

  levelUpdate() {
    this.handleJump()
    this.handleMovement()
  }
}
