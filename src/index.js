import * as React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connect, Provider } from 'react-redux'

import * as Counter from './counter'
import * as FileLoader from './file-loader'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ maxAge: 100 }) || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({ counter: Counter.reducer, fileLoader: FileLoader.reducer }),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(Counter.saga)

const View = ({ dispatch, ...restProps }) => (
  <div>
    <Counter.View state={restProps.counter} dispatch={dispatch} />
    <FileLoader.View state={restProps.fileLoader} dispatch={dispatch} />
  </div>
)

const ConnectedApp = connect(state => state)(View)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
    document.getElementById('root'),
  )
}

render()
