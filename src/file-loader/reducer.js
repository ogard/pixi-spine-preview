import { READING_IN_PROGRESS, READING_FAILED, READING_SUCCEEDED } from './constants'
const initalState = {
  files: [],
  proccessing: false,
}

export default (state = initalState, action) => {
  switch (action.type) {
    case READING_IN_PROGRESS:
      return { ...state, proccessing: true }
    case READING_FAILED:
      return { ...state, proccessing: { type: 'ERROR', message: action.error } }
    case READING_SUCCEEDED:
      return { files: [...state.files, action.files], proccessing: false }
    default:
      return state
  }
}
