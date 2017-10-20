import Level from "../Level";
import Daughter from "../../sprites/Daughter";
import SpeechBubble from "../../sprites/SpeechBubble";

export default class extends Level {
  nextLevel() { return 'Level2' }

  playerStart() {
    return 280
  }

  groundLevel() {
    return this.game.world.height -60
  }

  backgroundImg() {
    return 'night_background'
  }

  createGround() {
    this.addGround(0,500)
  }

  createObjects() {
    this.createObjectWithPhysics(512,0,'house_path')
  }

  createAbove(){
    this.createDaughter(215,33)
    this.createObject(260,30,'house')
    this.createObject(800,30,'lamppost')
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
      this.speak("Let go of me!",{x:25},()=>{
        this.walkPlayer = true
        this.forceWait(1000,()=>{
          this.walkPlayer = false
          this.player.stopWalking()
          this.daughter.body.setZeroVelocity()
          this.speak("I have to get\nout of here",{x:27,y:-25,arrows:['left','right']},()=> {
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
