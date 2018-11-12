// import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import * as action from '../redux/action'
import { COUNTER } from '../redux/constants'

function* incrementAsync() {
  // yield delay(1000)
  yield new Promise(resolve => {
    setTimeout(() => {
      console.log('custom promise just to pause execution for 1s')
      resolve(undefined)
    }, 1000)
  })

  yield put(action.increment())
}

export default function* watchIncrementAsync() {
  yield takeEvery(COUNTER.INCREMENT_ASYNC, incrementAsync)
}
