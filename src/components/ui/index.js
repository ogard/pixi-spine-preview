import * as React from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-upload'
import PlayIcon from 'material-ui/svg-icons/av/play-arrow'
import PauseIcon from 'material-ui/svg-icons/av/pause'
import StopIcon from 'material-ui/svg-icons/av/stop'

import { LOADER_OPEN, SET_ANIMATION, SET_SPINE_ACTION, SPINE_ACTION } from '../../redux/constants'
import Adjuster from './adjuster'

const renderPlayPauseButton = (action, disabled, dispatch) => {
  switch (action) {
    case SPINE_ACTION.PLAY:
      return (
        <IconButton
          onClick={() => dispatch({ type: SET_SPINE_ACTION, value: SPINE_ACTION.PAUSE })}
          disabled={disabled}
          title="Pause"
        >
          <PauseIcon />
        </IconButton>
      )
    default:
      return (
        <IconButton
          onClick={() => dispatch({ type: SET_SPINE_ACTION, value: SPINE_ACTION.PLAY })}
          disabled={disabled}
          title="Play"
        >
          <PlayIcon />
        </IconButton>
      )
  }
}

const View = ({ selectedAnimation, animations, spineAction, dispatch }) => (
  <div id="ui">
    <IconButton title="Upload" onClick={() => dispatch({ type: LOADER_OPEN })}>
      <CloudUploadIcon />
    </IconButton>
    {animations.length && (
      <DropDownMenu
        value={selectedAnimation}
        onChange={(event, index, value) => {
          event.preventDefault()
          dispatch({ type: SET_ANIMATION, value })
        }}
        style={{ maxWidth: 150 }}
      >
        <MenuItem value={null} primaryText="-" />
        {animations.map(x => (
          <MenuItem key={x} value={x} primaryText={x} />
        ))}
      </DropDownMenu>
    )}
    {renderPlayPauseButton(spineAction, !selectedAnimation, dispatch)}
    <IconButton
      onClick={() => dispatch({ type: SET_SPINE_ACTION, value: SPINE_ACTION.STOP })}
      disabled={!selectedAnimation || !spineAction || spineAction === SPINE_ACTION.STOP}
      title="Stop"
    >
      <StopIcon />
    </IconButton>
    <Adjuster />
  </div>
)

export default connect(state => ({
  selectedAnimation: state.selectedAnimation,
  spineAction: state.spineAction,
  animations: state.spineData ? state.spineData.animations.map(x => x.name) : [],
}))(View)
