import Phaser from 'phaser'
import WebFont from 'webfontloader'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  preload () {
    WebFont.load({
      google: {
        families: ['Sancreek']
      },
      active: ()=>{this.fontsReady = true}
    })
    this.fontsReady = true

    var loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    var loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([loaderBg, loaderBar])
    this.load.setPreloadSprite(loaderBar)
    this.load.onLoadComplete.addOnce( () => {
      this.loadReady = true
    });

    // Load assets
    this.loadAudio('song','mp3')
    this.loadAudio('songAltered','mp3')

    this.loadImage('background')
    this.loadImage('speech_bubble')
    this.loadImage('grass_1')
    this.loadImage('grass_2')
    this.loadImage('tree')
    this.loadImage('title')
    this.loadImage('ground')
    this.loadImage('bridge_left')
    this.loadImage('bridge_right')
    this.loadImage('bank_left')
    this.loadImage('bank_right')

    this.loadPhysics('objects')

    this.loadCharacter('man')
  }

  render() {
    if(this.loadReady && this.fontsReady) {
      this.state.start('Splash')
    }
  }

  loadImage(name,ext = 'png') {
    this.load.image(name,`./assets/images/${name}.${ext}`)
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
