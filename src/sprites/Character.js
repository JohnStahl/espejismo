import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor(game, x, y, name, initial) {
    super(game,x,y,name,initial)
    this.game.physics.p2.enable([this], false)
    this.body.fixedRotation = true
    this.addAnimations()
    this.state = {name:''}
  }

  setCollisionGroup(cg) {
    this.cg = cg
  }
  collides(cgs) {
    this.cgs = cgs
  }

  setState(name,func) {
    if(!this.isState(name)) {
      if(this.state.done && !this.state.done()) {
        return
      }
      let newState = {name}
      if (func != null) {
        if(false === func(newState)){
          return
        }
      }
      console.log(`Setting state to ${newState.name}`)
      this.state = newState
    }
  }

  isState(name) {
    const cur = this.state.name
    return (cur.length === name.length || cur[name.length] === '/') &&
      cur.startsWith(name)
  }

  addAnimations() {
    let animations = new Map
    let frames = this.game.cache.getFrameData(this.key).getFrames()
    for(let i = 0; i < frames.length; ++i) {
      let frameName = frames[i].name
      let animationName = frameName.split('/')[0]
      if(animations.has(animationName)) {
        animations.get(animationName).push(frameName)
      } else {
        animations.set(animationName,[frameName])
      }
    }
    for(let [name,frames] of animations) {
      this.animations.add(name, frames.sort())
    }
  }

  update() {
    this.updatePhysics()
    if(this.state.update) {
      this.state.update()
    }
  }

  updatePhysics() {
    this.body.clearShapes()
    this.body.loadPolygon(this.key, this.frameName)
    if(this.cg) this.body.setCollisionGroup(this.cg)
    if(this.cgs) this.body.collides(this.cgs)
    this.body.collideWorldBounds = true
  }

  canJump() {
    // From https://phaser.io/examples/v2/p2-physics/platformer-material
    let yAxis = p2.vec2.fromValues(0, 1)
    let result = false;
    for (let i=0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
      let c = this.game.physics.p2.world.narrowphase.contactEquations[i];
      if (c.bodyA === this.body.data || c.bodyB === this.body.data) {
        let d = p2.vec2.dot(c.normalA, yAxis);
        if (c.bodyA === this.body.data) {
          d *= -1;
        }
        if (d > 0.5) {
          result = true;
        }
      }
    }
    return result;
  }
}
