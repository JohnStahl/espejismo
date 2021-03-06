import Level from "../Level";

export default class extends Level {
  nextLevel() {
    return 'Credits'
  }

  fadeTime() {
    return 2000
  }

  backgroundImg() {
    return 'night_background'
  }

  crossFade() {
    return [1,0];
  }

  playerStart() {
    return 277
  }

  groundLevel() {
    return this.game.world.height - 30
  }

  createAbove() {
    this.player.collapsed()
    this.createDaughter(50,10)
  }

  createObjects() {
    this.createObject(-360, -100, 'tree')
    this.createObject(512,0,'ground')
  }

  levelStart() {
    this.daughterSpeak("Papa!",{size: 32,x:20},()=>{
      this.player.wake()
      this.wait(4200,()=>{
        this.speak("I almost had him",{x:0,y:10},()=>{
          this.wait(1000,()=>{
            this.player.moveVel = 100
            this.player.checkEdge = false
            this.player.moveLeft()
            this.daughterSpeak("...",{size: 32, y: -20, x:60},()=>{
              this.daughter.scale.x = -1
              this.daughterSpeak("You'll get him\nnext time Papa",{x:10},()=>{
                this.changeLevel()
              })
            })
          })
        })
      })
    })
  }
}
