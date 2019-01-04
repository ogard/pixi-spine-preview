import * as React from 'react'
import { Stage } from 'react-pixi'
import { connect } from 'react-redux'
import PreviewerCustom from './previewerCustom'

class View extends React.Component {
  constructor() {
    super()
    this.state = { dimensions: this.getDimensions() }
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  getDimensions = () => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    return {
      windowWidth,
      windowHeight,
      windowScale: Math.min(windowWidth / windowHeight, windowHeight / windowWidth),
      dpr: Math.max(window.devicePixelRatio || 1, 1),
    }
  }
  handleResize = () => {
    this.setState({ dimensions: this.getDimensions() })
  }
  render() {
    const { dimensions } = this.state
    const { spineData, selectedAnimation, spineAction, spineAdjustments } = this.props
    const width = dimensions.windowWidth
    const height = dimensions.windowHeight - 48

    return (
      <Stage
        width={width}
        height={height}
        scale={dimensions.scale}
        style={{ width, height }}
        resolution={dimensions.dpr}
        legacy
        roundPixels
      >
        <PreviewerCustom
          width={width}
          height={height}
          spineData={spineData}
          selectedAnimation={selectedAnimation}
          spineAction={spineAction}
          spineAdjustments={spineAdjustments}
        />
      </Stage>
    )
  }
}

export default connect(state => ({
  spineData: state.spineData,
  selectedAnimation: state.selectedAnimation,
  spineAction: state.spineAction,
  spineAdjustments: state.spineAdjustments,
}))(View)
