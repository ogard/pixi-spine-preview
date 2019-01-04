import * as PIXI from 'pixi.js'
import 'pixi-spine'

const { Container, Graphics, spine } = PIXI

export default class PreviewerDisplay extends Container {
  constructor(props) {
    super()
    const { width, height } = props
    this.dimensions = { width, height }
    this.initialGraphic = new Graphics()
    this.initialGraphic.beginFill(0x000000, 0.9)
    this.initialGraphic.drawRect(0, 0, this.dimensions.width, this.dimensions.height)
    this.initialGraphic.endFill()
    this.addChild(this.initialGraphic)
  }
  setSpine = spineData => {
    this.spine = new spine.Spine(spineData)
    this.spine.x = this.dimensions.width / 2
    this.spine.y = this.dimensions.height / 2
    this.addChild(this.spine)
  }
  setAnimation = (name, loop = false) => {
    if (this.spine) this.spine.state.setAnimation(0, name, loop)
  }
  destroy = () => {
    if (this.spine) this.spine.destroy()
  }
  setTimeScale = scale => {
    if (this.spine) this.spine.state.timeScale = scale
  }
  setAlpha = alpha => {
    if (this.spine) this.spine.alpha = alpha
  }
  setAutoUpdate = bool => {
    if (this.spine) this.spine.autoUpdate = bool
  }
}
