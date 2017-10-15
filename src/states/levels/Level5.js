import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level5' }

  createObjects() {
    this.createObject(-360, -120, 'tree')
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
