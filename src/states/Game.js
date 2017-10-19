/* globals __DEV__ */
import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  createFade() {
    this.fadeGraphic = this.game.add.graphics(0,0)
    this.fadeGraphic.fixedToCamera = true
    this.fadeGraphic.beginFill(0x000000)
    this.fadeGraphic.drawRect(0,0,this.camera.width,this.camera.height)
    this.fadeGraphic.alpha = 0
    this.fadeInTween = this.game.add.tween(this.fadeGraphic).from({alpha: 1}).to({alpha: 0},500)
    this.fadeOutTween = this.game.add.tween(this.fadeGraphic).from({alpha: 0}).to({alpha: 1},500)
  }

  fadeIn(next) {
    if(!this.fadeGraphic) this.createFade()
    this.fadeGraphic.alpha = 1
    this.hold = true
    this.fadeInTween.onComplete.addOnce(()=>{
      this.hold = false
      if(next) next()
    })
    this.fadeInTween.start()
  }

  fadeOut(next) {
    if(!this.fadeGraphic) this.createFade()
    this.fadeGraphic.alpha = 0
    this.hold = true
    this.fadeOutTween.onComplete.addOnce(()=>{
      this.hold = false
      if(next) next()
    })
    this.fadeOutTween.start()
  }

  addTextBelow(pos,content,font,color) {
    let text = this.addText(content,font,color)
    text.alignTo(pos, Phaser.BOTTOM_CENTER)
    return text;
  }

  addTextAbove(pos,content,font,color) {
    let text = this.addText(content,font,color)
    text.alignTo(pos, Phaser.TOP_CENTER)
    return text;
  }

  addText(content,font,color) {
    let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, content, {'font': font, fill: color} );
    text.padding.set(20,0)
    text.dirty = true
    centerGameObjects([text])
    return text;
  }
}
