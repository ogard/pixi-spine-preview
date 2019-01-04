import * as React from 'react'
import { connect } from 'react-redux'
import Popover from 'material-ui/Popover/Popover'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import Slider from 'material-ui/Slider'
import EqualizerIcon from 'material-ui/svg-icons/av/equalizer'

import { SET_SPINE_SPEED, SET_SPINE_OPACITY, RESET_SPINE_ADJUSTMENTS } from '../../redux/constants'

class View extends React.Component {
  constructor() {
    super()
    this.state = { open: false, anchorElement: undefined }
  }
  handleOpen = event => {
    event.preventDefault()
    this.setState({
      open: true,
      anchorElement: event.currentTarget,
    })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  calculateDuration = (selectedAnimation, spineData, speed) => {
    const animation = spineData && spineData.animations.find(x => x.name === selectedAnimation)
    const originalDuration = animation && animation.duration
    let duration
    if (originalDuration != null && speed > 0) {
      duration = (originalDuration / speed).toFixed(3)
    } else {
      duration = 0
    }
    return `${duration.toString()} s`
  }
  render() {
    const { spineAdjustments, selectedAnimation, spineData, dispatch } = this.props
    const { open, anchorElement } = this.state
    return (
      <div>
        <IconButton onClick={this.handleOpen} disabled={!selectedAnimation} title="Adjust">
          <EqualizerIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorElement}
          onRequestClose={this.handleClose}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <div id="adjuster-content">
            <label>{`Duration: ${this.calculateDuration(selectedAnimation, spineData, spineAdjustments.speed)}`}</label>
            <label>{`Speed: ${(spineAdjustments.speed * 100).toString(10)} %`}</label>
            <Slider
              min={0}
              max={3}
              step={0.01}
              value={spineAdjustments.speed}
              onChange={(event, value) => dispatch({ type: SET_SPINE_SPEED, value })}
            />
            <label>{`Opacity: ${(spineAdjustments.opacity * 100).toString(10)} %`}</label>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={spineAdjustments.opacity}
              onChange={(event, value) => dispatch({ type: SET_SPINE_OPACITY, value })}
            />
            <FlatButton
              id="reset-spine-adjustmens"
              label="RESET"
              onClick={() => dispatch({ type: RESET_SPINE_ADJUSTMENTS })}
            />
          </div>
        </Popover>
      </div>
    )
  }
}

export default connect(state => ({
  spineAdjustments: state.spineAdjustments,
  selectedAnimation: state.selectedAnimation,
  spineData: state.spineData,
}))(View)
