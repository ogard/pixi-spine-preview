import { READING_IN_PROGRESS, READING_SUCCEEDED, READING_FAILED } from './constants'

export const startReading = () => ({ type: READING_IN_PROGRESS })
export const readingSucceeded = files => ({ type: READING_SUCCEEDED, files })
export const readingFailed = error => ({ type: READING_FAILED, error })
