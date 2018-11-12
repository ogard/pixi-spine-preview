import * as React from 'react'
import * as action from '../redux/action'

const View = ({ state, dispatch }) => (
  <div>
    <button onClick={() => dispatch(action.increment())}>Increment</button>{' '}
    <button onClick={() => dispatch(action.decrement())}>Decrement</button>{' '}
    <button onClick={() => dispatch(action.incrementAsync())}>Increment async</button> <hr />
    <div>Clicked: {state} times</div>
  </div>
)

export default View
