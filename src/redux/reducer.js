import {
  LOADER_OPEN,
  LOADER_CLOSE,
  ADD_FILE,
  SET_SPINE_DATA,
  SET_ANIMATION,
  SET_SPINE_ACTION,
  RESET,
  SET_SPINE_SPEED,
  SET_SPINE_OPACITY,
  RESET_SPINE_ADJUSTMENTS,
} from './constants'

const initialSpineAdjustments = {
  speed: 1,
  opacity: 1,
}

const initialState = {
  loader: false,
  adjuster: false,
  files: [],
  spineData: null,
  selectedAnimation: null,
  spineAction: null,
  spineAdjustments: initialSpineAdjustments,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADER_OPEN:
      return { ...state, loader: true }
    case LOADER_CLOSE:
      return { ...state, loader: false }
    case ADD_FILE:
      return { ...state, files: [...state.files, action.file] }
    case SET_SPINE_DATA:
      return { ...state, spineData: action.spineData }
    case SET_ANIMATION:
      return { ...state, selectedAnimation: action.value, spineAction: null }
    case SET_SPINE_ACTION:
      return { ...state, spineAction: action.value }
    case SET_SPINE_SPEED:
      return { ...state, spineAdjustments: { ...state.spineAdjustments, speed: action.value } }
    case SET_SPINE_OPACITY:
      return { ...state, spineAdjustments: { ...state.spineAdjustments, opacity: action.value } }
    case RESET:
      return {
        ...state,
        files: [],
        spineData: null,
        selectedAnimation: null,
        spineAction: null,
        spineAdjustments: initialSpineAdjustments,
      }
    case RESET_SPINE_ADJUSTMENTS:
      return { ...state, spineAdjustments: initialSpineAdjustments }
    default:
      return state
  }
}
