import Level from "../Level";

export default class extends Level {
  nextLevel() { return 'Level5' }

  crossFade() {
    return [0.5,0.3];
  }

  groundLevel() {
    return this.game.world.height - 20
  }

  createAbove() {
    this.player.swordMode = true
    this.createPlayerHealthBar()
  }

  createObjects() {
    this.createObject(-360, -100, 'tree')
    this.createObject(512,0,'ground')
  }

  levelStart() {
    this.wait(2500,()=>{
      this.speak("I should have\nknown you were\nbehind this...",{x:18,y:-20},()=>{
        this.wait(2000,()=>{
          this.speak("This is the\nlast time you\ncross me\nold friend!",{x:35,y:-30})
        })
      })
    })
  }
}
