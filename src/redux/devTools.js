import { ADD_FILE } from './constants'

const transformFileForDevTools = file => ({ ...file, url: '<<LONG_BLOB>>' })

const actionSanitizer = action =>
  action.type === ADD_FILE && action.file ? { ...action, file: transformFileForDevTools(action.file) } : action

const stateSanitizer = state => (state.files ? { ...state, files: state.files.map(transformFileForDevTools) } : state)

export const options = {
  maxAge: 100,
  actionSanitizer,
  stateSanitizer,
}
