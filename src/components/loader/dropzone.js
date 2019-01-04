import * as React from 'react'
import ReactDropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import FolderIcon from 'material-ui/svg-icons/file/folder'

export default class Dropzone extends React.Component {
  static propTypes = {
    files: PropTypes.array.isRequired,
    onSuccessReadingFile: PropTypes.func.isRequired,
    onStartReading: PropTypes.func.isRequired,
    onEndReading: PropTypes.func.isRequired,
  }
  constructor() {
    super()
    this.state = { processing: false }
  }
  onStart = () => {
    this.setState({ processing: true })
    this.props.onStartReading()
  }
  onEnd = messageText => {
    let message
    if (messageText) {
      message = { type: 'ERROR', text: messageText }
    } else {
      message = { type: 'SUCCESS', text: 'Assets are successfuly loaded' }
    }
    this.props.onEndReading(message)
  }
  onDrop = files => {
    this.onStart()
    files.forEach((file, index) => {
      let type
      if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(file.name)) {
        type = 'image'
      } else if (file.name.includes('atlas')) {
        type = 'atlas'
      } else if (file.name.includes('json')) {
        type = 'skeleton'
      }
      if (type !== undefined) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = readerEvent => {
          this.props.onSuccessReadingFile({
            type,
            name: file.name,
            url: readerEvent.target.result,
          })
          if (index === files.length - 1) {
            this.onEnd()
          }
        }
      } else {
        this.onEnd('Unknown file format')
      }
    })
  }

  render() {
    const { files } = this.props
    const { processing } = this.state
    return (
      <ReactDropzone
        multiple={true}
        onDrop={this.onDrop}
        style={{ border: '2px solid red', height: 200, position: 'relative' }}
        disabled={processing}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {(() => {
            if (files.length > 0) {
              const names = files.map(x => x.name)
              return processing ? (
                <p style={{ color: '#FFFFFF' }}>Loading...</p>
              ) : (
                <div>
                  <p>{`Loaded files: ${names.join(', ')}`}</p>
                </div>
              )
            }
            return (
              <div title="Load files">
                <FolderIcon />
              </div>
            )
          })()}
        </div>
      </ReactDropzone>
    )
  }
}
