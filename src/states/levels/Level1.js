import Level from "../Level";
import Daughter from "../../sprites/Daughter";
import SpeechBubble from "../../sprites/SpeechBubble";

export default class extends Level {
  nextLevel() { return 'Level2' }

  playerStart() {
    return 280
  }

  groundLevel() {
    return this.game.world.height -30
  }

  backgroundImg() {
    return 'night_background'
  }

  createObjects() {
    this.createObjectWithPhysics(512,0,'house_path')
  }

  createAbove(){
    this.daughter = this.createObject(215,33,'daughter')
    this.daughterBubble = new SpeechBubble(this.game,this.daughter,'#344f82')
    this.add.existing(this.daughterBubble)
    this.createObject(260,30,'house')
    this.createObject(800,30,'lamppost')
  }

  daughterSpeak(text,opts,f) {
    opts.bubble = this.daughterBubble
    this.speak(text,opts,f)
  }

  update() {
    super.update()
    if(this.walkPlayer) {
      this.player.moveRight()
      this.daughter.body.moveRight(145)
    }
  }

  levelStart() {
    this.daughterSpeak("Papa, stop,\nYou aren't well!",{x:20,y:-10},()=>{
      this.speak("Get off of me!",{x:27},()=>{
        this.walkPlayer = true
        this.forceWait(1500,()=>{
          this.walkPlayer = false
          this.player.stopWalking()
          this.daughter.body.setZeroVelocity()
          this.speak("I have to get\nout of here",{x:27,y:-10},()=> {
            this.player.leftEdgePos = 380
          })
        })
      })
    })
  }

  levelUpdate() {
    this.handleMovement()
  }
}
