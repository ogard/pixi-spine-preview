import { COUNTER } from '../redux/constants'

export default (state = 0, action) => {
  switch (action.type) {
    case COUNTER.INCREMENT:
      return state + 1
    case COUNTER.DECREMENT:
      return state - 1
    default:
      return state
  }
}
