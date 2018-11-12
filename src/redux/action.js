import { COUNTER } from './constants'

export const increment = () => ({ type: COUNTER.INCREMENT })
export const decrement = () => ({ type: COUNTER.DECREMENT })
export const incrementAsync = () => ({ type: COUNTER.INCREMENT_ASYNC })
