import Level from "../Level";
import Scarecrow from "../../sprites/Scarecrow";

export default class extends Level {
  nextLevel() { return 'Level5' }

  crossFade() {
    return [0.8,0.15]
  }

  groundLevel() {
    return this.game.world.height - 20
  }

  createObjects() {
    this.createObject(512,0,'cornfield_background')
    this.createObject(512,0,'cornfield_midground')
    this.createObject(512,0,'cornfield_ground')
    this.createObject(700,-40,'scarecrow_post')
  }

  createAbove() {
    this.scarecrow = new Scarecrow(this.game,700,this.world.height - 150,this.player)
    this.scarecrow.setCollisionGroup(this.enemiesCG)
    this.scarecrow.collides([this.playerCG,this.worldCG])
    this.add.existing(this.scarecrow)
    let damageTimeout = 0
    this.player.body.onBeginContact.add((body,...args)=>{
      if(body.sprite === this.scarecrow) {
        if(this.player.isState('jump')) {
          if(this.game.time.now > damageTimeout) {
            this.scarecrow.hit()
            damageTimeout = this.game.time.now + 1000
          }
        }
      }
    })
  }

  levelStart() {
    this.wait(1000,()=>{
      this.scarecrow.awaken()
      this.forceWait(2000,()=>{
        this.wait(1000,()=>{
          this.speak("You too eh?",{y:10,x:20},()=>{
            this.speak("Looks like I'll\nneed to fight",{x: 20, y: 0},()=>{
              this.player.enableSwordMode()
              this.forceWait(500,()=>{
                this.scarecrow.transition()
                this.forceWait(500)
              })
            })
          })
        })
      })
    })
  }

  levelUpdate() {
    this.handleJump()
    this.handleMovement()
    if(this.scarecrow.alive && this.scarecrow.isState('dying')) {
      this.scarecrowDying = true
      this.player.stop()
      this.player.hold = true
      this.player.collides([this.worldCG])
      this.scarecrow.collides([this.worldCG])
    } else if(this.scarecrowDying) {
      this.player.hold = false
    }
  }
}
