import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor(game, x, y, name, initial) {
    super(game,x,y,name,initial)
    this.game.physics.p2.enable([this], false)
    this.body.fixedRotation = true
    this.addAnimations()
    this.state = {name:''}
    this.stateMap = {}
    this.groupCallbacks = []
  }

  isAnimations(...names) {
    for(let name of names) {
      if(name === this.animations.name) return true
    }
    return false
  }

  isAnimating() {
    if(!this.animations.currentAnim) return false
    return this.animations.currentAnim.isPlaying
  }

  addState(name,func) {
    this.stateMap[name] = func
  }

  setCollisionGroup(cg) {
    this.cg = cg
  }

  collides(cgs) {
    this.cgs = cgs
  }

  createGroupCallback(group,cb) {
    this.groupCallbacks.push([group,cb])
  }

  onAnimationComplete(func) {
    this.animations.currentAnim.onComplete.addOnce(func)
  }

  setState(name,forced = false) {
    if(!this.isState(name)) {
      if(!forced && this.state.isDone && !this.state.isDone()) {
        return
      }
      if(this.state.done) this.state.done()
      let newState = {name}
      const func = this.stateMap[name]
      if (func != null) {
        if(false === func(newState)){
          return
        }
      }
      this.state = newState
    }
  }

  isState(name) {
    const cur = this.state.name
    return (cur.length === name.length || cur[name.length] === '/') &&
      cur.startsWith(name)
  }

  stopAnimation() {
    if(this.isAnimating()) {
      this.animations.currentAnim.stop(true,true)
    }
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

  disablePhysics() {
    this.body.setZeroVelocity()
    this.body.clearShapes()
    this.body.static = true
    this.physicsDisabled = true
  }

  update() {
    if(!this.physicsDisabled) {
      this.updatePhysics()
    }
    if(this.state.update) {
      this.state.update()
    }
  }

  updatePhysics() {
    this.body.clearShapes()
    this.body.loadPolygon(this.key, this.frameName)
    if(this.cg) this.body.setCollisionGroup(this.cg)
    if(this.cgs) this.body.collides(this.cgs)
    for(let cb of this.groupCallbacks) {
      this.body.createGroupCallback(...cb)
    }
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
