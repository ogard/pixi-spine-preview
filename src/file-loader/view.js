import * as React from 'react'
import Dropzone from 'react-dropzone'
import * as PIXI from 'pixi.js'
import { READING_IN_PROGRESS, READING_FAILED, READING_SUCCEEDED } from './constants'
import UploadIcon from '../../assets/upload'

const { loader } = PIXI

const arrayBufferToBase64 = buffer => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

class DragNDrop extends React.Component {
  constructor() {
    super()
  }

  onDrop = files => {
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadstart = () => {
        this.props.onStartReadingFile()
      }
      if (!file.name.includes('json')) {
        reader.readAsDataURL(file)
        reader.onload = readerEvt => {
          this.props.onSuccessReadingFile({
            type: 'asset',
            name: file.name,
            dataUri: readerEvt.target.result,
          })
        }
      } else {
        reader.readAsText(file)
        reader.onload = readerEvt => {
          this.props.onSuccessReadingFile({
            type: 'json',
            name: file.name,
            content: JSON.parse(readerEvt.target.result),
          })
        }
      }
      reader.onerror = errorEvent => {
        this.props.onFailReadingFile(errorEvent)
      }
    })
  }

  render() {
    const { file, reading } = this.props
    return (
      <Dropzone
        multiple={true}
        onDrop={files => this.onDrop(files)}
        style={{ border: '2px solid red', width: 200, height: 200, position: 'relative' }}
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
            if (file.length > 0) {
              return reading === true ? (
                <div title="Учитавање одабраног документa">
                  <i className="fa fa-spinner fa-spin fa-3x" />
                </div>
              ) : (
                <div>
                  {/* <img src={`data:image/gif;base64,${file[0].dokumentSadrzaj}`} /> */}
                  <img src={file[0].dataUri} />
                  <p>{`Одабрани документ: ${file[0].name}`}</p>
                </div>
              )
            }
            return (
              <div title="Одаберите документ">
                <UploadIcon />
              </div>
            )
          })()}
        </div>
      </Dropzone>
    )
  }
}

export default ({ state, dispatch }) => (
  <div style={{ widt: 300, height: 300 }}>
    <DragNDrop
      onStartReadingFile={() => dispatch({ type: READING_IN_PROGRESS })}
      onSuccessReadingFile={files => dispatch({ type: READING_SUCCEEDED, files })}
      onFailReadingFile={error => dispatch({ type: READING_FAILED, error })}
      file={state.files}
      reading={state.processing}
    />
  </div>
)
