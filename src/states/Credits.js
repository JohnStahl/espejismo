import Phaser from 'phaser'
import Game from "./Game";
import config from "../config";

export default class extends Game {
  create() {
    this.stage.backgroundColor = '#000000'
    let title = this.addText("El Espejismo", `42px ${config.font}`, '#E7D39E',{y: 200})

    let contributers = [
      'Matt Edlefsen',
      'George Barrett',
      'Alex Cole',
      'John Stahl',
      'Philip Vasta'
    ]

    let last = title

    while(contributers.length > 0) {
      let c = this.rnd.pick(contributers)
      contributers.splice(contributers.indexOf(c),1)
      last = this.addTextBelow(last,c,`24px ${config.font}`, '#E7D39E')
    }
    this.time.events.add(20000,()=>{
      this.state.start('Splash')
    })
  }
}