export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#ffffff'
  }

  preload() {
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.onLoadComplete.addOnce( () => {
      this.state.start('Boot')
    });
  }
}
