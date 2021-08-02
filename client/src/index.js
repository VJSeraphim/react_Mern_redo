import React from 'react'
import ReactDOM from 'react-dom'
import { provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

import App from './App'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <App />,
    document.getElementById('root')
)