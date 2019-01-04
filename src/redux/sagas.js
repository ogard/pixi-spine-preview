/* eslint-disable func-style */
import * as PIXI from 'pixi.js'
import 'pixi-spine'
import { delay } from 'redux-saga'
import { takeEvery, select, put, call } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import { LOADER_START_READING, LOADER_END_READING } from './constants'
import { closeLoader, setSpineData, reset } from './actions'

export default function*() {
  yield takeEvery(LOADER_START_READING, resetState)
  yield takeEvery(LOADER_END_READING, processLoader)
}

function* resetState() {
  yield put(reset())
}

function* processLoader(action) {
  yield put(closeLoader())
  const { message } = action
  switch (message.type) {
    case 'SUCCESS': {
      yield call(toast, message.text, { type: toast.TYPE.SUCCESS })
      const { files } = yield select()
      try {
        const atlas = files.find(x => x.type === 'atlas')
        const skeleton = files.find(x => x.type === 'skeleton')
        const images = files.filter(x => x.type === 'image')
        const rawAtlasData = atob(atlas.url.split(',').pop())
        const rawSkeletonData = atob(skeleton.url.split(',').pop())

        const spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlasData, function(line, callback) {
          images.forEach(image => {
            const img = new Image()
            img.src = image.url
            callback(new PIXI.BaseTexture(img))
          })
        })

        const spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas)
        const spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader)

        const spineData = spineJsonParser.readSkeletonData(rawSkeletonData)

        yield put(setSpineData(spineData))
        yield delay(1000)
        yield call(toast, 'Loading spine data succedded', { type: toast.TYPE.SUCCESS })
      } catch (error) {
        console.error(error)
        yield delay(1000)
        yield call(toast, 'Loading spine data failed', { type: toast.TYPE.ERROR })
      }
      break
    }
    case 'ERROR': {
      yield call(toast, message.text, { type: toast.TYPE.ERROR })
      break
    }
    default:
      break
  }
}

// function* combineSagas() {
//   yield all([Counter.saga, sagas].map(fork))
// }
