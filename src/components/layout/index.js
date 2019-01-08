import * as React from 'react'
import * as PIXI from 'pixi.js'
import Loader from '../loader'
import UI from '../ui'
import Previewer from '../previewer'
import { FPSMeter } from '../../utils'

export default class Layout extends React.Component {
  componentDidMount() {
    const fpsMeter = new FPSMeter(document.getElementById('fps-meter-anchor'), {
      theme: 'transparent',
      heat: true,
      graph: true,
      top: 0,
      left: 0,
    })
    PIXI.ticker.shared.add(_delta => {
      fpsMeter.tick()
    })
  }
  render() {
    return (
      <div>
        <Loader /> <Previewer /> <UI /> <div id="fps-meter-anchor" />
      </div>
    )
  }
}
