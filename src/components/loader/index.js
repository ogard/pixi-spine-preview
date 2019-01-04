import * as React from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import Dropzone from './dropzone'
import { LOADER_START_READING, LOADER_END_READING, LOADER_CLOSE, ADD_FILE } from '../../redux/constants'

const View = ({ open, files, dispatch }) => (
  <Dialog
    modal={false}
    open={open}
    onRequestClose={() => dispatch({ type: LOADER_CLOSE })}
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
  >
    <Dropzone
      files={files}
      onSuccessReadingFile={file => dispatch({ type: ADD_FILE, file })}
      onStartReading={() => dispatch({ type: LOADER_START_READING })}
      onEndReading={message => dispatch({ type: LOADER_END_READING, message })}
    />
  </Dialog>
)

export default connect(state => ({
  open: state.loader,
  files: state.files,
}))(View)
