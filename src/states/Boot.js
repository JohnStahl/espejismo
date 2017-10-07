import Phaser from 'phaser'
import WebFont from 'webfontloader'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  preload () {
    var loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    var loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([loaderBg, loaderBar])
    this.load.setPreloadSprite(loaderBar)

    // Load assets
    this.loadAudio('song','mp3')
    this.loadAudio('songAltered','mp3')

    this.load.onLoadComplete.add( () => {
      this.state.start('Splash')
    });
  }

  loadAudio(name,ext = 'wav') {
    this.load.audio(name,`./assets/audio/${name}.${ext}`)
  }

  loadCharacter(name) {
    this.loadSprite(name)
    this.loadPhysics(name)
  }

  loadSprite(name) {
    this.load.atlasJSONHash(name, 'assets/animation/'+name+'.png', 'assets/animation/'+name+'.json')
  }

  loadPhysics(name) {
    this.game.load.physics(name,'assets/physics/'+name+'.json')
  }
}
