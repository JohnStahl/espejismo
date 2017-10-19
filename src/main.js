import 'pixi'
import 'p2'
import Phaser from 'phaser'

import InitState from './states/Init'
import BootState from './states/Boot'
import SplashState from './states/Splash'
import Level1 from './states/levels/Level1'
import Level2 from './states/levels/Level2'
import Level3 from './states/levels/Level3'
import Level4 from './states/levels/Level4'
import Level5 from './states/levels/Level5'

import config from './config'
import Level6 from "./states/levels/Level6";
import Credits from "./states/Credits";

class Game extends Phaser.Game {
  constructor () {
    const width = config.gameWidth
    const height = config.gameHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Init', InitState, false)
    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Level1', Level1, false)
    this.state.add('Level2', Level2, false)
    this.state.add('Level3', Level3, false)
    this.state.add('Level4', Level4, false)
    this.state.add('Level5', Level5, false)
    this.state.add('Level6', Level6, false)
    this.state.add('Credits', Credits, false)

    this.state.start('Init')
  }
}

window.game = new Game()
