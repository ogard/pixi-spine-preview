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
    const file = files[0]
    const reader = new FileReader()
    reader.onloadstart = () => {
      this.props.onStartReadingFile()
    }
    // reader.readAsArrayBuffer(file)
    reader.readAsDataURL(file)
    reader.onload = readerEvt => {
      // console.log(readerEvt)
      // const arrayBuffer = readerEvt.target.result
      // console.log(typeof arrayBufferToBase64(arrayBuffer))
      // window.localStorage.setItem(file.name, arrayBufferToBase64(arrayBuffer))
      this.props.onSuccessReadingFile({
        dokumentNaziv: file.name,
        dokumentSadrzaj: readerEvt.target.result,
      })
    }
    reader.onerror = errorEvent => {
      this.props.onFailReadingFile(errorEvent)
    }
  }

  render() {
    const { file, reading } = this.props
    return (
      <Dropzone multiple={false} onDrop={files => this.onDrop(files)} style={{ height: 200, position: 'relative' }}>
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
              console.log(window.localStorage)
              return reading === true ? (
                <div title="Учитавање одабраног документa">
                  <i className="fa fa-spinner fa-spin fa-3x" />
                </div>
              ) : (
                <div>
                  {/* <img src={`data:image/gif;base64,${file[0].dokumentSadrzaj}`} /> */}
                  <img src={file[0].dokumentSadrzaj} />
                  <p>{`Одабрани документ: ${file[0].dokumentNaziv}`}</p>
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
