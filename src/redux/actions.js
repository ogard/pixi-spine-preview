import { LOADER_CLOSE, SET_SPINE_DATA, RESET } from './constants'

export const closeLoader = () => ({ type: LOADER_CLOSE })

export const setSpineData = spineData => ({ type: SET_SPINE_DATA, spineData })

export const reset = () => ({ type: RESET })
