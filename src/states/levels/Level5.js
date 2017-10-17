import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level5' }

  crossFade() {
    return [0.5,0.3];
  }

  groundLevel() {
    return this.game.world.height - 20
  }

  createObjects() {
    this.createObject(-360, -100, 'tree')
    this.createObject(512,0,'ground')
  }

  levelStart() {
    this.wait(1100,()=>{
      this.speak("I should have known you were behind this...",()=>{
        this.wait(1100,()=>{
          this.speak("This is the last time you cross me old friend!")
        })
      })
    })
  }
}
