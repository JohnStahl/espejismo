import Level from "../Level";
import ThistleMonster from "../../sprites/ThistleMonster";

export default class extends Level {
  nextLevel() { return 'Level4' }

  crossFade() {
    return [0.9,0.05]
  }

  groundLevel() {
    return this.game.world.height - 60
  }

  createObjects() {
    this.createObject(200,0,'forest_background')
    this.createObject(600,0,'forest_background')
    this.createObject(800,0,'forest_background')
    this.createObject(512,70,'forest_midground')
    this.createObject(200,45,'grass_2')
    this.createObject(512,0,'forest_ground')
    this.monster = new ThistleMonster(this.game,{
      min: 390,
      max: 630,
      initial: 620
    },this.world.height-120)
    this.monster.setCollisionGroup(this.enemiesCG)
    this.monster.collides([this.playerCG,this.worldCG])
    this.add.existing(this.monster)
    this.createObjectWithPhysics(512,70,'log')
  }

  levelStart() {
    this.wait(1000,()=>{
      this.monster.awaken()
      this.wait(400,()=>{
        this.speak("What in the devil?",{y:10},()=>{
          this.wait(1000,()=>{
            this.speak("I can't let that\nmonster get me",{x:16,y:0},()=>{
              this.monster.walk()
            })
          })
        })
      })
    })
  }

  levelUpdate() {
    this.handleJump()
    this.handleMovement()
  }
}
